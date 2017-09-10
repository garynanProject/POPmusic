<template>
	<div class="search">
		<search-bar></search-bar>
		<search-hot></search-hot>
		<search-history></search-history>
	</div>
</template>

<script>
	import SearchBar from 'basic/search-bar/search-bar';
	import SearchHot from 'basic/search-hot/search-hot';
	import SearchHistory from 'basic/search-history/search-history';

	export default{
		name: 'search',
		components: {
			SearchBar,
			SearchHot,
			SearchHistory,
		},
	}
</script>

<style scoped src="assets/css/search.css"></style>