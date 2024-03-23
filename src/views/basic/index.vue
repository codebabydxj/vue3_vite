<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="contain">
          <el-scrollbar>
            <h3 class="v-h3">{{ greetings }}</h3>
            <div class="letter">
              <p> 1. 页面布局</p>
              <p class="colors">
                <div>{{ '<template>' }}</div>
                <div style="text-indent: 2em">{{ '<flex-card>' }}</div>
                <div style="text-indent: 4em">{{ '<div class="base-warp">' }}</div>
                <div style="text-indent: 6em">{{ '<div class="over-card">' }}</div>
                <div style="text-indent: 8em; color: red; font-weight: bold;">/ 这里就是你需要写的dom啦 /</div>
                <div style="text-indent: 6em">{{ '</div>' }}</div>
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
          </el-scrollbar>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Home">
import { computed, onMounted, nextTick } from "vue";
import { globalStore } from "@/store";
import { useDriver } from "@/hooks/useDriver";
import { DriveStep } from "driver.js";

const myStore: any = globalStore()
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
const steps: DriveStep[] = [
  {
    element: "#Refreshs",
    popover: {
      title: "刷新面",
      description: "操作此按钮可以刷新重置页面",
      side: "left"
    }
  },
  {
    element: "#Theme",
    popover: {
      title: "主题配置",
      description: "该功能主要是全局主题配置，不妨点击试试",
      side: "left"
    }
  },
  {
    element: "#Message",
    popover: {
      title: "消息中心",
      description: "包含一些通知/公告/待办",
      side: "left"
    }
  },
  {
    element: "#Full",
    popover: {
      title: "全屏功能",
      description: "点击此按钮，可以将浏览器进入全屏模式",
      side: "left",
    }
  }
]

// 引导页
onMounted(() => {
  // 加载引导页
  nextTick(() => {
    setTimeout(() => {
      if (myStore.themeConfig.isOpenGuide) {
        useDriver(steps)
      }
    }, 1000)
  })
})
</script>

<style scoped lang="scss">
.contain {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
}
.contain::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/imgs/wel.png') no-repeat center; /* 背景图片路径 */
  background-size: 70%; /* 背景图片大小 */
  opacity: 0.5; /* 设置透明度 */
  z-index: -1; /* 确保背景在内容下方 */
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
@import url(@/baseStyle/driver.theme.scss);
</style>
