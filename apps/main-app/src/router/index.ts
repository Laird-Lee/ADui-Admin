import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const Layout = () => import('@/components/Layout/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        redirect: '/login',
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
            {
                path: "/dict-management",
                component: () => import('@/views/DictManagement/index.vue'),
            },
            {
                path: '/menu-management',
                component: () => import('@/views/MenuManagement/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


