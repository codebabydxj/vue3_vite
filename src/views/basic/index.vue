<template>
  <flex-card>
    <div class="base-warp">
      <div class="over-card">
        <div class="contain">
          <el-scrollbar>
            <h3 class="v-h3">{{ greetings }}</h3>
            <div class="letter">
              <div style="margin: 4px 0;" class="title"> 1. 页面布局</div>
              <div style="margin: 4px 0;" class="colors">
                <div>{{ '<template>' }}</div>
                <div style="text-indent: 2em">{{ '<flex-card>' }}</div>
                <div style="text-indent: 4em">{{ '<div class="base-warp">' }}</div>
                <div style="text-indent: 6em">{{ '<div class="over-card">' }}</div>
                <div style="text-indent: 8em">{{ '<div class="content-box">' }}</div>
                <div style="text-indent: 10em">{{ '<el-scrollbar>' }} <span style="color: red;">(可有可无，视情况)</span></div>
                <div style="text-indent: 12em; color: #E6A23C; font-weight: bold;">/ 这里就是你需要写的dom啦 /</div>
                <div style="text-indent: 10em">{{ '</el-scrollbar>' }}</div>
                <div style="text-indent: 8em">{{ '</div>' }}</div>
                <div style="text-indent: 6em">{{ '</div>' }}</div>
                <div style="text-indent: 4em">{{ '</div>' }}</div>
                <div style="text-indent: 2em">{{ '</flex-card>' }}</div>
                <div>{{ '</template>' }}</div>
              </div>
            </div>
            <div class="letter"> 
              <div style="margin: 4px 0;" class="title"> 2. 动态路由 + 权限按钮配置</div>
              <div style="margin: 4px 0;" class="colors">通过菜单管理配置动态路由，使用 keep-alive组件 缓存页面</div>
            </div>
            <div class="letter"> 
              <div style="margin: 4px 0;" class="title"> 3. pinia状态管理器（封装了持久化存储功能）</div>
              <div style="margin: 4px 0;" class="colors">
                <span>import { useGlobalStore } from '@/store' | const myStore: any = useGlobalStore();</span>
              </div>
            </div>
            <div class="letter"> 
              <div style="margin: 4px 0;" class="title"> 4. axios使用</div>
              <div style="margin: 4px 0;" class="colors">
                <div>首先是API的使用：同样不同的模块就在<span style="color: #E6A23C; font-weight: bold;">src/api</span>下创建不同的ts文件，最后在<span style="color: #E6A23C; font-weight: bold;">api/index.ts</span>统一导出即可。 （除了目录清晰，多人开发防止冲突很有必要）</div>
                <div style="margin: 8px 0"><span style="color: #E6A23C; font-weight: bold;">import { api-name } from "@/config/api"</span></div>
                <div style="margin: 8px 0"><span style="color: #E6A23C; font-weight: bold;">import { client } from "@/utils/https/client";</span></div>
                <div style="margin: 8px 0">调用
                  <span style="color: #E6A23C; font-weight: bold;">client.get</span>、
                  <span style="color: #E6A23C; font-weight: bold;">client.post</span>、
                  <span style="color: #E6A23C; font-weight: bold;">client.download</span>、
                  <span style="color: #E6A23C; font-weight: bold;">client.jsonp</span>
                </div>
              </div>
            </div>
            <div class="letter">
              <div style="margin: 4px 0;" class="title"> 5. 工具 / hook组件</div>
              <div style="margin: 4px 0;" class="colors">
                这里封装了很多工具/hook组件可以使用(详细看代码)，&lt;<span style="color: #E6A23C; font-weight: bold;">src/utils、src/hooks</span>&gt;、
                  &lt;<span style="color: #E6A23C; font-weight: bold;">src/components</span>&gt;例如《
                  <span style="color: #E6A23C; font-weight: bold;">list和tree相互转换</span>、<span style="color: #E6A23C; font-weight: bold;">导出excel和pdf</span>、
                  <span style="color: #E6A23C; font-weight: bold;">兄弟组件传值mitt</span>、<span style="color: #E6A23C; font-weight: bold;">常规正则校验</span>、
                  <span style="color: #E6A23C; font-weight: bold;">加减乘除精确计算</span>、
                  <span style="color: #E6A23C; font-weight: bold;">全局使用svg标签</span>、
                  <span style="color: #E6A23C; font-weight: bold;">滑块验证码</span>
                》等
              </div>
              <div style="margin: 4px 0;" class="colors">
                <div style="margin: 8px 0">重点强调常用封装的router使用方法：&lt;<span style="color: #E6A23C; font-weight: bold;">const Router: any = inject('Router')</span>&gt;，通过inject获取挂载在全局的globalRouter方法</div>
                <div style="margin: 8px 0">(1). 打开一级页面 <span style="color: #E6A23C; font-weight: bold;">Router.openView('/a')</span></div>
                <div style="margin: 8px 0">(2). 打开二级页面 <span style="color: #E6A23C; font-weight: bold;">Router.openView('/a/b')</span></div>
                <div style="margin: 8px 0">(3). 返回上级页面 <span style="color: #E6A23C; font-weight: bold;">Router.goView()</span></div>
                <div style="margin: 8px 0">(4). 关闭当前页面 <span style="color: #E6A23C; font-weight: bold;">Router.closeView('path')</span></div>
                <div style="margin: 8px 0">(5). 列表按钮重置 <span style="color: #E6A23C; font-weight: bold;">Router.refreshView()</span></div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </flex-card>
</template>

<script setup lang="ts" name="Home">
import { computed, onMounted, nextTick } from "vue";
import { useGlobalStore } from "@/store";
import { useDriver } from "@/hooks/useDriver";
import { DriveStep } from "driver.js";

const myStore: any = useGlobalStore()
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
    element: "#SearchMenus",
    popover: {
      title: "菜单搜索",
      description: "操作此按钮可以快速检索到你想要的页面",
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
  background: url('../../assets/imgs/wel.png') 50% 50% / 70% no-repeat; /* 背景图片路径 */
  opacity: 0.5; /* 设置透明度 */
  z-index: -1; /* 确保背景在内容下方 */
  margin: -20px;
}
.over-card {
  border: none !important;
  border-radius: 0 !important;
}
.v-h3 {
  text-align: center;
  font-size: 22px;
  color: var(--color-text);
  font-weight: 700;
  text-shadow: 3px 5px 0 rgb(49 145 243 / 20%);
}
.letter {
  font-size: 16px;
  p {
    margin: 4px 0;
  }
  .colors {
    font-size: 14px;
    font-weight: 700;
  }
}
.title {
  font-weight: 700;
  color: var(--el-color-primary);
}
</style>

<style lang="scss">
// 引导页样式
@import url(@/baseStyle/driver.theme.scss);
</style>
