const map: {
    [props: string]: string
} = {
    "//localhost:8888/": "//admin.adui/",
    "//localhost:8889/": "//admin.adui/react-app/",
    "//localhost:8890/": "//admin.adui/vue-app/",
};

export function hostMap(host: string) {
    if (process.env.NODE_ENV === "production") return map[host];
    return host;
}

export const lifecycles = {
    beforeLoad: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} beforeLoad 生命周期`),
    beforeMount: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} beforeMount 生命周期`),
    afterMount: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} afterMount 生命周期`),
    beforeUnmount: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} beforeUnmount 生命周期`),
    afterUnmount: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} afterUnmount 生命周期`),
    activated: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} activated 生命周期`),
    deactivated: (appWindow: any) => console.log(`${appWindow.__WUJIE.id} deactivated 生命周期`),
    loadError: (url: string, e: any) => console.log(`${url} 加载失败`, e),
};

export const plugins = [];
