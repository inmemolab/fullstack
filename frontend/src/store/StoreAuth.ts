//* Ini Import
import AuthDataService from "@/services/authDataService";
import { defineStore } from "pinia";

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const useStoreAuth = defineStore({
  id: "authStore",
  state: () => ({
    // initialState
    status: storedUser ? { loggedIn: true } : { loggedIn: false },
    user: storedUser ? JSON.parse(storedUser) : null
  }),
  getters: {},
  actions: {
    login(user: { username: string; password: string }) {
      return AuthDataService.login(user).then(
        (user) => {
          this.status.loggedIn = true;
          this.user = user;
          return Promise.resolve(user);
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;

          return Promise.reject(error);
        }
      );
    },
    logout() {
      AuthDataService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
    register(user: { username: string; email: string; password: string }) {
      return AuthDataService.register(user).then(
        (response) => {
          this.status.loggedIn = false;
          return Promise.resolve(response.data);
        },
        (error) => {
          this.status.loggedIn = false;
          return Promise.reject(error);
        }
      );
    },
    refreshToken(accessToken: any) {
      this.status.loggedIn = true;
      this.user = { ...this.user, accessToken: accessToken };
    }
  }
});
