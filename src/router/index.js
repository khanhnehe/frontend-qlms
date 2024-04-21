import { createWebHistory, createRouter } from "vue-router";
import CrudNXB from "@/components/admin/CrudNXB.vue";
import CrudSach from "../components/admin/Sach/CrudSach.vue";
import EditSach from "../components/admin/Sach/EditSach.vue";
const routes = [

    {
        path: "/manager-nxb",
        name: "nxb.manager",
        component: CrudNXB,
    },

    {
        path: "/manager-sach",
        name: "sach.manager",
        component: CrudSach,
    },

    //edit sach
    {
        path: "/edit-sach/:id",
        name: "sach.edit",
        component: EditSach,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;