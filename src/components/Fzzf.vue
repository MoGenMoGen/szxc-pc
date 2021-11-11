<template>
	<div>
		<transition name="fade" v-if="pfxcShow">
			<pfxc></pfxc>
		</transition>
		<transition name="fade" v-if="xstjShow">
			<xstj></xstj>
		</transition>
		<transition name="fade" v-if="szjgShow">
			<szjg></szjg>
		</transition>
		<transition name="fade" v-if="zfggShow">
			<zfgg></zfgg>
		</transition>
		<BottomTab :list="tabList" @updata="getIndex" ref="botTab"></BottomTab>
	</div>
</template>

<script>
	import BottomTab from '@/components/BottomTab.vue'
	import zfgg from '@/components/fzzf/zfgg.vue'
	import szjg from '@/components/fzzf/szjg.vue'
	import xstj from '@/components/fzzf/xstj.vue'
	import pfxc from '@/components/fzzf/pfxc.vue'
	export default {
		name: 'Fzzf',
		props: {},
		data() {
			return {
				pfxcShow: false,
				xstjShow: false,
				szjgShow: false,
				zfggShow: false,
				isActive: 0,
				tabList: [{
					hasUrl: false,
					title: '普法宣传'
				}, {
					hasUrl: false,
					title: '线上调解'
				}, {
					hasUrl: false,
					title: '数字监管'
				}, {
					hasUrl: false,
					title: '执法改革'
				}],
			}
		},
		components: {
			BottomTab,
			pfxc,
			xstj,
			szjg,
			zfgg
		},
		methods: {
			getIndex(e) {
				if (e == 0) {
					//普法宣传
					this.pfxcShow = true
					this.xstjShow = false
					this.szjgShow = false
					this.zfggShow = false
				} else if (e == 1) {
					// 线上调解
					this.pfxcShow = false
					this.xstjShow = true
					this.szjgShow = false
					this.zfggShow = false
				} else if (e == 2) {
					// 数字监管
					this.pfxcShow = false
					this.xstjShow = false
					this.szjgShow = true
					this.zfggShow = false
				} else if (e == 3) {
					// 执法改革
					this.pfxcShow = false
					this.xstjShow = false
					this.szjgShow = false
					this.zfggShow = true
				}
			},
		},
		watch:{
			isActive(val,oVal) {
				this.$refs.botTab.isActive = val
			},
		},
		mounted() {
			this.pfxcShow = true
		}

	}
</script>

<style scoped lang="less">
	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
