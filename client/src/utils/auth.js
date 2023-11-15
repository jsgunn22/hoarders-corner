import decode from "jwt-decode";

class AuthService {
  // used to get the current users information from the jwt stored in localStorage
  getProfile() {
    return decode(this.getToken());
  }

  // use this help to render based on logged in status
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // tests the life span of the current users jwt
  isTokenExpired(token) {
    try {
      const decoded = decode(token);

      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // gets the current users token from localStorage
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
