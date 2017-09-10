<template>
  <div class="song-list" style=" padding-bottom: 60px; ">
    <ul>
      <li class="item" 
      v-for=" (item,index) in musicalData "
      @click=" setPlayerData( item , index ) "
      >
        <div class="rank" v-if=" letsRank ">
          <span></span>
        </div>
        <div class="content">
          <h2 class="name">{{ songName(index) }}</h2>
          <p class="desc">{{ authors(index) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  //  引入vuex , mapMutations方法
  import { mapMutations , mapActions} from 'vuex';

  export default {
    name: 'songList',

    props: {
      musicalData: {
        type: Array,
        default: [],
      },
      letsRank: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      //  设置vuex.state.indexOfList 等于当前点击的歌曲序号
      setPlayerData( item , index ) {
        //  把当前歌手的歌单保存在vuex.state.activeList上，设置当前歌单；
        this.setActiveList( this.musicalData );
        this.setAcriveSong( item );  //  设置当前歌曲
        this.setIndexOfList( index );   //  设置当前歌曲的序号
        this.ChangeNewModes( 'sequence' );  //  选择列表循环
        this.ChangeFullScreen( true );  //  设置进入全屏
      },

      ...mapMutations( {
        setActiveList: 'SET_ACTIVE_LIST',
        setAcriveSong: 'SET_ACTIVE_SONG',
        setIndexOfList: 'SET_INDEX_OF_LIST',
      } ),

      ...mapActions( [
        'ChangeFullScreen',
        'ChangeNewModes'
      ] ),

      songName(index) {
        const oTarget = this.musicalData[index];
        return oTarget.songname;
      },
      authors(index) {
        const oTarget = this.musicalData[index];
        return `${oTarget.singer}·${oTarget.albumname}`;
      },
    },
  }
</script>

<style scoped src="assets/css/song-list.css"></style>