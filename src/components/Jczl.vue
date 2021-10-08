<template>
	<div>
		<transition name="fade">
			<div v-show="show13">
				<div class="pop-common pop-zl" style="width: 460px;">
					<div class="pop-zl-box">
						<div class="pop-zl-item" v-for="(item,index) in list2" :key="index" @click="showPoints(item)">
							<span>{{item.num}}</span>
							<span style="font-size: 18px;">{{item.title}}</span>
						</div>
					</div>
				</div>
				<div class="pop-common wglb" style="width: 460px;" v-show="!wgryShow&&!tsryShow">
					<div class="pop-inner-title">
						<span>序号</span>
						<span>网格名称</span>
						<span>网格长</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in wgzList" :key='index' @click="gridMap(item)" class="pop-inner-item">
							<span>{{ index + 1 }}</span>
							<span>{{ item.name }}</span>
							<span>{{ item.leader }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common wglb rylb" style="width: 460px;" v-show="wgryShow&&!tsryShow">
					<div class="pop-inner-title">
						<span>序号</span>
						<span style="width: 25%;">姓名</span>
						<span style="width: 50%;">住址</span>
					</div>
					<div class="pop-inner-box" style="height: 350px;margin-bottom: 10px;overflow-y: scroll;">
						<div v-for="(item,index) in wgryList" :key='index' class="pop-inner-item"
							@click="peopleMap(item)">
							<span>{{ index + 1 }}</span>
							<span style="width: 25%;">{{ item.name }}</span>
							<span style="width: 50%;">{{ item.addr }}</span>
						</div>
					</div>
				</div>
				<div class="tsry" v-if="tsryShow">
					<div class="tsry-title">{{info.name}}</div>
					<img src="static/images/cancel.png" @click="tsryShow = false" style="position: absolute;top: 8px;right: -8px;">
					<div class="tsry-box" v-show="tsryType==1">
						<my-charts :id='oldMen' style="width: 400px;height: 320px;"
							:data='oldMenOption'></my-charts>
						<div class="tsry-bottom" v-show="tsryType==1">
							<span class="tsry-bottom-item"><img src="static/images/dementia.png">失能失智老人设备配备数量：10</span>
							<span class="tsry-bottom-item"><img src="static/images/wisdomPension.png">智慧养老报警设备配备数量：8</span>
						</div>
					</div>
					<div class="tsry-box" v-show="tsryType==2">
						<my-charts :id='disabilityMen' style="width: 400px;height: 320px;"
							:data='disabilityMenOption'></my-charts>
					</div>
					<div class="tsry-box" v-show="tsryType==3">
						<div class="pop-inner-title">
							<span style="width: 15%;">序号</span>
							<span style="width: 25%;">姓名</span>
							<span style="width: 60%;">住址</span>
						</div>
						<div class="pop-inner-box" style="height: 350px;margin-bottom: 10px;overflow-y: scroll;">
							<div v-for="(item,index) in tsryList" :key='index' class="pop-inner-item"
								@click="peopleMap(item)">
								<span style="width: 15%;">{{ index + 1 }}</span>
								<span style="width: 25%;">{{ item.name }}</span>
								<span style="width: 60%;">{{ item.addr }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="search-box" v-show="wgryShow&&!tsryShow">
					<input type="text" placeholder="请输入户名" v-model="keyWord" @keyup.enter="searchKey">
					<img src="static/images/search.png" @click="searchKey">
				</div>
			</div>
		</transition>

		<div class="videoClass" v-if="showVideo">
			<video :src="videoUrl" autoplay="autoplay" loop="loop"></video>
			<img src="static/images/cancel.png" class="cancelVideo" @click="closeVideo">
		</div>
		<transition name="fade">
			<div class="pop-top" v-show="show8">
				<div class="pop-top-content">
					<div v-for="(item,index) in wgList" :key="index" class="pop-top-item">
						<span>{{item.num}}</span>
						<img :src="item.url">
						<span>{{item.title}}</span>
					</div>
				</div>
			</div>
		</transition>
		<!--执法仪监控-->
		<el-button type="primary" @click="offHikShow" v-if="hikShow"
			style="position: absolute;margin-left: 2052px; margin-top: 200px">关闭执法仪</el-button>
		<hik2 :codes="codes" ref="videoPlayer2" :playMode="1"></hik2>
		<!-- 危房监控 山塘防溺水监控-->
		<hik5 :codes="codes" ref="videoPlayer5" :playMode="1"></hik5>

		<img v-if="showPBtn" src="../bgImages/网格事件.png"
			style="z-index: 20;position: fixed;right: 0;bottom: 469px;cursor: pointer;" @click="showP = !showP">
		<transition name="fade">
			<div class="sj" v-if="showP">
				<div class="sj-pop sj-yiji">
					<div class="sj-pop-info">
						<span style="width: 10%;">序号</span>
						<span style="width: 45%;">内容</span>
						<span style="width: 30%;">上报时间</span>
						<span style="width: 15%;">状态</span>
					</div>
					<vue-seamless-scroll :data="sjList" class="seamless-warp" :class-option="classOption">
						<div class="sj-pop-itemBox">
							<div v-for="(item,index) in sjList" :key="index" class="sj-pop-item"
								@click.stop="showDetail(item.id)">
								<span style="width: 10%;">{{ index+1 }}</span>
								<span style="width: 45%;">{{ item.description }}</span>
								<span style="width: 30%;">{{ item.reportTime }}</span>
								<span style="width: 15%;">{{ item.status==0?'网格上报':'网格关闭' }}</span>
							</div>
						</div>
					</vue-seamless-scroll>
				</div>
				<div class="sj-pop sj-erji">
					<div class="sj-pop-info">
						<span style="width: 10%;">序号</span>
						<span style="width: 45%;">内容</span>
						<span style="width: 30%;">上报时间</span>
						<span style="width: 15%;">状态</span>
					</div>
					<vue-seamless-scroll :data="sjList2" class="seamless-warp" :class-option="classOption2">
						<div class="sj-pop-itemBox">
							<div v-for="(item,index) in sjList2" :key="index" class="sj-pop-item"
								@click.stop="showDetail(item.id)">
								<span style="width: 10%;">{{ index+1 }}</span>
								<span style="width: 45%;">{{ item.description }}</span>
								<span style="width: 30%;">{{ item.reportTime }}</span>
								<span style="width: 15%;">{{ item.status==0?'网格上报':'网格关闭' }}</span>
							</div>
						</div>
					</vue-seamless-scroll>
				</div>
				<div class="sj-pop sj-sanji">
					<div class="sj-pop-info">
						<span style="width: 10%;">序号</span>
						<span style="width: 45%;">内容</span>
						<span style="width: 30%;">上报时间</span>
						<span style="width: 15%;">状态</span>
					</div>
					<vue-seamless-scroll :data="sjList3" class="seamless-warp" :class-option="classOption3">
						<div class="sj-pop-itemBox">
							<div v-for="(item,index) in sjList3" :key="index" class="sj-pop-item"
								@click.stop="showDetail(item.id)">
								<span style="width: 10%;">{{ index+1 }}</span>
								<span style="width: 45%;">{{ item.description }}</span>
								<span style="width: 30%;">{{ item.reportTime }}</span>
								<span style="width: 15%;">{{ item.status==0?'网格上报':'网格关闭' }}</span>
							</div>
						</div>
					</vue-seamless-scroll>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="sgpt-pop" v-show="showPDetail">
				<div class="sgpt-top">查看<img src="static/images/cancel.png" @click="showPDetail=false" /></div>
				<div class="sgpt-box">
					<div class="sgpt-info">
						<div class="sgpt-left">
							<span>事件追踪</span>
							<div class="sgpt-over" style="display: flex;">
								<div style="width: 20%;">
									<div style="height: 108px;" v-for="(item,index) in pointsList" :key="index">
										{{item.dictValue}}
									</div>
								</div>
								<el-timeline style="width: 80%;margin-top: 10px;">
									<el-timeline-item v-for="(item, index) in trackList" :key="index"
										:color="item.level-1==index?'#328FCA':''">
										<div class="sgpt-info-box" v-if="item.level-1==index">
											<div><span
													style="color: #6AB1CF;">{{item.handleTime.substring(0,10)}}</span><span>{{item.name}}
													{{item.mob}}</span></div>
											<div><span>【{{item.organization}}】</span></div>
											<div><span>{{trackType[item.type-1]}}：{{item.cont}}</span><span
													style="color: #4E467A;cursor: pointer;"
													@click="showDetails(item.id)">详情</span></div>
										</div>
										<div v-else style="height: 80px;"></div>
									</el-timeline-item>
								</el-timeline>
							</div>
						</div>
						<div class="sgpt-right">
							<div class="sgpt-right-top">
								<span>事件详情</span>
								<div class="sgpt-over">
									<div class="sgpt-table">
										<div class="sgpt-line">
											<div class="sgpt-bg">事件编号</div>
											<div class="sgpt-nbg">{{sjDetail.cd}}</div>
											<div class="sgpt-bg">上报时间</div>
											<div class="sgpt-nbg">{{sjDetail.reportTime}}</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">上报人</div>
											<div class="sgpt-nbg">{{sjDetail.reporter}}</div>
											<div class="sgpt-bg">上报网格</div>
											<div class="sgpt-nbg">九龙湖镇河头村金池路上大岙</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">事件类型</div>
											<div class="sgpt-nbg">{{sjTypeList[Number(sjDetail.eventType)-1]}}</div>
											<div class="sgpt-bg">事件等级</div>
											<div class="sgpt-nbg">{{sjLevelList[sjDetail.level-1]}}</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">事发地点</div>
											<div class="sgpt-nbg">{{sjDetail.address}}</div>
											<div class="sgpt-bg">发生时间</div>
											<div class="sgpt-nbg">{{sjDetail.eventTime}}</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">事件描述</div>
											<div class="sgpt-nbg" style="width: 460px;">{{sjDetail.description}}</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">重点场所</div>
											<div class="sgpt-nbg">否</div>
											<div class="sgpt-bg">涉及人数</div>
											<div class="sgpt-nbg">2</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">重点人员</div>
											<div class="sgpt-nbg"></div>
											<div class="sgpt-bg">事件规模</div>
											<div class="sgpt-nbg"></div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">涉事企业</div>
											<div class="sgpt-nbg" style="width: 460px;"></div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">六项清单标注情况</div>
											<div class="sgpt-nbg" style="width: 460px;">未标注</div>
										</div>
										<div class="sgpt-line">
											<div class="sgpt-bg">转派前处理镇街</div>
											<div class="sgpt-nbg" style="width: 460px;"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="sgpt-right-bottom">
								<div class="sgpt-right-bottom-item">
									<div style="display: flex;flex-direction: column;">
										<span>处理之前</span>
										<div class="sgpt-right-bottom-img">
											<img src="static/images/left.png" @click="beforePre()">
											<el-image style="width: 100px; height: 100px;margin-top: 10px;"
												:src="srcBeforeList[beforeIndex]" :preview-src-list="srcBeforeList">
											</el-image>
											<el-image style="width: 100px; height: 100px;margin-top: 10px;"
												:src="srcBeforeList[beforeIndex+1]" :preview-src-list="srcBeforeList">
											</el-image>
											<img src="static/images/right.png" @click="beforeNext()">
										</div>
									</div>
									<div style="display: flex;flex-direction: column;">
										<span>处理之后</span>
										<div class="sgpt-right-bottom-img">
											<img src="static/images/left.png" @click="afterPre()">
											<el-image style="width: 100px; height: 100px;margin-top: 10px;"
												:src="srcAfterList[afterIndex]" :preview-src-list="srcAfterList">
											</el-image>
											<el-image style="width: 100px; height: 100px;margin-top: 10px;"
												:src="srcAfterList[afterIndex+1]" :preview-src-list="srcAfterList">
											</el-image>
											<img src="static/images/right.png" @click="afterNext()">
										</div>
									</div>
								</div>
								<div class="sgpt-right-bottom-item">
									<span>事件地点</span>
								</div>
							</div>
						</div>
					</div>
					<div class="sgpt-btn">
						<span>批示</span>
						<span>打印批示单</span>
						<span @click="showPDetail=false">关闭</span>
					</div>
				</div>
				<div class="sgpt-detail" v-show="showMoreDetail">
					<div class="sgpt-detail-top">详情<img src="static/images/cancel.png" @click="showMoreDetail=false" />
					</div>
					<div class="sgpt-detail-box">
						<div class="sgpt-detail-info">
							<span>记录详情</span>
							<div>
								<div class="sgpt-detail-line">
									<div class="sgpt-detail-title">姓名:</div>
									<div class="sgpt-detail-content">{{trackDetail.name}}</div>
									<div class="sgpt-detail-title">时间:</div>
									<div class="sgpt-detail-content" style="flex: 2;">{{trackDetail.handleTime}}</div>
								</div>
								<div class="sgpt-detail-line">
									<div class="sgpt-detail-title">电话:</div>
									<div class="sgpt-detail-content">{{trackDetail.mob}}</div>
									<div class="sgpt-detail-title">组织:</div>
									<div class="sgpt-detail-content" style="flex: 2;">{{trackDetail.organization}}</div>
								</div>
								<div class="sgpt-detail-line">
									<div class="sgpt-detail-title">类型:</div>
									<div class="sgpt-detail-content">{{trackType[trackDetail.type-1]}}</div>
								</div>
								<div class="sgpt-detail-line">
									<div class="sgpt-detail-title">内容:</div>
									<div class="sgpt-detail-content">{{trackDetail.cont}}</div>
								</div>
								<div class="sgpt-detail-line">
									<div class="sgpt-detail-title">图片附件:</div>
									<div class="sgpt-detail-content" style="display: flex;flex-direction: column;">
										<el-image style="width: 100px; height: 100px;margin-top: 10px;"
											:src="trackDetail.img" :preview-src-list="srcTrackList"></el-image>
										<span class="sgpt-detail-imgName"
											style="width: 100px;">{{trackDetail.id}}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="sgpt-detail-btn">
							<span @click="showMoreDetail=false">关闭</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
		<img src="static/images/bgBtn.png"
			style="width: 192px;height: 122px;position: fixed;bottom: 130px;left: 1022px;" v-if="show12"
			@click="toMapA">
		<transition name="fade">
			<div v-if="show17">
				<div class="pop-left">
					<div class="pop-bg-box wjx-bg" v-show="!showWjxList" @click="showZhxc">
						<div class="pop-bg-btn2" style="position: relative;z-index: 9999">
							<div @click.stop="showVideoBox(2)">查看示例</div>
							<div @click="showWjx">查看全部></div>
						</div>
					</div>
					<div class="pop-bg-box wjx-bg2"  v-show="showWjxList" @click="showZhxc">
						<div class="pop-bg-btn2" style="position: relative;z-index: 9999">
							<div @click.stop="showVideoBox(2)">查看示例</div>
							<div @click="showWjx">查看全部></div>
						</div>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in qyList2" :key="index"
								@click.stop="toQiye(index,item)">· {{item.name}}</div>
						</div>
					</div>
					<div class="pop-bg-box wfgl-bg" @click="showWf">
						<div class="pop-bg-btn" @click="weiffangguanli=!weiffangguanli">查看全部></div>
						<div class="pop-bg-list" v-show="weiffangguanli">
							<div class="pop-common-title">
								<span></span>
								<span>行政村</span>
								<span>户主姓名</span>
								<span>建造年代</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-three-line" v-for="(item,index) in wfList" @click.stop="toFns(item)"
									:key="index">
									<span>·</span>
									<span>{{item.addr}}</span>
									<span>{{item.name}}</span>
									<span>{{item.putTime}}</span>
								</div>
							</div>
						</div>
						<my-charts v-show="!weiffangguanli" :id='wfgl' class="echart-class" :data='wfOption'
							@click.native="clickthis(wfOption)"></my-charts>
					</div>
				</div>
				<div class="pop-bottom">
					<div class="pop-bg-box fns-bg" @click="showFns">
						<div class="pop-bg-btn2">
							<div @click="showVideoBox(1)">查看示例</div>
							<div @click="fangnishui=!fangnishui">查看全部></div>
						</div>
						<div class="pop-bg-list" v-show="fangnishui">
							<div class="pop-common-title2">
								<span></span>
								<span>水库名称</span>
								<span>报警次数</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in fnsList" :key="index"
									@click.stop="toFns(item)">
									<span>·</span>
									<span>{{item.name}}</span>
									<span :style="{color:item.alert>=15?'#D00E00':''}">{{item.alert}}</span>
								</div>
							</div>
						</div>
						<my-charts v-show="!fangnishui" :id='fns' class="echart-class" :data='fnsOption'
							@click.native="clickthis(fnsOption)"></my-charts>
					</div>
					<div class="pop-bg-box stsk-bg" style="width: 331px;" @click="showStsk">
						<div class="pop-bg-btn" @click="shantangshuiku=!shantangshuiku">查看全部></div>
						<div class="pop-bg-list" v-show="shantangshuiku">
							<div class="pop-common-box" style="height: 200px;">
								<div class="pop-one-line" v-for="(item,index) in stList" :key="index"
									@click.stop="toFns(item)">·
									{{item.name}}
								</div>
							</div>
						</div>
						<my-charts v-show="!shantangshuiku" :id='stsk' style="width: 300px;" class="echart-class"
							:data='stskOption' @click.native="clickthis(stskOption)"></my-charts>
					</div>


					<div class="pop-bg-box dzzh-bg" style="width: 331px;" v-show="!dizhizaihai" @click="showDzzh">
						<div class="pop-bg-btn" @click="dizhizaihai=!dizhizaihai">查看全部></div>
					</div>

					<div class="pop-bg-box dzzh-bg2" style="width: 331px;" v-show="dizhizaihai" @click="showDzzh">
						<div class="pop-bg-btn" @click="dizhizaihai=!dizhizaihai">查看全部></div>
						<div class="pop-bg-list">
							<div class="pop-common-box" style="height: 200px;">
								<div class="pop-one-line" v-for="(item,index) in dzList" :key="index"
									@click.stop="toFns(item)">
									{{item.name}}
								</div>
							</div>
						</div>
					</div>
					<div class="pop-bg-box bpwy-bg" style="width: 331px;" @click="showBpwy">
						<div class="pop-bg-btn" @click="bianpoweiyi=!bianpoweiyi">查看全部></div>
						<div class="pop-bg-list" v-show="bianpoweiyi">
							<div class="pop-common-title2">
								<span></span>
								<span>点位名称</span>
								<span>位移量</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in wyList2" :key="index" @click.stop="toFns(item)">
									<span>·</span>
									<span>{{item.name}}</span>
									<span>{{item.alert}}mm</span>
								</div>
							</div>
						</div>
						<img :src="bpwyb" @click="clickImg(bpwyb)" v-show="!bianpoweiyi" style="height: 180px;">
					</div>
					<div class="pop-bg-box ljfl-bg" @click="showLjfl">
						<div class="pop-bg-btn" @click="lajifenlei=!lajifenlei">查看全部></div>
						<div class="pop-bg-list" v-show="lajifenlei">
							<div class="pop-common-title2">
								<span></span>
								<span>点位名称</span>
								<span>投放时间</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in ljflglList" :key="index"
									@click.stop="toMap(item)">
									<span>·</span>
									<span>{{item.name}}</span>
									<span>{{item.putTime}}</span>
								</div>
							</div>
						</div>
						<my-charts v-show="!lajifenlei" :id='xcjg' class="echart-class" :data='ljflOption'
							@click.native="clickthis(ljflOption)"></my-charts>
					</div>
				</div>
				<div class="pop-right">
					<div class="pop-bg-box xszh-bg">
						<div class="pop-xszh">
							<div class="pop-item" v-for="(item,index) in jkList" :key="index" @click.stop="toZf(item)">
								<span>{{item.name}}</span>
							</div>
						</div>
					</div>
					<div class="pop-bg-box spjk-bg">
						<video v-show="showZhibo" id="video" ref="video" controls width="100%" height="98%"></video>
					</div>
				</div>
				<div class="pop-center" v-if="centerShow">
					<img @click="centerShow = false" v-show="centerShow" src="../../public/static/images/cancel.png"
						style="position: absolute;top: -20px;right: -20px;z-index: 200;">
					<my-charts v-show="type==1" :id='common' style="width: 1054px;height: 595px;" class="echart-class"
						:data='commonOption'></my-charts>
					<div class="pop-wjxBg" v-if="type==2">
						<div class="wjx-tap">
							<div class="wjx-top-bg">
								<div v-for="(item,index) in wjxTapList" :key="index" @click="switchDay(index)"
									:class="{'wjx-active':tapIndex==index}">{{item.day}}</div>
							</div>
							<div class="wjx-bottom-bg">
								<div class="wjx-bottom-item">
									<div>{{wjxTapList[tapIndex].order}}</div>
									<span>工单总数</span>
								</div>
								<div class="wjx-bottom-item">
									<div>{{wjxTapList[tapIndex].check}}</div>
									<span>检查总数</span>
								</div>
								<div class="wjx-bottom-item">
									<div>{{wjxTapList[tapIndex].task}}</div>
									<span>往期任务数</span>
								</div>
							</div>
						</div>
						<div class="wjx-list">
							<vue-seamless-scroll :data="wjxList" class="seamless-warp2" :class-option="classOption4">
								<div class="wjx-list-item" v-for="(item,index) in wjxList" :key="index"
									@click="showWjxDetail(item)">
									<span>协作人：{{item.name}}</span>
									<span>巡查人：{{item.name2}}</span>
									<span>检查时间：{{item.time}}</span>
									<span>店铺名称：{{item.shopName}}</span>
									<span>检查结果：<span :style="item.status=='异常'?'color:#FF002A':''">{{item.status}}</span></span>
								</div>
							</vue-seamless-scroll>
						</div>
						<div class="wjx-detail" v-show="isShowWjxDetail">
							<img @click="isShowWjxDetail=false" class="cancelLogo"
								src="../../public/static/images/cancel.png" v-show="isShowWjxDetail"
								style="position: absolute;top: -20px;right: -20px;">
							<img src="../bgImages/wjxDetailT.png" class="wjx-detail-title">
							<span>巡查人：{{wjxDetail.name2}}</span>
							<span>检查时间：{{wjxDetail.time}}</span>
							<span>协作人：{{wjxDetail.name}}</span>
							<span>店铺名称：{{wjxDetail.shopName}}</span>
							<div class="wjx-detail-status">
								<span style="margin-bottom: 0;" class="wjx-detail-status-item">检查结果：<span
										:style="wjxDetail.status=='异常'?'color:#FF002A':''">{{wjxDetail.status}}</span></span>
								<img src="../bgImages/wjxDetailL.png">
								<span class="wjx-detail-status-item">市容检查：<span
										:style="wjxDetail.srjc=='异常'?'color:#FF002A':''">{{wjxDetail.srjc}}</span></span>
								<span class="wjx-detail-status-item">油烟检查：<span
										:style="wjxDetail.yyjc=='异常'?'color:#FF002A':''">{{wjxDetail.yyjc}}</span></span>
								<span @click="showWjxErr(wjxDetail.wspf)" class="wjx-detail-status-item">污水排放：<span
										:style="wjxDetail.wspf=='异常'?'color:#FF002A':''"
										>{{wjxDetail.wspf}}</span></span>
								<span class="wjx-detail-status-item">垃圾分类：<span
										:style="wjxDetail.ljfl=='异常'?'color:#FF002A':''">{{wjxDetail.ljfl}}</span></span>
								<span class="wjx-detail-status-item">燃气安全：<span
										:style="wjxDetail.rqaq=='异常'?'color:#FF002A':''">{{wjxDetail.rqaq}}</span></span>
								<span class="wjx-detail-status-item">其他检查：<span
										:style="wjxDetail.qtjc=='异常'?'color:#FF002A':''">{{wjxDetail.qtjc}}</span></span>
							</div>
						</div>
						<div class="wjx-error" v-show="showWjxError">
							<img @click="showWjxError=false" class="cancelLogo"
								src="../../public/static/images/cancel.png" v-show="showWjxError"
								style="position: absolute;top: -10px;right: -10px;">
							<div class="wjx-error-title">污水排放异常</div>
							<div class="wjx-error-cont">异常原因:污水排放异常</div>
							<img class="wjx-error-img" src="../bgImages/污水.jpg">
						</div>
					</div>
					<img :src="centerImg" v-show="type==3" style="width: 100%;height: 100%;">
				</div>
			</div>
		</transition>
		<img src="static/images/zhxcBg.jpg" v-show="show18" style="width: 2236px;height: 1104px;margin-top: 120px;">
		<!-- <BottomTab :list="tabList" @updata="getIndex"></BottomTab> -->
	</div>
</template>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script>
	let Hls = require('hls.js');
	import bpwyb from '../bgImages/边坡位移表.png'
	import myCharts from '@/components/MyCharts.vue'
	import vueSeamlessScroll from 'vue-seamless-scroll'
	import PopBox from '@/components/PopBox.vue'
	import BottomTab from '@/components/BottomTab.vue'
	//危房监控
	import hik4 from '@/components/hik/index4.vue'
	//执法监控
	import hik2 from '@/components/hik/index2.vue'
	//山塘防溺水
	import hik5 from '@/components/hik/index5.vue'
	export default {
		name: 'Jczl',
		props: {},
		data() {
			return {
				bpwyb,
				info: {}, //信息
				tsryList: [],
				grid: '',
				wjxTapList: [{
					day: '今日',
					order: 0,
					check: 3,
					task: 0
				}, {
					day: '本周',
					order: 0,
					check: 20,
					task: 0
				}, {
					day: '本月',
					order: 0,
					check: 65,
					task: 0
				}],
				tapIndex: 1,
				wjxList: [{
					name: '高金财',
					name2: '毛松',
					time: '2021/7/9',
					time2: '2021-6-3 10:21:38',
					shopName: '宁波市镇海区九龙湖昱如副食品店',
					status: '正常',
					srjc: '正常',
					yyjc: '正常',
					wspf: '正常',
					ljfl: '正常',
					rqaq: '正常',
					qtjc: '正常'
				},  {
					name: '谢咪琴',
					name2: '徐章伟',
					time: '2021/6/18',
					time2: '2021-6-3 10:21:38',
					shopName: '宁波市镇海互感器厂有限公司',
					status: '正常',
					srjc: '正常',
					yyjc: '正常',
					wspf: '正常',
					ljfl: '正常',
					rqaq: '正常',
					qtjc: '正常'
				}, {
					name: '高金财',
					name2: '毛松',
					time: '2021/6/18',
					time2: '2021-6-3 10:21:38',
					shopName: '宁波市镇海鼎力紧定螺钉有限公司',
					status: '正常',
					srjc: '正常',
					yyjc: '正常',
					wspf: '正常',
					ljfl: '正常',
					rqaq: '正常',
					qtjc: '正常'
				},{
					name: '谢咪琴',
					name2: '徐章伟',
					time: '2021/5/14',
					time2: '2021-6-3 10:21:38',
					shopName: '宁波市镇海区九龙湖昱如副食品店',
					status: '异常',
					srjc: '正常',
					yyjc: '正常',
					wspf: '异常',
					ljfl: '正常',
					rqaq: '正常',
					qtjc: '正常'
				}],
				wjxDetail: {},
				lajifenlei: false,
				weiffangguanli: false,
				fangnishui: false,
				shantangshuiku: false,
				dizhizaihai: false,
				bianpoweiyi: false,
				centerShow: false,
				isShowWjxDetail: false, // 5+x详情显示
				xcjg: 'xcjg',
				wfgl: 'wfgl',
				fns: 'fns',
				stsk: 'stsk',
				dzzh: 'dzzh',
				bpwy: 'bpwy',
				common: 'common',
				oldMen: 'oldMen',
				disabilityMen: 'disabilityMen',
				type: 0,
				tsryType: 0,
				commonOption: {},
				oldMenOption: {
					tooltip: {},
					yAxis: {
						type: 'category',
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 12
						},
						data: ['95-100岁', '90-95岁', '85-90岁', '80-85岁', '70-80岁','60-70岁']
					},
					xAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 12
						},
					},
					series: [{
						data: [0, 0, 0, 0, 0, 0],
						type: 'bar',
						itemStyle: {
							normal: {
								color:function(params){
									var colorList = ['#FF3B24','#FD7659', '#FE8B50', '#FFBC3B', '#BCC355','#6BB67E'];
									return colorList[params.dataIndex]
								}
							}
						}
					}],
					grid: {
						top: "30px",
						left: "80px",
						right: "10px",
						bottom: "30px"
					}
				},
				disabilityMenOption: {
					tooltip: {},
					yAxis: {
						type: 'category',
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 12
						},
						data: ['残疾人1级', '残疾人2级', '残疾人3级', '残疾人4级']
					},
					xAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 12
						},
					},
					series: [{
						data: [0, 0, 0, 0],
						type: 'bar',
						itemStyle: {
							normal: {
								color:function(params){
									var colorList = ['#FF3B24','#FD7659', '#FE8B50', '#FFBC3B'];
									return colorList[params.dataIndex]
								}
							}
						}
					}],
					grid: {
						top: "30px",
						left: "80px",
						right: "10px",
						bottom: "30px"
					},
				},
				wfOption: {
					xAxis: {
						type: 'category',
						data: ['1949以前', '1960-1970', '1970-1980', '1980-1990', '1990-2000', '2000-2010', '2010-2020'],
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 16
						},
						axisTick: {
							show: false
						}
					},
					yAxis: {
						max: 5,
						minInterval: 1,
						type: 'value',
						splitLine: {
							show: false
						},
						axisLabel: {
							color: '#fff',
							fontSize: 16
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
					},
					series: [{
						data: [1, 0, 1, 0, 0, 0, 0],
						type: 'bar',
						barWidth: 20
					}],
					grid: {
						top: "30px",
						left: "30px",
						right: "30px",
						bottom: "30px"
					}
				},
				ljflOption: {
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['0-4点', '4-8点', '8-12点', '12-16点', '16-20点', '20-24点'],
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						},
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							color: '#fff'
						},
						axisLine: {
							lineStyle: {
								color: '#fff'
							}
						},
					},
					series: [{
						data: [28, 30, 36, 34, 38, 39, 47],
						type: 'line',
						// areaStyle: {}
					}],
					grid: {
						top: "30px",
						left: "30px",
						right: "30px",
						bottom: "30px"
					}
				},
				stskOption: {
					color: ['#5da7f5', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0', '#b798e5'],
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						left: 'center',
						top: 'bottom',
						data: []
					},
					toolbox: {},
					series: [{
						name: '面积模式',
						type: 'pie',
						radius: '100%',
						center: ['50%', '50%'],
						roseType: 'area',
						data: [],
						top: "30",
						left: "30",
						right: "30",
						bottom: "30"
					}],
				},
				fnsOption: {
					xAxis: {
						type: 'category',
						data: ['1949', '1960', '1970', '1980', '1990'],
						axisLine: {
							lineStyle: {
								color: "#fff"
							}
						},
						axisLabel: {
							color: '#fff',
							fontSize: 16
						},
						axisTick: {
							show: false
						}
					},
					yAxis: {
						minInterval: 1,
						type: 'value',
						splitLine: {
							show: false
						},
						axisLabel: {
							color: '#fff',
							fontSize: 16
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
					},
					series: [{
						data: [10, 20, 30, 20, 25],
						type: 'bar',
						barWidth: 20
					}],
					dataZoom : [{}],
					grid: {
						top: "30px",
						left: "60px",
						right: "30px",
						bottom: "30px"
					}
				},
				bpwyOption: {
					// 三个图表位置配置
					grid: [{
						top: '2%',
						height: "25%",
						width: "85%"
					}, {
						top: '35%',
						height: "25%",
						width: "85%"
					}, {
						top: '70%',
						height: "25%",
						width: "85%"
					}],
					title: [{
							left: 'center',
							text: '监测点1',
							textStyle: {
								color: '#DDD'
							}
						}, {
							top: '30%',
							left: 'center',
							text: '监测点2',
							textStyle: {
								color: '#DDD'
							}
						},
						{
							top: '65%',
							left: 'center',
							text: '监测点3',
							textStyle: {
								color: '#DDD'
							}
						}
					],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow',
						}
					},
					// x轴配置
					xAxis: [{
							gridIndex: 0,
							type: 'category',
							data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '22:00'],
							axisLine: {
								lineStyle: {
									color: "#999"
								}
							}
						},
						{
							gridIndex: 1,
							type: 'category',
							data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '22:00'],
							axisLine: {
								lineStyle: {
									color: "#999"
								}
							}
						},
						{
							gridIndex: 2,
							type: 'category',
							data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '22:00'],
							axisLine: {
								lineStyle: {
									color: "#999"
								}
							}
						}
					],
					// y轴配置
					yAxis: [{
							type: 'value',
							gridIndex: 0, //对应前面grid的索引位置（第1个）
							splitNumber: 4,
							splitLine: {
								lineStyle: {
									type: 'dashed',
									color: '#DDD'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									color: "#333"
								},
							},
							nameTextStyle: {
								color: "#999"
							},
							splitArea: {
								show: false
							}
						}, {
							type: 'value',
							gridIndex: 1, //对应前面grid的索引位置（第2个）
							splitNumber: 4,
							splitLine: {
								lineStyle: {
									type: 'dashed',
									color: '#DDD'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									color: "#333"
								},
							},
							nameTextStyle: {
								color: "#999"
							},
							splitArea: {
								show: false
							}
						},
						{
							type: 'value',
							gridIndex: 2, //对应前面grid的索引位置（第3个）
							splitNumber: 4,
							splitLine: {
								lineStyle: {
									type: 'dashed',
									color: '#DDD'
								}
							},
							axisLine: {
								show: false,
								lineStyle: {
									color: "#333"
								},
							},
							nameTextStyle: {
								color: "#999"
							},
							splitArea: {
								show: false
							}
						}
					],
					series: [{
							xAxisIndex: 0,
							yAxisIndex: 0,
							type: 'line',
							smooth: true,
							symbolSize: 8,
							data: [0, 0, 0, 0, 0, 0, 0],
							barWidth: '30%',
							itemStyle: {
								normal: {
									color: '#f0c725'
								}
							}
						},
						{
							xAxisIndex: 1,
							yAxisIndex: 1,
							type: 'line',
							smooth: true,
							symbolSize: 8,
							data: [0, 0, 0, 0, 0, 0, 0],
							barWidth: '30%',
							itemStyle: {
								normal: {
									color: '#16f892'
								}
							}
						},

						{
							xAxisIndex: 2,
							yAxisIndex: 2,
							type: 'line',
							smooth: true,
							symbolSize: 8,
							data: [0, 0, 0, 0, 0, 0, 0],
							barWidth: '30%',
							itemStyle: {
								normal: {
									color: '#f0c725'
								}
							}
						}
					]

				},
				beforeIndex: 0,
				afterIndex: 0,
				srcBeforeList: [],
				srcAfterList: [],
				srcTrackList: [],
				e: 0,
				codes: '',
				cType: "3",
				hikShow: false,
				fiveList: [],
				title: '',
				imgIndex: 0,
				imgShow: false,
				showP: false, //四个平台事件列表
				show: false, //山塘统计
				show2: false, //网格背景图
				show3: false,
				show4: false, //商家统计
				show5: false, //执法设备
				show6: false, //四个平台背景图
				show7: false, //危房私人建房总览
				show8: false, //网格长
				show9: false, //危房
				show10: false, //私人建房
				show11: false, //泥石流监控
				show12: false, //小地图图标，返回
				show13: false, //一户一档
				show14: false, //综合监管总览
				show15: false, //位移监测点
				show16: false, //水库统计
				show17: false, //综合治理10个框
				show18: false, //综合巡查图片
				show20: false, //乡村关爱垃圾分类点位
				showVideo: false, //防溺水视频
				showXmb: false, //小卖部
				showPDetail: false, //四个平台事件详情
				showMoreDetail: false, //四个平台点击详情弹窗
				wgryShow: false, //显示网格人员列表
				showPBtn: true, //四个平台显隐按钮
				showWjxList: false, //5+x图列表切换
				showWjxError: false, //5+x异常
				showZhibo: false, //显示鼎力直播
				tsryShow:false, //特殊人员显示
				hls:'',
				videoUrl: '',
				keyWord: '',
				ydyh: false,
				list: [{
					num: 2,
					url: 'static/images/wfsl.png',
					title: '危房数量'
				}, {
					num: 5,
					url: 'static/images/srjf.png',
					title: '私人建房'
				}],
				list2: [{
					num: 722,
					url: 'static/images/wg-zhs.png',
					title: '总户数',
					name: ''
				}, {
					num: 2015,
					url: 'static/images/wg-zrs.png',
					title: '总人数',
					name: ''
				}, {
					num: 388,
					url: 'static/images/wg-zhs.png',
					title: '租户数',
					name: ''
				}, {
					num: 13,
					url: 'static/images/wg-dbh.png',
					title: '低保户',
					name: '低保',
					x: '121.5403',
					y: '30.035791'
				}, {
					num: 657,
					url: 'static/images/wg-lnr.png',
					title: '老年人',
					name: '老年人',
					x: '121.504574',
					y: '30.05171',
					data: []
				}, {
					num: 104,
					url: 'static/images/wg-czrs.png',
					title: '残障人',
					name: '残障人员',
					x: '121.536214',
					y: '30.033909',
					data: []
				}, {
					num: 7,
					url: 'static/images/wg-tsjsjt.png',
					title: '计生家庭',
					name: ''
				}, {
					num: 0,
					url: 'static/images/wg-sqjzry.png',
					title: '五保户',
					name: '五保户',
					x: '121.502692',
					y: '30.052162'
				}, {
					num: 0,
					url: 'static/images/wg-sqjzry.png',
					title: '矫正人员',
					name: ''
				}],
				wgryList: [],
				wgList: [{
					num: '长胜田央沈',
					url: 'static/images/house.png',
					title: '网格名'
				}, {
					num: '黄杰锋',
					url: 'static/images/zhs.png',
					title: '网格长'
				}, {
					num: '陈如良',
					url: 'static/images/zhs.png',
					title: '网格技术员'
				}, {
					num: 256,
					url: 'static/images/zrs.png',
					title: '网格人口'
				}],
				zlList: [{
					url: 'static/images/zl-st.png',
					name: '山塘'
				}, {
					url: 'static/images/zl-sk.png',
					name: '水库'
				}, {
					url: 'static/images/zl-wf.png',
					name: '危房'
				}, {
					url: 'static/images/zl-srjf.png',
					name: '私人建房'
				}, {
					url: 'static/images/zl-nsl.png',
					name: '地址灾害'
				}, {
					url: 'static/images/zl-wyjcd.png',
					name: '位移检测点'
				}, {
					url: 'static/images/zl-sj.png',
					name: '商家'
				}],
				xcgaList: [],
				ljflList: [],
				tabList: [{
					hasUrl: false,
					title: '网格管理'
				}, {
					hasUrl: false,
					title: '综合监管'
				}],
				stList: [],
				skList: [],
				fnsList: [],
				sjs: [],
				trackList: [],
				trackDetail: {},
				pointsList: [],
				trackType: ['上报', '关闭'],
				sjLevelList: ['一级事件', '二级事件', '三级事件'],
				sjTypeList: ['城市管理', '党群工作', '交通安全', '困难救助', '矛调来访', '矛盾纠纷', '农林水利', '其他', '食药安全', '文教体育', '消防安全', '信访维稳',
					'专项拉练'
				],
				sjDetail: {},
				sjList: [],
				sjList2: [],
				sjList3: [],
				jkList: [],
				qyList: [],
				qyList2: [],
				wfList: [],
				dzList: [],
				wyList: [], //内涝点
				wyList2: [], //边坡位移
				wgzList: [],
				ljflglList: [],
				centerImg: ''
			}
		},
		components: {
			PopBox,
			BottomTab,
			hik2,
			hik4,
			hik5,
			vueSeamlessScroll,
			myCharts
		},
		mounted() {
			window.addEventListener('message', this.listenerFun)
			this.$ajax.getDictionary('eventTrack').then(res => {
				this.pointsList = res
			})
			this.getEventList('')
			this.getList()
			this.getGridList()
			this.getGridTotal()
			// this.$parent.isChildShow = false
			// this.$parent.tabActive = 0
			this.show13 = true
			// this.show2 = true
			this.showPBtn = true
		},
		beforeDestroy() {
			this.videoPause();
			window.removeEventListener('message', this.listenerFun)
		},
		methods: {
			// 网格打开图层
			showPoints(item) {
				// this.onOff('关闭图层','网格')
				this.tsryShow = false
				if (item.name) {
					this.show2 = false
					let a = {
						X: item.x,
						Y: item.y
					}
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff('打开图层', item.name)
					// this.$parent.test(a)
				}
				this.tsryShow = true
				this.info.name = item.title
				console.log(this.grid)
				if(item.title=='老年人') {
					this.tsryType = 1
					this.oldMenOption.series[0].data = item.data
				} else if (item.title=='残障人') {
					this.tsryType = 2
					this.disabilityMenOption.series[0].data = item.data
				} else if (item.title=='低保户') {
					let data = {
						grid: this.grid,
						poorType: 1,
						size: 30,
						current: 1
					}
					this.getTsryList(data)
					this.tsryType = 3
				} else if (item.title=='计生家庭') {
					let data = {
						grid: this.grid,
						poorType: 3,
						size: 30,
						current: 1
					}
					this.getTsryList(data)
					this.tsryType = 3
				} else if (item.title=='五保户') {
					let data = {
						grid: this.grid,
						poorType: 2,
						size: 30,
						current: 1
					}
					this.getTsryList(data)
					this.tsryType = 3
				} else if (item.title=='矫正人员') {
					this.tsryList = []
					this.tsryType = 3
				} else {
					this.tsryShow = false
				}
			},
			//打开关闭图层
			onOff(type, name) {
				let a = {
					type: type,
					name: name
				}
				this.$parent.test(a);
			},
			offHik() {
				this.$refs.videoPlayer2.off()
				this.$refs.videoPlayer5.off()
				this.hikShow = false;
			},
			//点击小图还原
			toMapA() {
				// this.show2 = true
				this.show12 = false
				this.show8 = false
				this.wgryShow = false
				this.$parent.test("网格");
				this.onOff('打开图层', '网格')
				this.onOff('关闭图层', '一户一档人口')
				this.offHik()
				this.getEventList("")
				this.getGridTotal()
				this.grid = ""
			},
			toMap(item) {
				this.$refs.videoPlayer5.off()
				this.codes = item.code;
				this.$refs.videoPlayer5.initPlugin()
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.$parent.test(a);
				if (this.e == 0) {
					this.show12 = true
				}

				this.show2 = false
			},
			offHikShow() {
				this.$refs.videoPlayer2.off()
				this.hikShow = false;
			},
			//点击执法仪看监控
			toZf(item) {
				this.showZhibo = false
       // console.log(item)
			  this.hikShow = true;
				this.$refs.videoPlayer2.off()
				this.codes = item.code;
				this.$refs.videoPlayer2.initPlugin()

				this.onOff("打开图层","执法记录仪")
				let a = {
				  X: item.lng,
				  Y: item.lat,
				}
				this.$parent.test(a);
			},
			//防溺水
			toFns(item) {
				this.showZhibo = false
				this.$refs.videoPlayer5.off()
				this.codes = item.code;
				this.$refs.videoPlayer5.initPlugin()
				console.log(item)
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.$parent.test(a);

			},
			getIndex(e) {
				this.e = e;
				if (e == 0) {
					// 网格管理
					this.grid = ""
					this.getGridTotal()
					this.getEventList('')
					// this.$parent.isChildShow = false
					this.offHik()
					this.onOff("关闭图层", "山塘水库")
					this.onOff("关闭图层", "综合监管")
					this.onOff("关闭图层", "危房")
					this.onOff("关闭图层", "防溺水监控点")
					this.onOff("关闭图层", "泥石流")
					this.onOff("关闭图层", "边坡位移")
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff("关闭图层", "执法记录仪")
					this.onOff('关闭图层', '一户一档人口')
					this.$parent.test("网格");
					this.onOff("打开图层", "网格")
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show12 = false
					this.show13 = true
					this.show14 = false
					this.show15 = false
					this.show16 = false
					this.show17 = false
					this.show18 = false
					this.showXmb = false
					this.showP = false
					this.showPDetail = false
					this.showVideo = false
					this.wgryShow = false
					this.showPBtn = true
					this.centerShow = false
					this.showZhibo = false
					this.showWjxList = false
					this.isShowWjxDetail = false
					this.showWjxError = false
					this.tsryShow = false
				}
				else if (e == 1) {
					// 综合监管
					this.grid = ""
					this.offHik()
					this.onOff("关闭图层", "综合监管")
					this.onOff("关闭图层", "山塘水库")
					this.onOff("关闭图层", "危房")
					this.onOff("关闭图层", "防溺水监控点")
					this.onOff("关闭图层", "泥石流")
					this.onOff("关闭图层", "边坡位移")
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff("关闭图层", "执法记录仪")
					this.onOff('关闭图层', '一户一档人口')
					this.onOff("关闭图层", "网格")
					this.show2 = false
					this.show = false
					this.show3 = false
					this.show4 = false
					this.show5 = false
					this.show6 = false
					this.show7 = false
					this.show8 = false
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show12 = false
					this.show13 = false
					this.show14 = false
					this.show15 = false
					this.show16 = false
					this.show17 = true
					this.show18 = false
					this.showXmb = false
					this.showP = false
					this.showPDetail = false
					this.showVideo = false
					this.wgryShow = false
					this.showPBtn = false
					this.centerShow = false
					this.showZhibo = false
					this.showWjxList = false
					this.isShowWjxDetail = false
					this.showWjxError = false
					this.tsryShow = false
				}
			},
			getTabIndex(e) {
				if (e == 0) {
					// 山塘列表
					this.show = true
					this.show4 = false
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show15 = false
					this.show16 = false
					this.showXmb = false
				} else if (e == 1) {
					// 水库列表
					this.show = false
					this.show4 = false
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show15 = false
					this.show16 = true
					this.showXmb = false
				} else if (e == 2) {
					// 危房列表
					this.show = false
					this.show4 = false
					this.show9 = true
					this.show10 = false
					this.show11 = false
					this.show15 = false
					this.show16 = false
					this.showXmb = false
				} else if (e == 3) {
					// 私人建房列表
					this.show = false
					this.show4 = false
					this.show9 = false
					this.show10 = true
					this.show11 = false
					this.show15 = false
					this.show16 = false
					this.showXmb = false
				} else if (e == 4) {
					// 地质灾害列表
					this.show = false
					this.show4 = false
					this.show9 = false
					this.show10 = false
					this.show11 = true
					this.show15 = false
					this.show16 = false
					this.showXmb = false
				} else if (e == 5) {
					// 位移监测点列表
					this.show = false
					this.show4 = false
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show15 = true
					this.show16 = false
					this.showXmb = false
				} else if (e == 6) {
					// 商家列表
					this.show = false
					this.show4 = true
					this.show9 = false
					this.show10 = false
					this.show11 = false
					this.show15 = false
					this.show16 = false
					this.showXmb = false
				}
			},
			showImg(e) {
				this.imgShow = true
				this.imgIndex = e
			},
			close() {
				this.imgShow = false
			},
			gridMap(item) {
				let a = {
					grid: "网格",
					name: item.alias
				}
				this.wgryShow = true
				this.tsryShow = false
				this.$parent.test(a)
				this.grid = item.id
				this.getGridDetail(item.id)
			},
			peopleMap(item) {
				this.onOff('打开图层', '一户一档人口')
				let a = {
					layer: '一户一档',
					name: item.name
				}
				let that = this
				setTimeout(function() {
					that.$parent.test(a)
				}, 1000)
				this.onOff('关闭图层', '网格')
				this.show12 = true
			},
			getGridDetail(id) {
				this.$ajax.getGridDetail({
					id: id
				}).then(res => {
					console.log(res)
					this.wgList[0].num = res.name
					this.wgList[1].num = res.leader
					this.wgList[2].num = res.technician
					this.wgList[3].num = res.population
					this.list2[0].num = res.households
					this.list2[1].num = res.population
					this.list2[2].num = res.tenants
					this.list2[3].num = res.lowIncome
					this.list2[4].num = res.aged
					this.list2[5].num = res.disabled
					this.list2[6].num = res.special
					this.list2[7].num = res.fives
					this.list2[8].num = res.correction
					this.list2[4].data = [res.aged6,res.aged5,res.aged4,res.aged3,res.aged2,res.aged1]
					this.list2[5].data = [res.disabled1,res.disabled2,res.disabled3,res.disabled4]
				})
				this.getEventList(id)
				let data = {
					grid: id,
					current: 1,
					size: 200,
					relation: '户主'
				}
				this.getPeopleList(data)
				this.showPDetail = false
				this.show8 = true
			},
			getPeopleList(data) {
				this.$ajax.getPeopleList(data).then(res => {
					this.wgryList = res.records
				})
			},
			getPopIndex(e) {
				if (e == 1) {
					this.show9 = false
					this.show10 = true
				} else {
					this.show9 = true
					this.show10 = false
				}
			},
			showVideoBox(e) {
				if (e == 1) {
					this.videoUrl =
						'https://example-szxc.oss-cn-hangzhou.aliyuncs.com/%E9%98%B2%E6%BA%BA%E6%B0%B4%E8%A7%86%E9%A2%91.mp4'
				} else if (e == 2) {
					this.videoUrl = 'https://example-szxc.oss-cn-hangzhou.aliyuncs.com/5%2BX%E8%A7%86%E9%A2%91.mp4'
				}
				this.show = false
				this.show3 = false
				this.show4 = false
				this.show5 = false
				this.show6 = false
				this.show7 = false
				this.show8 = false
				this.show9 = false
				this.show10 = false
				this.show11 = false
				this.show12 = false
				this.show13 = false
				this.show14 = false
				this.show15 = false
				this.show16 = false
				this.show18 = false
				this.showXmb = false
				this.showP = false
				this.showPDetail = false
				this.wgryShow = false
				this.showPBtn = false
				this.centerShow = false
				this.showVideo = true
			},
			closeVideo() {
				this.showVideo = false
			},
			toQiye(e, item) {
				let a = {
					X: item.lng,
					Y: item.lat,
					heading: 230
				}
				this.$parent.test(a);

				if(e==0) {
					this.showZhibo = true
					if (Hls.isSupported()) {
					    this.hls = new Hls();
					    this.hls.loadSource("http://cmgw-vpc.lechange.com:8888/LCO/6F0C1AAPAZ9C121/19/1/20210720T091439/41dae95fe195c9636b0391ad9cada5b6.m3u8");
					    this.hls.attachMedia(this.$refs.video);
					    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
					        console.log('加载成功');
					        this.$refs.video.play();
					    });
					    this.hls.on(Hls.Events.ERROR, (event, data) => {
					        console.log('加载失败');
					        console.log(event)
					        console.log(data)
					    });
					}
				}
			},
			toUserMap() {
				if (this.ydyh === false) {
					this.$parent.test("一户一档人口");
					this.ydyh = true
				}
				this.show2 = false
				this.$parent.test("长胜38号")
			},
			showDetail(id) {
				this.showPDetail = true
				this.showMoreDetail = false
				this.$ajax.getEventDetail({
					id: id
				}).then(res => {
					this.srcBeforeList = res.img1.split(",")
					this.srcAfterList = res.img2.split(",")
					this.sjDetail = res
					this.$ajax.getTrackList({
						eventId: id,
						current: 1,
						size: 10
					}).then(respon => {
						this.trackList = respon.records
						let lastTrack = {}
						if (this.trackList[this.trackList.length - 1].level == 9) {
							lastTrack = this.trackList.splice(this.trackList.length - 1, 1)
							for (let i = 0; i < this.pointsList.length; i++) {
								if (this.trackList.length < this.pointsList.length) {
									this.trackList.push({})
								}
							}
							if (Object.keys(lastTrack).length > 0) {
								this.trackList.splice(8, 1, lastTrack[0])
							}
						} else {
							for (let i = 0; i < this.pointsList.length; i++) {
								if (this.trackList.length < this.pointsList.length) {
									this.trackList.push({})
								}
							}
						}
					})
				})
			},
			showDetails(e) {
				this.$ajax.getTrackDetail({
					id: e
				}).then(res => {
					this.trackDetail = res
					this.srcTrackList = res.img.split(",")
				})
				this.showMoreDetail = true
			},
			beforePre() {
				if (this.beforeIndex <= 0) {
					return
				} else {
					this.beforeIndex--
				}
			},
			beforeNext() {
				if (this.beforeIndex >= this.srcBeforeList.length - 2) {
					return
				} else {
					this.beforeIndex++
				}
			},
			afterPre() {
				if (this.afterIndex <= 0) {
					return
				} else {
					this.afterIndex--
				}
			},
			afterNext() {
				if (this.afterIndex >= this.srcAfterList.length - 2) {
					return
				} else {
					this.afterIndex++
				}
			},
			getEventList(id) {
				let sjList = []
				let sjList2 = []
				let sjList3 = []
				this.$ajax.getEventList({
					size: 30,
					current: 1,
					grid: id
				}).then(res => {
					res.records.forEach((item, index) => {
						if (item.level == 1) {
							sjList.push(item)
						} else if (item.level == 2) {
							sjList2.push(item)
						} else if (item.level == 3) {
							sjList3.push(item)
						}
					})
					this.sjList = sjList
					this.sjList2 = sjList2
					this.sjList3 = sjList3
				})
			},
			getGridList() {
				this.$ajax.getGridList({
					size: 10,
					current: 1
				}).then(res => {
					this.wgzList = res.records
				})
			},
			getGridTotal() {
				this.$ajax.getGridTotal().then(res => {
					this.list2[0].num = res.households
					this.list2[1].num = res.population
					this.list2[2].num = res.tenants
					this.list2[3].num = res.lowIncome
					this.list2[4].num = res.age
					this.list2[5].num = res.disabled
					this.list2[6].num = res.special
					this.list2[7].num = res.fives
					this.list2[8].num = res.correction
					this.list2[4].data = [res.age6,res.age5,res.age4,res.age3,res.age2,res.age1]
					this.list2[5].data = [res.disabled1,res.disabled2,res.disabled3,res.disabled4]
				})
			},
			getfnsList() {
				this.$ajax.getCamera2({
					type: '防溺水监控',
					order: 'alert'
				}).then(res => {
					let data1 = []
					let data2 = []
					res.forEach(item => {
						data1.push(item.name)
						data2.push(item.alert)
					})
					this.fnsOption.xAxis.data = data1
					this.fnsOption.series[0].data = data2
					this.fnsList = res
				})
			},
			getList() {
				let that = this
				this.$ajax.getCamera('移动执法').then(res => {
					this.jkList = res
				})
				this.$ajax.getCamera('危房管理').then(res => {
					this.wfList = res
				})
				this.$ajax.getCamera('泥石流监控').then(res => {
					this.dzList = res
					this.$ajax.getCamera('内涝点监管').then(resp => {
						this.wyList = resp
						this.$nextTick(()=>{
							this.dzList.push(...resp)
						})
					})
				})
				this.$ajax.getCamera2({
					type: '山塘水库',
					order: 'volume'
				}).then(res => {
					let data = []
					res.forEach(item => {
						let value = {
							value: item.volume,
							name: item.name
						}
						data.push(value)
					})
					this.stskOption.series[0].data = data
					this.stList = res
				})
				this.getfnsList()
				setInterval(function() {
					that.getfnsList()
				}, 300000)
				this.$ajax.getCamera('垃圾分类').then(res => {
					this.ljflglList = res
				})
				this.$ajax.getCamera('一企一档').then(res => {
					this.qyList2 = res
					this.$ajax.getEatList({
						size: 50,
						current: 1
					}).then(resp => {
						this.$nextTick(() =>{
							this.qyList2.push(...resp.records)
						})
					})
				})
				this.$ajax.getRubbishData().then(res => {
					this.ljflOption.series[0].data = Object.values(res)
				})
				this.$ajax.getCamera('边坡位移').then(res=> {
					this.wyList2 = res
				})
				// this.$ajax.getPatrolList({size:100,current:1}).then(res => {
				// 	this.wjxList = res.records
				// })
			},
			clickthis(option) {
				this.centerShow = true
				this.type = 1
				this.commonOption = option
			},
			showWjx() {
				this.showWjxList = !this.showWjxList
				this.centerShow = true
				this.type = 2
			},
			clickImg(img) {
				console.log(img)
				this.type = 3
				this.centerShow = true
				this.centerImg = img
			},
			listenerFun(e) {
				this.tsryShow = false
				if (e.data == "横溪钱家、大同高屋") {
					this.wgryShow = true
					this.grid = '1414922323459620866'
					this.getGridDetail('1414922323459620866')
				} else if (e.data == "横溪冷水井、后厢") {
					this.wgryShow = true
					this.grid = '1414921956684513281'
					this.getGridDetail('1414921956684513281')
				} else if (e.data == "横溪坝下、桥头") {
					this.wgryShow = true
					this.grid = '1415144767758651394'
					this.getGridDetail('1415144767758651394')
				} else if (e.data == "横溪田中央、墙头") {
					this.wgryShow = true
					this.grid = '1415146940391346178'
					this.getGridDetail('1415146940391346178')
				} else if (e.data == "长胜毛领、孟家") {
					this.wgryShow = true
					this.grid = '1415147015662325761'
					this.getGridDetail('1415147015662325761')
				} else if (e.data == "长胜周家港") {
					this.wgryShow = true
					this.grid = '1415147152245641218'
					this.getGridDetail('1415147152245641218')
				} else if (e.data == "长胜长桥头") {
					this.wgryShow = true
					this.grid = '1415147082129461249'
					this.getGridDetail('1415147082129461249')
				} else if (e.data == "长胜田央沈") {
					this.wgryShow = true
					this.grid = '1415147217374793730'
					this.getGridDetail('1415147217374793730')
				}
			},
			switchDay(e) {
				this.tapIndex = e
			},
			showWjxDetail(item) {
				this.isShowWjxDetail = true
				this.wjxDetail = item
			},
			showWjxErr(item) {
				if(item=='异常') {
					this.showWjxError = true
				}
			},
			videoPause() {
				if (this.hls) {
					this.$refs.video.pause();
					this.hls.destroy();
					this.hls = null;
				}
			},
			closeZhjg() {
				this.onOff("关闭图层", "综合监管")
				this.onOff("关闭图层", "危房")
				this.onOff("关闭图层", "防溺水监控点")
				this.onOff("关闭图层", "泥石流")
				this.onOff("关闭图层", "边坡位移")
				this.onOff("关闭图层", "垃圾点位")
				this.onOff("关闭图层", "企业")
				this.onOff("关闭图层", "山塘水库")
				this.onOff("关闭图层", "执法记录仪")
			},
			showZhxc() {
				this.closeZhjg()
				this.onOff("打开图层", "企业")
				this.onOff("打开图层", "综合监管")
			},
			showWf() {
				this.closeZhjg()
				this.onOff("打开图层", "危房")
			},
			showFns() {
				this.closeZhjg()
				this.onOff("打开图层", "防溺水监控点")
			},
			showStsk() {
				this.closeZhjg()
				this.onOff("打开图层", "山塘水库")
			},
			showDzzh() {
				this.closeZhjg()
				this.onOff("打开图层", "泥石流")
			},
			showBpwy() {
				this.closeZhjg()
				this.onOff("打开图层", "边坡位移")
			},
			showLjfl() {
				this.closeZhjg()
				this.onOff("打开图层", "垃圾点位")
			},
			getTsryList(data) {
				this.$ajax.getPeopleList(data).then(res => {
					this.tsryList = res.records
				})
			},
			searchKey() {
				let data = {
					name: this.keyWord,
					grid: this.grid,
					size: 200,
					current:1
				}
				this.getPeopleList(data)
			}
		},
		computed: {
			classOption() {
				return {
					step: 0.3, // 数值越大速度滚动越快
					limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			},
			classOption2() {
				return {
					step: 0.3, // 数值越大速度滚动越快
					limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			},
			classOption3() {
				return {
					step: 0.3, // 数值越大速度滚动越快
					limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			},
			classOption4() {
				return {
					step: 0.3, // 数值越大速度滚动越快
					limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
					hoverStop: true, // 是否开启鼠标悬停stop
					direction: 1, // 0向下 1向上 2向左 3向右
					openWatch: true, // 开启数据实时监控刷新dom
					singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
					singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
					waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.pop-box {
		.content {
			.item {
				width: 50%;
			}
		}
	}
	.pop-common {
		width: 520px;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
	}

	.pop-zl {
		position: absolute;
		top: 200px;
		left: 35px;
		max-height: none;
		background: url(../bgImages/概览-1.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;
	}

	.pop-zl-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		font-size: 30px;
		margin-top: 20px;

		.pop-zl-item {
			width: 33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			span:first-child {
				margin-bottom: 5px;
			}
		}
	}

	.pop-list {
		position: absolute;
		top: 200px;
		right: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span {
				text-align: center;
				width: 50%;
			}

			span:last-child {
				text-align: center;
				width: 50%;
			}
		}

		.pop-inner-box {
			max-height: 350px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span {
					text-align: center;
					width: 50%;
				}

				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.wglb {
		position: absolute;
		top: 570px;
		left: 35px;
		max-height: none;
		background: url(../bgImages/网格列表.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 60px;

		.pop-title {
			width: 100%;
			background-size: 100% 32px;
		}

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span {
				text-align: center;
				width: 50%;
			}

			span:first-child {
				text-align: center;
				width: 20%;
			}

			span:last-child {
				text-align: center;
				width: 30%;
			}
		}

		.pop-inner-box {
			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span {
					text-align: center;
					width: 50%;
				}

				span:first-child {
					text-align: center;
					width: 20%;
				}

				span:last-child {
					text-align: center;
					width: 30%;
				}
			}
		}
	}

	.rylb {
		background: url(../bgImages/人员列表.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.tsry {
		position: absolute;
		top: 570px;
		left: 35px;
		background: url(../bgImages/老年人.png) no-repeat;
		background-size: 100% 100%;
		width: 450px;
		height: 497px;
		.tsry-title {
			width: 100%;
			padding: 22px 100px;
			text-align: center;
			box-sizing: border-box;
			font-size: 22px;
			color: #8CACF9;
		}
		.tsry-box {
			width: 100%;
			height: 420px;
			padding: 10px 20px 20px;
			box-sizing: border-box;
			color: #fff;
		}
		.tsry-bottom {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.tsry-bottom-item {
				display: flex;
				align-items: center;
				font-size: 18px;
				color: #fff;
				margin-top: 5px;
			}
		}
	}

	.pop-box {
		position: absolute;
		top: 200px;
		right: 35px;
	}

	.pop-list2 {
		position: absolute;
		top: 200px;
		left: 35px;

		.pop-inner-title {
			display: flex;
			width: 90%;
			margin: 10px auto;
			font-size: 19px;

			span {
				text-align: center;
				width: 50%;
			}

			span:last-child {
				text-align: center;
				width: 50%;
			}
		}

		.pop-inner-box {
			max-height: 350px;
			overflow-y: auto;

			.pop-inner-item {
				display: flex;
				width: 90%;
				margin: 10px auto;
				font-size: 18px;

				span {
					text-align: center;
					width: 50%;
				}

				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.sttj,
	.sktj {
		margin-bottom: 60px;

		.pop-inner-title {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;

			span {
				width: 30%;
				text-align: center;
				font-size: 19px;
			}

			span:first-child {
				width: 10%;
			}
		}

		.pop-inner-item {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;

			span {
				width: 30%;
				text-align: center;
				font-size: 18px;
			}

			span:first-child {
				width: 10%;
			}

			span:nth-child(2) {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			span:nth-child(3) {
				font-size: 22px;
			}

			span:last-child {
				font-size: 22px;
			}
		}
	}

	.sktj {
		margin-bottom: 0;
	}

	.pop-inner-title {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;

		span {
			width: 30%;
			text-align: center;
			font-size: 19px;
		}
	}

	.pop-inner-item {
		width: 90%;
		margin: 5px auto;
		display: flex;
		align-items: center;

		span {
			width: 30%;
			text-align: center;
			font-size: 18px;
		}

		span:nth-child(2) {
			width: 40%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		span:last-child {
			font-size: 22px;
		}
	}

	.pop-wf {
		position: absolute;
		top: 200px;
		right: 35px;

		.pop-wf-title {
			width: 90%;
			margin: 5px auto;
			display: flex;
			align-items: center;
			font-size: 19px;

			span {
				width: 27%;
				text-align: center;
			}

			span:first-child {
				width: 19%;
			}
		}

		.pop-wf-box {
			.pop-wf-item {
				width: 90%;
				margin: 5px auto;
				display: flex;
				align-items: center;
				font-size: 18px;

				span {
					width: 27%;
					text-align: center;
				}

				span:first-child {
					width: 19%;
				}
			}
		}
	}

	.fns {
		position: absolute;

		.pop-inner-item {
			span:last-child {
				font-size: 24px;
			}
		}
	}

	.pop-top {
		// width: 520px;
		// height: 270px;
		border: 1px solid rgb(30, 42, 108);
		border-radius: 10px;
		background-color: rgba(30, 42, 108, 0.5);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		z-index: 1998;
		position: absolute;
		top: 150px;
		left: 860px;

		.pop-top-content {
			// width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24px;

			.pop-top-item {
				// width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 20px;

				img {
					// width: 38px;
					// height: 38px;
					margin: 10px 0;
				}

				span:last-child {
					font-size: 20px;
				}
			}

			.pop-top-item:last-child {
				margin-right: 0;
			}
		}
	}

	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}

	.sj {
		width: 520px;
		position: absolute;
		top: 200px;
		right: 70px;
		z-index: 1998;
	}

	.sj-pop {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		margin-bottom: 10px;
		height: 300px;

		.sj-pop-info {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: center;
		}

		.seamless-warp {
			height: 200px;
			overflow: hidden;
		}

		.sj-pop-itemBox {
			width: 100%;
			// height: 200px;
			// overflow-y: scroll;
		}

		.sj-pop-item {
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			// align-items: center;
			text-align: center;
		}

		.cancelLogo {
			position: absolute;
			top: -20px;
			right: -20px;
		}

		.sj-pop-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			padding: 10px;
			box-sizing: border-box;

			div {
				display: flex;
				margin-bottom: 10px;
				font-size: 16px;
				color: #fff;

				span:first-child {
					width: 30%;
				}

				span:last-child {
					width: 70%;
				}
			}

			div:last-child {
				margin-bottom: 0;
			}
		}

	}

	.sj-yiji {
		background: url(../bgImages/一级事件.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50px;
	}

	.sj-erji {
		background: url(../bgImages/二级事件.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50px;
	}

	.sj-sanji {
		background: url(../bgImages/三级事件.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 50px;
	}

	.monitorBox {
		width: 550px;
		height: 420px;
		position: absolute;
		top: 200px;
		right: 35px;
		border-radius: 10px;
		border: 2px solid #fff;
		z-index: 1000;
	}

	.dzxx {
		position: absolute;
		top: 200px;
		right: 35px;

		.pop-dz-title {
			width: 90%;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #fff;
			margin: 10px auto;

			span {
				flex: 1;
			}
		}

		.pop-dz-box {
			max-height: 350px;
			overflow-y: auto;

			.pop-dz-item {
				width: 90%;
				display: flex;
				align-items: center;
				font-size: 16px;
				color: #fff;
				margin: 5px auto;

				span {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}

	.videoClass {
		width: 1000px;
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);

		video {
			width: 100%;
			height: 100%;
			position: relative;
		}

		.cancelVideo {
			width: 40px;
			height: 40px;
			position: absolute;
			top: -20px;
			right: -20px;
			z-index: 100;
			cursor: pointer;
		}
	}

	.search-box {
		width: 460px;
		position: absolute;
		bottom: 90px;
		left: 35px;
		border: 1px solid rgb(30, 42, 108);
		border-radius: 10px;
		background-color: rgba(30, 42, 108, 0.5);
		display: flex;
		padding: 10px 20px;
		box-sizing: border-box;
		color: #fff;

		input {
			flex: 1;
			background-color: transparent;
			border: none;
			color: #fff;
			font-size: 22px;
		}

		input::-webkit-input-placeholder {
			color: #fff;
		}
	}

	.zl-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 20px 0;
		box-sizing: border-box;

		.zl-item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 19px;
			margin-bottom: 20px;

			img {
				width: 100px;
				height: 100px;
				margin-bottom: 10px;
			}
		}
	}

	.pop-left {
		position: absolute;
		top: 220px;
		left: 60px;
		display: flex;
		flex-direction: column;
	}

	.pop-bottom {
		width: calc(100% - 120px);
		position: absolute;
		bottom: 50px;
		left: 60px;
		display: flex;
		justify-content: space-between;
	}

	.pop-right {
		position: absolute;
		top: 220px;
		right: 60px;
		display: flex;
		flex-direction: column;
	}

	.pop-center {
		width: 1054px;
		height: 595px;
		position: absolute;
		top: 242px;
		left: 590px;
		background-color: rgba(30, 42, 108, 0.6);
		box-sizing: border-box;
	}

	.pop-common-title {
		display: flex;
		align-items: center;
		font-size: 18px;
		margin-top: 10px;

		span {
			width: 32%;
		}

		span:first-child {
			width: 4%;
		}
	}

	.pop-common-title2 {
		display: flex;
		align-items: center;
		font-size: 18px;
		margin-top: 10px;

		span {
			width: 48%;
		}

		span:first-child {
			width: 4%;
		}
	}

	.echart-class {
		width: 490px;
		height: 200px;
	}

	.pop-common-box {
		// width: 90%;
		height: 160px;
		// flex: 1;
		overflow-y: scroll;
		padding: 10px 0;
		box-sizing: border-box;
		font-size: 18px;
		color: #fff;

		.pop-one-line {
			margin-bottom: 15px;
		}

		.pop-one-line:last-child {
			margin-bottom: 0;
		}

		.pop-two-line {
			display: flex;
			align-items: center;
			margin-bottom: 15px;

			span {
				width: 48%;
				overflow: hidden;
				word-break: keep-all;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			span:first-child {
				width: 4%;
			}
		}

		.pop-two-line:last-child {
			margin-bottom: 0;
		}

		.pop-three-line {
			display: flex;
			align-items: center;
			margin-bottom: 15px;

			span {
				width: 32%;
				overflow: hidden;
				word-break: keep-all;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			span:first-child {
				width: 4%;
			}
		}

		.pop-three-line:last-child {
			margin-bottom: 0;
		}
	}

	.pop-bg-box {
		width: 519px;
		height: 298px;
		padding: 60px 20px 20px 20px;
		box-sizing: border-box;

		.pop-bg-btn {
			font-size: 17px;
			color: #fff;
			width: 100%;
			text-align: right;
			cursor: pointer;
		}

		.pop-bg-btn2 {
			font-size: 17px;
			color: #fff;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;
		}

		.pop-bg-list {
			margin-left: 10px;
			display: flex;
			flex-direction: column;
			flex: 1;
			color: #fff;
		}

		.pop-xszh {
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.pop-item {
				width: 25%;
				margin: 20px 0;
				display: flex;
				justify-content: center;
				align-items: center;

				span {
					width: 108px;
					height: 32px;
					color: #fff;
					font-size: 16px;
					line-height: 32px;
					text-align: center;
					//border-radius: 16px;
					background-color: #5470C6;
					margin: 0 auto;
				}
			}
		}
	}

	.ljfl-bg {
		background: url(../bgImages/垃圾分类管理.png) no-repeat;
		background-size: 100% 100%;
	}

	.wjx-bg {
		background: url(../bgImages/5+x平台.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 20px;
	}

	.wjx-bg2 {
		background: url(../bgImages/5+x平台空.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 20px;
	}

	.wfgl-bg {
		background: url(../bgImages/危房管理.png) no-repeat;
		background-size: 100% 100%;
	}

	.xszh-bg {
		background: url(../bgImages/线上指挥.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 20px;
	}

	.spjk-bg {
		background: url(../bgImages/视频监控.png) no-repeat;
		background-size: 100% 100%;
	}

	.stsk-bg {
		background: url(../bgImages/山塘水库.png) no-repeat;
		background-size: 100% 100%;
	}

	.fns-bg {
		background: url(../bgImages/防溺水管理.png) no-repeat;
		background-size: 100% 100%;
	}

	.dzzh-bg {
		background: url(../bgImages/地质灾害管理.png) no-repeat;
		background-size: 100% 100%;
	}

	.dzzh-bg2 {
		background: url(../bgImages/地质灾害管理2.png) no-repeat;
		background-size: 100% 100%;
	}

	.bpwy-bg {
		background: url(../bgImages/边坡位移.png) no-repeat;
		background-size: 100% 100%;
	}

	.pop-wjxBg {
		width: 100%;
		height: 100%;
		background: url(../bgImages/九龙湖一店通.png) no-repeat;
		background-size: 100% 100%;
		position: relative;

		.wjx-tap {
			position: absolute;
			left: 30px;
			top: 115px;

			.wjx-top-bg {
				width: 154px;
				height: 26px;
				background: url(../bgImages/tab.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				margin-left: 115px;

				div {
					width: 33%;
					color: #fff;
					text-align: center;
					line-height: 26px;
				}

				.wjx-active {
					width: 53px;
					height: 24px;
					background: url(../bgImages/hover.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 5px;
				}
			}

			.wjx-bottom-bg {
				width: 435px;
				color: #fff;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20px;

				.wjx-bottom-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 20px;

					div:first-child {
						width: 44px;
						height: 44px;
						text-align: center;
						line-height: 44px;
						background: url(../bgImages/num.png) no-repeat;
						background-size: 100% 100%;
						margin-bottom: 10px;
					}
				}
			}
		}

		.wjx-list {
			position: absolute;
			top: 170px;
			right: 100px;
			padding: 0 10px;
			width: 390px;
			height: 320px;
			box-sizing: border-box;
			// overflow-y: scroll;
			.seamless-warp2 {
				height: 320px;
				overflow: hidden;
			}
			.wjx-list-item {
				width: 369px;
				height: 127px;
				background: url(../bgImages/list.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				color:  #56DDFF;
				margin-bottom: 15px;
				padding: 15px;
				box-sizing: border-box;
			}
		}

		.wjx-detail {
			width: 574px;
			background-color: rgb(5, 15, 60);
			background: url(../bgImages/wjxDetailBg.png) no-repeat;
			background-size: 100% 100%;
			padding: 0 40px;
			padding-bottom: 16px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.wjx-detail-title {
				margin: 16px auto;
				width: 100%;
			}

			span {
				width: 100%;
				font-size: 18px;
				color: #56DDFF;
				margin-bottom: 5px;
			}

			.wjx-detail-status {
				width: 491px;
				height: 328px;
				background: url(../bgImages/wjxDetailLBg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				padding: 30px;
				box-sizing: border-box;

				.wjx-detail-status-item {
					width: 100%;
					font-size: 18px;
					color: #56DDFF;
					margin-bottom: 10px;
				}
			}
		}
		
		.wjx-error {
			width: 530px;
			height: 500px;
			background: url(../bgImages/errorBg.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 24px;
			color: #24CBFB;
			.wjx-error-title {
				width: 100%;
				padding: 15px 175px;
				text-align: center;
				box-sizing: border-box;
			}
			.wjx-error-cont {
				width: 100%;
				height: 110px;
				padding: 15px 70px;
				box-sizing: border-box;
			}
			.wjx-error-img {
				width: 460px;
				height: 200px;
				margin: 15px auto;
				border-radius: 10px;
				object-fit: cover;
			}
		}
	}

	.tip-style {
		background-color: #f2272f;
		width: 26px;
		height: 26px;
		font-size: 16px;
		line-height: 26px;
		text-align: center;
		border-radius: 50%;
		display: inline-block;
		margin-left: 20px;
	}

	.sgpt-pop {
		width: 990px;
		height: 680px;
		background-color: #328FCA;
		font-size: 16px;
		color: #fff;
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		position: absolute;
		top: 200px;
		left: 570px;
		z-index: 1998;
		border-radius: 10px;

		.sgpt-top {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			img {
				width: 20px;
				height: 20px;
				cursor: pointer;
			}
		}

		.sgpt-box {
			flex: 1;
			color: #000;
			font-size: 20px;
			background-color: #F2F2F2;
			display: flex;
			flex-direction: column;
			margin-top: 20px;

			.sgpt-info {
				flex: 1;
				display: flex;
				justify-content: space-between;
				padding: 10px 20px;
				margin-bottom: 10px;
				box-sizing: border-box;

				.sgpt-left {
					width: 36%;
					height: 520px;
					background-color: #fff;
					padding: 10px 0 0 10px;
					border-radius: 5px;
					display: flex;
					flex-direction: column;

					.sgpt-over {
						flex: 1;
						overflow-y: scroll;

						/deep/ .el-timeline-item__wrapper {
							padding-left: 15px;
						}

						.sgpt-info-box {
							width: 250px;
							height: 80px;
							border-left: 6px solid #6AB1CF;
							display: flex;
							flex-direction: column;
							padding: 4px 10px;
							box-sizing: border-box;
							border-radius: 5px;
							background-color: #F2F2F2;

							div {
								width: 100%;
								display: flex;
								align-items: center;
								justify-content: space-between;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}
				}

				.sgpt-right {
					width: 60%;
					height: 520px;
					background-color: #fff;
					padding: 10px 0 0 10px;
					border-radius: 5px;
					display: flex;
					flex-direction: column;

					.sgpt-right-top {
						.sgpt-over {
							height: 180px;
							padding-bottom: 10px;
							overflow-y: scroll;

							.sgpt-table {
								width: 540px;
								border-bottom: 1px solid #DFDFDF;
								border-right: 1px solid #DFDFDF;
							}

							.sgpt-line {
								display: flex;
							}

							.sgpt-bg {
								width: 80px;
								font-size: 16px;
								padding: 10px 5px;
								box-sizing: border-box;
								text-align: center;
								background-color: #F2F2F2;
								box-sizing: border-box;
								border-top: 1px solid #DFDFDF;
								border-left: 1px solid #DFDFDF;
							}

							.sgpt-nbg {
								width: 190px;
								background-color: #fff;
								padding: 10px 5px 10px 10px;
								font-size: 16px;
								box-sizing: border-box;
								border-top: 1px solid #DFDFDF;
								border-left: 1px solid #DFDFDF;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
					}

					.sgpt-right-bottom {
						display: flex;

						.sgpt-right-bottom-item {
							width: 50%;
							display: flex;
							flex-direction: column;

							.sgpt-right-bottom-img {
								display: flex;
								align-items: center;
								flex-wrap: nowrap;
								width: 100%;
								justify-content: space-between;

								img {
									cursor: pointer;
								}
							}
						}
					}
				}
			}

			.sgpt-btn {
				border-top: 2px solid #328FCA;
				width: 100%;
				height: 60px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding: 10px 30px;
				box-sizing: border-box;

				span {
					width: 100px;
					height: 50px;
					font-size: 18px;
					color: #fff;
					line-height: 55px;
					background-color: #328FCA;
					border-radius: 4px;
					text-align: center;
					margin-right: 20px;
				}
			}
		}

		.sgpt-detail {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 640px;
			height: 490px;
			background-color: #328FCA;
			display: flex;
			flex-direction: column;
			padding: 10px;
			box-sizing: border-box;

			.sgpt-detail-top {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				img {
					width: 20px;
					height: 20px;
					cursor: pointer;
				}
			}

			.sgpt-detail-box {
				flex: 1;
				color: #000;
				font-size: 20px;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				margin-top: 20px;

				.sgpt-detail-info {
					flex: 1;
					padding: 5px 20px;
					box-sizing: border-box;

					.sgpt-detail-line {
						width: 100%;
						display: flex;
						font-size: 14px;
						align-items: center;
						padding: 10px 0;
						border-bottom: 1px dotted #F2F2F2;

						.sgpt-detail-title {
							width: 80px;
							text-align: right;
							color: #939393;
						}

						.sgpt-detail-content {
							flex: 1;
							color: #000;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							padding-left: 10px;
							box-sizing: border-box;

							.sgpt-detail-imgName {
								width: 100px;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}

					.sgpt-detail-line:first-child {
						border-top: 1px solid #F2F2F2;
					}
				}

				.sgpt-detail-btn {
					border-top: 2px solid #328FCA;
					width: 100%;
					height: 60px;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					padding: 10px 30px;
					box-sizing: border-box;

					span {
						width: 100px;
						height: 50px;
						font-size: 18px;
						color: #fff;
						line-height: 50px;
						background-color: #328FCA;
						border-radius: 4px;
						text-align: center;
						margin-right: 20px;
					}
				}
			}
		}
	}
</style>
