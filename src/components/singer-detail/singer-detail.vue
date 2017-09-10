<template>
  <transition name='slide'>
      <music-list :musical-data=" singerDetails "></music-list>
  </transition>
</template>

<script>
  import { mapMutations , mapGetters } from 'vuex';
  import { request } from 'api/app_api';
  import { isOk } from 'api/config';
  import musicList from 'components/music-list/music-list';

  export default {
    created(){
      //  如果生成页面时 , 没有或期待this.singerId, 跳回singer.vue页面
      if (!this.singerId) {
        this.$router.push( {
          path: '/singer',
        } );
        return;
      };

      //  路径数据
      this.baseUrl = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
      this.dynamicUrl = {
          order: 'listen',
          begin: 0,
          num: 50,
          singerid: this.singerId,
          uin: 0,
          format: 'jsonp',
          platform: 'h5page',
          needNewCode: 1,
          from: 'h5',
          _: 1503418041346,
      };

      //  执行api
      this._getDetail();
    },

    data() {
      return {
        //  返回数据,当前歌手的歌单
        singerDetails: [],
      };
    },

    components: {
      musicList,
    },

    computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'singerId'
      ]),
    },

    methods:{
      ...mapMutations( {
        setActiveList: 'SET_ACTIVE_LIST',
      } ),

      _getDetail() {
        request( this.baseUrl , this.dynamicUrl )
        .then( (res) => {
            if ( res.code  === isOk ) {
              this.singerDetails = this._initDetail( res.data.list );
            } else {
              this.singerDetails = [];
            };
        } );
      },
      _initDetail( data ) {
        var ret = [];
        var orgin = data;
        var length = orgin.length;

        for ( var i=0; i<length; i++ ){
          const { musicData: { albumname,singer,songname,songid,albummid,interval } } = data[i];
          const tab = {
            'albumname': albumname,
            'singer': singer[0].name,
            'poster': `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer[0].mid}.jpg?max_age=2592000`,
            'songname': songname,
            'songid': songid,
            'song-poster': `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
            'time': interval,
          };
          const json = {...tab};
          ret.push( json );
        }

        return ret;
      },
    }
  }
</script>

<style scoped src='assets/css/singer-detail.css'>
  
</style>