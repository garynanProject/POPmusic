<template>
  <scroll class="listview" ref="scrollment" 
  :data="data"        
  :listen-scroll=" toggle "        
  :probeType=" scrollListenType "        
  :lists-height=" listsHeight "        
  @active=" scroolToWitch ">   
  <!-- :data="data"    @type {Array} [把singer.vue传来的列表数据传到scroll.vue] -->
  <!-- :listen-scroll=" toggle "     @type{Boolean} [告诉scroll.vue,better-scroll插件是否开启滚动监听] -->
  <!-- :probeType=" scrollListenType "    @type {Number} (0-3) [告诉scroll.vue,better-scroll插件滚动监听模式] -->
  <!-- :lists-height=" listsHeight "    @type {Array} [把计算好的列表高度传给,scroll.vue] -->
  <!-- @active=" heightLight "    @type {Array} [scroll.vue]通过active事件，把应该高亮的数据传来当前页面 -->    
    
    <!-- 左边列表 -->
    <ul style=" padding-bottom: 60px; ">
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
            <li class="list-group-item" v-for="item in group.items" @click=" selectSinger(item) ">
                <img class="avatar" v-lazy="item.avatar" />
                <span class="name">{{item.name}}</span>
            </li>
        </ul>
      </li>
    </ul>

    <!-- 右边导航分类 -->
    <div  class="list-shortcut">
        <ul @touchstart=" routeTo " @touchmove.stop.prevent="touchRouteTo" id="useGlass">
            <li class="item" v-for="( item , index ) in shortcutList" :data-code=" index " 
            ref="listTags">
                {{item}}
            </li>
        </ul> 
    </div>

  </scroll>
</template>
<script>
   /* 引入scroll.vue组件 */
  import Scroll from "basic/scroll/scroll";
  import {  mapGetters , mapActions } from 'vuex';

  export default {
    created() {
      this.fristTY = 0;                   /** @type {Number} [手指首次触屏幕时的Y坐标] */  
      this.fristTIndex = 0;               /** @type {Number} [手指首次触屏幕时的Y坐标] */
      this.shortcutItemHeight = 0;        /** @type {Number} [每个导航标签的高度，用于计算当前触碰到的标签索引] */
      this.toggle = true;                 /** @type {Boolean} [是否开启better-scroll的滚动监听] */
      this.scrollListenType = 3;          /** @type {Number} [设置better-scroll的滚动监听模式] */
      this.listsHeight = [];              /** @type {Array} [记录左边列表每个单元各自的高度] */
    },

    components:{
      Scroll
    },

    props:{
      data:{
        type:Array,
        default:[]
      }
    },  

    computed:{
      ...mapGetters( [ 
        'miniScreen',
      ] ),

      /**
       * [shortcutList description : 让导航标签的tittle属性只保留第一位字符]
       * @return {[Array]} [数组变异，改变原数组的内容]
       */
      shortcutList(){
        return this.data.map((item)=>{
            return item.title.substr(0,1)
        })
      },
    },


    watch: {
      miniScreen(falg) {
        if (falg) {
          const _OListTags = this.$refs.listTags[0].parentNode.parentNode;

          _OListTags.style.top = -15 + 'px';
          _OListTags.style.transform = 'none';
        };
      },
      /**
       * [data 观察列表数据一来，延时30ms开始计算左边列表单元高度，和设置右边列表默认样式]
       */
      data() {
        setTimeout( () => {
          var aLists = this.$refs.listGroup ;
          var aTags = this.$refs.listTags;

          aTags[0].className = "item active";

          for ( var i=0; i<aLists.length; i++ ){
            this.listsHeight[i] = aLists[i].offsetHeight;
          };
        } , 30 );
      },
    },

    methods: {
      ...mapActions([
        'ChangeSatuations',
      ]),

      /**
       * [routeTo description : 点击右边导航栏的标签，导航到对应的左边列表单元]
       * @param  {[type]} ev [事件对象：点击事件]
       */
      routeTo(ev) {
        var now =  ev.target.getAttribute("data-code");
        var shortcutors = ev.target.parentNode.children;

        this.fristTY = ev.touches[0].pageY;
        this.fristTIndex = now;
        this.shortcutItemHeight = ev.target.offsetHeight;

        this.$refs.scrollment.goTo( this.$refs.listGroup[now] , 0 ) ;

        //使高亮
        this.heightLight( shortcutors , ev.target );

        //  把当前的index保存到根Dom的data.bus上；
        this.$root.bus.$emit( 'scrollIndex' , this.data[now].title );
        //  在singer.vue销毁时，解绑此事件
      },
      
      /**
       * [touchRouteTo description : 长按并滑动右边导航栏的标签，导航到对应的左边列表单元]
       * @param  {[type]} ev [事件对象：点击事件]
       */
      touchRouteTo(ev) {
        var tPosY = ev.touches[0].pageY;
        var touchNow = Math.floor( (tPosY - this.fristTY)/this.shortcutItemHeight ) + parseInt( this.fristTIndex );
        var aTags = this.$refs.listTags;

        //如果不在范围内，不执行后面
        if ( touchNow > (aTags.length - 1) || touchNow < 0 ) return;

        //执行scroll.vue组件下的 goTo 方法
        this.$refs.scrollment.goTo( this.$refs.listGroup[touchNow] , 0 ) ;

        //使高亮
        this.heightLight( aTags , aTags[touchNow] );

        //  把当前的index保存到根Dom的data.bus上；
        this.$root.bus.$emit( 'scrollIndex' , this.data[touchNow].title );
        //  在singer.vue销毁时，解绑此事件
      },
      
      /**
       * [scroolToWitch description : 左边列表滚动到哪个单元，对应的右边导航标签高亮]
       * @param index {[Number]} [当前索引]
       */
      scroolToWitch( index ) {
        var aTags = this.$refs.listTags;

        //使高亮
        this.heightLight( aTags , aTags[index] );

        //  把当前的index保存到根Dom的data.bus上；
        this.$root.bus.$emit( 'scrollIndex' , this.data[index].title );
        //  在singer.vue销毁时，解绑此事件；
      },
      
      /**
       * [heightLight description : 让当前对象高亮，其他默认样式]
       * @param all {[ObjectCollpes]}  [右边导航的全部标签]
       * @param nowObj {[Object]}  [当前活跃的导航标签]
       */
      heightLight( all , nowObj ){
        for( var i=0; i<this.data.length; i++ ){
          all[i].className = "item";
        };

        nowObj.className = "item active";
      },

      selectSinger(singerMsg) {
        //  发送到父级singer.vue
        this.$emit( 'selected' , singerMsg );

        //  改变vuex.state.satuations.singer = ture，设置为歌手歌单情景
        this.ChangeSatuations( 'singer' );
      },
    },
  }
</script>

<style scoped src="assets/css/listview.css"></style>
