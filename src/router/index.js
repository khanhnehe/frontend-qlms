import { createWebHistory, createRouter } from "vue-router";
import CrudNXB from "@/components/admin/CrudNXB.vue";
import CrudSach from "../components/admin/Sach/CrudSach.vue";
import EditSach from "../components/admin/Sach/EditSach.vue";
import NotFound from "@/views/NotFound.vue";
import HomePage from "@/components/ui/HomePage.vue";
import InfoSach from "@/components/ui/Sachs/InfoSach.vue";
import Login from "@/components/admin/user/Login.vue";
import CartSach from "@/components/ui/Sachs/CartSach.vue";
import PhieuCho from "@/components/ui/PhieuMuon/PhieuCho.vue";

const routes = [
    {
        path: "/admin",
        component: () => import("./layout/AdminLayout.vue"), // Thay đổi thành layout thực tế của bạn
        children: [
            {
                path: "manager-nxb",
                name: "nxb.manager",
                component: CrudNXB,
            },
            {
                path: "manager-sach",
                name: "sach.manager",
                component: CrudSach,
            },
            {
                path: "edit-sach/:id",
                name: "sach.edit",
                component: EditSach,
            },
        ]
    },
    {
        path: "/",
        component: () => import("./layout/Userlayout.vue"), // Thay đổi thành layout thực tế của bạn
        children: [
            {
                path: "/",
                name: "user.home",
                component: HomePage,
            },
            //info sách
            {
                path: "/info-sach/:id",
                name: "user.infoSach",
                component: InfoSach,
            },
            //login
            {
                path: "/login",
                name: "user.login",
                component: Login,
            },
            //cart
            {
                path: "/cart-sach/:id",
                name: "user.CartSach",
                component: CartSach,
            },
            //phieu
            {
                path: "/phieu-cho/:id",
                name: "user.PhieuCho",
                component: PhieuCho,
            },

        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;