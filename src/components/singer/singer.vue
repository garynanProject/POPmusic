<template>
  <div class="singer" ref="singer">
      <div class='loading-container' v-if="!singerList.length">
           <loading></loading>
      </div>
      <singer-list-index v-if=" singerList.length "></singer-list-index>
      <list-view :data='singerList' @selected=" routeToDetail "></list-view>

      <!-- 内容出口 -->
      <router-view></router-view>
  </div>
</template>

<script>
//  引入数据请求函数
import { request } from 'api/app_api'
//  引入处理singer数据的类
import SingerClass from 'assets/js/singer/singer.class'
//  标准量 ，判断获取到的数据是否准确
import { isOk } from 'api/config'
//  引入listview.vue组件
import ListView from 'basic/listview/listview'
//  引入singerListIndex.vue组件
import singerListIndex from 'basic/singerListIndex/singerListIndex'
//  引入loading.vue组件
import Loading from 'basic/loading/loading'

//  引入vuex中的mapMutations方法；
import {mapMutations} from 'vuex';

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  created() {
    this._getSingerList();
  },
  beforDestory() {
    this.$root.bus.$off( 'scrollIndex' );
  },

  components:{
    ListView,
    singerListIndex,
    Loading
  },

  data() {
    return {
      singerList: [],
    }
  },

  methods: {
    routeToDetail( singerMsg ) {
      const singerId = parseInt( singerMsg.id );

      this.$router.push( {
        path: `/singer/${ singerId }`,
      } );

      this.setSinger( singerId );
    },

    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),

    /**
     *获取歌手列表
     */
    _getSingerList() {
      request( 'https://c.y.qq.com/v8/fcg-bin/v8.fcg' , 
      {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
      } ).then((res) => {
        if (res.code === isOk) {
          this.singerList = this._normalizeSinger(res.data.list);
        }
      })
    },
    /**
     * 对接口传过来的数据二次处理
     */
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        /**
         * 把前10条数据归类为热门
         */
        if (index < HOT_SINGER_LEN) {
     
          map.hot.items.push(new SingerClass({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const KEY = item.Findex; //聚合数据 a b c d e。。。。
        if (!map[KEY]) {//假如没有key值
          map[KEY] = {
            title: KEY,
            items: []
          }
        }
        map[KEY].items.push(new SingerClass({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
      })
      //为了让最终的数据是按照我们页面的要求，有序排列
      let ret = [];
      let hot = [];
      for(let key in map){
        let val = map[key];
        //判断当前这个值是否属于热门
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title===HOT_NAME){
          hot.push(val)
        }

      //真正的去排序我们的a-z
          ret.sort((a,b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          })
      }
        return hot.concat(ret);
    }
  }
}
</script>

<style scoped src='assets/css/singer.css'></style>
