import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const Layout = () => import('@/components/Layout/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: "/home",
                component: () => import('@/views/Home.vue'),
            },
            {
                path: "/react-app/:url?",
                component: () => import('@/views/ReactApp.vue'),
            },
            {
                path: "/vue-app/:url?",
                component: () => import('@/views/VueApp.vue'),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


