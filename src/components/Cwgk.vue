<template>
	<!-- 村情公示 -->
	<div>
		<transition name="fade">
			<!-- <div class="pop-common szgl" v-show='show'>
				<img :src="cwList[imgIndex].img" class="cwImg" v-if="imgShow">
				<img src="static/images/cancel-B.png" class="cwImg-cancel" v-if="imgShow" @click="close">
				<div class="pop-title"><span>三资管理</span></div>
				<span class="pop-item-title"><img src="static/images/szcwgk.png">财务公开</span>
				<div class="cwList">
					<span class="cwList-item" v-for="(item,index) in cwList" :key="index" @click="showImg(index)">
						{{ item.name }}
					</span>
				</div>
				<span class="pop-item-title"><img src="static/images/szzzxx.png">招租信息</span>
				<span class="pop-item-title"><img src="static/images/szywgk.png">业务公开</span>
			</div> -->
			<img v-show='show' src="static/images/szglBg.jpg" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">
		</transition>
		<transition name="fade">
			<div class="pop-box" v-show="show2">
				<div class="pop-common pop-gl">
					<div class="pop-title"><span>{{jjData.title}}</span></div>
					<div class="pop-html" v-html="jjData.content"></div>
				</div>
				<div class="pop-common pop-cm">
					<div class="pop-title"><span>{{cmData.title}}</span></div>
					<div class="pop-html" v-html="cmData.content"></div>
				</div>
				<div class="pop-common pop-cgc">
					<div class="pop-titleL"><span>{{cgcData.title}}</span></div>
					<div class="pop-html" v-html="cgcData.content"></div>
				</div>
				<div class="pop-common pop-cb">
					<div class="pop-titleL"><span>{{cbData.title}}</span></div>
					<div class="pop-html" v-html="cbData.content"></div>
				</div>
				<div class="pop-common pop-td">
					<div class="pop-title"><span>{{tdData.title}}</span></div>
					<div class="pop-html" v-html="tdData.content"></div>
				</div>
				<div class="pop-common pop-bz">
					<div class="pop-title"><span>{{bzData.title}}</span></div>
					<div class="pop-html" v-html="bzData.content"></div>
				</div>
				<div class="pop-common pop-bx">
					<div class="pop-title"><span>{{bxData.title}}</span></div>
					<div class="pop-html" v-html="bxData.content"></div>
				</div>
				<div class="pop-common pop-jf">
					<div class="pop-title"><span>{{jfData.title}}</span></div>
					<div class="pop-html" v-html="jfData.content"></div>
				</div>
			</div>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex"></BottomTab>
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'

	export default {
		name: 'Cwgk',
		props: {},
		data() {
			return {
				cwList: [],
				imgIndex: 0,
				imgShow: false,
				show: false,
				show2: false,
				jjData: {},
				cgcData: {},
				cmData: {},
				cbData: {},
				tdData: {},
				bzData: {},
				bxData: {},
				jfData: {},
				// title: '',
				// data: '',
				tabList: [{
					hasUrl: false,
					title: '三资管理'
				}, {
					hasUrl: false,
					title: '村务公开'
				}],
			}
		},
		components: {
			BottomTab
		},
		mounted() {
			this.getSzglData()
			this.show = true
		},
		methods: {
			showImg(e) {
				this.imgShow = true
				this.imgIndex = e
			},
			close() {
				this.imgShow = false
			},
			getSzglData() {
				let data = {
					current: 1,
					size: 30
				}
				this.$ajax.getCwgk(data).then(res => {
					this.cwList = res.records
				})
			},
			getGlData() {
				this.$ajax.getJjfz().then(res => {
					this.jjData = res
				})
				this.$ajax.getCmdb().then(res => {
					this.cmData = res
				})
				this.$ajax.getCgcjs().then(res => {
					this.cgcData = res
				})
				this.$ajax.getZccb().then(res => {
					this.cbData = res
				})
				this.$ajax.getTdfy().then(res => {
					this.tdData = res
				})
				this.$ajax.getBzff().then(res => {
					this.bzData = res
				})
				this.$ajax.getBxqk().then(res => {
					this.bxData = res
				})
				this.$ajax.getCmjf().then(res => {
					this.jfData = res
				})
			},
			getIndex(e) {
				if (e == 0) {
					this.show = true
					this.show2 = false
					this.getSzglData()
				} else if (e == 1) {
					this.show = false
					this.show2 = true
					this.getGlData()
				}
				//  else if (e == 2) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getTdfy().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 3) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getBzff().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 4) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getBxqk().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 5) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = true
				// 	this.$ajax.getCmjf().then(res => {
				// 		this.title = res.title
				// 		this.data = res.content
				// 	})
				// } else if (e == 6) {
				// 	this.show = false
				// 	this.show2 = false
				// 	this.show3 = false
				// 	// this.$ajax.getBzff().then(res => {
				// 	// 	this.title = res.title
				// 	// 	this.data = res.content
				// 	// })
				// }
			}
		}
	}
</script>

<style scoped lang="less">
	.pop-title {
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

	.pop-titleL {
		width: 620px;
		height: 32px;
		background: url(../../public/static/images/lineL.png) no-repeat;
		font-size: 20px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;

		span {
			margin-left: 20px;
		}
	}

	.pop-common {
		// width: 520px;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		z-index: 10000;
	}

	.szgl {
		position: absolute;
		top: 200px;
		left: 500px;
		max-height: none;

		.cwImg {
			width: 400px;
			position: absolute;
			right: -420px;
			top: 0;
		}

		.cwImg-cancel {
			position: absolute;
			right: -440px;
			top: -20px;
			cursor: pointer;
		}

		.pop-item-title {
			font-size: 20px;
			margin: 10px 0;

			img {
				margin-right: 10px;
				vertical-align: middle;
			}
		}

		.cwList {
			width: 90%;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;

			.cwList-item {
				cursor: pointer;
				width: 33%;
				text-decoration: underline;
				font-size: 16px;
				margin-bottom: 10px;
			}
		}
	}

	.pop-html {
		width: 100%;
		padding: 10px;
	}

	.pop-gl {
		top: 200px;
		left: 35px;
	}

	.pop-cm {
		top: 200px;
		left: 600px;
	}

	.pop-cgc {
		top: 200px;
		left: 1200px;
	}

	.pop-cb {
		top: 400px;
		left: 1200px;
	}

	.pop-other {
		top: 400px;
		left: 35px;
	}
	
	.pop-td {
		top: 400px;
		left: 35px;
	}
	
	.pop-bz {
		top: 400px;
		left: 600px;
	}
	
	.pop-bx {
		top: 600px;
		left: 35px;
	}
	
	.pop-jf {
		top: 600px;
		left: 600px;
	}

	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
