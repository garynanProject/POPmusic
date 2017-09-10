<template>
	<div class="singerListIndex" ref="singerListIndex">
		<div class="singerListIndex_txt">
			{{ titleNow }}
		</div>
	</div>
</template>

<script>
	import some from 'basic/scroll/scroll';

	export default {
		name: 'singerListIndex',
		created() {
			/**
			 * [监听根Dom.data.bus ， 获取当前滚动位置的标题]
			 * @param  {[String]} 'title' [当前滚动位置的标题]
			 */
			this.$root.bus.$on( 'scrollIndex' , (title) => {
				this.titleNow = title;
			} );
		},

		data() {
			return {
				titleNow: '热门',
			};
		},
	}
</script>

<style scoped>
	.singerListIndex{
		position: fixed;
		top: 88px;
		z-index: 99;
		width: 100%;
		height: 30px;
		line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: #333333;
	}

	.singerListIndex .singerListIndex_txt , .singerListIndex .singerListIndex_img{
		height: 100%;
	}
	.singerListIndex .singerListIndex_img img{
		height: 30px;
	}
</style>