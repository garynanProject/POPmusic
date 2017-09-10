<template>
	<div class="search-hot">
		<h1 class="tit-line">热门搜索</h1>
		<ul class="hot-words-box">
			<li v-for=" i in hotWords ">{{ i }}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'searchHot',

		data() {
			return {
				hotWords: [
					'无条件','双世宠妃','从前蛮',
					'王俊凯','李宇春','林忆莲',
					'悟空传','淘汰','TIME',
					'紫'
				],
			};
		},
	}
</script>

<style scoped src="assets/css/search-hot.css"></style>