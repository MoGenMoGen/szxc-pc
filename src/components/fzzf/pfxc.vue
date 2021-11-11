<template>
	<div>
		<div class="pop-box">
			<div class="content">
				<div class="item" v-for="(item,index) in list" :key="index" @click="getIndex(index)">
					<img :src="item.url">{{item.name}}
				</div>
			</div>
		</div>
		<!-- 民典法 -->
		<div class="mdf-box" v-if="mdfShow">
			<div class="title">民典法</div>
			<div class="swiper-box">
				<el-carousel indicator-position="none" interval="4000">
				  <el-carousel-item v-for="item in mdfList" :key="item">
					<img :src="item" style="width: 100%;height: 100%;">
				  </el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<!-- 民主法治村社 -->
		<div class="mzhzcs-box" v-if="mzfzcsShow">
			<div class="title">民主法治村社</div>
			<div class="mzhzcs-list" v-for="(item,index) in mzhzcsList" :key="index">
				<span>{{item.topTitle}}</span>
				<div class="mzhzcs-childList">
					<span v-for="(newItem,newIndex) in item.list" :key="newIndex">{{newItem}}</span>
				</div>
			</div>
		</div>
		<!-- 法治队伍 -->
		<div v-if="fzdwShow">
			<div class="fzdw-leftList">
				<div class="title">法治队伍</div>
				<span v-for="(item,index) in fzdwList" :key="index" @click="getFzdwIndex(index)">{{item}}</span>
			</div>
			<div class="fzdw-centerList" v-if="fzdwCenterShow">
				<div class="title">{{fzdwTitle}}</div>
				<div class="fzdw-centerList-box" v-if="fzdwIndex!=2">
					<div class="list-title">
						<span>村、社区</span>
						<span>姓名</span>
						<span>职务</span>
						<span>手机</span>
					</div>
					<div class="list-box" v-if="fzdwIndex==0">
						<div class="branch-list-item" v-for="(item,index) in fzdwCenterList" :key="index">
							<span>{{item.area}}</span>
							<span>{{item.name2}}</span>
							<span>{{item.position2}}</span>
							<span>{{item.phone2}}</span>
						</div>
					</div>
					<div class="list-box" v-if="fzdwIndex==1">
						<div class="branch-list-item" v-for="(item,index) in fzdwCenterList" :key="index">
							<span>{{item.area}}</span>
							<span>{{item.name}}</span>
							<span>{{item.position}}</span>
							<span>{{item.phone}}</span>
						</div>
					</div>
				</div>
				<div class="fzdw-centerList-box fzdw-centerList-box2" v-if="fzdwIndex==2">
					<div class="avatar">
						<img :src="police.img" class="avatar-img">
					</div>
					<div class="detail">
						<div>姓名： {{police.name}}</div>
						<div>手机号： {{police.mob}}</div>
						<div>短号： {{police.shortMob}}</div>
						<div>办公电话： {{police.phone}}</div>
						<div>单位： {{police.unit}}</div>
						<div>部门： {{police.dept}}</div>
						<div>职务： {{police.position}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 促进条例 -->
		<div v-if="cjtlShow">
			<div class="cjtl-box">
				<div class="title">宁波市法治乡村建设促进条例</div>
				<div class="list-box">
					<span class="list-item" v-for="(item,index) in cjtlList" :key="index" @click="cjtlClick(item)">{{index+1}}、{{item.title}}</span>
				</div>
			</div>
			<div class="cjtl-center-box" v-if="cjtlInfoShow">
				<div class="title">详情</div>
				<div class="info-name">{{cjtlInfo.title}}</div>
				<div class="info-cont">{{cjtlInfo.cont}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bwpfgh from '../../bgImages/fzzf/八五普法规划.png';
	import cjtl from '../../bgImages/fzzf/宁波市法治乡村建设促进条例.png';
	import mdf from '../../bgImages/fzzf/民典法.png';
	import fzdw from '../../bgImages/fzzf/法治队伍.png';
	import mzfzcs from '../../bgImages/fzzf/民主法治村社.png';
	import img1 from '../../bgImages/fzzf/1.png';
	import img2 from '../../bgImages/fzzf/2.png';
	import img3 from '../../bgImages/fzzf/3.png';
	import img4 from '../../bgImages/fzzf/4.png';
	import img5 from '../../bgImages/fzzf/5.png';
	import img6 from '../../bgImages/fzzf/6.png';
	import img7 from '../../bgImages/fzzf/7.png';
	import img8 from '../../bgImages/fzzf/8.png';
	import img9 from '../../bgImages/fzzf/9.png';
	import img10 from '../../bgImages/fzzf/10.png';
	import avatar from '../../bgImages/fzzf/头像.png';
	export default {
		name: 'zfgg',
		props: {},
		data() {
			return {
				cjtlShow: false,
				mdfShow: false,
				fzdwShow: false,
				mzfzcsShow: false,
				fzdwTitle: '',
				fzdwIndex: 0,
				fzdwCenterShow: false,
				cjtlInfoShow: false,
				list: [{
					name: '八五普法规划',
					detailTitle: '',
					url: bwpfgh
				}, {
					name: '宁波市法治乡村建设促进条例',
					detailTitle: '',
					url: cjtl
				}, {
					name: '民典法',
					detailTitle: '',
					url: mdf
				}, {
					name: '法治队伍',
					detailTitle: '',
					url: fzdw
				}, {
					name: '民主法治村社',
					detailTitle: '',
					url: mzfzcs
				}],
				mdfList: [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10],
				mzhzcsList: [{
					topTitle: '区级民主法治示范村（社区）',
					list: ['河头村（2011）','中心村（2015）']
				},{
					topTitle: '市级民主法治示范村（社区）',
					list: ['长石村（2006）(2016复)','九龙湖村（2015）','田杨陈村（2017）','西经堂村（2018）(2020复)',
					'西河村（2019）','长宏村（2019）','思源社区（2016）（2019复）','龙源社区（2020）']
				},{
					topTitle: '省级民主法治村（社区）',
					list: ['田顾村（2017）','杜夹岙（2014）','汶溪村（2020）']
				}],
				fzdwList: ['法治带头人','法律明白人','片区民警'],
				fzdwCenterList: [{
					area: '龙源社区',
					name: '韩健勇',
					position: '治调主任',
					phone: '13967802754',
					name2: '王柯',
					position2: '法律顾问',
					phone2: '13858269256'
				},{
					area: '河源社区',
					name: '郑国振',
					position: '治调主任',
					phone: '13968276009',
					name2: '严巧娜',
					position2: '党支部书记',
					phone2: '13586828522'
				},{
					area: '思源社区',
					name: '胡文浩',
					position: '治调主任',
					phone: '15867214086',
					name2: '陈洁',
					position2: '党支部书记',
					phone2: '15988620090'
				},{
					area: '河头村',
					name: '朱凯明',
					position: '治调主任',
					phone: '15257493523',
					name2: '王柯',
					position2: '法律顾问',
					phone2: '13858269256'
				},{
					area: '九龙湖村',
					name: '黄杰锋',
					position: '副社长',
					phone: '13857477521',
					name2: '周月华',
					position2: '法律顾问',
					phone2: '13967876476'
				},{
					area: '田顾村',
					name: '韩鸿翔',
					position: '副主任',
					phone: '13857887920',
					name2: '陆一娇',
					position2: '法律顾问',
					phone2: '13586882434'
				},{
					area: '杜夹岙村',
					name: '沈智灵',
					position: '治调主任',
					phone: '13586889836',
					name2: '周茹琴',
					position2: '法律顾问',
					phone2: '13806653698'
				},{
					area: '中心村',
					name: '黄益峰',
					position: '治调主任',
					phone: '13738489196',
					name2: '潘晓',
					position2: '法律顾问',
					phone2: '15824279889'
				},{
					area: '汶溪村',
					name: '姚龙',
					position: '副书记',
					phone: '15067450270',
					name2: '周月华',
					position2: '法律顾问',
					phone2: '13967876476'
				},{
					area: '长石村',
					name: '唐柯迪',
					position: '治调主任',
					phone: '15888588776',
					name2: '周茹琴',
					position2: '法律顾问',
					phone2: '13806653698'
				},{
					area: '长宏村',
					name: '李晓',
					position: '治调主任',
					phone: '15888093555',
					name2: '潘晓',
					position2: '法律顾问',
					phone2: '15824279889'
				},{
					area: '田杨陈村',
					name: '陈柯杰',
					position: '治调主任',
					phone: '18857468041',
					name2: '顾安荣',
					position2: '法律顾问',
					phone2: '13506847967'
				},{
					area: '西河村',
					name: '薛挺',
					position: '治调主任',
					phone: '18067110090',
					name2: '徐家庆',
					position2: '法律顾问',
					phone2: '13396684535'
				},{
					area: '西经堂村',
					name: '汪永波',
					position: '治调主任',
					phone: '15088458378',
					name2: '徐家庆',
					position2: '法律顾问',
					phone2: '13396684535'
				}],
				police: {
					img: avatar,
					name: '张燕云',
					mob: '13858376596',
					shortMob: '591464',
					phone: '0574-86635963',
					unit: '镇海区-区政府-镇海区公安分局',
					dept: '九龙湖派出所',
					position: '民警'
				},
				cjtlInfo: {},
				cjtlList: [{
					title: '法治乡村建设定义',
					cont: '《条例》所称法治乡村建设，是指在本市行政区域内乡（镇）、村的法规制度健全、治理方式改进、公共法律服务完善、执法规范化水平提高、公众法治意识提升等相关活动。'
				},{
					title: '《条例》适用范围',
					cont: '《条例》第二条明确，《条例》适用于本市行政区域内的乡、镇和村。第三十二条规定，“街道、社区的法治建设工作可以参照本条例执行。”'
				},{
					title: '《条例》的原则',
					cont: '《条例》第三条明确了法治乡村建设应当坚持党的领导、政府负责、村民主体、社会参与和法治与自治、德治 相结合的原则。'
				},{
					title: '《条例》的宁波特色',
					cont: '《条例》第十七、十八条、十九条体现我市地方特色， 固化了村民说事制度和村级小微权力清单制度。'
				},{
					title: '《条例》减轻了村民委员会的负担',
					cont: '《条例》第十条第一款规定，“区县(市)人民政府以及乡(镇)人民政府应当规范村级组织协助政府工作事项，需要村民委员会协助的事项应当实行清单化管理，不得随意增加。”第十条第二款规定，“已经纳入清单需要村民委员会协助的工作事项，各级人民政府提供必要条件和经费保障。”'
				},{
					title: '《条例》细化了村民自治章程、村规民约的内容',
					cont: '《条例》第十四条第二款规定，“村民自治章程、村规民约应当以社会主义核心价值观为引领，规范村民日常行为、维护公共秩序、保障群众权益、调解纠纷、引导民风民俗等，并可以对尊老爱幼、婚丧礼俗、餐饮消费、垃圾分类、村容村貌管理等内容规定守规奖励和抵制约束的措施，并不得与法律法规相抵触。”'
				},{
					title: '《条例》指明了村民对村务公开事项有疑义的救济途径',
					cont: '《条例》第十六条第二款规定，“村民对公开事项存有疑义的，可以向村民委员会提出查询要求，村民委员会应当为村民查询提供便利并作出解释；村民也可以向乡（镇）人民政府或者区县（市）人民政府及其有关部门反映，有关人民政府或者主管部门应当在二十日内调查核实，并予以答复。”'
				},{
					title: '《条例》要求加强公共法律服务',
					cont: '《条例》第二十条对社会矛盾纠纷预防化解制度、调处化解平台建设、办理机制和人民调解组织建设做了规定。《条例》第二十二条对乡村公共法律服务站(点)建设、公共法律服务制度、购买公共法律服务做了规定。《条例》第二十三条对村法律顾问制度作了进一步细化完善。'
				},{
					title: '《条例》规定了法治乡村建设中司法、执法部门的具体职责',
					cont: '《条例》第二十一条规定,“市和区县(市)人民法院、人民检察院、公安机关、司法行政部门应当加强基层法庭、检察室、派出所、司法所的建设，指导其参与法治乡村建设工作。” 《条例》第二十四条规定，“市和区县(市)人民政府应当加强基层行政执法能力建设，推动执法力量向乡镇延伸，推进基层综合行政执法体制改革。”'
				},{
					title: '《条例》明确了提高乡村公众法治意识，开展普法和依法治理工作。',
					cont: '《条例》第二十七条第一款规定，“市和区县（市）人民政府有关部门和乡（镇）人民政府应当开展对村级组织成员、村民代表、村民小组长、网格员、人民调解员等人员的法律知识培训，培育法治带头人、乡村法律明白人。”第二十八条对民主法治示范村创建工作作了规定，第二十九条对法治教育、传统文化与法治文化融合等作了规定。'
				}]
			}
		},
		components: {},
		methods: {
			getIndex(index) {
				if (index == 0) {
					this.cjtlShow = false
					this.mdfShow = false
					this.fzdwShow = false
					this.mzfzcsShow = false
				} else if (index == 1) {
					this.cjtlShow = true
					this.mdfShow = false
					this.fzdwShow = false
					this.mzfzcsShow = false
				} else if (index == 2) {
					this.cjtlShow = false
					this.mdfShow = true
					this.fzdwShow = false
					this.mzfzcsShow = false
				} else if (index == 3) {
					this.cjtlShow = false
					this.mdfShow = false
					this.fzdwShow = true
					this.mzfzcsShow = false
				} else if (index == 4) {
					this.cjtlShow = false
					this.mdfShow = false
					this.fzdwShow = false
					this.mzfzcsShow = true
				}
			},
			getFzdwIndex(index) {
				this.fzdwIndex = index
				this.fzdwCenterShow = true
				if(index==0) {
					this.fzdwTitle = '法治带头人'
				} else if (index == 1) {
					this.fzdwTitle = '法律明白人'
				} else if(index==2) {
					this.fzdwTitle = '片区民警'
				}
			},
			cjtlClick(item) {
				this.cjtlInfoShow = true
				this.cjtlInfo = item
			}
		},
		watch: {},
		mounted() {}

	}
</script>

<style scoped lang="less">
	.pop-box {
		width: 612px;
		height: 387px;
		background: url(../../bgImages/fzzf/普法宣传-概览.png) no-repeat;
		background-size: 100% 100%;
		padding: 10px;
		padding-top: 60px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 35px;
		z-index: 1998;
		.content {
			width: 90%;
			display: flex;
			flex-direction: column;
			font-size: 20px;
			margin: 0 auto;

			.item {
				display: flex;
				align-items: center;
				padding: 15px 20px;
				box-sizing: border-box;
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
				cursor: pointer;
				img {
					width: 25px;
					height: 25px;
					margin-right: 20px;
				}
			}

			.item:last-child {
				border-bottom: none;
			}
		}
	}
	.mdf-box {
		width: 752px;
		height: 746px;
		background: url(../../bgImages/fzzf/普法宣传-民典法.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 835px;
		z-index: 1998;
		.title {
			width: 100%;
			text-align: center;
			padding: 12px 300px;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.swiper-box {
			width: 491px;
			height: 622px;
			margin: 20px auto;
			/deep/ .el-carousel__container {
				width: 100%;
				height: 622px;
			
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
	.mzhzcs-box {
		width: 752px;
		height: 600px;
		background: url(../../bgImages/fzzf/普法宣传-民主法治村社.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 835px;
		z-index: 1998;
		.title {
			width: 100%;
			text-align: center;
			padding: 12px 280px;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.mzhzcs-list {
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1px solid rgba(255,255,255,0.4);
			width: 90%;
			margin: 30px auto 0;
			padding: 0 20px 20px;
			box-sizing: border-box;
			span {
				width: 100%;
				text-align: center;
				font-size: 20px;
			}
			.mzhzcs-childList {
				display: flex;
				flex-wrap: wrap;
				span {
					display: block;
					text-align: left;
					font-size: 18px;
					width: 50%;
					margin-bottom: 10px;
				}
			}
		}
		.mzhzcs-list:last-child {
			border-bottom: none;
		}
	}
	.fzdw-leftList {
		width: 612px;
		height: 264px;
		background: url(../../bgImages/fzzf/普法宣传-法治队伍-列表.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 620px;
		left: 35px;
		z-index: 1998;
		.title {
			width: 100%;
			text-align: center;
			padding: 10px 230px;
			font-size: 22px;
			color: #8CACF9;
			box-sizing: border-box;
		}
		span {
			width: 100%;
			text-align: center;
			margin-top: 25px;
			font-size: 18px;
			cursor: pointer;
		}
	}
	.fzdw-centerList {
		width: 612px;
		height: 506px;
		background: url(../../bgImages/fzzf/普法宣传-法治队伍-详情.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 787px;
		z-index: 1998;
		.title {
			width: 100%;
			text-align: center;
			padding: 10px 230px;
			font-size: 22px;
			color: #8CACF9;
			box-sizing: border-box;
		}
		.fzdw-centerList-box {
			.list-title {
				display: flex;
				align-items: center;
				margin-bottom: 20px;
				margin-top: 20px;
				font-size: 18px;
				span {
					width: 25%;
					text-align: center;
				}
			}
			.list-box {
				max-height: 370px;
				overflow-y: scroll;
				font-size: 18px;
				.branch-list-item {
					display: flex;
					align-items: center;
					span {
						width: 25%;
						text-align: center;
						margin-bottom: 20px;
					}
				}
			}
			
		}
		.fzdw-centerList-box2 {
			display: flex;
			justify-content: center;
			margin-top: 50px;
			.avatar {
				position: relative;
				margin-right: 59px;
				.avatar-img {
					width: 140px;
					height: 140px;
					border-radius: 50%;
					object-fit: cover;
				}
			}
			.detail {
				display: flex;
				flex-direction: column;
				font-size: 18px;
				color: #fff;
				div {
					margin-bottom: 20px;
				}
			}
		}
	}
	.cjtl-box {
		width: 612px;
		height: 382px;
		background: url(../../bgImages/fzzf/普法宣传-宁波市法治乡村建设促进条例-列表.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 600px;
		left: 35px;
		z-index: 1998;
		.title {
			width: 100%;
			padding: 10px 150px;
			box-sizing: border-box;
			text-align: center;
			font-size: 22px;
			color: #8CACF9;
		}
		.list-box {
			width: 90%;
			margin: 0 auto;
			margin-top: 20px;
			max-height: 290px;
			overflow: auto;
			display: flex;
			flex-direction: column;
			span {
				width: 100%;
				margin: 0 auto;
				border-bottom: 1px solid rgba(255,255,255,0.4);
				font-size: 18px;
				padding: 10px 0;
				cursor: pointer;
			}
			span:last-child {
				border-bottom: none;
			}
		}
	}
	.cjtl-center-box {
		width: 752px;
		height: 614px;
		background: url(../../bgImages/fzzf/普法宣传-宁波市法治乡村建设促进条例-详情.png) no-repeat;
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		top: 200px;
		left: 835px;
		z-index: 1998;
		.title {
			width: 100%;
			padding: 10px 300px;
			text-align: center;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.info-name {
			font-size: 24px;
			width: 90%;
			text-align: center;
			margin: 20px auto;
		}
		.info-cont {
			width: 90%;
			margin: 0 auto;
			font-size: 18px;
			max-height: 460px;
			overflow: auto;
		}
	}
</style>
