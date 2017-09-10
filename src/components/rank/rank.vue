<template>
	<scroll  class="ranking">
		<div>
			  <rank-box v-for=" i in 10 " key="rankList"></rank-box>
		</div>
	</scroll>
</template>

<script>
	import RankBox from 'components/rank-box/rank-box';
	import Scroll from 'basic/scroll/scroll';

	export default {
		name: 'ranking',

		components: {
			RankBox,
			Scroll
		},
	}
</script>

<style scoped src='assets/css/rank.css'></style>
