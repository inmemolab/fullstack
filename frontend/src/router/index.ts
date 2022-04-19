import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from "vue-router";
// import layouts
import LayoutDefault from "@/layouts/layoutDefault.vue";
import LayoutAuth from "@/layouts/layoutAuth.vue";
import layoutProfile from "@/layouts/layoutProfile.vue";
import LayoutAdmin from "@/layouts/layoutAdmin.vue";
// import views
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
// lazy-loaded
const AboutView = () => import("@/views/AboutView.vue");
const ProfileView = () => import("@/views/profile/ProfileView.vue");
const BoardAdmin = () => import("@/components/BoardAdmin.vue");
const BoardModerator = () => import("@/components/BoardModerator.vue");
const BoardUser = () => import("@/components/BoardUser.vue");
const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { layout: LayoutDefault }
  },
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: HomeView,
    meta: { layout: LayoutDefault }
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: { layout: LayoutDefault }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { layout: LayoutAuth }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { layout: LayoutAuth }
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfileView,
    meta: { layout: layoutProfile }
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
    meta: { layout: LayoutAdmin }
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
    meta: { layout: LayoutAdmin }
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
    meta: { layout: LayoutAdmin }
  }
];

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });

  return router;
}
