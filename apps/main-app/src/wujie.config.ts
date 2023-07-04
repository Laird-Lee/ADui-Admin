const map = {
    "//localhost:8888/": "//admin.adui/",
    "//localhost:8889/": "//admin.adui/react-app/",
    "//localhost:8890/": "//admin.adui/vue-app/",
};

export function hostMap(host) {
    if (process.env.NODE_ENV === "production") return map[host];
    return host;
}

export const lifecycles = {
    beforeLoad: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
    beforeMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
    afterMount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
    beforeUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
    afterUnmount: (appWindow) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
    activated: (appWindow) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
    deactivated: (appWindow) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
    loadError: (url, e) => console.log(`${url} 加载失败`, e),
};

export const plugins = [];
