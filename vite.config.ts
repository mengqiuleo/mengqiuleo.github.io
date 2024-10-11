import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
			svgrOptions: {
				icon: true,
			},
			include: "**/*.svg?react",//'?react'为标识，有效区分svg是否需要转换成组件
		}),
  ],
})
