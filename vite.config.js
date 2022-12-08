import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    resolve:{
      alias:{
        '@' : path.resolve(__dirname, './src')
      },
    },
    plugins: [vue()],
    // server: {
    //   proxy: {
    //     '/api': { 
    //       target: 'http://localhost:8000/',
    //       changeOrigin: true,
    //     },
    //   }
    // }
  })
}