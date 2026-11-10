# vue3_vite

### 介绍 📖

Vite Admin 一款基于 Vue3.5、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。另外本项目还封装了一些常用组件、Hooks、指令等功能。


### 代码仓库 ⭐

- GitHub：https://github.com/codebabydxj/vue3_vite
- GitLab：https://gitlab.com/codebabydxj/vue3_vite

### 项目功能 🔨

- 使用 Vue3.5 + TypeScript 开发，单文件组件＜ script setup ＞
- 采用 Vite5 作为项目开发、打包工具（配置 Gzip 打包、TSX 语法、跨域代理…）
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 基于 Element-Plus 二次封装 ProTable 组件，表格页面全部为配置项 columns
- 支持 Element-Plus 组件大小切换、暗黑模式、i18n 国际化
- 使用 VueRouter 进行路由权限拦截、页面按钮权限配置、路由懒加载
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 支持 防止调试功能

### 兼容性注意

- Vite 需要 Node.js 版本 >= 20

### 组件库Naive UI（推荐）

- https://www.naiveui.com/

### 全新脚手架create-vue

- Vue团队公开快如闪电的全新脚手架工具 - create-vue，未来将替代 Vue-CLI
- create-vue使用<npm init vue@next>一行命令，就能快如闪电般初始化好基于vite的Vue3项目

### node-sass安装失败

- 可以使用 npm install node-sass@npm:dart-sass


### 安装

- git clone https://github.com/codebabydxj/vue3_vite.git
- git clone https://gitlab.com/codebabydxj/vue3_vite.git

### 启动前

- 需要在根目录配置.env.development （生产：.env.production、 测试：.env.test）

### 启动

```text
pnpm run dev | pnpm dev
npm run dev | yarn dev
npm run serve | yarn serve
```

### 打包

```text
- 测试环境
pnpm build:dev | npm run build:dev | yarn build:dev
- 生成环境
pnpm build:pro | npm run build:pro | yarn build:pro
```

### 代码检测

```text
- 检测代码 pnpm lint | npm run lint | yarn lint
```

### 项目后台接口 🧩

项目后台接口完全采用 Mock 数据，感谢以下 Mock 平台支持：

- FastMock： https://www.fastmock.site
- EasyMock：https://mock.mengxuegu.com


### github 同步 gitlab 🧩

```text
# 克隆GitHub仓库
- git clone https://github.com/your-project.git
- cd your-project

# 添加私有GitLab远程（命名为gitlab）
- git remote add gitlab https://gitlab.com/your-project.git

# 添加原始GitHub仓库为上游（命名为upstream， 相当于origin）
- git remote add upstream https://github.com/your-project.git

# 若提示upstream已存在  git remote rm origin  后重新添加

# 验证远程配置
- git remote -v
- 输出包含： upstream -> GitHub地址  ||  gitlab -> 私有GitLab地址

# 首次推送代码到GitLab
# 推送main分支（如使用master分支请自行替换）
- git push -u gitlab main

# 推送所有分支和标签（可选）
- git push --all gitlab  
- git push --tags gitlab

# 当GitHub仓库有更新时，手动同步更新流程
# 1. 拉取上游更新
- git fetch upstream

# 2. 合并到本地分支
- git checkout main
- git merge upstream/main

# 3. 推送到私有GitLab
- git push gitlab main

# 可选：强制覆盖（慎用）
- git push -f gitlab main

```

### gitlab 同步 github 🧩

```text
- git remote add origin github-url      添加远程仓库 定义为 <origin>
- git pull origin <branch>              同步拉取github分支代码
- git push origin <branch>              推送代码至github
- git remote -v                         查看当前远程仓库
- git remote rm <branch>                删除远程仓库
```