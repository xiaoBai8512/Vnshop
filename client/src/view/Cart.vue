<template>
  <div>

    <head-nav/>
    <nav-bread><span>购物车列表</span></nav-bread>

    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="(item,index) in cartList" :key="index">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}"
                       @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/img/'+ item.productImage">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">XX</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">1000</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub">-</a>
                        <span class="select-ipt">10</span>
                        <a class="input-add">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">100</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;">
                                <span class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">500</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer-nav/>

  </div>
</template>

<script>
  import HeadNav from '@/components/Head'
  import NavBread from '@/components/NavBread'
  import FooterNav from '@/components/Footer'
  import Modal from '@/components/Modal'

  export default {
    name: 'cart',
    data () {
      return {
        cartList: ''
      }
    },
    components: {
      HeadNav,
      NavBread,
      FooterNav,
      Modal
    },
    mounted () {
      this.getCartList()
    },
    methods: {
      getCartList () {
        this.$http.get('/users/cartList').then((result) => {
          let res = result.data.result
          this.cartList = res
        })
      }
    }
  }
</script>

<style>

</style>
