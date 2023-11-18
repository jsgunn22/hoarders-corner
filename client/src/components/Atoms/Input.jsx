import { useState } from "react";

export default function Input({ label, type, name, value, change, warning }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");

    setEmptyError(e.target.value === "");

    // If type is email check string to make sure it matches format
    e.target.type === "email" && /^\S+@\S+\.\S+$/.test(e.target.value)
      ? setShowError(false)
      : e.target.type !== "email"
      ? setShowError(false)
      : setShowError(true);
  };

  return (
    <div>
      <label
        className={`transition duration-300  text-med mb-1 p-1 w-fit absolute ml-3 ${
          isFocused || hasValue
            ? "-translate-y-[10px] bg-neu-0 text-pri-5"
            : `translate-y-[14px] text-neu-6`
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className={`border-2 rounded-md bg-neu-0 ${
          emptyError && warning ? "border-dan-5" : "border-neu-5"
        }  focus:border-pri-5 focus:outline-none p-3 w-full`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={change}
      ></input>
      {(showError || emptyError) && warning ? (
        <div className="flex text-dan-5 relative top-1 gap-1 h-0">
          <i className="fa-solid fa-circle-exclamation text-sm"></i>
          <p className="text-sm">{`${
            emptyError
              ? "This field can not be empty"
              : "The format does not match an email"
          }`}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
