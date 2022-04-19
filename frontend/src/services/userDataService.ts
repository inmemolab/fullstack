// ini import
import api from "@/utils/clientApi";
// define class
class UserDataService {
  getPublicContent() {
    return api.get("/api/users/all");
  }

  getUserBoard() {
    return api.get("/api/users/user");
  }

  getModeratorBoard() {
    return api.get("/api/users/mod");
  }

  getAdminBoard() {
    return api.get("/api/users/admin");
  }
}
// export
export default new UserDataService();
