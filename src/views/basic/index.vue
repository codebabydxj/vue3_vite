<template>
  <flex-card>
    <div class="base-warp">
      <el-card>
          <div class="contain">
            <div class="main-warp">
              <h3 class="v-h3">使用说明</h3>
              <div class="letter"> 
                <p> 1. 页面布局</p>
                <p class="colors">
                  <span>{{ '<template><flex-card><div class="base-warp">' }}</span>
                  <span style="color: red; font-weight: bold;">/这里就是你需要写的dom啦/</span>
                  <span>{{ '</div></flex-card></template>' }}</span>
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
                  <div style="margin: 8px 0"><span style="color: red; font-weight: bold;">import * API from '@/api'</span></div>
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
                <p> 5. 工具包</p>
                <p class="colors">
                  这里封装了很多工具可以使用，例如《
                    <span style="color: red; font-weight: bold;">list和tree相互转换</span>、<span style="color: red; font-weight: bold;">导出excel和pdf</span>、
                    <span style="color: red; font-weight: bold;">兄弟组件传值mitt</span>、<span style="color: red; font-weight: bold;">常规正则校验</span>
                  》等
                </p>
                <p class="colors">
                  <div style="margin: 8px 0">重点强调常用Global方法：&lt;<span style="color: red; font-weight: bold;">const globalFunc: any = inject('globalFunc')</span>&gt;，通过inject获取挂载在全局的globalFunc方法</div>
                  <div style="margin: 8px 0">(1). 打开一级页面 <span style="color: red; font-weight: bold;">globalFunc.openView('/a')</span></div>
                  <div style="margin: 8px 0">(2). 打开二级页面 <span style="color: red; font-weight: bold;">globalFunc.openView('a/b')</span></div>
                  <div style="margin: 8px 0">(3). 返回上级页面 <span style="color: red; font-weight: bold;">globalFunc.goView()</span></div>
                  <div style="margin: 8px 0">(4). 关闭当前页面 <span style="color: red; font-weight: bold;">globalFunc.closeView()</span></div>
                  <div style="margin: 8px 0">(5). 列表按钮重置 <span style="color: red; font-weight: bold;">globalFunc.refreshView()</span></div>
                </p>
              </div>
            </div>
          </div>
          <div style="clean"></div>
      </el-card>
    </div>
  </flex-card>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.contain {
  background: url('../../assets/wel.png') no-repeat center;
  background-size: 70%;
  position: relative;
  height: calc(100vh - 125px);
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
  font-size: 24px;
  color: var(--color-text);
  padding-bottom: 10px;
}
.letter {
  margin: 10px 0;
  font-size: 18px;
  p {
    margin: 5px 0;
  }
  .colors {
    color: var(--color-text);
    font-size: 16px;
  }
}
</style>
