import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import('../App.vue'),
    },
]

const router = createRouter({
    history: createWebHistory('/vue-app'),
    routes
})

export default router


