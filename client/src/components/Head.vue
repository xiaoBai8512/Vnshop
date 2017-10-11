<template>
  <div>
    <div class="site-header" style="clear:both;">
      <div class="container">
        <div class="header-logo">
          <router-link to="/" title="VN"><img src="/static/img/vn-logo.png"/></router-link>
        </div>
        <div class="header-nav">
          <ul class="nav-list">
            <!--<li class="nav-category">-->
              <!--<a class="btn-category-list" href="catalog.php" style="display:none;">全部商品分类</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="link" href="category.php?id=76"><span>购买电视与平板</span></a>-->
              <!--<div class='item-children'>-->
                <!--<div class="container">-->
                  <!--<ul class="children-list clearfix">-->

                  <!--</ul>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->

            <!--<li class="nav-item">-->
              <!--<a class="link" href="category.php?id=118"><span>小米生活方式</span></a>-->
              <!--<div class='item-children'>-->
                <!--<div class="container">-->
                  <!--<ul class="children-list clearfix">-->
                    <!--<li class="first">-->
                      <!--<div class="figure figure-thumb">-->
                        <!--<a href="goods.php?id=89"><img src=""-->
                                                       <!--alt="纯色开衫卫衣 女款"></a>-->
                      <!--</div>-->
                      <!--<div class="title"><a href="goods.php?id=89">纯色开衫卫衣 女款</a></div>-->
                      <!--<p class="price">129<em>元</em>元</p>-->
                    <!--</li>-->

                  <!--</ul>-->
                <!--</div>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </div>
        <!-- <div class="container-user"> -->
        <div class="topbar-cart" id="ECS_CARTINFO">
          <router-link class="cart-mini" to="/cart">
            <i class="iconfont">&#xe60c;</i> 购物车
            <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
          </router-link>
        </div>
        <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
          <span v-text="nickName" v-if="nickName"> </span>
          <a class="link" href="javascript:void (0)" rel="nofollow" v-if="!nickName"
             @click="loginModelFlag = true">登录</a>
          <span class="sep" v-if="nickName">|</span>
          <a class="link" href="javascript:void (0)" rel="nofollow" v-if="nickName" @click="logout">退出</a>
        </div>

        <!-- </div> -->
      </div>
      <div id="J_navMenu" class="header-nav-menu" style="display: none;">
        <div class="container"></div>
      </div>
    </div>

    <!-- 登录框 -->
    <div class="md-modal modal-msg md-modal-transition " :class="{'md-show' : loginModelFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">登录</div>
          <button class="md-close">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show"></span>
            </div>
            <ul>
              <li class="regi_form_input">
                <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name"
                       data-type="loginname" class="regi_login_input regi_login_input_left">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password"
                       class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
              </li>
            </ul>

          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModelFlag" @click="loginModelFlag = false">
    </div>

  </div>

</template>

<script>
  //  import axios from 'axios'

  export default {
    name: 'header',
    data () {
      return {
        userName: '',
        userPwd: '',
        nickName: '',
        loginModelFlag: false
      }
    },
    mounted: function () {
      this.checkLogin()
    },
    methods: {
      login () {
        this.$http.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((result) => {
          console.log(result.data)

          let res = result.data
          this.nickName = res.result.userName
          this.loginModelFlag = false
        })
      },
      checkLogin () {
        this.$http.post('/users/checkLogin').then((result) => {
          let res = result.data
          this.nickName = res.result
        })
      },
      logout () {
        this.$http.post('users/logout').then((result) => {
          let res = result.data
          this.nickName = ''
        })
      }
    }

  }
</script>

<style>

</style>
