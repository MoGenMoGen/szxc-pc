<template>
	<div class="ygcw-box">
		<span class="title">九龙湖村-阳光村务</span>
		<div class="left-line">
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>村务公开</span>
				</div>
				<div class="box-bottom cwgk" style="height: 380px;">
					<div class="box-title">
						<img src="../bgImages/ygcw/logo.png">
						经济发展情况
					</div>
					<div class="box-info">
						<div>
							<p class="box-info-circle">
								<span>{{economyInfo[20].cont}}</span>
								<span>万元</span>
							</p>
							<p>本年度经济总收入目标</p>
							<p>比去年<span>{{economyInfo[18].cont}}</span></p>
						</div>
						<div>
							<p class="box-info-circle" style="border-color: #00CED1;">
								<span style="color: #00CED1;">{{economyInfo[21].cont}}</span>
								<span style="color: #00CED1;">万元</span>
							</p>
							<p>本年度村级可用收入目标</p>
							<p>比去年<span style="color: #00CED1;">{{economyInfo[19].cont}}</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>村民建房</span>
				</div>
				<div class="box-bottom cmjf" style="height: 120px;">
					<div class="box-title">
						<img src="../bgImages/ygcw/logo.png">
						本季度要求建房户数
						<div>{{economyInfo[22].cont}}</div>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>小微权力</span>
				</div>
				<div class="box-bottom xwql" style="height: 300px;">
					<div v-for="(item,index) in powerList" :key="index" @click="showPop(item,1)">
						<img src="../bgImages/ygcw/pdf.png">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="center-line">
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>财务公开</span>
				</div>
				<div class="box-bottom cwgk2" style="height: 240px;">
					<div v-for="(item,index) in financeopenList" :key="index" @click="showPop(item,1)">
						{{item.name}}
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>资产管理</span>
				</div>
				<div class="box-bottom zcgl" style="height: 310px;">
					<el-table :data="zcglData" style="width: 100%" max-height="290px" :row-class-name="tableRowClassName" 
							:cell-style="{'text-align': 'center',color: '#fff','font-weight': '500',}" 
							:header-cell-style="{color: '#fff',background: 'rgba(30, 144, 255, 0.25)','text-align': 'center'}">
						<el-table-column type="index" label="序号" width="75"></el-table-column>
						<el-table-column prop="tenantry" label="承租方" width="490"></el-table-column>
						<el-table-column label="租期" width="190">
							<template slot-scope="scope">
								<span style="color: #fff;">{{scope.row.leaseStart}}-{{scope.row.leaseEnd}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="rent" label="租金支付" width="180"></el-table-column>
						<el-table-column label="预警" width="75">
							<template slot-scope="scope">
								<div v-if="scope.row.status==0" style="width: 5px;height: 5px;border-radius: 50%;background-color: #2D9842;margin: 0 auto;"></div>
								<div v-if="scope.row.status==1" style="width: 5px;height: 5px;border-radius: 50%;background-color: #FFA421;margin: 0 auto;"></div>
								<div v-if="scope.row.status==2" style="width: 5px;height: 5px;border-radius: 50%;background-color: #EC2C17;margin: 0 auto;"></div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>村级工程</span>
				</div>
				<div class="box-bottom zcgl" style="height: 190px;">
					<el-table :data="cjgcData" style="width: 100%" max-height="170px" :row-class-name="tableRowClassName"
							:cell-style="{'text-align': 'center',color: '#fff','font-weight': '500',}" 
							:header-cell-style="{color: '#fff',background: 'rgba(30, 144, 255, 0.25)','text-align': 'center'}">
						<el-table-column prop="name" label="项目" min-width="300"></el-table-column>
						<el-table-column prop="fundSource" label="资金来源" min-width="100"></el-table-column>
						<el-table-column prop="fund" label="金额" min-width="100"></el-table-column>
						<el-table-column prop="contractor" label="承包单位" min-width="300"></el-table-column>
						<el-table-column label="进展情况" min-width="100">
							<template slot-scope="scope">
								<div v-if="scope.row.status==0">未开始</div>
								<div v-if="scope.row.status==1">进行中</div>
								<div v-if="scope.row.status==2">已结束</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div class="right-line">
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>土地征用</span>
				</div>
				<div class="box-bottom tdzy" style="height: 115px;">
					<div>
						<p>征用时间：<span class="greenBlue">{{economyInfo[0].cont}}</span></p>
						<p>征用面积：<span class="greenBlue">{{economyInfo[1].cont}}</span></p>
					</div>
					<div>
						<p>征用总费用：<span class="yellow">{{economyInfo[2].cont}}</span></p>
						<p>已到位金额：<span class="yellow">{{economyInfo[3].cont}}</span></p>
						<p>已发放金额：<span class="yellow">{{economyInfo[4].cont}}</span></p>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>社会保障</span>
				</div>
				<div class="box-bottom shbz" style="height: 150px;">
					<div>
						<p>
							<span class="yellow">{{economyInfo[5].cont}}</span>
							<span>享受低保人数</span>
						</p>
						<p>
							<span class="greenBlue">{{economyInfo[6].cont}}</span>
							<span>医疗保险人数</span>
						</p>
						<p>
							<span class="orange">{{economyInfo[7].cont}}</span>
							<span>各类养老保险人数</span>
						</p>
					</div>
					<div>
						<p>
							<span class="yellow">{{economyInfo[8].cont}}</span>
							<span>本季新增低保人数</span>
						</p>
						<p>
							<span class="greenBlue">{{economyInfo[9].cont}}</span>
							<span>本季新增医疗保险人数</span>
						</p>
						<p>
							<span class="orange">{{economyInfo[10].cont}}</span>
							<span>本季新增养老人数</span>
						</p>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>社会救助</span>
				</div>
				<div class="box-bottom shbz" style="height: 150px;">
					<div>
						<p>
							<span class="yellow">{{economyInfo[11].cont}}</span>
							<span>本季度补助人数</span>
						</p>
						<p>
							<span class="greenBlue">{{economyInfo[12].cont}}</span>
							<span>本季度补贴人数</span>
						</p>
						<p>
							<span class="orange">{{economyInfo[13].cont}}</span>
							<span>本村享受优待抚恤对象</span>
						</p>
					</div>
					<div>
						<p>
							<span class="yellow">{{economyInfo[14].cont}}</span>
							<span>本季度补助金额</span>
						</p>
						<p>
							<span class="greenBlue">{{economyInfo[15].cont}}</span>
							<span>本季度补贴金额</span>
						</p>
						<p>
							<span class="orange">{{economyInfo[16].cont}}</span>
							<span>本季度新增抚恤对象</span>
						</p>
					</div>
				</div>
			</div>
			<div style="display: flex;justify-content: space-between;width: 100%;">
				<div class="box" style="width: 320px;">
					<div class="box-top">
						<img src="static/images/icon.png">
						<span>其他公开</span>
					</div>
					<div class="box-bottom qtgk" style="height: 120px;">
						<div class="yellow">{{economyInfo[17].cont}}</div>
					</div>
				</div>
				<div class="box" style="width: 320px;margin-bottom: 10px;">
					<div class="box-top">
						<img src="static/images/icon.png">
						<span>监督机构</span>
					</div>
					<div class="box-bottom jdjg" style="height: 120px;">
						<div v-for="(item,index) in superviseList" :key="index" @click="showPop(item,2)">
							<span class="greenBlue">{{item.name}}</span>
							<img src="../bgImages/ygcw/right.png">
						</div>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>实时公开</span>
				</div>
				<div class="box-bottom ssgk" style="height: 100px;">
					<div style="margin-bottom: 10px;">
						<span>主题</span>
						<span>内容</span>
						<span>时间</span>
					</div>
					<div @click="showPop(ssgkList[0],3)">
						<span>{{ssgkList[0].title}}</span>
						<span v-html="ssgkList[0].content"></span>
						<span>{{ssgkList[0].timePoint}}</span>
					</div>
				</div>
			</div>
		</div>
		<div v-show="showMask" class="mask"></div>
		<div v-show="showMask" class="pop-mask-box">
			<img src="../bgImages/ygcw/cancel.png" class="pop-cancel" @click="showMask=false">
			<div class="pop-title" v-if="type!=3">{{detailInfo.name}}</div>
			<div class="pop-title" v-if="type==3">{{detailInfo.title}}</div>
			<div class="pop-swiper" v-if="type==1">
				<el-carousel indicator-position='none' arrow='hover' :interval='4000'>
					<el-carousel-item v-for="(item,index) in detailInfo.img" :key="index">
						<img :src="item" v-viewer>
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="pop-word-table" v-if="type==2">
				<div class="pop-word-table-title">
					<img src="../bgImages/ygcw/logo.png">工作职能
				</div>
				<div class="pop-word-table-cont" v-html="detailInfo.cont"></div>
				<div class="pop-word-table-title">
					<img src="../bgImages/ygcw/logo.png">人员组成
				</div>
				<div class="build-inner-box" style="flex-direction: column;margin-top: 10px;">
				  <div class="build-line-title">
				    <div style="width: 60px;">序号</div>
				    <div style="width: 120px;">姓名</div>
				    <div style="width: 130px;">出生年月</div>
				    <div style="width: 200px;">工作单位</div>
				    <div style="width: 180px;">联系电话</div>
				  </div>
				  <div :class="{odd:index%2==1,even:index%2==0}" class="build-line-item" v-for="(item,index) in detailInfo.list" :key="index">
				    <div style="width: 60px;">{{index+1}}</div>
				    <div style="width: 120px;">{{item.name}}</div>
				    <div style="width: 130px;">{{item.birthday}}</div>
				    <div style="width: 200px;">{{item.address}}</div>
				    <div style="width: 180px;">{{item.mob}}</div>
				  </div>
				</div>
			</div>
			<div class="pop-rich-text" v-html="detailInfo.content" v-if="type==3"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ygcw',
		props: {},
		data() {
			return {
				economyInfo: [],
				superviseList: [],
				ssgkList: [],
				zcglData: [],
				cjgcData: [],
				powerList: [],
				financeopenList: [],
				showMask: false,
				type: '',
				detailInfo: {}
			}
		},
		components: {},
		methods: {
			tableRowClassName({row, rowIndex}) {
				if (rowIndex%2 == 1) {
				  return 'bg-row';
				}
			},
			showPop(data,type) {
				this.showMask = true
				this.type = type
				this.detailInfo = data
				if(type==2) {
					let param = {
					  pid: data.id,
					  current: 1,
					  size: 20
					}
					this.$ajax.getSupervisorList(param).then(res => {
					  res.records.forEach(item => {
					    item.birthday = item.birthday.substring(0,7)
					  })
					  this.$set(this.detailInfo, 'list', res.records )
					})
					console.log(this.detailInfo)
				}
			}
		},
		watch: {},
		mounted() {
			let data = {
				current: 1,
				size: 50
			}
			this.$ajax.getSunShineList(data).then(res => {
				this.economyInfo = res.records
			})
			this.$ajax.getSuperviseList(data).then(res => {
				this.superviseList = res.records
			})
			this.$ajax.getRealTimeList({
				size: 5,
				current: 1
			}).then(res => {
				res.records.forEach(item => {
					item.timePoint = item.timePoint.substring(0, 10)
				})
				this.ssgkList = res.records
			})
			this.$ajax.getAssetsList({size:10,current:1}).then(res => {
			  res.records.forEach(item => {
			    item.leaseStart = item.leaseStart.substring(0,10)
			    item.leaseEnd = item.leaseEnd.substring(0,10)
			  })
			  this.zcglData = res.records
			})
			this.$ajax.getProjectList({size:10,current:1,project:'0'}).then(res => {
			  this.cjgcData = res.records
			})
			let powerData = {
			  pid: '1428651807502376961',
			  current: 1,
			  size: 15
			}
			this.$ajax.getSunShineList(powerData).then(res => {
			  res.records.forEach(item => {
			    item.img = item.img.split(",")
			  })
			  this.powerList = res.records
			})
			this.$ajax.getFinanceopenList({current:1,size:20}).then(res => {
			  res.records.forEach(item => {
			    item.img = item.img.split(",")
			  })
			  this.financeopenList = res.records
			})
		}
	}
</script>
<style>
	.el-table .bg-row {
		background: rgba(21, 118, 222, 0.57) !important;
	}
</style>
<style scoped lang="less">
	.greenBlue {
		color: #00CED1;
	}

	.yellow {
		color: #FAD400;
	}

	.orange {
		color: #FF7800;
	}
	.ygcw-box {
		width: 100%;
		height: 100vh;
		padding: 120px 20px 0;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 100;
		background: url(../bgImages/ygcw/bg.png) no-repeat;
		background-size: 100% calc(100% - 120px);
		background-position: bottom center;
		display: flex;

		.title {
			position: absolute;
			top: 120px;
			left: 925px;
			color: #00CED1;
			font-size: 45px;
			font-weight: bolder;
		}

		.box {
			display: flex;
			flex-direction: column;
			width: 100%;
			border-radius: 10px;
			background: linear-gradient(56deg, rgba(40, 63, 138, .3) 0%, rgba(37, 81, 183, .3) 100%);
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
			margin-bottom: 10px;

			.box-top {
				margin-bottom: 15px;
				font-size: 24px;
				display: flex;
				align-items: center;
				color: #FEFEFE;

				img {
					width: 24px;
					height: 24px;
					margin-right: 10px;
				}
			}

			.box-bottom {
				width: 100%;
				padding: 10px 0;
				box-sizing: border-box;
				background-color: rgba(0, 142, 244, .1);
			}

			.cwgk {
				display: flex;
				flex-direction: column;
				padding: 10px;
				box-sizing: border-box;

				.box-title {
					display: flex;
					align-items: center;
					font-size: 20px;
					color: #00CED1;

					img {
						width: 22px;
						height: 22px;
						margin-right: 20px;
					}
				}

				.box-info {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;

					div {
						width: 50%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						color: #fff;
						font-size: 20px;

						.box-info-circle {
							width: 120px;
							height: 120px;
							border-radius: 50%;
							border: 12px solid #FAD400;
							color: #FAD400;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							margin-bottom: 30px;

							span:first-child {
								font-size: 33px;
							}

							span:last-child {
								font-size: 20px;
							}
						}

						p {
							margin-bottom: 10px;

							span {
								font-size: 24px;
								color: #FAD400;
							}
						}
					}
				}
			}

			.cmjf {
				display: flex;
				padding: 0 10px;
				box-sizing: border-box;

				.box-title {
					display: flex;
					align-items: center;
					font-size: 23px;
					color: #00CED1;

					img {
						width: 22px;
						height: 22px;
						margin-right: 20px;
					}

					div {
						width: 66px;
						height: 70px;
						background: url(../bgImages/ygcw/border.png) no-repeat;
						background-size: 100% 100%;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 40px;
					}
				}
			}

			.xwql {
				display: flex;
				flex-wrap: wrap;
				padding: 0 10px;

				div {
					width: 90px;
					height: 100px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					img {
						width: 40px;
						height: 60px;
						margin-bottom: 5px;
					}

					p {
						font-size: 14px;
						color: #fff;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: center;
					}
				}
			}

			.cwgk2 {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding: 10px;

				div {
					width: 153px;
					height: 38px;
					background: url(../bgImages/ygcw/财务公开框架.png) no-repeat;
					background-size: 100% 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 20px;
					color: #1EC3FF;
					margin-right: 56px;
					cursor: pointer;
				}

				div:nth-child(5n) {
					margin-right: 0;
				}
			}

			.zcgl {
				/deep/  .el-table, .el-table__expanded-cell {
				    background-color: transparent;
				}
				/deep/ .el-table th {
				    background-color: transparent;
					border-bottom: none;
				}
				/deep/ .el-table tr {
				    background-color: transparent;
					border-bottom: none;
				}
				/deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
				    background-color: transparent;
					border: none;
				}
				/deep/ .el-table .cell {
				    background-color: transparent;
					color: #fff;
					border: none;
				}
				/deep/ .el-table th>.cell {
				    background-color: transparent;
					color: #fff;
					border: none;
				}
				el-table:before {
					left: 0;
					bottom: 0;
					width: 100%;
					height: 0px;
				}
			} 

			.tdzy {
				display: flex;
				font-size: 18px;
				color: #fff;
				padding: 5px 15px;

				div {
					width: 50%;
					display: flex;
					flex-direction: column;

					span {
						font-size: 22px;
					}
				}
			}

			.shbz {
				display: flex;
				flex-direction: column;

				div {
					display: flex;
					align-items: center;

					p {
						width: 33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 20px;
						color: #fff;

						span:first-child {
							margin-bottom: 5px;
						}
					}
				}
			}

			.qtgk {
				padding: 10px 15px;
				font-size: 15px;
			}

			.jdjg {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 10px;
				cursor: pointer;

				div {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 18px;

					img {
						width: 17px;
						height: 17px;
					}
				}
			}

			.ssgk {
				display: flex;
				flex-direction: column;
				color: #fff;
				font-size: 22px;

				div {
					display: flex;
					align-items: center;

					span {
						text-align: center;
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					span:first-child {
						width: 30%;
					}
					span:last-child {
						width: 20%;
					}
				}
			}
		}

		.box:last-child {
			margin-bottom: 0;
		}

		.left-line {
			display: flex;
			flex-direction: column;
			width: 500px;
			margin-top: 40px;
		}

		.center-line {
			display: flex;
			flex-direction: column;
			margin: 100px 10px 0;
			width: 1030px;
		}

		.right-line {
			display: flex;
			flex-direction: column;
			width: 646px;
			margin-top: 40px;
		}
	}
	
	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.5);
		z-index: 2000;
	}
	.pop-mask-box {
		width: 750px;
		height: 943px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 2001;
		background: url(../bgImages/ygcw/popBg.png) no-repeat;
		background-size: 100% 100%;
		.pop-cancel {
			position: absolute;
			top: 20px;
			right: 20px;
			width: 31px;
			height: 31px;
			cursor: pointer;
		}
		.pop-title {
			width: 100%;
			text-align: center;
			padding: 24px 200px 24px 220px;
			box-sizing: border-box;
			color: #00CED1;
			font-size: 28px;
		}
		.pop-swiper {
			width: 590px;
			height: 780px;
			margin: 10px auto;
			/deep/ .el-carousel {
				width: 100%;
				height: 100%;
				.el-carousel__container {
					width: 100%;
					height: 100%;
					.el-carousel__item {
						width: 100%;
						height: 100%;
						img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.pop-word-table {
			width: 650px;
			max-height: 780px;
			overflow: auto;
			font-size: 24px;
			color: #00CED1;
			margin: 20px auto;
			.pop-word-table-title {
				display: flex;
				align-items: center;
				font-size: 30px;
				color: #00CED1;
				font-weight: bolder;
				img {
					width: 22px;
					height: 22px;
					margin-right: 20px;
				}
			}
			.build-inner-box {
			  .build-line-title {
			    background-color: #265EFF;
			    font-size: 24px;
			    color: #fff;
			    border-top-left-radius: 8px;
			    border-top-right-radius: 8px;
			    display: flex;
			    align-items: center;
			    height: 90px;
			    div {
			      display: flex;
			      justify-content: center;
			      align-items: center;
			      border-right: 1px solid #fff;
			      box-sizing: border-box;
			      height: 100%;
			      text-align: center;
			      flex-shrink: 1;
			    }
			    div:last-child {
			      border-right: none;
			    }
			  }
			  .build-line-item {
			    font-size: 24px;
			    color: #fff;
			    display: flex;
			    align-items: center;
			    height: 90px;
			    div {
			      display: flex;
			      justify-content: center;
			      align-items: center;
			      border-right: 1px solid #fff;
			      box-sizing: border-box;
			      text-align: center;
			      padding: 5px;
			      height: 100%;
			      line-height: 45px;
			      flex-shrink: 1;
			    }
			    div:last-child {
			      word-break: break-all;
			      border-right: none;
			    }
			  }
			  .odd {
			    background-color: #599BFF;
			  }
			  .even {
			    background-color: #A6C9FF;
			  }
			}
		}
		.pop-rich-text {
			width: 590px;
			max-height: 780px;
			overflow: auto;
			font-size: 24px;
			color: #00CED1;
			margin: 20px auto;
		}
	}
</style>
