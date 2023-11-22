import Modal from "../Modals/Modal";
import Input from "../Atoms/Input";
import TextArea from "../Atoms/TextArea";
import Checkbox from "../Atoms/Checkbox";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ITEM, UPLOAD_IMAGE } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_COMMUNITY_ITEMS } from "../../utils/queries";

export default function CreateItemForm({
  communityName,
  closeModal,
  communityId,
}) {
  const [createItem, { error, data }] = useMutation(ADD_ITEM, {
    refetchQueries: [QUERY_COMMUNITY_ITEMS, "communities"],
  });
  const [uploadImage] = useMutation(UPLOAD_IMAGE);
  const [isPublic, setIsPublic] = useState(false);
  const [image, setImage] = useState(null);
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

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    try {
      const response = await uploadImage({
        variables: {
          file,
        },
      });
      console.log('Uploaded image:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
          image,
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
            
<label htmlFor="imageUpload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
Upload an image: 
    <input id="imageUpload" 
    type="file" 
    accept=".jpg, .jpeg, .png, .gif" 
    onChange={handleImageChange} 
    />
</label>
            
          </>
        }
      />
    </>
  );
}
