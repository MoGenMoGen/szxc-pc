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
		<div class="pop-box-left" v-if="showLeft">
			<div class="title">重点人员</div>
			<div class="content">
				<div v-for="(item,index) in zdryList" :key="index" class="item">
					<span>{{item.num}}</span>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import zdry from '../../bgImages/fzzf/重点人员.png';
	import hfxsc from '../../bgImages/fzzf/合法性审查.png';
	export default {
		name: 'szjg',
		props: {},
		data() {
			return {
				showLeft: false,
				list: [{
					name: '重点人员',
					detailTitle: '重点人员',
					url: zdry
				},{
					name: '合法性审查',
					detailTitle: '',
					url: hfxsc
				}],
				zdryList:[{
					name: '吸毒人员',
					num: 4
				},{
					name: '矫正对象',
					num: 2
				},{
					name: '刑释解救人员',
					num: 4
				}]
			}
		},
		components: {
		},
		methods: {
			getIndex(index) {
				if(index==0) {
					this.showLeft = true
				} else {
					this.showLeft = false
				}
			}
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
			.item {
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
	.pop-box-left {
		width: 612px;
		height: 268px;
		background: url(../../bgImages/fzzf/重点人员-详情.png) no-repeat;
		background-size: 100% 100%;
		// padding: 10px;
		// padding-top: 80px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 500px;
		left: 35px;
		z-index: 1998;
		.title {
			font-size: 22px;
			color: #8CACF9;
			width: 100%;
			padding: 10px 258px;
			box-sizing: border-box;
		}
		.content {
			width: 100%;
			padding: 0 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30px;
			margin-top: 40px;
			.item {
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
