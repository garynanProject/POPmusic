d<template>
	<div class="search-history">
		<h1 class="tit-line">
			搜索记录
			<i class="clear-history icon-clear"
			@touchstart.stop.prevent=" clearHis "
			></i>
		</h1>
		<ul class="search-history-box" ref="history-box">
			<li v-for=" i in searchHistory ">
				{{ i }}
				<i class="del-history icon-delete"
				@touchstart.stop.prevent=" delHis "
				></i>
			</li>
		</ul>
	</div>	
</template>

<script>
	export default {
		name: 'searchHistory',

		data() {
			return{
				searchHistory: [
					'演员','失恋'
				],
			}
		},

		methods: {
			clearHis() {
				const oParent = this.$refs['history-box'];
				oParent.innerHTML = null;
			},
			
			delHis(ev) {
				const oParent = this.$refs['history-box'];
				const oTarget = ev.target.parentNode;
				oParent.removeChild( oTarget );
			},
		},
	}
</script>

<style scoped src="assets/css/search-history.css"></style>

