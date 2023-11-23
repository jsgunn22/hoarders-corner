import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_MY_HOARD } from "../utils/queries";
import PageHeader from "../components/Atoms/PageHeader";
import Checkbox from "../components/Atoms/Checkbox";
import { UPDATE_ITEM_PUBLIC, DELETE_ITEM } from "../utils/mutations";
import Prompt from "../components/Modals/Prompt";
import { useState } from "react";
import CreateItemForm from "../components/CreateItemForm/CreateItemForm";

function HoardItem({ _id, index, name, description, isPublic, handleDelete }) {
  const [updateItemPublic, { error }] = useMutation(UPDATE_ITEM_PUBLIC, {
    refetchQueries: [QUERY_MY_HOARD, "items"],
  });

  const updateItem = async () => {
    try {
      const { data } = await updateItemPublic({ variables: { itemId: _id } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr className={`h-16 ${!index && "border-b-[1px] border-opac-neu"} `}>
      <td className="px-6 min-w-[208px]">{name}</td>
      <td className="px-6 w-full py-3">{description}</td>
      <td className="items-center flex flex-col w-24 ">
        <div className="mx-auto mt-6">
          <Checkbox checked={isPublic} onChange={updateItem} />
        </div>
      </td>
      <td className="w-24 text-center ">
        <i
          className="fa-solid fa-trash  cursor-pointer text-neu-7 hover:text-dan-5"
          onClick={handleDelete}
        ></i>
      </td>
    </tr>
  );
}

function DeletePrompt({ data, closeModal }) {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM, {
    refetchQueries: [QUERY_MY_HOARD, "items"],
  });

  const deleteThisItem = () => {
    try {
      deleteItem({ variables: { itemId: data._id } });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Prompt
      heading={
        <>
          Are you sure you want to delete{" "}
          <span className="text-pri-5">{data.name}</span>
        </>
      }
      body={<p>This action can not be undone</p>}
      priLabel="Delete"
      secLabel="Cancel"
      priStyle="danger"
      secStyle="neutral"
      priAction={deleteThisItem}
      secAction={closeModal}
    />
  );
}

export default function MyHoard() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(QUERY_MY_HOARD, {
    variables: { communityId: id },
  });
  const [deletePromptState, setDeletePromptState] = useState(false);
  const [deletePromtData, setDeletePromptData] = useState();

  const [createModalState, setCreateModalState] = useState(false);

  const myItems = data?.myHoard || [];
  if (myItems.length ===0 ) { 
    return (
      <div>
        <AllCommunities />
      </div>
    )
  }
  const pageTitle = data?.myHoard[0].community;

  const openCreateModal = () => {
    setCreateModalState(true);
  };

  const openDeletePrompt = (data) => {
    setDeletePromptData(data);
    setDeletePromptState(true);
  };

  const closeModal = () => {
    setDeletePromptState(false);
    setCreateModalState(false);
  };

  return (
    <>
      <PageHeader
        icon={`fa-solid fa-box`}
        label={
          <>
            My Hoard <span className="text-pri-5">{pageTitle}</span>
          </>
        }
        hasButton={true}
        btnLabel={`Add Item`}
        btnAction={openCreateModal}
      />
      <table className="w-full h-6 bg-neu-0 rounded-lg shadow-md mt-4">
        <thead className="text-neu-7 h-10 border-b-[1px] border-opac-neu">
          <tr>
            <th className="min-w-[208px] text-left px-6">Item Name</th>
            <th className="w-full text-left px-6">Description</th>
            <th className="px-6 w-24 text-center">Public</th>
            <th className="px-6 w-24 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {myItems.map((item, i) => (
            <HoardItem
              key={i}
              index={myItems.length - 1 === i}
              _id={item._id}
              name={item.name}
              isPublic={item.isPublic}
              description={item.description}
              handleDelete={() => openDeletePrompt({ ...item })}
            />
          ))}
        </tbody>
        
      </table>
      {deletePromptState && (
        <DeletePrompt data={deletePromtData} closeModal={closeModal} />
      )}
      {createModalState && (
        <CreateItemForm
          closeModal={closeModal}
          communityName={pageTitle}
          communityId={id}
        />
      )}
    </>
  );
  
}
