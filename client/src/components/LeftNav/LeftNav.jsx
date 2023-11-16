import Auth from "../../utils/auth";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function LeftNav() {
  return (
    <>
      <div className={`bg-neu-0 h-full min-w-[290px]`}>
        <div className="h-14 bg-opac-pri flex px-4 py-4">
          <i className="fa-solid fa-box text-h3 text-pri-5 mr-2"></i>
          <h3 className="text-h3 font-bold text-neu-9">Hoarder's Corner</h3>
        </div>
        {Auth.loggedIn() ? (
          <div></div>
        ) : (
          <div>
            <LoginForm />
            <SignupForm />
          </div>
        )}
      </div>
    </>
  );
}
