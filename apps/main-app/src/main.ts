import {createApp} from 'vue'
import router from "./router";
import pinia from './store'
import WujieVue from "wujie-vue3";
import {
    LocationReloadPlugin,
    EventTargetPlugin,
    WindowGetterPlugin,
    WindowMessagePlugin,
    DocFullScrollPlugin,
    InstanceofPlugin
} from 'wujie-polyfill'
import {hostMap, lifecycles} from "./wujie.config";
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import '@/styles/index.less'

const {setupApp, preloadApp} = WujieVue;

const degrade =
    window.localStorage.getItem("degrade") === "true" ||
    !window.Proxy ||
    !window.CustomElementRegistry;
const props = {
    jump: (name: string) => {
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
        url: ''
    });
    preloadApp({
        name: "vue-app",
        url: ''
    });
}


const app = createApp(App)
app.use(WujieVue)
app.use(router)
app.use(pinia)
app.mount('#app')
