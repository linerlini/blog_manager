/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import * as path from 'path'

function computeSrcPath(pathStr: string) {
  return path.resolve(__dirname, pathStr)
}
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: (name) => `antd/es/${name}/style/css.js`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      api: computeSrcPath('src/api'),
      asserts: computeSrcPath('src/asserts'),
      components: computeSrcPath('src/components'),
      router: computeSrcPath('src/router'),
      style: computeSrcPath('src/style'),
      types: computeSrcPath('src/types'),
      utils: computeSrcPath('src/utils'),
      views: computeSrcPath('src/views'),
      store: computeSrcPath('src/store'),
    },
  },
})
