<template>
	<div :id="id" :data="data"></div>
</template>

<script>
	export default {
		name: 'MyCharts',
		props: {
			id: {
				type: String,
				default: ""
			},
			data: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				chartGraph:null
			}
		},
		watch: {
			data: {
				handler(newValue,oldValue){
					this.drawCharts(this.id, newValue)
				},
				deep:true
			}
		},
		mounted() {
			this.drawCharts(this.id, this.data)
		},
		methods: {
			drawCharts(id,data) {
				let _this = this
				if(data){
					let myChart = document.getElementById(id)
					this.chartGraph = this.$echarts.init(myChart)
					this.chartGraph.setOption(data);
				}
			}
		},
		beforeDestroy() {
			if(this.chartGraph) {
				this.chartGraph.clear()
			}
		}
	}
</script>

<style scoped lang="less">
</style>
