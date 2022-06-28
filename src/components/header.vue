<template>
  <header>
    <nav class="navbar-top">
      <div class="tabs-wrap">
        <slot name="tabs"></slot>
      </div>
      <div class="user-info">
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-link class="screenfull" @click="refresh">
            <el-icon color="#444444" :size="20">
              <Refresh />
            </el-icon>
          </el-link>
        </el-tooltip>
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-link class="screenfull" @click="screenfullTog">
            <el-icon color="#444444" :size="20">
              <FullScreen />
            </el-icon>
          </el-link>
        </el-tooltip>
        <div id="he-plugin-simple"></div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    // 加载和风天气
    onMounted(() => {
      (window as any).WIDGET = {
        'CONFIG': {
          'modules': '01234',
          'background': '5',
          'tmpColor': '409eff',
          'tmpSize': '14',
          'cityColor': '409eff',
          'citySize': '14',
          'aqiColor': '409eff',
          'aqiSize': '14',
          'weatherIconSize': '20',
          'alertIconSize': '16',
          'padding': '10px 10px 5px 10px',
          'shadow': '0',
          'language': 'auto',
          'fixed': 'false',
          'vertical': 'top',
          'horizontal': 'left',
          'key': '12e37ffc392d47e48ce3d066029270bb'
        }
      }
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
      document.getElementsByTagName('head')[0].appendChild(script)
    })

    const globalFunc: any = inject('globalFunc')

    const refresh = () => {
      globalFunc.refreshView()
    }
    const screenfullTog = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      } else {
        ElMessage({
          showClose: true,
          type: 'warning',
          message: '浏览器不能全屏',
        })
      }
    }
    return {
      refresh,
      screenfullTog,
    };
  }
});
</script>

<style scoped>
header {
  flex: 0 0 auto;
  background-color: #EDF2FC;
  border-bottom: 1px solid #dfe4ed;
}

header .navbar-top {
  height: 100%;
  display: flex;
  flex-direction: row;
}

header .navbar-top .tabs-wrap {
  flex: 1 1 auto;
  width: calc(100% - 250px);
}

header .navbar-top .user-info {
  flex: 0 0 auto;
  width: 250px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

header .navbar-top .user-info .screenfull {
  margin: 0 0 0 15px;
  padding: 0;
  color: inherit;
  cursor: pointer;
}
</style>
