var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('../models/user');

mongoose.connect('mongodb://47.94.6.17:27017/shop');

mongoose.connection.on('connected', function () {
    console.log("mongodb connected success");
});

mongoose.connection.on('error', function () {
    console.log("mongodb connected fail");
});

mongoose.connection.on('disconnected', function () {
    console.log("mongodb connected disconnected");
});

router.get("/list", function (req, res, next) {

    //接收前端请求的参数
    let sort = req.param('sort');
    let priceLevel = req.param('priceLevel');
    let priceGt = '',
        priceLte = '';
    let param = {};

    if (priceLevel != 'all') {
        // switch (priceLevel) {
        //     case '0':
        //         priceGt = 0;
        //         priceLte = 100;
        //         break;
        //     case '1':
        //         priceGt = 100;
        //         priceLte = 500;
        //         break;
        //     case '2':
        //         priceGt = 500;
        //         priceLte = 1000;
        //         break;
        //     case '3':
        //         priceGt = 1000;
        //         priceLte = 5000;
        //         break;
        // }

        //表驱动法
        let priceItem = [[0, 100], [100, 500], [500, 1000], [1000, 5000]];
        param = {
            salePrice: {
                // $gt: priceGt,
                // $lte: priceLte
                $gt: priceItem[priceLevel][0],
                $lte: priceItem[priceLevel][1]
            }
        }
    }
    console.log(param);

    //第几页
    let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1;
    //每页显示多少条
    let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 8;

    let skip = (currentPage - 1) * pagesize;
    //执行按照什么排序


    let goodModel = Goods.find(param).sort({'salePrice': sort}).skip(skip).limit(pagesize);

    //执行最后结果
    goodModel.exec({}, function (err, doc) {
        res.json({status: 0, result: doc})
    })


});

router.post('/addCart', function (req, res, next) {

    let userId = '100000077';
    let productId = req.body.productId;
    console.log(productId)

    User.findOne({userId: userId}, function (err, userDoc) {

        let goodItem = '';

        userDoc.cartList.forEach(function (item) {
            if (item.productId == productId) {
                goodItem = item;
                item.productNum++;
            }
        });

        if (goodItem) {
            userDoc.save(function (err3, doc3) {
                if (err3) {
                    res.json({status: '1', msg: err3.message})
                } else {
                    res.json({status: 0, msg: '', result: "商品数量添加成功"})
                }
            })
        }
        else {
            Goods.findOne({productId: productId}, function (err1, goodDoc) {
                console.log(productId);
                console.log(goodDoc);
                goodDoc.productNum = "1";
                userDoc.cartList.push(goodDoc);
                userDoc.save(function (err2, doc2) {
                    if (err2) {
                        res.json({status: 1, msg: err2.message})
                    } else {
                        res.json({status: 0, msg: '', result: '加入购物车成功'})
                    }

                });

                // res.json({
                //     status:'0',
                //     result:'加入购物车成功'
                // })
            })
        }

    })
});

module.exports = router;
