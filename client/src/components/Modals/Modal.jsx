import { useState } from "react";
import Button from "../Atoms/Button";

export default function Modal({
  heading,
  body,
  btnLabel,
  btnAction,
  closeModal,
}) {
  const handleCloseClick = () => {
    closeModal();
  };

  return (
    <div className="w-screen h-screen bg-[#00000080] absolute top-0 left-0 flex items-center">
      <div className="w-[640px] bg-neu-0 p-8 mx-auto rounded-lg flex flex-col gap-6">
        <div className="flex items-center ">
          <h2 className="text-h2 font-bold w-full">{heading}</h2>
          <i
            className="fa-solid fa-close text-h2 w-6 h-6 items-center flex text-center cursor-pointer hover:text-pri-7"
            onClick={handleCloseClick}
          ></i>
        </div>
        {body}
        <Button label={btnLabel} action={btnAction} />
      </div>
    </div>
  );
}
