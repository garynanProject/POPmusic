<template>
  <div class="recommend" ref="recommend">
    <scroll class='recommend-content' :data='hotdiss'>
      <div>
        <div class='slider-wrapper' v-if='recommends.length'>
          <slider :recommends='recommends' class="index_swiper"></slider>
        </div>
        <div class='recommend-list'>
          <h1 class='list-title'>热门歌单推荐</h1>
          <ul>
            <li v-for="item in hotdiss" class='item' key="hotlist">
              <div class='icon'>
                <img width="60" height="60" v-lazy='item.imgurl'>
              </div>
              <div class='text'>
                <h2 class='name' v-text='item.author'></h2>
                <p class='desc' v-text='item.dissname'></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class='loading-container' v-if="!hotdiss.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { request } from 'api/app_api'
import { isOk } from 'api/config'
import Slider from 'basic/slider/slider'
import Scroll from 'basic/scroll/scroll'
import Loading from 'basic/loading/loading'
export default {
  data() {
    return {
      recommends: [],
      hotdiss: []
    }
  },
  created() {
    this._getRecommend();
    setTimeout(() => {
      this._getHotdiss();
    }, 30)

  },
  methods: {
    _getRecommend() {
      request( 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg' , 
      {
        platform: 'h5',
        uin: 0,
        needNewCode: 1,
      } ).then((res) => {
        if (res.code == isOk) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getHotdiss() {
      request( 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg' , 
      {
        format: 'jsonp',
        tpl: 'v12',
        page: 'other',
        rnd: '8595031809941014',
        loginUin: 0,
        hostUin: 0,
        outCharset: 'GB2312',
        platform: 'yqq',
        needNewCode: 0
      } ).then((res) => {
        if (res.code == isOk) {
          this.hotdiss = res.data.hotdiss.list;
        }
      })
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }

}
</script>

<style scoped src='assets/css/recommend.css'></style>
<style>
  .index_swiper .swiper-wrapper{
     transition-timing-function:  ease-in-out;
  }
  .index_swiper .ani{
       animation-timing-function:  ease-in-out;
       -webkit-animation-timing-function:  ease-in-out;
  }
</style>
