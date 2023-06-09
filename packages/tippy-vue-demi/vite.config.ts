import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      exclude: ['src/env.d.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyVueComponent',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'vue-demi', 'tippy.js', '@vueuse/core', 'lodash-es'],
    },
  },
});
