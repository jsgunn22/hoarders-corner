import Modal from "../Modals/Modal";
import Input from "../Atoms/Input";
import TextArea from "../Atoms/TextArea";
import Checkbox from "../Atoms/Checkbox";
import { useState } from "react";
import { useMutation } from "@apollo/client";

export default function CreateItemForm({
  communityName,
  closeModal,
  communityId,
}) {
  const [isPublic, setIsPublic] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    isPublic: isPublic,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState);
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
    setFormState({ ...formState, isPublic: !isPublic });
  };

  const createNewItem = () => {};

  return (
    <>
      <Modal
        closeModal={closeModal}
        heading={
          <>
            Create new {<span className="text-pri-5">{communityName}</span>}{" "}
            Item
          </>
        }
        btnLabel={"Create Item"}
        body={
          <>
            <Input
              label="Item Name"
              warning={true}
              name={"name"}
              value={formState.name}
              change={handleFormChange}
            />
            <TextArea
              label={`Item Description`}
              name={"description"}
              value={formState.description}
              onChange={handleFormChange}
            />
            <Checkbox
              label="This item is public."
              onChange={handleIsPublic}
              checked={isPublic}
              name={"isPublic"}
            />
          </>
        }
      />
    </>
  );
}
