import { useState, useRef, useEffect } from "react";
import LeftNav from "../LeftNav/LeftNav";

const OutsideClickHandler = ({ children, onOutsideClick, showNav }) => {
  const containerRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        showNav && onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onOutsideClick]);

  return <div ref={containerRef}>{children}</div>;
};

export default function MobileNav() {
  const [showNav, setShowNav] = useState(false);

  const handleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={handleNav} showNav={showNav}>
        <div className="bg-neu-0 ">
          <div className="h-14 bg-opac-pri flex px-4 py-4 items-center ">
            <i
              className="fa-solid fa-bars text-h3 text-pri-5 mr-4"
              onClick={handleNav}
            ></i>
            <h2 className="text-h2 font-bold w-full text-neu-9">
              Hoarder's Corner
            </h2>
          </div>
        </div>
        <div
          className={`absolute  z-10 shadow-2xl transition-transform  ${
            !showNav && "-left-[290px]"
          }`}
        >
          <LeftNav />
        </div>
      </OutsideClickHandler>
    </>
  );
}
