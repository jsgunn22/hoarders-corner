import { useState } from "react";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";

// When implementing the prop "body" it needs to be an input element to
// to able to use a useState on our search
// can reference the call of modal in AllCommunities page

export default function SearchBar({
  btnAction,
  bType,
  searchFieldLabel,
  change,
  value,
}) {
  return (
    <div className="flex  mb-4 ">
      <div className="mr-2">
        <Input
          label={searchFieldLabel}
          change={change}
          type={"text"}
          value={value}
        />
      </div>
      <Button label="Search" action={btnAction} type={bType} />
    </div>
  );
}
