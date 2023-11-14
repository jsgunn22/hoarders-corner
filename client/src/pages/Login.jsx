import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Login() {
  return (
    <>
      <div style={{ display: "flex", gap: "40px" }}>
        <LoginForm />
        <SignupForm />
      </div>
    </>
  );
}
