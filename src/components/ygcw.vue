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
								<span>222</span>
								<span>万元</span>
							</p>
							<p>本年度经济总收入目标</p>
							<p>比去年<span>+8%</span></p>
						</div>
						<div>
							<p class="box-info-circle" style="border-color: #00CED1;">
								<span style="color: #00CED1;">129</span>
								<span style="color: #00CED1;">万元</span>
							</p>
							<p>本年度村级可用收入目标</p>
							<p>比去年<span style="color: #00CED1;">+持平</span></p>
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
						<div>2</div>
					</div>
				</div>
			</div>
			<div class="box">
				<div class="box-top">
					<img src="static/images/icon.png">
					<span>小微权力</span>
				</div>
				<div class="box-bottom xwql" style="height: 300px;">
					<div v-for="(item,index) in 11" :key="index">
						<img src="../bgImages/ygcw/pdf.png">
						<p>资产管理</p>
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
					<div v-for="(item,index) in 19" :key="index">
						资产负债表
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
								<div v-if="scope.row.status==0" style="width: 5px;height: 5px;border-radius: 50%;background-color: #90EE90;margin: 0 auto;"></div>
								<div v-if="scope.row.status==1" style="width: 5px;height: 5px;border-radius: 50%;background-color: yellow;margin: 0 auto;"></div>
								<div v-if="scope.row.status==2" style="width: 5px;height: 5px;border-radius: 50%;background-color: red;margin: 0 auto;"></div>
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
				<div class="box-bottom cjgc" style="height: 190px;">

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
						<p>征用时间：<span class="greenBlue">13人</span></p>
						<p>征用面积：<span class="greenBlue">11.92亩</span></p>
					</div>
					<div>
						<p>征用总费用：<span class="yellow">296693元</span></p>
						<p>已到位金额：<span class="yellow">296693元</span></p>
						<p>已发放金额：<span class="yellow">36956元</span></p>
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
							<span class="yellow">13人</span>
							<span>享受低保人数</span>
						</p>
						<p>
							<span class="greenBlue">1627人</span>
							<span>医疗保险人数</span>
						</p>
						<p>
							<span class="orange">1455人</span>
							<span>各类养老保险人数</span>
						</p>
					</div>
					<div>
						<p>
							<span class="yellow">0人</span>
							<span>本季新增低保人数</span>
						</p>
						<p>
							<span class="greenBlue">0人</span>
							<span>本季新增医疗保险人数</span>
						</p>
						<p>
							<span class="orange">0人</span>
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
							<span class="yellow">4人</span>
							<span>本季度补助人数</span>
						</p>
						<p>
							<span class="greenBlue">1人</span>
							<span>本季度补贴人数</span>
						</p>
						<p>
							<span class="orange">2人</span>
							<span>本村享受优待抚恤对象</span>
						</p>
					</div>
					<div>
						<p>
							<span class="yellow">600元</span>
							<span>本季度补助金额</span>
						</p>
						<p>
							<span class="greenBlue">5000元</span>
							<span>本季度补贴金额</span>
						</p>
						<p>
							<span class="orange">0人</span>
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
						<div v-for="(item,index) in superviseList" :key="index">
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
					<div>
						<span>{{ssgkList[0].title}}</span>
						<span>{{ssgkList[0].content}}</span>
						<span>{{ssgkList[0].timePoint}}</span>
					</div>
				</div>
			</div>
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
				zcglData: []
			}
		},
		components: {},
		methods: {
			tableRowClassName({row, rowIndex}) {
				if (rowIndex%2 == 1) {
				  return 'bg-row';
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
</style>
