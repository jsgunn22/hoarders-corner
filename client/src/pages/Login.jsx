export default function Login() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div id="login-card">
          <h2>Login to existing account</h2>
          <div>
            <label form="email-login">Email</label>
            <input id="email-login" type="email"></input>
          </div>
          <div>
            <label form="password-login">Password</label>
            <input id="password-login" type="password"></input>
          </div>
          <button>Login</button>
        </div>
        <div>
          <h2>New user sign up</h2>
          <div>
            <label form="username-signup">Username</label>
            <input id="username-signup" type="text"></input>
          </div>
          <div>
            <label form="email-signup">Email</label>
            <input id="email-signup" type="email"></input>
          </div>
          <div>
            <label form="password-signup">Password</label>
            <input id="password-signup" type="password"></input>
          </div>
          <button>Sign Up</button>
        </div>
      </div>
    </>
  );
}
