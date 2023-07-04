import {createApp} from 'vue'
import router from "./router";
import WujieVue from "wujie-vue3";
import {
    LocationReloadPlugin,
    EventTargetPlugin,
    WindowGetterPlugin,
    WindowMessagePlugin,
    DocFullScrollPlugin,
    InstanceofPlugin
} from 'wujie-polyfill'
import {hostMap, lifecycles} from "./wujie.config.ts";
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '@/styles/index.less'

const {setupApp, preloadApp, destroyApp} = WujieVue;

const degrade =
    window.localStorage.getItem("degrade") === "true" ||
    !window.Proxy ||
    !window.CustomElementRegistry;
const props = {
    jump: (name) => {
        router.push({name});
    },
};

const plugins = [
    LocationReloadPlugin(),
    EventTargetPlugin(),
    WindowGetterPlugin(),
    WindowMessagePlugin(),
    DocFullScrollPlugin(),
    InstanceofPlugin()
]

setupApp({
    name: "react-app",
    url: hostMap("//localhost:8889/"),
    exec: true,
    alive: true,
    props,
    degrade,
    plugins,
    ...lifecycles,
});

setupApp({
    name: "vue-app",
    url: hostMap("//localhost:8890/"),
    exec: true,
    alive: true,
    props,
    degrade,
    plugins,
    ...lifecycles,
});

if (window.Proxy) {
    preloadApp({
        name: "react-app",
    });
    preloadApp({
        name: "vue-app",
    });
}


const app = createApp(App)
app.use(WujieVue)
app.use(router)
app.mount('#app')
