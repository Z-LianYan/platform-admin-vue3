import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { name, alaisName, version, engines, dependencies, devDependencies } from './package.json'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

const pathSrc = resolve(__dirname, 'src')
/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: {
    name: alaisName,
    version,
    engines,
    dependencies,
    devDependencies,
  },
  buildTimestamp: Date.now(),
}
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command, isSsrBuild, isPreview }: ConfigEnv) => {
  console.log('import.meta======>>>', import.meta, fileURLToPath(new URL('./src', import.meta.url)))
  // mode: development
  // process.cwd(): /Users/lyz/Desktop/test/platform-admin-vue3
  const env = loadEnv(mode, process.cwd())
  console.log('env========>', env)
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      VueDevTools(),
      // MOCK 服务
      env.VITE_MOCK_DEV_SERVER === 'true' && mockDevServerPlugin(),
      UnoCSS({
        configFile: './uno.config.ts', // 默认读取 uno.config.{js,ts,mjs,mts}
        hmrTopLevelAwait: false,
      }),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        // imports: ['vue', '@vueuse/core','pinia','vue-router'],
        imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
        // imports: ['vue', 'pinia'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        //指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts'), // 会自动生成一个文件在src/typings下面 auto-imports.d.ts
        // dts: false,
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ['src/components', 'src/**/components'],
        // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        dts: 'src/typings/components.d.ts', // 会自动生成一个文件在src/typings下面components.d.ts
        // dts: false,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, 'assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    // 预加载项目必需的组件
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'element-plus',
        'pinia',
        'axios',
        '@vueuse/core',
        // 'sortablejs',
        // 'exceljs',
        'path-to-regexp',
        // 'echarts/core',
        // 'echarts/renderers',
        // 'echarts/charts',
        // 'echarts/components',
        'vue-i18n',
        'nprogress',
        // 'qs',
        'path-browserify',
        '@element-plus/icons-vue',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/form-item/style/css',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/input-number/style/css',
        'element-plus/es/components/switch/style/css',
        'element-plus/es/components/upload/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/col/style/css',
        'element-plus/es/components/icon/style/css',
        'element-plus/es/components/row/style/css',
        'element-plus/es/components/tag/style/css',
        'element-plus/es/components/dialog/style/css',
        'element-plus/es/components/loading/style/css',
        'element-plus/es/components/radio/style/css',
        'element-plus/es/components/radio-group/style/css',
        'element-plus/es/components/popover/style/css',
        'element-plus/es/components/scrollbar/style/css',
        'element-plus/es/components/tooltip/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
        'element-plus/es/components/divider/style/css',
        'element-plus/es/components/card/style/css',
        'element-plus/es/components/link/style/css',
        'element-plus/es/components/breadcrumb/style/css',
        'element-plus/es/components/breadcrumb-item/style/css',
        'element-plus/es/components/table/style/css',
        'element-plus/es/components/tree-select/style/css',
        'element-plus/es/components/table-column/style/css',
        'element-plus/es/components/select/style/css',
        'element-plus/es/components/option/style/css',
        'element-plus/es/components/pagination/style/css',
        'element-plus/es/components/tree/style/css',
        'element-plus/es/components/alert/style/css',
        'element-plus/es/components/radio-button/style/css',
        'element-plus/es/components/checkbox-group/style/css',
        'element-plus/es/components/checkbox/style/css',
        'element-plus/es/components/tabs/style/css',
        'element-plus/es/components/tab-pane/style/css',
        'element-plus/es/components/rate/style/css',
        'element-plus/es/components/date-picker/style/css',
        'element-plus/es/components/notification/style/css',
        'element-plus/es/components/image/style/css',
        'element-plus/es/components/statistic/style/css',
        'element-plus/es/components/watermark/style/css',
        'element-plus/es/components/config-provider/style/css',
        'element-plus/es/components/text/style/css',
        'element-plus/es/components/drawer/style/css',
        'element-plus/es/components/color-picker/style/css',
        'element-plus/es/components/backtop/style/css',
        'element-plus/es/components/message-box/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton-item/style/css',
        'element-plus/es/components/badge/style/css',
        'element-plus/es/components/steps/style/css',
        'element-plus/es/components/step/style/css',
        'element-plus/es/components/avatar/style/css',
        'element-plus/es/components/descriptions/style/css',
        'element-plus/es/components/descriptions-item/style/css',
        'element-plus/es/components/checkbox-group/style/css',
        'element-plus/es/components/progress/style/css',
        'element-plus/es/components/image-viewer/style/css',
        'element-plus/es/components/empty/style/css',
        'element-plus/es/components/message/style/css',
        'element-plus/es/components/timeline/style/css',
        'element-plus/es/components/timeline-item/style/css',
      ],
    },
    // resolve: {
    //   alias: {
    //     '@': fileURLToPath(new URL('./src', import.meta.url))
    //   }
    // },
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },

    server: {
      // 允许IP访问
      host: '0.0.0.0',
      // 应用端口 (默认:3000)
      port: +env.VITE_APP_PORT,
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: false, // 是否改变源地址
          // 接口地址
          target: env.VITE_APP_API_URL, // 目标服务器地址
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''), // 重写路径
        },
      },
    },
    css: {
      preprocessorOptions: {
        // 这里可以配置sass的选项，例如全局变量、函数等
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }
})
