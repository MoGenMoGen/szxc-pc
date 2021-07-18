<template>
	<div>
		<transition name="fade">
			<div v-show="show13">
				<!-- <div @click="toUserMap"> -->
				<!-- <PopBox :list="list2" style="width: 460px;"></PopBox> -->
				<div class="pop-common pop-zl" style="width: 460px;">
					<div class="pop-title"><span>概览</span></div>
					<div class="pop-zl-box">
						<div class="pop-zl-item" v-for="(item,index) in list2" :key="index" @click="showPoints(item)">
							<span>{{item.num}}</span>
							<!-- <img :src="item.url"> -->
							<span style="font-size: 18px;">{{item.title}}</span>
						</div>
					</div>
				</div>
				<!-- </div> -->
				<div class="pop-common wglb" style="width: 460px;" v-show="!wgryShow">
					<div class="pop-title"><span>网格列表</span></div>
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
				<div class="pop-common wglb" style="width: 460px;" v-show="wgryShow">
					<div class="pop-title"><span>人员列表</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span style="width: 25%;">姓名</span>
						<span style="width: 50%;">住址</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in wgryList" :key='index' class="pop-inner-item" @click="peopleMap(item)">
							<span>{{ index + 1 }}</span>
							<span style="width: 25%;">{{ item.name }}</span>
							<span style="width: 50%;">{{ item.address }}</span>
						</div>
					</div>
				</div>
				<div class="search-box" v-show="wgryShow">
					<input type="text" placeholder="请输入户名" v-model="keyWord" @keyup.enter="searchKey">
					<img src="static/images/search.png">
				</div>
			</div>
		</transition>
		<!-- <transition name="fade">
			<div class="pop-box" v-show="show">
				<div class="pop-common sttj">
					<div class="pop-title"><span>山塘统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>山塘名称</span>
						<span>总容积 <span style="font-size: 14px;">(万m³)</span></span>
						<span>积雨面积 <span style="font-size: 14px;">(km²)</span></span>
					</div>
					<div v-for="(item,index) in stList" :key='index' @click="toFns(item)" class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.capacity }}</span>
						<span>{{ item.volume }}</span>
					</div>
				</div> -->

		<!-- <div class="pop-common sktj">
					<div class="pop-title" style="display: flex;justify-content: space-between;">
						<span>防溺水监控</span>
						<span style="margin-right: 40px;cursor: pointer;" @click="showVideoBox">示例</span>
					</div>
					<div class="pop-inner-title">
						<span style="flex: 1;">序号</span>
						<span style="flex: 2;">点位名称</span>
						<span style="flex: 2;">所属水库</span>
					</div>
					<div style="overflow-y: auto;">
						<div v-for="(item,index) in fnsList" :key='index' class="pop-inner-item" @click="toFns(item)">
							<span style="flex: 1;">{{ index + 1 }}</span>
							<span style="flex: 2;">{{ item.name }}</span>
							<span style="flex: 2;">{{ item.area }}</span>
						</div>
					</div>
				</div> -->
		<!-- </div>
		</transition> -->
		<!-- <transition name="fade">
			<div class="pop-box" v-show="show16">
				<div class="pop-common sktj">
					<div class="pop-title"><span>水库统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>库容 <span style="font-size: 14px;">(万m³)</span></span>
						<span>积雨面积 <span style="font-size: 14px;">(km²)</span></span>
					</div>
					<div v-for="(item,index) in skList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.capacity }}</span>
						<span>{{ item.volume }}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<div class="videoClass" v-if="showVideo">
			<video :src="videoUrl" autoplay="autoplay" loop="loop"></video>
			<img src="static/images/cancel.png" class="cancelVideo" @click="closeVideo">
		</div>
		<!-- <transition name="fade">
			<div v-show="show2">
				<img src="static/images/bg.png"
					style="position: absolute;top: 0;left: 0;z-index: 1000;width: 100%;height: 100%;" @click="showWg">
			</div>
		</transition> -->

		<!-- <transition name="fade">
			<div class="pop-list2" v-show="show20">
				<div class="pop-common" style="width: 460px;margin-bottom: 30px;">
					<div class="pop-title" style="width: 420px;background-size: 100%;"><span>垃圾分类</span></div>
					<div class="pop-inner-title">
						<span style="width: 100%;text-align: left;">点位名称</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in ljflList" :key='index' class="pop-inner-item" @click="toMap(item)">
							<span style="width: 100%;text-align: left;">{{ item.name }}</span>
						</div>
					</div>
				</div>
				<div class="pop-common" style="width: 460px;top: 620px;">
					<div class="pop-title" style="width: 420px;background-size: 100%;"><span>乡村关爱</span></div>
					<div class="pop-inner-title">
						<span>姓名</span>
						<span>类别</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in xcgaList" :key='index' class="pop-inner-item">
							<span>{{ item.name }}</span>
							<span>{{ item.type }}</span>
						</div>
					</div>
				</div>
								<div class="monitorBox"></div>
			</div>
		</transition> -->
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
		<!-- <transition name="fade"> -->
		<!-- <div class="xcga" v-show="show4">
        <div class="xcga-title"><span>乡村关爱</span></div>
        <div class="content">
          <div v-for="(item,index) in xcgaList" :key="index" class="item">
            <span>{{ item.num }}</span>
            <img :src="item.url">
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div> -->
		<!-- </transition> -->
		<!-- <transition name="fade">
      <div class="xcga-tab" v-show="show4">
        <div v-for="(item,index) in xcgaList" :key="index" class="item" @click="toMap(item)">
          <img :src="item.url">
        </div>
      </div>
    </transition> -->
		<!-- <transition name="fade">
			<div class="pop-box" v-show="show5"> -->
		<!-- <div class="pop-common fns">
					<div class="pop-title"><span>报警统计</span></div>
					<div class="pop-inner-title">
						<span>序号</span>
						<span>水库名称</span>
						<span>报警次数</span>
					</div>
					<div v-for="(item,index) in fnsList" :key='index' class="pop-inner-item">
						<span>{{ index + 1 }}</span>
						<span>{{ item.name }}</span>
						<span :style="{color:item.capacity>=15?'#D00E00':''}">{{ item.capacity }}</span>
					</div>
				</div> -->
		<!--        <hik v-if="hikShow" ref="videoPlayer"  :playMode="1"></hik>-->
		<!-- </div> -->
		<!-- </transition> -->
		<!-- <transition name="fade">
			<div class="pop-common pop-list" v-show="show4">
				<div class="pop-title"><span>商家统计</span></div>
				<div class="pop-inner-title">
					<span>序号</span>
					<span>商家名称</span>
				</div>
				<div class="pop-inner-box">
					<div v-for="(item,index) in qyList" :key='index' class="pop-inner-item" @click="toQiye(index,item)">
						<span>{{ index+1 }}</span>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<!-- <img src="static/images/zhu2.png" v-if="showXmb"
			style="width: 500px;position: absolute;top: 700px;right: 35px;border: 2px solid white;"> -->
		<transition name="fade">
			<div class="pop-list2" v-show="show5">
				<div class="pop-common">
					<div class="pop-title" style="display: flex;align-items: center;justify-content: space-between;">
						<span>线上指挥</span>
						<span style="margin-right: 40px;cursor: pointer;" @click="showVideoBox(2)">查看示例</span>
					</div>
					<div class="pop-inner-title">
						<span>巡查序号</span>
						<span>查看今日轨迹</span>
					</div>
					<div class="pop-inner-box">
						<div v-for="(item,index) in jkList" :key='index' class="pop-inner-item" @click="toZf(item)">
							<span>{{ item.name }}</span>
							<span
								style="display: flex;justify-content: space-between;"><span>上午轨迹</span><span>下午未生成</span></span>
						</div>
					</div>
				</div>
				<div class="pop-common" style="height: 300px;margin-top: 20px;">
					<div class="pop-title"><span>巡查列表</span></div>
					<div class="pop-common-box">
						<div class="pop-one-line" v-for="(item,index) in qyList" :key="index"
							@click="toQiye(index,item)">· {{item.name}}</div>
					</div>
				</div>
			</div>
		</transition>
		<!-- <transition name="fade">
			<PopBox :list="list" v-show='show7' @updata="getPopIndex"></PopBox>
		</transition> -->
		<!-- <transition name="fade">
			<div class="pop-common pop-wf" v-show="show9">
				<div class="pop-title"><span>危房统计</span></div>
				<div class="pop-wf-title">
					<span>序号</span>
					<span>行政村</span>
					<span>户主姓名</span>
					<span>建造年代</span>
				</div>
				<div class="pop-wf-box">
					<div v-for="(item,index) in wfList" :key='index' class="pop-wf-item" @click="toMap(item)">
						<span>{{ index+1 }}</span>
						<span>{{ item.area }}</span>
						<span>{{ item.name }}</span>
						<span>{{ item.time }}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<!-- <transition name="fade">
			<div class="pop-common srjf" v-show="show10">
				<div class="pop-title"><span>私人建房统计</span></div>
				<div class="srjf-title">
					<span>序号</span>
					<span>户主姓名</span>
					<span>户内人口</span>
					<span>原有宅基地房屋处置方式</span>
					<span>新申请用地面积</span>
					<span>预选建房地址</span>
					<span>办理进展情况</span>
					<span>优先排序</span>
				</div>
				<div class="srjf-item" v-for="(item, index) in srjfList" :key="index">
					<span>{{index+1}}</span>
					<span>{{item.name}}</span>
					<span>{{item.num}}</span>
					<span>{{item.solve}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.newArea}}</span>
					<span>{{item.schedule}}</span>
					<span>{{item.sort}}</span>
				</div>
			</div>
		</transition> -->
		<!--执法仪监控-->
		<hik2 :codes="codes" ref="videoPlayer2" :playMode="1"></hik2>
		<!-- 危房监控 山塘防溺水监控-->
		<hik5 :codes="codes" ref="videoPlayer5" :playMode="1"></hik5>

		<!-- <transition name="fade">
			<img src="static/images/sgptBg.png" @click="onShowP" style="height: 1124px;width: 2236px;margin-top: 100px"
				v-show="show6">
		</transition> -->
		<transition name="fade">
			<div class="sj" v-if="showP">
				<div class="sj-pop" style="border-color: #f2272f;background-color: rgba(242,39,47,0.5);">
					<div class="sj-pop-title"><span>一级事件</span></div>
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
				<div class="sj-pop" style="border-color: #02b5ea;background-color: rgba(2,181,234,0.5);">
					<div class="sj-pop-title"><span>二级事件</span></div>
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
				<div class="sj-pop" style="border-color: #289721;background-color: rgba(40,151,33,0.5);">
					<div class="sj-pop-title"><span>三级事件</span></div>
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
			<!-- <div class="sj-pop" v-show="showPDetail" style="right: 570px;">
				<img src="static/images/cancel.png" class="cancelLogo" @click="showPDetail=false">
				<div class="sj-pop-title"><span>事件编号:{{sjDetail.id}}</span></div>
				<div class="sj-pop-box">
					<div><span>内容:</span><span>{{sjDetail.content}}</span></div>
					<div><span>地址:</span><span>{{sjDetail.add}}</span></div>
					<div><span>问题类型:</span><span>{{sjDetail.type}}</span></div>
					<div><span>时间分类:</span><span>{{sjDetail.timeType}}</span></div>
					<div><span>上报时间:</span><span>{{sjDetail.reportTime}}</span></div>
					<div><span>职能科室/部门:</span><span>{{sjDetail.department}}</span></div>
					<div><span>办结时间:</span><span>{{sjDetail.overTime}}</span></div>
					<div><span>是否超时关闭:</span><span>{{sjDetail.timeOut}}</span></div>
				</div>
			</div> -->
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
		<!-- <transition name="fade">
			<div class="pop-common dzxx" v-show="show11">
				<div class="pop-title"><span>泥石流监控</span></div>
				<div class="pop-dz-title">
					<span>监控点名称</span>
					<span>具体位置</span>
				</div>
				<div class="pop-dz-box">
					<div class="pop-dz-item" v-for="(item,index) in dzList" :key="index" @click="toFns(item)">
						<span>{{item.name}}</span>
						<span>{{item.add}}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<!-- <transition name="fade">
			<div class="pop-common dzxx" v-show="show15">
				<div class="pop-title"><span>位移监测点列表</span></div>
				<div class="pop-dz-title">
					<span style="flex: 2;">监测点名称</span>
					<span>位置</span>
					<span>边坡稳定性</span>
					<span>状态</span>
				</div>
				<div class="pop-dz-box">
					<div class="pop-dz-item" v-for="(item,index) in wyList" :key="index">
						<span style="flex: 2;">{{item.name}}</span>
						<span>{{item.add}}</span>
						<span>{{item.stability}}</span>
						<span>{{item.status}}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<img src="static/images/bgBtn.png"
			style="width: 192px;height: 122px;position: fixed;bottom: 130px;left: 1022px;" v-if="show12"
			@click="toMapA">
		<!-- <transition name="fade">
			<div class="pop-common pop-list2" v-show="show14">
				<div class="pop-title"><span>总览</span></div>
				<div class="zl-box">
					<div class="zl-item" v-for="(item,index) in zlList" :key="index" @click="getTabIndex(index)">
						<img :src="item.url">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
		</transition> -->
		<!-- <transition name="fade">
			<div v-show="show17">
				<div class="pop-left">
					<div class="pop-common" style="width:404px;height: 250px;margin-bottom: 20px;">
						<div class="pop-title title-bg-yqyd"><span>巡查监管</span></div>
						<p class="tip-style">{{qyList2.length}}</p>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in qyList2" :key="index"
								@click="toQiye(index,item)">· {{item.name}}</div>
						</div>
					</div>
					<div class="pop-common" style="width:404px;height: 370px;margin-bottom: 20px;">
						<div class="pop-title title-bg-wfgl"><span>危房管理</span></div>
						<p class="tip-style">{{wfList.length}}</p>
						<div class="pop-common-title">
							<span></span>
							<span>行政村</span>
							<span>户主姓名</span>
							<span>建造年代</span>
						</div>
						<div class="pop-common-box">
							<div class="pop-three-line" v-for="(item,index) in wfList" @click="toFns(item)" :key="index">
								<span>·</span>
								<span>{{item.addr}}</span>
								<span>{{item.name}}</span>
								<span>{{item.putTime}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pop-bottom">
					<div class="pop-common" style="width:404px;height: 370px;">
						<div class="pop-title title-bg-fns" style="display: flex;align-items: center;justify-content: space-between;">
							<span>防溺水管理</span>
							<p class="tip-style">{{fnsList.length}}</p>
							<span style="margin-right: 40px;cursor: pointer;" @click="showVideoBox(1)">查看示例</span>
						</div>
						<div class="pop-common-title2">
							<span></span>
							<span>水库名称</span>
							<span>报警次数</span>
						</div>
						<div class="pop-common-box">
							<div class="pop-two-line" v-for="(item,index) in fnsList" :key="index" @click="toFns(item)">
								<span>·</span>
								<span>{{item.name}}</span>
								<span :style="{color:item.alert>=15?'#D00E00':''}">{{item.alert}}</span>
							</div>
						</div>
					</div>
					<div class="pop-common" style="width: 312px;height: 370px;">
						<div class="pop-title title-bg-stsk"><span>山塘水库</span></div>
						<p class="tip-style">{{stList.length}}</p>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in stList" :key="index" @click="toFns(item)">·
								{{item.name}}</div>
						</div>
					</div>
					<div class="pop-common" style="width: 312px;height: 370px;">
						<div class="pop-title title-bg-nsl"><span>泥石流监管</span></div>
						<p class="tip-style">{{dzList.length}}</p>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in dzList" :key="index" @click="toFns(item)">·
								{{item.name}}</div>
						</div>
					</div>
					<div class="pop-common" style="width: 312px;height: 370px;">
						<div class="pop-title title-bg-nld"><span>内涝点监管</span></div>
						<p class="tip-style">{{wyList.length}}</p>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in wyList" :key="index" @click="toFns(item)">·
								{{item.name}}</div>
						</div>
					</div>
					<div class="pop-common" style="width: 312px;height: 370px;">
						<div class="pop-title title-bg-bpwy"><span>边坡位移</span></div>
						<p class="tip-style">{{wyList2.length}}</p>
						<div class="pop-common-title2">
							<span></span>
							<span>点位名称</span>
							<span>位移量</span>
						</div>
						<div class="pop-common-box">
							<div class="pop-two-line" v-for="(item,index) in wyList2" :key="index">
								<span>·</span>
								<span>{{item.dName}}</span>
								<span>{{item.num}}mm</span>
							</div>
						</div>
					</div>
					<div class="pop-common" style="width: 404px;height: 370px;">
						<div class="pop-title title-bg-ljfl"><span>垃圾分类管理</span></div>
						<p class="tip-style">{{ljflglList.length}}</p>
						<div class="pop-common-title2">
							<span></span>
							<span>点位名称</span>
							<span style="text-align: center;">督导员姓名</span>
							<span>投放时间</span>
						</div>
						<div class="pop-common-box">
							<div class="pop-two-line" v-for="(item,index) in ljflglList" :key="index"
								@click="toMap(item)">
								<span>·</span>
								<span>{{item.name}}</span>
								<span style="text-align: center;">{{item.supervisorName}}</span>
								<span>{{item.putTime}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pop-right">
					<div class="pop-common" style="width: 404px;height: 250px;margin-bottom: 20px;">
						<div style="display: none;"></div> 执法仪监控区域
						<div class="pop-title title-bg-xszh"><span>线上指挥</span></div>
						<p class="tip-style">{{jkList.length}}</p>
						<div class="pop-common-box">
							<div class="pop-one-line" v-for="(item,index) in jkList" :key="index" @click="toZf(item)">·
								{{item.name}}</div>
						</div>
					</div>
					<div class="pop-common" style="width: 404px;height: 370px;margin-bottom: 10px;">
						右侧中间监控区域
					</div>
				</div>
			</div>
		</transition> -->
		<transition name="fade">
			<div v-show="show17">
				<div class="pop-left">
					<div class="pop-bg-box wjx-bg">
						<div class="pop-bg-btn" @click="showWjx" style="position: relative;z-index: 9999">看下详情></div>
<!--						<img src="../bgImages/5+x.png" style="width: 472px;height: 218px;position:absolute;top: 60px;right: 25px">-->
					</div>
					<div class="pop-bg-box wfgl-bg">
						<div class="pop-bg-btn" @click="weiffangguanli=!weiffangguanli">查看全部></div>
						<div class="pop-bg-list" v-show="weiffangguanli">
							<div class="pop-common-title">
								<span></span>
								<span>行政村</span>
								<span>户主姓名</span>
								<span>建造年代</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-three-line" v-for="(item,index) in wfList" @click="toFns(item)"
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
					<div class="pop-bg-box fns-bg">
						<div class="pop-bg-btn" @click="fangnishui=!fangnishui">查看全部></div>
						<div class="pop-bg-list" v-show="fangnishui">
							<div class="pop-common-title2">
								<span></span>
								<span>水库名称</span>
								<span>报警次数</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in fnsList" :key="index"
									@click="toFns(item)">
									<span>·</span>
									<span>{{item.name}}</span>
									<span :style="{color:item.alert>=15?'#D00E00':''}">{{item.alert}}</span>
								</div>
							</div>
						</div>
						<my-charts v-show="!fangnishui" :id='fns' class="echart-class" :data='fnsOption'
							@click.native="clickthis(fnsOption)"></my-charts>
					</div>
					<div class="pop-bg-box stsk-bg" style="width: 331px;">
						<div class="pop-bg-btn" @click="shantangshuiku=!shantangshuiku">查看全部></div>
						<div class="pop-bg-list" v-show="shantangshuiku">
							<div class="pop-common-box" style="height: 200px;">
								<div class="pop-one-line" v-for="(item,index) in stList" :key="index"
									@click="toFns(item)">·
									{{item.name}}
								</div>
							</div>
						</div>
						<my-charts v-show="!shantangshuiku" :id='stsk' style="width: 300px;" class="echart-class"
							:data='stskOption' @click.native="clickthis(stskOption)"></my-charts>
					</div>
					<div class="pop-bg-box dzzh-bg" style="width: 331px;">
						<div class="pop-bg-btn" @click="dizhizaihai=!dizhizaihai">查看全部></div>
						<div class="pop-bg-list" v-show="dizhizaihai">
							<div class="pop-common-box" style="height: 200px;">
								<div class="pop-one-line" v-for="(item,index) in dzList" :key="index"
									@click="toFns(item)">·
									{{item.name}}
								</div>
							</div>
						</div>
						<img src="../bgImages/list.png" v-show="!dizhizaihai" style="width: 290px;height: 190px;"
							@click="clickImg">
					</div>
					<div class="pop-bg-box bpwy-bg" style="width: 331px;">
						<div class="pop-bg-btn" @click="bianpoweiyi=!bianpoweiyi">查看全部></div>
						<div class="pop-bg-list" v-show="bianpoweiyi">
							<div class="pop-common-title2">
								<span></span>
								<span>点位名称</span>
								<span>位移量</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in wyList2" :key="index">
									<span>·</span>
									<span>{{item.dName}}</span>
									<span>{{item.num}}mm</span>
								</div>
							</div>
						</div>
						<my-charts v-show="!bianpoweiyi" :id='bpwy' style="width: 300px;" class="echart-class"
							:data='bpwyOption' @click.native="clickthis(bpwyOption)"></my-charts>
					</div>
					<div class="pop-bg-box ljfl-bg">
						<div class="pop-bg-btn" @click="lajifenlei=!lajifenlei">查看全部></div>
						<div class="pop-bg-list" v-show="lajifenlei">
							<div class="pop-common-title2">
								<span></span>
								<span>点位名称</span>
								<span>投放时间</span>
							</div>
							<div class="pop-common-box">
								<div class="pop-two-line" v-for="(item,index) in ljflglList" :key="index"
									@click="toMap(item)">
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
							<div class="pop-item" v-for="(item,index) in jkList" :key="index" @click="toZf(item)">
								<span>{{item.name}}</span>
							</div>
						</div>
					</div>
					<div class="pop-bg-box spjk-bg"></div>
				</div>
				<div class="pop-center" v-show="centerShow">
					<img @click="centerShow = false" v-show="centerShow" src="../../public/static/images/cancel.png"
						style="position: absolute;top: -20px;right: -20px;z-index: 200;">
					<my-charts v-show="type==1" :id='common' style="width: 1054px;height: 595px;" class="echart-class"
						:data='commonOption'></my-charts>
					<div class="pop-wjxBg" v-show="type==2">
						<div class="wjx-tap">
							<div v-for="(item,index) in wjxTapList" :key="index">
								<div>{{item.day}}</div>
							</div>
							<div>
								<div>
									<div>{{wjxTapList[tapIndex].order}}</div>
									<span>工单总数</span>
								</div>
								<div>
									<div>{{wjxTapList[tapIndex].check}}</div>
									<span>检查总数</span>
								</div>
								<div>
									<div>{{wjxTapList[tapIndex].task}}</div>
									<span>往期任务数</span>
								</div>
							</div>
						</div>
						<div class="wjx-list">
							<div v-for="(item,index) in wjxList" :key="index">
								<span>协作人：</span>
								<span>巡查人：</span>
								<span>检查时间：</span>
								<span>店铺名称：</span>
								<span>检查结果：</span>
							</div>
						</div>
					</div>
					<img src="../bgImages/list.png" v-show="type==3" style="width: 1054px;height: 595px;">
				</div>
			</div>
		</transition>
		<img src="static/images/zhxcBg.jpg" v-show="show18" style="width: 2236px;height: 1104px;margin-top: 120px;">
		<!-- <BottomTab :list="tabList" @updata="getIndex"></BottomTab> -->
	</div>
</template>

<script>
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
				wjxTapList: [{
					day: '今日',
					order: 0,
					check: 5,
					task: 0
				},{
					day: '本周',
					order: 0,
					check: 65,
					task: 0
				},{
					day: '本月',
					order: 0,
					check: 295,
					task: 0
				}],
				tapIndex: 0,
				wjxList: [{

				}],
				lajifenlei: false,
				weiffangguanli: false,
				fangnishui: false,
				shantangshuiku: false,
				dizhizaihai: false,
				bianpoweiyi: false,
				centerShow: false,
				xcjg: 'xcjg',
				wfgl: 'wfgl',
				fns: 'fns',
				stsk: 'stsk',
				dzzh: 'dzzh',
				bpwy: 'bpwy',
				common: 'common',
				type: 0,
				commonOption: {},
				wfOption: {
					xAxis: {
						type: 'category',
						data: ['1949以前', '1960-1970', '1970-1980', '1980-1990', '1990-2000','2000-2010','2010-2020'],
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
					  max:5,
						minInterval:1,
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
						data: [1, 0, 1, 0, 0,0,0],
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
						areaStyle: {}
					}],
					grid: {
						top: "30px",
						left: "30px",
						right: "30px",
						bottom: "30px"
					}
				},
				stskOption: {
					visualMap: {
						show: false,
						min: 0,
						max: 10,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [{
								value: 335,
								name: '直接访问'
							},
							{
								value: 310,
								name: '邮件营销'
							},
							{
								value: 274,
								name: '联盟广告'
							},
							{
								value: 235,
								name: '视频广告'
							},
							{
								value: 400,
								name: '搜索引擎'
							}
						].sort(function(a, b) {
							return a.value - b.value;
						}),
						roseType: 'radius',
						label: {
							color: '#fff',
							fontSize: 16
						},
						labelLine: {
							lineStyle: {
								color: 'rgba(255, 255, 255, 0.3)'
							},
							smooth: 0.2,
							length: 5,
							length2: 10
						},
						itemStyle: {
							color: '#112960',
							shadowBlur: 200,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						},
						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function(idx) {
							return Math.random() * 200;
						}
					}],
					grid: {
						top: "10px",
						left: "10px",
						right: "10px",
						bottom: "10px"
					}
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
					grid: {
						top: "30px",
						left: "30px",
						right: "30px",
						bottom: "30px"
					}
				},
				bpwyOption: {
					legend: {
						data: ['监测点1', '监测点2'],
						textStyle: {
							color: "#fff",
							fontSize: 16
						}
					},
					grid: {
						top: "30px",
						left: "50px",
						right: "30px",
						bottom: "30px"
					},
					xAxis: {
						type: 'category',
						axisLabel: {
							color: '#fff',
							fontSize: 16
						},
						boundaryGap: false,
						data: ['0-4点', '4-8点', '8-12点', '12-16点', '16-20点', '20-24点']
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#fff',
							fontSize: 16
						}
					},
					series: [{
						name: '监测点1',
						type: 'line',
						data: [15, 15, 15, 15, 15, 15, 15],
						markLine: {
							symbol: 'none',
							data: [{
									yAxis: 20,
									name: '平均值'
								},
								{
									yAxis: 10,
									name: '平均值'
								}
							]
						}
					},{
						name: '监测点2',
						type: 'line',
						data: [15, 15, 15, 15, 15, 15, 15],
					}]
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
					x: '121.507106',
					y: '30.05261'
				}, {
					num: 657,
					url: 'static/images/wg-lnr.png',
					title: '老年人',
					name: '老年人',
					x: '121.504574',
					y: '30.05171'
				}, {
					num: 104,
					url: 'static/images/wg-czrs.png',
					title: '残障人',
					name: '残障人员',
					x: '121.504304',
					y: '30.052288'
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
				wgryList: [{
					name: '张三',
					address: '横溪'
				}],
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
				skList: [{
					name: '劈开猪头',
					capacity: 10.84,
					volume: 1.89
				}, {
					name: '杨家',
					capacity: 5.23,
					volume: 0.33,
					X: '',
					Y: ''
				}, {
					name: '蔡家岙',
					capacity: 2.21,
					volume: 0.09,
				}, {
					name: '安基墩',
					capacity: 6.61,
					volume: 0.4,
				}, {
					name: '石英坎',
					capacity: 2.21,
					volume: 0.86,
				}, {
					name: '三八',
					capacity: 1.67,
					volume: 0.53,
				}, {
					name: '应家',
					capacity: 1.14,
					volume: 0.13,
				}],
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
				qyList: [{
					name: '昱如副食品店',
					X: '121.510998',
					Y: '30.052114'
				}, {
					name: '鼎力紧定螺钉有限公司'
				}, {
					name: '镇海互感器厂有限公司'
				}, {
					name: '镇海九龙电器成套厂'
				}, {
					name: '镇海叶大塑料制品厂'
				}, {
					name: '龙居农家乐'
				}, {
					name: '月波农家菜馆'
				}, {
					name: '横溪人家'
				}, {
					name: '龙源农家乐'
				}, {
					name: '竹之林农家乐'
				}, {
					name: '东琴农家乐'
				}, {
					name: '项珍农家乐'
				}, {
					name: '阿飞农家乐'
				}, {
					name: '雅明农家乐'
				}, {
					name: '九龙源农家乐'
				}, {
					name: '食为天农家乐'
				}, {
					name: '山里山农家乐'
				}, {
					name: '赞来农家乐'
				}, {
					name: '闻溪阁烧烤园'
				}, {
					name: '青青农家菜馆'
				}, {
					name: '食泉农家菜馆'
				}, {
					name: '竹林人家农家菜馆'
				}],
				qyList2: [],
				wfList: [],
				dzList: [],
				wyList: [],
				wyList2: [{
					name: '横溪地质防范点01',
					add: '东沟',
					stability: '-',
					status: '安装中',
					dName: '监测点1',
					num: 0
				}, {
					name: '横溪地质防范点02',
					add: '东沟',
					stability: '-',
					status: '安装中',
					dName: '监测点2',
					num: 0
				}],
				wgzList: [],
				ljflglList: []
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
			this.showP = true
		},
		beforeDestroy() {
			window.removeEventListener('message', this.listenerFun)
		},
		methods: {
			// 网格打开图层
			showPoints(item) {
				if (item.name) {
					let a = {
						X: item.x,
						Y: item.y
					}
					this.show2 = false
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff('打开图层', item.name)
					this.$parent.test(a)
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
			},
			//点击小图还原
			toMapA() {
				// this.show2 = true
				this.show12 = false
				this.show8 = false
				this.wgryShow = false
				this.$parent.test("网格");
				this.onOff('打开图层','网格')
				this.offHik()
			},
			toMap(item) {
				this.$refs.videoPlayer5.off()
				this.codes = item.code;
				this.$refs.videoPlayer5.initPlugin()
				let a = {
					X: item.X,
					Y: item.Y,
				}
				this.$parent.test(a);
				if (this.e == 0) {
					this.show12 = true
				}

				this.show2 = false
			},
			//点击执法仪看监控
			toZf(item) {
				this.$refs.videoPlayer2.off()
				this.codes = item.code;
				this.$refs.videoPlayer2.initPlugin()
			},
			//防溺水
			toFns(item) {
				this.$refs.videoPlayer5.off()
				this.codes = item.code;
				this.$refs.videoPlayer5.initPlugin()
				let a = {
					X: item.lng,
					Y: item.lat,
				}
				this.$parent.test(a);

			},

			onShowP(e) {
				//一级
				if (e.x < 700) {
					this.sjs = this.sjList;
					this.title = '一级事件'
				}
				//二级
				if (e.x > 700 && e.x < 1000) {
					this.sjs = this.sjList2;
					this.title = '二级事件'
				}
				//三级
				if (e.x > 1000) {
					this.sjs = this.sjList3;
					this.title = '三级事件'
				}
				this.showP = true
			},
			getIndex(e) {
				this.e = e;
				// if (e == 0) {
				// 	// 水库管理
				// 	this.onOff("打开图层", "防溺水监控点")
				// 	this.onOff("打开图层", "山塘水库")

				// 	this.onOff("关闭图层", "综合监管")
				// 	// this.onOff("关闭图层","垃圾点位")
				// 	this.onOff("关闭图层", "危房")
				// 	this.onOff("关闭图层", "泥石流")

				// 	this.offHik()
				// 	this.show2 = false
				// 	this.show3 = false
				// 	this.show = true
				// 	this.show4 = false
				// 	this.show5 = false
				// 	this.show6 = false
				// 	this.show7 = false
				// 	this.show8 = false
				// 	this.show9 = false
				// 	this.show10 = false
				// 	this.show11 = false
				// 	this.show12 = false
				// 	this.showXmb = false
				// } else
				if (e == 0) {
					// 网格管理
					this.getGridTotal()
					this.getEventList('')
					// this.$parent.isChildShow = false
					this.offHik()
					this.onOff("关闭图层", "山塘水库")
					this.onOff("关闭图层", "综合监管")
					this.onOff("关闭图层", "危房")
					this.onOff("关闭图层", "防溺水监控点")
					this.onOff("关闭图层", "泥石流")
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff("关闭图层", "执法记录仪")
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
					this.show13 = true
					this.show14 = false
					this.show15 = false
					this.show16 = false
					this.show17 = false
					this.show18 = false
					this.showXmb = false
					this.showP = true
					this.showPDetail = false
					this.showVideo = false
					this.wgryShow = false
				}
				// else if (e == 2) {
				// 	// 4个平台
				// 	this.offHik()

				// 	this.show2 = false
				// 	this.show = false
				// 	this.show3 = false
				// 	this.show4 = false
				// 	this.show5 = false
				// 	this.show6 = true
				// 	this.show7 = false
				// 	this.show8 = false
				// 	this.show9 = false
				// 	this.show10 = false
				// 	this.show11 = false
				// 	this.show12 = false
				// 	this.showXmb = false
				// }
				else if (e == 1) {
					// 综合监管
					// this.$parent.isChildShow = false
					this.offHik()
					this.onOff("关闭图层", "综合监管")
					this.onOff("关闭图层", "山塘水库")
					// this.onOff("关闭图层","垃圾点位")
					this.onOff("关闭图层", "危房")
					this.onOff("关闭图层", "防溺水监控点")
					this.onOff("关闭图层", "泥石流")
					this.onOff("关闭图层", "五保户")
					this.onOff("关闭图层", "低保")
					this.onOff("关闭图层", "残障人员")
					this.onOff("关闭图层", "老年人")
					this.onOff("关闭图层", "执法记录仪")
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
				}
				// else if (e == 2) {
				// 	// 线上执法
				// 	this.onOff("打开图层", "执法记录仪")
				// 	this.onOff("关闭图层", "山塘水库")
				// 	this.onOff("关闭图层", "综合监管")
				// 	this.onOff("关闭图层", "危房")
				// 	this.onOff("关闭图层", "防溺水监控点")
				// 	this.onOff("关闭图层", "泥石流")
				// 	this.onOff("关闭图层", "五保户")
				// 	this.onOff("关闭图层", "低保")
				// 	this.onOff("关闭图层", "残障人员")
				// 	this.onOff("关闭图层", "老年人")
				// 	// this.$parent.isChildShow = false
				// 	this.offHik()
				// 	this.show2 = false
				// 	this.show = false
				// 	this.show3 = false
				// 	this.show4 = false
				// 	this.show5 = true
				// 	this.show6 = false
				// 	this.show7 = false
				// 	this.show8 = false
				// 	this.show9 = false
				// 	this.show10 = false
				// 	this.show11 = false
				// 	this.show12 = false
				// 	this.show13 = false
				// 	this.show14 = false
				// 	this.show15 = false
				// 	this.show16 = false
				// 	this.show17 = false
				// 	this.show18 = false
				// 	this.showXmb = false
				// 	this.showP = false
				// 	this.showPDetail = false
				// 	this.showVideo = false
				// } else if (e == 3) {
				// 	// 综合巡查
				// 	this.onOff("关闭图层", "山塘水库")
				// 	this.onOff("关闭图层", "综合监管")
				// 	this.onOff("关闭图层", "危房")
				// 	this.onOff("关闭图层", "防溺水监控点")
				// 	this.onOff("关闭图层", "泥石流")
				// 	this.onOff("关闭图层", "五保户")
				// 	this.onOff("关闭图层", "低保")
				// 	this.onOff("关闭图层", "残障人员")
				// 	this.onOff("关闭图层", "老年人")
				// 	this.onOff("关闭图层", "执法记录仪")
				// 	// this.$parent.isChildShow = false
				// 	this.offHik()
				// 	this.show2 = false
				// 	this.show = false
				// 	this.show3 = false
				// 	this.show4 = false
				// 	this.show5 = false
				// 	this.show6 = false
				// 	this.show7 = false
				// 	this.show8 = false
				// 	this.show9 = false
				// 	this.show10 = false
				// 	this.show11 = false
				// 	this.show12 = false
				// 	this.show13 = false
				// 	this.show14 = false
				// 	this.show15 = false
				// 	this.show16 = false
				// 	this.show17 = false
				// 	this.show18 = true
				// 	this.showXmb = false
				// 	this.showP = false
				// 	this.showPDetail = false
				// 	this.showVideo = false
				// }
				// else if (e == 5) {
				// 	// 危房管理
				// 	this.onOff("打开图层", "危房")
				// 	this.onOff("关闭图层", "防溺水监控点")
				// 	this.onOff("关闭图层", "泥石流")
				// 	this.onOff("关闭图层", "综合监管")
				// 	this.onOff("关闭图层", "山塘水库")
				// 	// this.onOff("关闭图层","垃圾点位")

				// 	this.offHik()
				// 	this.show2 = false
				// 	this.show = false
				// 	this.show3 = false
				// 	this.show4 = false
				// 	this.show5 = false
				// 	this.show6 = false
				// 	this.show7 = true
				// 	this.show8 = false
				// 	this.show9 = true
				// 	this.show10 = false
				// 	this.show11 = false
				// 	this.show12 = false
				// 	this.showXmb = false
				// } else if (e == 6) {
				// 	this.onOff("打开图层", "防溺水监控点")
				// 	this.onOff("打开图层", "泥石流")
				// 	this.onOff("关闭图层", "危房")
				// 	this.onOff("关闭图层", "综合监管")
				// 	this.onOff("关闭图层", "山塘水库")
				// 	// this.onOff("关闭图层","垃圾点位")

				// 	this.offHik()
				// 	// 地质灾害防范点
				// 	this.show2 = false
				// 	this.show = false
				// 	this.show3 = false
				// 	this.show4 = false
				// 	this.show5 = false
				// 	this.show6 = false
				// 	this.show7 = false
				// 	this.show8 = false
				// 	this.show9 = false
				// 	this.show10 = false
				// 	this.show11 = true
				// 	this.show12 = false
				// 	this.showXmb = false
				// }
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
				this.$parent.test(a)
				this.getGridDetail(item.id)
			},
			peopleMap(item) {
				console.log(item)
				this.onOff('关闭图层','网格')
				this.show12 = true
			},
			getGridDetail(id) {
				this.$ajax.getGridDetail({
					id: id
				}).then(res => {
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
				})
				this.getEventList(id)
				this.showPDetail = false
				this.show8 = true
			},
			showWg(e) {
				let x = e.x,
					y = e.y
				if (510 < x && x < 660 && 200 < y && y < 370) {
					console.log('横溪冷水井，后厢', '左')
					this.getGridDetail('1414921956684513281')
				} else if (510 < x && x < 760 && 140 < y && y < 180) {
					console.log('横溪钱家，大同高屋，大圆地', '左上')
					this.getGridDetail('1414922323459620866')
				} else if (540 < x && x < 690 && 500 < y && y < 750) {
					console.log('横溪坝下桥头', '左中')
					this.getGridDetail('1415144767758651394')
				} else if (760 < x && x < 1100 && 310 < y && y < 740) {
					console.log('横溪田中央，墙头，长坂地', '左右')
					this.getGridDetail('1415146940391346178')
				} else if (1280 < x && x < 1420 && 690 < y && y < 970) {
					console.log('长胜毛岭、孟家', '右左')
					this.getGridDetail('1415147015662325761')
				} else if (1450 < x && x < 1580 && 740 < y && y < 780) {
					console.log('长胜长桥头', '右中上')
					this.getGridDetail('1415147082129461249')
				} else if (1450 < x && x < 1580 && 790 < y && y < 950) {
					console.log('长胜周家巷', '右中下')
					this.getGridDetail('1415147152245641218')
				} else if (1590 < x && x < 1750 && 580 < y && y < 900) {
					console.log('长胜田央沈', '右')
					this.getGridDetail('1415147217374793730')
				}
				// this.show8 = true
				//     this.hikShow = true
				//     this.$refs.videoPlayer.off()
				//     this.cType = "0"
				//     this.$refs.videoPlayer.initPlugin()
				// this.$refs.videoPlayer.show()
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
						'http://llzx.jinkworld.com:9000/llzx/upload/20210714/dc5c19672ab68fe1da85fc27a563f83e.mp4'
				} else if (e == 2) {
					this.videoUrl = 'https://jl-dev.oss-cn-shanghai.aliyuncs.com/5x.mp4'
				}
				this.showVideo = true
			},
			closeVideo() {
				this.showVideo = false
			},
			toQiye(e, item) {
				if (e == 0) {
					this.showXmb = true
				} else {
					this.showXmb = false
				}
				let a = {
					X: item.X,
					Y: item.Y,
					heading: 230
				}
				this.$parent.test(a);
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
					this.list2[4].num = res.aged
					this.list2[5].num = res.disabled
					this.list2[6].num = res.special
					this.list2[7].num = res.fives
					this.list2[8].num = res.correction
				})
			},
			getList() {
				this.$ajax.getCamera('移动执法').then(res => {
					this.jkList = res
				})
				this.$ajax.getCamera('危房管理').then(res => {
					this.wfList = res
				})
				this.$ajax.getCamera('泥石流监控').then(res => {
					this.dzList = res
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
				this.$ajax.getCamera('垃圾分类').then(res => {
					this.ljflglList = res
				})
				this.$ajax.getCamera('一企一档').then(res => {
					this.qyList2 = res
				})
				this.$ajax.getCamera('内涝点监管').then(res => {
					this.wyList = res
				})
				// this.$ajax.getCamera('边坡位移').then(res=> {
				// 	this.wyList = res
				// })
			},
			clickthis(option) {
				this.centerShow = true
				this.type = 1
				this.commonOption = option
			},
			showWjx() {
				this.centerShow = true
				this.type = 2
			},
			clickImg() {
				this.type = 3
				this.centerShow = true
			},
			listenerFun(e) {
				if (e.data == "横溪钱家、大同高屋") {
					this.getGridDetail('1414922323459620866')
				} else if (e.data == "横溪冷水井、后厢") {
					this.getGridDetail('1414921956684513281')
				} else if (e.data == "横溪坝下、桥头") {
					this.getGridDetail('1414921956684513281')
				} else if (e.data == "横溪田中央、墙头") {
					this.getGridDetail('1415146940391346178')
				} else if (e.data == "长胜毛领、孟家") {
					this.getGridDetail('1415147015662325761')
				} else if (e.data == "长胜周家港") {
					this.getGridDetail('1415147152245641218')
				} else if (e.data == "长胜长桥头") {
					this.getGridDetail('1415147082129461249')
				} else if (e.data == "长胜田央沈") {
					this.getGridDetail('1415147217374793730')
				}
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

	.pop-title {
		width: 100%;
		height: 32px;
		background: url(../../public/static/images/line.png) no-repeat;
		background-size: 100% 32px;
		font-size: 20px;
		padding: 0 20px;
		margin: 0 auto;
		box-sizing: border-box;
		line-height: 20px;

		span {
			margin-left: 20px;
		}
	}

	.title-bg-yqyd {
		background: url(../../public/static/images/yqyd-title.png) no-repeat;
	}

	.title-bg-wfgl {
		background: url(../../public/static/images/wfgl-title.png) no-repeat;
	}

	.title-bg-fns {
		background: url(../../public/static/images/fns-title.png) no-repeat;
	}

	.title-bg-stsk {
		background: url(../../public/static/images/stsk-title.png) no-repeat;
	}

	.title-bg-nsl {
		background: url(../../public/static/images/nsl-title.png) no-repeat;
	}

	.title-bg-nld {
		background: url(../../public/static/images/nld-title.png) no-repeat;
	}

	.title-bg-bpwy {
		background: url(../../public/static/images/bp-title.png) no-repeat;
	}

	.title-bg-ljfl {
		background: url(../../public/static/images/ljfl-title.png) no-repeat;
	}

	.title-bg-xszh {
		background: url(../../public/static/images/xszh-title.png) no-repeat;
	}

	.pop-common {
		width: 520px;
		border: 1px solid #fff;
		border-image-outset: 10px;
		border-image-slice: 20 20 20 20;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
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

			// img {
			// 	width: 38px;
			// 	height: 38px;
			// 	margin: 20px 0;
			// }
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

	.xcga {
		width: 680px;
		// height: 270px;
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

		.xcga-title {
			width: 620px;
			height: 30px;
			background: url(../../public/static/images/lineL.png) no-repeat;
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
			font-size: 32px;
			margin-top: 30px;

			.item {
				width: 16.7%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				img {
					// width: 38px;
					// height: 38px;
					margin: 20px 0;
				}

				span:last-child {
					font-size: 18px;
				}
			}
		}
	}

	.xcga-tab {
		position: absolute;
		bottom: 60px;
		left: 35px;
		display: flex;
		flex-direction: column;

		.item {
			width: 80px;
			height: 80px;
			cursor: pointer;
			margin-bottom: 10px;

			img {
				width: 100%;
				height: 100%;
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
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
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
		right: 35px;
		z-index: 1998;
	}

	.sj-pop {
		width: 100%;
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
		display: flex;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		color: #fff;
		margin-bottom: 10px;
		height: 300px;

		.sj-pop-title {
			width: 485px;
			background: url(../../public/static/images/line.png) no-repeat;
			background-size: 100% 100%;
			font-size: 20px;
			padding: 0 20px;
			margin: 0 auto;
			box-sizing: border-box;

			span {
				margin-left: 20px;
			}
		}

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

	.srjf {
		position: absolute;
		width: 1450px;
		top: 200px;
		right: 35px;

		.pop-title {
			width: 1420px;
			background: url(../../public/static/images/lineBL.png);
		}

		.srjf-title {
			display: flex;
			align-items: center;

			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}

			span:nth-child(4) {
				flex: 2;
			}
		}

		.srjf-item {
			display: flex;
			align-items: center;

			span {
				margin: 5px 0;
				text-align: center;
				flex: 1;
				font-size: 18px;
			}

			span:nth-child(4) {
				flex: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
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
		width: 700px;
		// height: 700px;
		position: absolute;
		top: 50%;
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
		border: 1px solid #fff;
		border-radius: 10px;
		background-color: rgba(0, 0, 0, 0.64);
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

		.pop-bg-list {
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
					width: 88px;
					height: 32px;
					color: #fff;
					font-size: 16px;
					line-height: 32px;
					text-align: center;
					border-radius: 16px;
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
		background: url(../bgImages/地址灾害管理.png) no-repeat;
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
		background-color: 100% 100%;
		position: relative;
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
					height: 100%;
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
					height: 100%;
					background-color: #fff;
					padding: 10px 0 0 10px;
					border-radius: 5px;
					display: flex;
					flex-direction: column;

					.sgpt-right-top {
						.sgpt-over {
							height: 200px;
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
