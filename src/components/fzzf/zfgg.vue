<template>
	<div>
		<div class="pop-box">
			<div class="content">
				<div v-for="(item,index) in list" :key="index" class="item" @click="getIndex(index)">
					<img :src="item.url">
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import fadwjs from '../../bgImages/fzzf/方案队伍建设.png';
	import sxqd from '../../bgImages/fzzf/事项清单.png';
	import zfgs from '../../bgImages/fzzf/执法公示.png';
	export default {
		name: 'zfgg',
		props: {},
		data() {
			return {
				list: [{
					name: '方案队伍建设',
					detailTitle: '',
					url: fadwjs
				},{
					name: '事项清单',
					detailTitle: '',
					url: sxqd
				},{
					name: '执法公示',
					detailTitle: '详情',
					url: zfgs
				}]
			}
		},
		components: {
		},
		methods: {
		},
		watch:{
		},
		mounted() {
		}
	
	}
</script>

<style scoped lang="less">
	.pop-box {
		width: 612px;
		height: 255px;
		background: url(../../bgImages/fzzf/概览.png) no-repeat;
		background-size: 100% 100%;
		padding: 10px;
		padding-top: 80px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 1998;
		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30px;
			// margin-top: 30px;
			.item {
				// width: 25%;
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					width: 40px;
					height: 40px;
					margin: 20px 0;
				}
				span:last-child {
					font-size: 20px;
				}
			}
		}
	}
</style>
