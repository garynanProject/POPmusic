<template>
  <div id="app">
  <!-- 头部 -->
		<m-header></m-header>

	<!-- 选项卡 -->
		<m-tab></m-tab>

	<!-- 内容出口 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  <!-- 播放器 -->
    <player
    @touchstart.native.prevent.stop=" showFullScreen " 
    v-show=" playerBtn ">
    </player>
    <main-player v-show=" fullScreen "></main-player>
  <!-- CD -->
    <img class="real-icon" ref="cd"
    :src=" activeSong['song-poster'] "
    v-show=" playerBtn "
    >

  </div>
</template>

<script>
  //  组件
	import MHeader from 'components/m-header/m-header';
	import MTab from 'components/tab/tab';
  import Player from 'components/player/player';
  import MainPlayer from 'components/main-player/main-player';
  //  插件
  //  vuex
  import { mapGetters , mapActions } from 'vuex';

  export default {
    name: 'app',
    components: {
    	MHeader,
    	MTab,
      Player,
      MainPlayer,
    },

    data() {
      return {
        playerBtn: false,
      };
    },

    computed: {
      ...mapGetters( [ 
        'activeSong',
        'fullScreen',
        'playing',
      ] ),
    },

    watch: {
      //  接受到开关量toggle , 显示播放器
      activeSong() {
        this.playerBtn = true;
        this.ChangeMiniScreen( true );
      },

      //  观察到当前正在播放歌曲，小cd开始旋转
      playing( flag ) {
        this.cdRotate( flag );  
      },

      //  观察到全屏，则小cd放大
      fullScreen( flag ) {
        this.cdToggle( flag );
      },
    },

    methods:{
      ...mapActions( [
        'ChangeMiniScreen',
        'ChangeFullScreen',
      ] ),

      showFullScreen() {
        this.ChangeFullScreen( true );
      },

      //  控制cd旋转特效
      cdRotate( flag ) {
        const _oCD = this.$refs.cd;
      },

      cdToggle( flag ) {
        const _oCD = this.$refs.cd;
        const tobigBase = `tobig .7s ease 0s forwards`;
        const tosmallBase = `tosmall .7s ease 0s forwards`;
        const box_shadow = `1px 1px 7px 1px #666 , -1px -1px 7px 1px #666`;
        
        if ( flag ) {
          _oCD.style.display = 'block';
          setTimeout( () => {
            _oCD.style.display = 'none';
          } , 700 );

          _oCD.style.zIndex = 1000;
          _oCD.style.boxShadow = 'none';
          _oCD.style.animation = `${tobigBase} running`;
          _oCD.style['webkitAnimation'] = `${tobigBase} running`;
          _oCD.style['mozAnimation'] = `${tobigBase} running`;
          _oCD.style['oAnimation'] = `${tobigBase} running`;
        } else {
           _oCD.style.display = 'block';
           setTimeout( () => {
            _oCD.style.display = 'none';
          } , 700 );

          _oCD.style.zIndex = 998;
          _oCD.style.animation = `${tosmallBase} running`;
          _oCD.style['webkitAnimation'] = `${tosmallBase} running`;
          _oCD.style['mozAnimation'] = `${tosmallBase} running`;
          _oCD.style['oAnimation'] = `${tosmallBase} running`;
          _oCD.style.boxShadow = box_shadow;
        }
      },
    },
  };
</script>

<style src="assets/css/base.css"></style>
<style scoped>
  .real-icon{
    position: fixed;
    z-index: 998;
    bottom: 9px;
    left: 18px;
    width: 42px;
    height: 42px;
    margin: auto 0;
    border-radius: 50px;
    -webkit-box-shadow: 1px 1px 7px 1px #666 , -1px -1px 7px 1px #666;
            box-shadow: 1px 1px 7px 1px #666 , -1px -1px 7px 1px #666;
  }

  @-webkit-keyframes tobig{
    0%{ 
      -webkit-transform: translate3d( 0,0,0 ) rotateX(0deg); 
              transform: translate3d( 0,0,0 ) rotateX(0deg);
    }
    80%{
      opacity: .1;
      -webkit-transform: scale(8) translate3d( 14px,-31px,0 );
              transform: scale(8) translate3d( 14px,-31px,0 );
    }
    90%{
      -webkit-transform: scale(5.5) translate3d( 25.2px,-55.4px,0 );
              transform: scale(5.5) translate3d( 25.2px,-55.4px,0 );
      opacity: .6;
    }
    100%{
      opacity: 1;
      -webkit-transform: scale(6.15) translate3d( 22.2px,-49.8px,0 ) rotateX(345deg);
              transform: scale(6.15) translate3d( 22.2px,-49.8px,0 ) rotateX(345deg);
    }
  }

  @keyframes tobig{
    0%{ 
      -webkit-transform: translate3d( 0,0,0 ) rotateX(0deg); 
              transform: translate3d( 0,0,0 ) rotateX(0deg);
    }
    80%{
      opacity: .1;
      -webkit-transform: scale(8) translate3d( 14px,-31px,0 );
              transform: scale(8) translate3d( 14px,-31px,0 );
    }
    90%{
      -webkit-transform: scale(5.5) translate3d( 25.2px,-55.4px,0 );
              transform: scale(5.5) translate3d( 25.2px,-55.4px,0 );
      opacity: .6;
    }
    100%{
      opacity: 1;
      -webkit-transform: scale(6.15) translate3d( 22.2px,-49.8px,0 ) rotateX(345deg);
              transform: scale(6.15) translate3d( 22.2px,-49.8px,0 ) rotateX(345deg);
    }
  }

  @-webkit-keyframes tosmall{
    0%{ 
      opacity: 1;
      -webkit-transform: scale(6.15) translate3d( 22.2px,-49.8px,0 );
              transform: scale(6.15) translate3d( 22.2px,-49.8px,0 );
    }
    10%{
      opacity: .4;
      -webkit-transform: scale(5.5) translate3d( 24px,-53px,0 );
              transform: scale(5.5) translate3d( 24px,-53px,0 );
    }
    20%{
      -webkit-transform: scale(8) translate3d( 14px,-31px,0 );
              transform: scale(8) translate3d( 14px,-31px,0 );
      opacity: .1;
    }
    100%{
      -webkit-transform: translate3d( 0,0,0 );
              transform: translate3d( 0,0,0 );
    }
  }

  @keyframes tosmall{
    0%{ 
      opacity: 1;
      -webkit-transform: scale(6.15) translate3d( 22.2px,-49.8px,0 );
              transform: scale(6.15) translate3d( 22.2px,-49.8px,0 );
    }
    10%{
      opacity: .4;
      -webkit-transform: scale(5.5) translate3d( 24px,-53px,0 );
              transform: scale(5.5) translate3d( 24px,-53px,0 );
    }
    20%{
      -webkit-transform: scale(8) translate3d( 14px,-31px,0 );
              transform: scale(8) translate3d( 14px,-31px,0 );
      opacity: .1;
    }
    100%{
      -webkit-transform: translate3d( 0,0,0 );
              transform: translate3d( 0,0,0 );
    }
  }
</style>