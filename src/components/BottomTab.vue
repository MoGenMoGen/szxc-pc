<template>
  <div class="bottom-tab">
	  <div class="tab-item" :class="{'active':isActive==index}" v-for="(item,index) in list" :key="index" @click="changeTab(index)">
		  <img :src="isActive==index?item.sUrl:item.url" v-if="item.hasUrl">
		  <span>{{item.title}}</span>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'BottomTab',
  props: {
    list: {
		type: Array,
		default: function() {
			return []
		}
	}
  },
  data() {
	  return {
		  isActive: 0
	  }
  },
  methods:{
	  changeTab(e) {
		  this.isActive = e
		  this.$emit("updata", e);
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.bottom-tab {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 30px;
		z-index: 1998;
		.tab-item {
			min-width: 110px;
			height: 50px;
			border-radius: 50px;
			padding: 0 20px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #333;
			font-size: 20px;
			background-color: #fff;
			margin: 0 10px;
			img {
				margin-right: 20px;
			}
		}
		.active {
			color: #fff;
			background-color: #C90D09;
		}
	}
</style>
