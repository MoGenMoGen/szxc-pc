<template>
	<div class="pop-box">
		<div class="title">
			<span>{{title}}</span>
		</div>
		<div class="content">
			<div v-for="(item,index) in list" :key="index" class="item" @click="getIndex(index)">
				<span>{{item.num}}</span>
				<img :src="item.url">
				<span>{{item.title}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'PopBox',
	  props: {
	    list: {
			type: Array,
			default: function() {
				return []
			}
		},
		title:{
			type: String,
			default: '概览'
		}
	  },
	  methods:{
		getIndex(e){
			this.$emit("updata", e);
		}
	  }
	}
</script>

<style lang="less" scoped>
	.pop-box {
		width: 520px;
		height: 270px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 1998;
		.title {
			width: 485px;
			height: 32px;
			background: url(../../public/static/images/line.png) no-repeat;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;
			span {
				margin-left: 20px;
			}
		}
		.content {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 30px;
			margin-top: 30px;
			.item {
				// width: 25%;
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					// width: 38px;
					// height: 38px;
					margin: 20px 0;
				}
				span:last-child {
					font-size: 20px;
				}
			}
		}
	}
</style>
