import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import px2rem from 'postcss-px2rem'
import path from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";

// 配置基本大小 实现rem px转换
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})

const getIPAddress = (ipStart: string = '192') => {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal && alias.address.startsWith(ipStart)) {
        return alias.address;
      }
    }
  }
}

interface Env {
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  VITE_GLOB_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_HOST: string;
  VITE_PROXY: string;
  VITE_UPLOAD: string;
  VITE_DROP_CONSOLE: boolean;
}
declare type Recordable<T = any> = Record<string, T>;
const wrapperEnv = (envConf: Recordable): Env => {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
  }
  return ret;
}

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  /** 当前执行node命令时文件夹的地址（工作目录） */
  const root: string = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env)
  console.log(viteEnv);

  return {
    plugins: [
      vue(),
      // Components({ // 针对 Vue 的按需组件自动导入
      //   dts: false, // ts支持, 是否生成对应的d.ts文件
      //   dirs: ['src/components', 'src/views'], // 自定义路径按需导入
      //   resolvers: [ ElementPlusResolver() ] // 可配置多个 此时main.ts处组件库相关的就可以全部删除掉了
      // }),
      vueJsx(),
      vueSetupExtend({}), // name 可以写在 script 标签上
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' // 生成的压缩包后缀
      }),
      createSvgIconsPlugin({ // 全局使用svg
        iconDirs: [path.resolve(root, 'src/icons/svg')], // 指定需要缓存的图标文件夹
        symbolId: 'icon-[dir]-[name]', // 指定symbolId格式
      })
    ],
    css: {
      // postcss: {
      //   plugins: [
      //     postcss,
      //   ]
      // }
    },
    base: viteEnv.VITE_HOST,
    server: {
      cors: true,
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      host: true,
      proxy: { // 代理
        "/api": {
          target: viteEnv.VITE_PROXY,
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
        "/upload": {
          target: viteEnv.VITE_UPLOAD,
          changeOrigin: true,
        },
      },
      hmr: { // 本地使用了whistle代理，此时会无效得进行刷新请求。解决方案
        protocol: 'ws', // WebSocket协议
        host: getIPAddress()
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console", "debugger"] : []
    },
    build: { // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      outDir: 'dist', // 构建得包名  默认：dist
      minify: 'esbuild', // 项目压缩 :boolean | 'terser' | 'esbuild'
      sourcemap: false, // 构建后是否生成 source map 文件
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告，可略微减少打包时间
      // assetsInlineLimit: 8 * 1024, // 如果静态资源体积 >= 4KB，则提取成单独的文件 如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true
      //   },
      // },
      chunkSizeWarningLimit: 2000, // 消除 chunk 大小警告的限制（以 kbs 为单位）默认：500
			rollupOptions: {
        // 静态资源分类打包，自动分割包名输出 chunkSizeWarningLimit 配置大小
				output: {
					chunkFileNames: "assets/js/[name]-[hash].js", // 入口文件名
					entryFileNames: "assets/js/[name]-[hash].js", // 出口文件名位置
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"  // 静态文件名位置
				}
			}
    },
    resolve: {
      alias: {
          "@": resolve(root, "./src"),
      },
      // 忽略后缀名的配置项
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.node', '.scss'],
    },
  };
})
