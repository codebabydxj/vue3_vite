<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
          <div class="contain">
            <div class="main-warp">
              <h3 class="v-h3">{{ greetings }}</h3>
              <div class="letter"> 
                <p> 1. 页面布局</p>
                <p class="colors">
                  <el-row>{{ '<template>' }}</el-row>
                  <el-row style="text-indent: 2em">{{ '<flex-card>' }}</el-row>
                  <el-row style="text-indent: 4em">{{ '<div class="base-warp">' }}</el-row>
                  <el-row style="text-indent: 6em">{{ '<el-card>' }}</el-row>
                  <el-row style="text-indent: 8em; color: red; font-weight: bold;">/ 这里就是你需要写的dom啦 /</el-row>
                  <el-row style="text-indent: 6em">{{ '</el-card >' }}</el-row>
                  <el-row style="text-indent: 4em">{{ '</div>' }}</el-row>
                  <el-row style="text-indent: 2em">{{ '</flex-card>' }}</el-row>
                  <el-row>{{ '</template>' }}</el-row>
                </p>
              </div>
              <div class="letter"> 
                <p> 2. 页面路由的创建</p>
                <p class="colors">
                  不同的菜单就在<span style="color: red; font-weight: bold;">router/router-config</span>文件夹下建不同的ts文件，最后在<span style="color: red; font-weight: bold;">router-config/index.ts</span>统一导出即可。（除了目录清晰，多人开发防止冲突很有必要）
                </p>
              </div>
              <div class="letter"> 
                <p> 3. pinia状态管理器</p>
                <p class="colors">
                  <span>import { globalStore } from '@/store' | let myStore = globalStore();</span>
                </p>
              </div>
              <div class="letter"> 
                <p> 4. axios使用</p>
                <p class="colors">
                  <div>首先是API的使用：同样不同的模块就在<span style="color: red; font-weight: bold;">src/api</span>下创建不同的ts文件，最后在<span style="color: red; font-weight: bold;">api/index.ts</span>统一导出即可。 （除了目录清晰，多人开发防止冲突很有必要）</div>
                  <div style="margin: 8px 0"><span style="color: red; font-weight: bold;">import * API from '@/config/api'</span></div>
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
                <p> 5. 工具 / 组件</p>
                <p class="colors">
                  这里封装了很多工具/组件可以使用，&lt;<span style="color: red; font-weight: bold;">src/utils</span>&gt;、
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
                  <div style="margin: 8px 0">(2). 打开二级页面 <span style="color: red; font-weight: bold;">globalRouter.openView('a/b')</span></div>
                  <div style="margin: 8px 0">(3). 返回上级页面 <span style="color: red; font-weight: bold;">globalRouter.goView()</span></div>
                  <div style="margin: 8px 0">(4). 关闭当前页面 <span style="color: red; font-weight: bold;">globalRouter.closeView()</span></div>
                  <div style="margin: 8px 0">(5). 列表按钮重置 <span style="color: red; font-weight: bold;">globalRouter.refreshView()</span></div>
                </p>
              </div>
            </div>
          </div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<style scoped lang="scss">
.contain {
  background: url('../../assets/imgs/wel.png') no-repeat center;
  background-size: 70%;
  position: relative;
  height: calc(100vh - 125px);
  overflow-y: auto;
}
.contain::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.contain::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #dfd7d7;
}
.contain::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: transparent;
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
    margin: 5px 0;
  }
  .colors {
    color: var(--color-text);
    font-size: 14px;
  }
}
</style>
