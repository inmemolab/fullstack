// ini import
import AuthDataService from "@/services/authDataService";
import { defineStore } from "pinia";
// info in localstorage
const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
// export
export const useStoreAuth = defineStore("authStore", {
  state: () => ({
    status: storedUser ? { loggedIn: true } : { loggedIn: false },
    user: storedUser ? JSON.parse(storedUser) : null
  }),
  getters: {},
  actions: {
    setuser() {
      let storedUser;
      // if is browser
      const isBrowser = typeof window !== "undefined";
      if (isBrowser) {
        storedUser = localStorage.getItem("user");
      }
      this.status = storedUser ? { loggedIn: true } : { loggedIn: false };
      this.user = storedUser ? JSON.parse(storedUser) : null;
    },
    logout() {
      AuthDataService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
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
