// ini import
import api from "@/utils/clientApi";
import TokenService from "./tokenDataService";
// define class
class AuthService {
  logout() {
    TokenService.removeUser();
  }
  login({ username, password }: { username: string; password: string }) {
    return api
      .post("/api/auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }
  register({ username, email, password }: { username: string; email: string; password: string }) {
    return api.post("/api/auth/signup", {
      username,
      email,
      password
    });
  }
}
// export
export default new AuthService();
