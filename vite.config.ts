import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import path from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import pkg from "./package.json";
import dayjs from "dayjs";

// 查看build时间、代码分支、打包人、最后一次提交记录等等
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};


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
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_HOST,
    root,
    resolve: {
      alias: {
        "@": resolve(root, "./src"),
      },
      // 忽略后缀名的配置项
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.node', '.scss'],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    // 设置scss的api类型为modern-compiler
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',  // 修改api调用方式
          additionalData: `@use "@/baseStyle/var.scss";` // 导出全局变量和 mixin
        }
      }
    },
    server: {
      cors: true,
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      host: '0.0.0.0',
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
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    },
    plugins: [
      vue(),
      // Components({ // 针对 Vue 的按需组件自动导入
      //   dts: false, // ts支持, 是否生成对应的d.ts文件
      //   dirs: ['src/components', 'src/views'], // 自定义路径按需导入
      //   resolvers: [ ElementPlusResolver() ] // 可配置多个 此时main.ts处组件库相关的就可以全部删除掉了
      // }),
      visualizer({ // 打包分析可视化
        open: true, // build后，是否自动打开分析页面，默认false
        gzipSize: true, // 是否分析gzip大小
        brotliSize: true, // 是否分析brotli大小
        // filename: 'stats.html' // 分析文件命名,默认命名为stats.html
      }),
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
      chunkSizeWarningLimit: 4000, // 消除 chunk 大小警告的限制（以 kbs 为单位）默认：500
			rollupOptions: {
        // 静态资源分类打包，自动分割包名输出 chunkSizeWarningLimit 配置大小
				output: {
					chunkFileNames: "assets/js/[name]-[hash].js", // 入口文件名
					entryFileNames: "assets/js/[name]-[hash].js", // 出口文件名位置
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"  // 静态文件名位置
				}
			}
    }
  };
})
