<template>
  <div>
    <transition name="fade">
      <div @click="toUserMap">
        <PopBox :list="list" v-show='show'></PopBox>
      </div>

    </transition>
  </div>
</template>

<script>
import PopBox from '@/components/PopBox.vue'

export default {
  name: 'Yhyd',
  props: {},
  data() {
    return {
	  	ydyh:false,
      show: false,
      list: [{
        num: 722,
        url: 'static/images/house.png',
        title: '总户数'
      }, {
        num: 2015,
        url: 'static/images/zrs.png',
        title: '总人数'
      }, {
        num: 388,
        url: 'static/images/zhs.png',
        title: '租户数'
      }, {
        num: 111,
        url: 'static/images/dys.png',
        title: '党户数'
      }]
    }
  },
  components: {
    PopBox
  },
  methods: {
    toUserMap() {
      if (this.ydyh === false){
        this.$parent.test("一户一档人口");
        this.ydyh =true
      }
      this.$parent.test("长胜38号")



    },
  },
  mounted() {
    this.show = true
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
