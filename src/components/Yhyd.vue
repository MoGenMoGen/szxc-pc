<template>
  <div>
    <transition name="fade">
      <div @click="toUserMap">
        <PopBox :list="list" v-show='show'></PopBox>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show" class="search-box">
        <input type="text" placeholder="请输入户名" v-model="keyWord" @keyup.enter="searchKey">
        <img src="static/images/search.png">
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
      keyWord: '',
      ydyh: false,
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
        title: '党员数'
      }]
    }
  },
  components: {
    PopBox
  },
  methods: {
    toUserMap() {
      if (this.ydyh === false) {
        this.$parent.test("一户一档人口");
        this.ydyh = true
      }
      this.$parent.test("长胜38号")
    },
    searchKey(e) {
      console.log(e, this.keyWord)
    }
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

.search-box {
  width: 520px;
  position: absolute;
  top: 490px;
  left: 35px;
  border: 1px solid #fff;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.64);
  display: flex;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;

  input {
    flex: 1;
    background-color: transparent;
    border: none;
    color: #fff;
  }

  input::-webkit-input-placeholder {
    color: #fff;
  }
}

</style>
