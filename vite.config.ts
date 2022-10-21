import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import px2rem from 'postcss-px2rem'

// 配置基本大小 实现rem px转换
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [vue()],
    css: {
      // postcss: {
      //   plugins: [
      //     postcss,
      //   ]
      // }
    },
    base: env.VITE_HOST,
    server: {
      cors: true,
      port: 8080,
      host: true,
      proxy: { // 代理
        "/api": {
          target: env.VITE_PROXY,
          changeOrigin: true,
        },
        "/upload": {
          target: env.VITE_UPLOAD,
          changeOrigin: true,
        },
      },
    },
    build: { // 生成环境去除 console debugger
      // minify: true,
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      esbuild: {
        drop: ['console', 'debugger'],
        minify: true
      }
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
      // 忽略后缀名的配置项
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
  };
})
