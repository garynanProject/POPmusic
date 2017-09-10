<template>
  <div class='wrapper' ref='wrapper'>
      <!-- 内容分发 -->
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  created() {
    this.scrollPosY = 0; 
  },
  mounted() {
      setTimeout(() => {
          //  初始化scroll插件
          this._initScroll();

          //  如果父级传来的值为真，则监听滚动
          if (this.listenScroll) {
              this.scroll.on('scroll' , (pos) => {
                  //  保存一份发到父级 ，其兄弟级singerListIndex.vue需要计算
                  this.scrollPosY = pos.y;

                  //  通过滚动高度与列表单元高度对比，得出哪个导航标签应高亮
                  this.witchHasArrived( this.scrollPosY , this.listsHeight );   
              });
          }
      }, 20);
  },
  props: { 
      click:{                             /** @type {Number} [能否触发点击] */
          type:Boolean,
          default:true
      },
      refreshDelay:{                      /** @type {Number} [better-scroll,refresh方法执行延时] */
          type:Number,
          default:20
      },
      listenScroll:{                      /** @type {Number} [是否开启滚动监听*/
          type: Boolean,
          default: false,
      },
      probeType:{                         /** @type {Number} [滚动监听方式（0-3）] */
          type:Number,
          default:2
      },
      data: {                             /** @type {Array} [歌手列表数据] */           
          type: Array,
          default: null
      },
      listsHeight:{                       /** @type {Array} [左边列表各单元高度] */ 
          type: Array,
          default: null,
      },
  },
  methods: {
      /**
       * [_initScroll 初始化scroll插件]
       */
      _initScroll() {
          this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click
          });
      },

      /**
       * [_initScroll 重新加载scroll容器高度]
       */
      refresh() {
          this.scroll && this.scroll.refresh();
      },

      /**
       * [goTo description: 传一些参数执行better-scroll , scrollToElement()方法]
       */
      goTo() {
          this.scroll && this.scroll.scrollToElement.apply( this.scroll , arguments );
      },

      /**
       * [witchHasArrived description: 通过滚动高度与列表单元高度对比，得出哪个导航标签应高亮]
       * @param  {[Number]} scrollY  [滚动的y坐标]
       * @param  {[ObjectCollpes]} aTargets [所有的导航标签]
       */
      witchHasArrived( scrollY , aTargets ) {
          var realTargets = [];
          var addingHeight = 0;

          for ( var i=0; i<aTargets.length; i++ ){
              if ( i <= 0 ){
                  realTargets.push( 0 );
              } else {
                  addingHeight -= aTargets[i-1];
                  realTargets.push( addingHeight );
              } 

              //  如果满足条件 ， 把当前索引通过active事件抛去父级
              if( parseInt(scrollY) <= realTargets[i] && parseInt(scrollY) >= ( realTargets[i] - aTargets[i] ) ){
                  this.$emit( 'active' , i );
              }
          }
      },
  },
  watch: {
      /**
       * [data description: 当观察到列表数据变化，重新计算列表高度]
       * @return {[type]} [description]
       */
      data() {
          setTimeout(() => {
              this.refresh();
          }, this.refreshDelay)
      },
  } 
}
</script>