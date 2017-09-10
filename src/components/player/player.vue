<template>
  <div class="player_box">
    <div class="icon">
      <img ref="cd"
      :src=" activeSong['song-poster'] "
      >
    </div>
    <div class="text">
      <p>{{ activeSong.songname }}</p>
      <p>{{ activeSong.singer }}</p>
    </div>
    <div class="control" @touchstart.prevent.stop=" btnToggling ">
      <i :class=" btnClassNow "></i>
    </div>
    <div class="control">
      <i class="icon-playlist"></i>
    </div>

    <!-- 真实播放器 -->
    <audio controls preload hidden autoplay
    ref="realRadio"
    :src=" activeSrc "
    @ended=" nextSong "
    @timeupdate=" updateTime "
    ></audio>
  </div>
</template>

<script>
  //  vuex
  import { mapMutations , mapActions , mapGetters } from 'vuex';
  //  公用方法
  import { _RandomList } from 'assets/js/random-list';

  export default {
    name: 'player',

    computed: {
      ...mapGetters( [
        'indexOfList',
        'activeSong',
        'activeList',
        'newMode',
        'playing',
        'fullScreen',
        'newProgress',
      ] ),

      //  计算播放器的src
      activeSrc() {
        //  如果数据没来，先返回空
        if( !this.activeSong.songid ) return;

        const srcNow = this.activeSong.songid;
        return `http://ws.stream.qqmusic.qq.com/${ srcNow }.m4a?fromtag=46`;
      },

      //  计算播放机开关的class
      btnClassNow() {
        return this.playing ? 'icon-mini icon-pause-mini' : 'icon-mini icon-play-mini' ;
      },
    },

    watch: {
      //  观察，得到activeSong数据时发送开关量到app.vue页面
      activeSong() {
        
        // 因为一开始就播放 ， 需要 把vuex.state.audioState.playing的状态，改变为当前开关量的值
        this.btnToggle = true;
        this.ChangeBtnToggle( this.btnToggle );
      },

      playing( flag ) {
        //  获取播放器
        const oRadio = this.$refs.realRadio;
        const _oCD = this.$refs.cd;
        const rotateBase = `rotate 6s linear 0s infinite`;

        if ( flag ) {
          oRadio.play();

          _oCD.style.animation = `${rotateBase} running`;
        } else {
          oRadio.pause();

          _oCD.style.animation = `${rotateBase} paused`;
        }
      },

      //  
      fullScreen( flag ) {
        if (flag) {
          this.$refs.cd.style.display = 'none';
        } else {
          setTimeout( () => {
            this.$refs.cd.style.display = 'block'
          } , 700 )
        }
        
      },

      //  观察，有没有设置新的歌曲播放进度
      newProgress( newProgress ) {
        const oRadio = this.$refs.realRadio;
        oRadio.currentTime = newProgress;
      },

      //  如果newMode为loop,设置隐藏播放器loop属性
      newMode( mode ) {
        const oRadio = this.$refs.realRadio;
        if ( mode === 'loop' ) {
          oRadio.loop = true;
        } else {
          oRadio.loop = false;
        }
      }
    },

    methods: {
      ...mapMutations( {
         setActiveSong: 'SET_ACTIVE_SONG',
         setIndexOfList: 'SET_INDEX_OF_LIST',
      } ),

      ...mapActions( [
        'ChangeBtnToggle',
        'ChangeCurrentTime',
      ] ),

      //  播放器开关按下时执行
      btnToggling() {
        let btnToggle = false;

        //  true为正在播放 ， false为没有在播放
        if ( !this.playing ) {
          btnToggle = true;
        } else {
          btnToggle = false;
        };

        //  把vuex.state.audioState.playing的状态，改变为当前开关量的值
        this.ChangeBtnToggle( btnToggle );
      },

      nextSong() {
        //  获取当前歌曲在歌单中的序号
        var nextIndex = this.indexOfList;
        //  获取当前歌单长度
        var length = this.activeList.length;
        var nextSong = null;
       
        //  每次函数执行+1 ， 变为下一首歌的序号
        nextIndex++;
        if ( nextIndex > length-1 ) nextIndex = 0;

        //  下一首歌的data
        nextSong = this.activeList[nextIndex];

        // 把下一首歌的data ,赋给vuex.state.activeSong,
        this.setActiveSong( nextSong );
        // 把vuex.state.indexOfList, 变为把下一首歌的序号
        this.setIndexOfList( nextIndex );
        console.log( this.indexOfList,'end' );    
      },

      //  更新当前歌曲的播放进度
      updateTime(ev) {
        const _CurrentTime = parseInt( ev.target.currentTime );
        this.ChangeCurrentTime( _CurrentTime );
      },
    },
  }
</script>

<style scoped src="assets/css/player.css"></style>