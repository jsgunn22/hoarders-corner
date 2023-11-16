import LoginForm from "../components/LeftNav/LoginForm";
import SignupForm from "../components/LeftNav/SignupForm";

export default function Login() {
  return (
    // This is a simple wire frame we will use for testing JWT Auth
    <>
      <div style={{ display: "flex", gap: "40px" }}>
        <LoginForm />
        <SignupForm />
      </div>
    </>
  );
}
