import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import path from "path";

const pathSrc = path.resolve(__dirname, "src");
console.log(pathSrc);

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": pathSrc,
        },
    },
    css: {
        // CSS 预处理器
        preprocessorOptions: {
            //define global scss variable
            less: {
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ["vue", "vue-router"],
            resolvers: [AntDesignVueResolver()],
            dts: "src/types/auto-imports.d.ts"
        }),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
            dts: "src/types/components.d.ts"
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: 8888,
        cors: true
    },
})
