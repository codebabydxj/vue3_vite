<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
        <el-scrollbar :height="maxHeight">
          <div class="contain" :style="{ height: maxHeight }">
            <div class="main-warp">
              <h3 class="v-h3">{{ greetings }}</h3>
              <div class="letter">
                <p> 1. 页面布局</p>
                <p class="colors">
                  <div>{{ '<template>' }}</div>
                  <div style="text-indent: 2em">{{ '<flex-card>' }}</div>
                  <div style="text-indent: 4em">{{ '<div class="base-warp">' }}</div>
                  <div style="text-indent: 6em">{{ '<el-card>' }}</div>
                  <div style="text-indent: 8em; color: red; font-weight: bold;">/ 这里就是你需要写的dom啦 /</div>
                  <div style="text-indent: 6em">{{ '</el-card >' }}</div>
                  <div style="text-indent: 4em">{{ '</div>' }}</div>
                  <div style="text-indent: 2em">{{ '</flex-card>' }}</div>
                  <div>{{ '</template>' }}</div>
                </p>
              </div>
              <div class="letter"> 
                <p> 2. 动态路由 + 权限按钮配置</p>
                <p class="colors">使用 keep-alive组件 缓存页面</p>
              </div>
              <div class="letter"> 
                <p> 3. pinia状态管理器（封装了持久化存储功能）</p>
                <p class="colors">
                  <span>import { globalStore } from '@/store' | const myStore: any = globalStore();</span>
                </p>
              </div>
              <div class="letter"> 
                <p> 4. axios使用</p>
                <p class="colors">
                  <div>首先是API的使用：同样不同的模块就在<span style="color: red; font-weight: bold;">src/api</span>下创建不同的ts文件，最后在<span style="color: red; font-weight: bold;">api/index.ts</span>统一导出即可。 （除了目录清晰，多人开发防止冲突很有必要）</div>
                  <div style="margin: 8px 0"><span style="color: red; font-weight: bold;">import * as API from "@/config/api"</span></div>
                  <div style="margin: 8px 0"><span style="color: red; font-weight: bold;">import { client } from '@/utils/https/client';</span></div>
                  <div style="margin: 8px 0">调用
                    <span style="color: red; font-weight: bold;">client.get</span>、
                    <span style="color: red; font-weight: bold;">client.post</span>、
                    <span style="color: red; font-weight: bold;">client.download</span>、
                    <span style="color: red; font-weight: bold;">client.jsonp</span>
                  </div>
                </p>
              </div>
              <div class="letter">
                <p> 5. 工具 / hook组件</p>
                <p class="colors">
                  这里封装了很多工具/hook组件可以使用(详细看代码)，&lt;<span style="color: red; font-weight: bold;">src/utils、src/hooks</span>&gt;、
                    &lt;<span style="color: red; font-weight: bold;">src/components</span>&gt;例如《
                    <span style="color: red; font-weight: bold;">list和tree相互转换</span>、<span style="color: red; font-weight: bold;">导出excel和pdf</span>、
                    <span style="color: red; font-weight: bold;">兄弟组件传值mitt</span>、<span style="color: red; font-weight: bold;">常规正则校验</span>、
                    <span style="color: red; font-weight: bold;">加减乘除精确计算</span>、
                    <span style="color: red; font-weight: bold;">全局使用svg标签</span>、
                    <span style="color: red; font-weight: bold;">滑块验证码</span>
                  》等
                </p>
                <p class="colors">
                  <div style="margin: 8px 0">重点强调常用Global方法：&lt;<span style="color: red; font-weight: bold;">const globalRouter: any = inject('globalRouter')</span>&gt;，通过inject获取挂载在全局的globalRouter方法</div>
                  <div style="margin: 8px 0">(1). 打开一级页面 <span style="color: red; font-weight: bold;">globalRouter.openView('/a')</span></div>
                  <div style="margin: 8px 0">(2). 打开二级页面 <span style="color: red; font-weight: bold;">globalRouter.openView('/a/b')</span></div>
                  <div style="margin: 8px 0">(3). 返回上级页面 <span style="color: red; font-weight: bold;">globalRouter.goView()</span></div>
                  <div style="margin: 8px 0">(4). 关闭当前页面 <span style="color: red; font-weight: bold;">globalRouter.closeView()</span></div>
                  <div style="margin: 8px 0">(5). 列表按钮重置 <span style="color: red; font-weight: bold;">globalRouter.refreshView()</span></div>
                </p>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Home">
import { computed, onMounted } from "vue";
import { globalStore } from "@/store";
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

const date: Date = new Date();
const greetings = computed(() => {
  if (date.getHours() >= 0 && date.getHours() < 12) {
    return '上午阳光明媚，祝你薪水翻倍🌞！';
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    return '下午小风娇好，愿你青春不老😃！';
  } else {
    return '折一根天使羽毛，愿拂去您的疲惫烦恼忧伤🌛！';
  }
});

// 最大高度计算
const myStore: any = globalStore()
const maxHeight: any = computed(() => myStore.maxHeight)
const themeConfig = computed(() => myStore.themeConfig)

onMounted(() => {
  // 加载引导页
  setTimeout(() => {
    if (myStore.themeConfig.isOpenGuide) {
      guide()
    }
  }, 1000)
})

// 引导页
const guide = () => {
  const driver: Driver = new Driver({
    className: 'psm-driver-box',
    opacity: 0.75,
    padding: 4,
    allowClose: false,
    overlayClickNext: false,
    stageBackground: '#20c6ce',
    doneBtnText: "关闭",
    closeBtnText: '不再提示',
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    onReset: (Element) => {
      console.log(Element);
      myStore.setThemeConfig({ ...themeConfig.value, isOpenGuide: false })
    },
  });
  driver.defineSteps(steps);
  driver.start();
};
const steps = [
  {
    element: "#Refreshs",
    popover: {
      title: "刷新面",
      description: "操作此按钮可以刷新重置页面",
      position: "left"
    }
  },
  {
    element: "#Theme",
    popover: {
      title: "主题配置",
      description: "该功能主要是全局主题配置，不妨点击试试",
      position: "left"
    }
  },
  {
    element: "#Message",
    popover: {
      title: "消息中心",
      description: "包含一些通知/公告/待办",
      position: "left"
    }
  },
  {
    element: "#Full",
    popover: {
      title: "全屏功能",
      description: "点击此按钮，可以将浏览器进入全屏模式",
      position: "left"
    }
  }
]
</script>

<style scoped lang="scss">
.contain {
  background: url('../../assets/imgs/wel.png') no-repeat center;
  background-size: 70%;
  position: relative;
}
.main-warp {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:rgba(255, 255, 255, 0.5);
}
.v-h3 {
  text-align: center;
  font-size: 22px;
  color: var(--color-text);
}
.letter {
  font-size: 16px;
  p {
    margin: 4px 0;
  }
  .colors {
    color: var(--color-text);
    font-size: 14px;
  }
}
</style>

<style lang="scss">
// 引导页样式
div#driver-popover-item::before {
  position: absolute;
  top: -36px;
  right: 0;
  width: 98px;
  height: 90px;
  content: '';
}

div#driver-popover-item {
  min-width: 280px;
  max-width: 320px;
  color: #fff;
  background: #20c6ce;
}

div#driver-popover-item .driver-popover-tip.left {
  left: -9px;
  border-color: transparent #20c6ce transparent transparent;
}

div#driver-popover-item .driver-popover-footer button {
  padding: 4px 10px;
  color: #20c6ce;
  background-color: #fff;
  border: 1px solid #fff;
}

div#driver-popover-item .driver-popover-footer button.driver-prev-btn {
  color: grey;
}

div#driver-popover-item .driver-popover-footer button.driver-disabled {
  display: none !important;
}

div#driver-popover-item .driver-popover-footer .driver-close-btn {
  color: #fff;
  text-shadow: 0 0 0 #fff;
  background-color: rgb(255 255 255 / 30%);
  border: 1px solid rgb(255 255 255 / 30%);
}

div#driver-popover-item .driver-popover-title {
  margin: 0 0 15px;
}

div#driver-popover-item .driver-popover-description {
  color: #fff;
}

div#driver-highlighted-element-stage {
  border: 1px dashed #20c6ce;
}
</style>
