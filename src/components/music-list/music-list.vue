<template>
  <div class="music-list">
    <div class="back" @click="routeBack">
      <i class="icon-back"></i>
    </div>
    <div v-if=" musicalData.length " style=" position: absolute; top: 0; width: 100%;"> 
      <h1 class="title"> {{ title }} </h1>
      <div class="bg-image" ref="bgImage" :style=" poster ">
        <div class="play-wrapper">
          <div ref="playBtn" class="play"
          @touchstart.prevent.stop=" randomList ">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
    </div>
    <scroll class="list" ref="list" :data=" musicalData " :refreshDelay=" refreshDelay ">
      <div class="song-list-wrapper">
        <song-list :musicalData=" musicalData "></song-list>
      </div>
      <div class="loading-container" v-show=" !musicalData.length ">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  //  组件
  import scroll from 'basic/scroll/scroll';
  import loading from 'basic/loading/loading';
  import songList from 'basic/song-list/song-list';
  //  vueX
  import {mapMutations , mapGetters , mapActions } from 'vuex';
  //  公用js 打乱歌单
  import { _RandomList } from 'assets/js/random-list'

  export default {
    name: 'musicList',

    components: {
      scroll,
      loading,
      songList
    },

    props: {
      musicalData: {
        type: Array,
        default: [],
      },
    },

    data() {
      return {
        refreshDelay: 40,
      };
    },

    computed: {
      ...mapGetters( [
        'activeList',
      ] ),

      title() {
        return this.musicalData[0].singer;
      },
      poster() {
        return [
          { 'background-image': `url("${ this.musicalData[0].poster }")` },
        ]
      },
    },

    watch:{
      musicalData() {   
        setTimeout(()=>{
            var posterH = this.$refs.bgImage.offsetHeight;
            this.$children[0].$el.style.top = posterH + 'px';
        },10);
      }
    },

    methods: {
      ...mapActions( [
        'ChangeBtnToggle',
        'ChangeFullScreen',
        'ChangeNewModes',
      ] ),

      ...mapMutations( {
        setActiveList: 'SET_ACTIVE_LIST',
        setActiveSong: 'SET_ACTIVE_SONG',
        setIndexOfList: 'SET_INDEX_OF_LIST',
      } ),

      /**
       * [routeBack : 点击返回上一个路由]
       */
      routeBack() {
        this.$router.back()
      },

      /**
       * [randomList : 点击打乱当前歌手列表]
       */
      randomList() {
        const BaseList = this.musicalData;  //  当前的歌单
        const aRandomed = _RandomList( BaseList );  //得到打乱后的歌单

        this.setActiveList( aRandomed );
        this.setActiveSong( aRandomed[0] );
        this.setIndexOfList( 0 );  
        this.ChangeBtnToggle( true );
        this.ChangeFullScreen( true );
        this.ChangeNewModes( 'random' );
      },
    },
  }
</script>

<style scpoed src="assets/css/music-list.css"></style>