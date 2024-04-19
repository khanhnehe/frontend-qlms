import { createWebHistory, createRouter } from "vue-router";
import CreateNXB from "@/components/admin/CreateNXB.vue";
const routes = [
    // {
    //     path: "/",
    //     name: "contactbook",
    //     component: ContactBook,
    // },
    {
        path: "/create-nxb",
        name: "nxb.create",
        component: CreateNXB,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    // {
    //     path: "/contacts/:id",
    //     name: "contact.edit",
    //     component: () => import("@/views/ContactEdit.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
    // {
    //     path: "/contacts/",
    //     name: "contact.create",
    //     component: () => import("@/views/ContactCreate.vue"),
    // },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;