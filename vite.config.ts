import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import px2rem from 'postcss-px2rem'
import path from 'path'

// 配置基本大小 实现rem px转换
const postcss = px2rem({
  // 基准大小 baseSize，需要和rem.js中相同
  remUnit: 16
})

const getIPAdress = (ipStart: string = '192') => {
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

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, __dirname);
  return {
    plugins: [
      vue(),
      // Components({ // 针对 Vue 的按需组件自动导入
      //   dts: false, // ts支持, 是否生成对应的d.ts文件
      //   dirs: ['src/components', 'src/views'], // 自定义路径按需导入
      //   resolvers: [ ElementPlusResolver() ] // 可配置多个 此时main.ts处组件库相关的就可以全部删除掉了
      // }),
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz' // 生成的压缩包后缀
      }),
      createSvgIconsPlugin({ // 全局使用svg
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')], // 指定需要缓存的图标文件夹
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
      hmr: { // 本地使用了whistle代理，此时会无效得进行刷新请求。解决方案
        protocol: 'ws', // WebSocket协议
        host: getIPAdress()
      }
    },
    build: { // 生产环境移除 console debugger
      minify: 'terser',
      assetsInlineLimit: 8 * 1024, // 如果静态资源体积 >= 4KB，则提取成单独的文件 如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src"),
        },
      ],
      // 忽略后缀名的配置项
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.node', '.scss'],
    },
  };
})
