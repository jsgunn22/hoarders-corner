import Modal from "../Modals/Modal";
import Input from "../Atoms/Input";
import TextArea from "../Atoms/TextArea";
import Checkbox from "../Atoms/Checkbox";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_COMMUNITY_ITEMS, QUERY_MY_HOARD } from "../../utils/queries";

export default function CreateItemForm({
  communityName,
  closeModal,
  communityId,
}) {
  const [createItem, { error, data }] = useMutation(ADD_ITEM, {
    refetchQueries: [QUERY_COMMUNITY_ITEMS, "communities"],
    refetchQueries: [QUERY_MY_HOARD, "items"],
  });
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
  };

  const handleIsPublic = () => {
    setIsPublic(!isPublic);
    setFormState({ ...formState, isPublic: !isPublic });
  };

  const createNewItem = async () => {
    console.log("test");
    event.preventDefault();
    try {
      const { data } = await createItem({
        variables: {
          name: formState.name,
          description: formState.description,
          isPublic: formState.isPublic,
          owner: Auth.getProfile().authenticatedPerson.username,
          community: communityName,
          communityId: communityId,
        },
      });
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

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
        btnAction={createNewItem}
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
