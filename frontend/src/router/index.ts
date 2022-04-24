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
    name: "main",
    component: HomeView,
    meta: {
      layout: LayoutDefault,
      title: "Hola-Mundo",
      description: "this is a test",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: HomeView,
    meta: {
      layout: LayoutDefault,
      title: "Hola-Mundo",
      description: "this is a test",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    meta: {
      layout: LayoutDefault,
      title: "About",
      description: "this is a test - About",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      layout: LayoutAuth,
      title: "Login",
      description: "this is a test - login",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      layout: LayoutAuth,
      title: "Register",
      description: "this is a test - register",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      layout: layoutProfile,
      title: "Profile",
      description: "this is a test - profile",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: BoardAdmin,
    meta: {
      layout: LayoutAdmin,
      title: "Board Admin",
      description: "Board Admin",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/mod",
    name: "moderator",
    component: BoardModerator,
    meta: {
      layout: LayoutAdmin,
      title: "Board moderator",
      description: "Board moderator",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  },
  {
    path: "/user",
    name: "user",
    component: BoardUser,
    meta: {
      layout: LayoutAdmin,
      title: "Board user",
      description: "Board user",
      keywords: "vite,vue,head",
      author: "EnMemoLab"
    }
  }
];

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });

  return router;
}
