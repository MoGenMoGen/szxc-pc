<template>
	<div class="ygcw-box">
	</div>
</template>

<script>
	export default {
		name: 'ygcw',
		props: {},
		data() {
			return {
			}
		},
		components: {},
		methods: {
		},
		watch: {},
		mounted() {}
	}
</script>

<style scoped lang="less">
	.ygcw-box {
		width: 100%;
		height: 100vh;
		padding-top: 100px;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 100;
		background: url(../bgImages/ygcw/bg.png) no-repeat;
		background-size: 100% calc(100% - 100px);
		background-position: bottom center;
	}
</style>