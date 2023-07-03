import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath } from 'node:url';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/assets/css/mixin.less";',
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#034078',
          '@link-color': '#034078',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@img': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'https://jspro.rovertech.com.hk',
        changeOrigin: true,
      },
    },
  },

  base: './',
  build: {
    outDir: '../www', // 设置打包后的文件路径为 dist 目录
    postcss: {
      plugins: [
        autoprefixer(),
        pxtorem({
          rootValue: 37.5,
          propList: ['*'],
          replace: true,
          // 该项仅在使用 Circle 组件时需要
          // 原因参见 https://github.com/youzan/vant/issues/1948
        }),
      ],
    },
  },
});
