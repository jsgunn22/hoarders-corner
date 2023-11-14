import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);

      return decoded.exp < Date.now() / 1000 ? true : false;

      //   if (decoded.exp < Date.now() / 1000) {
      //     return true;
      //   } else {
      //     return false;
      //   }
    } catch (error) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // sets the token in the clients localStorage
    localStorage.setItem("id_token", idToken);
    // redirects user to main
    window.location.assign("/");
  }

  logout() {
    // removes the token from the clients localStorage
    localStorage.removeItem("id_token");
    // redirects user to main
    window.location.assign("/");
  }
}

export default new AuthService();
