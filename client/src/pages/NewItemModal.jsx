import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MY_ITEMS } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ADD_ITEM } from "../utils/mutations";
import Auth from "../utils/auth";
import Button from "../components/Atoms/Button";


function NewItem({ data, messagesSent }) {
    const [nameData, setNameData] = useState('');
    const [descriptionData, setDescriptionData] = useState('');
    const [isPublicData, setIsPublicData] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [modalData, setModalData] = useState();

    const [addItem, { error }] = useMutation(ADD_ITEM);

  const openModal = (m) => {
    setModalState(true);
    setModalData(m);
  };

  const closeModal = () => {
    setModalState(false);
  };
  useEffect(() => {});



return (
    <div>
        <div className="w-screen h-screen bg-[#00000080] absolute top-0 left-0 flex items-center">
            <div className="w-[640px] bg-neu-0 p-8 mx-auto rounded-lg flex flex-col gap-6">
                <div className="flex items-center ">
                 <h2 className="text-h2 font-bold w-full">Add an Item</h2>
                 <i
                    className="fa-solid fa-close text-h2 w-6 h-6 items-center flex text-center cursor-pointer hover:text-pri-7"
                    onClick={handleCloseClick}
                    ></i>
                </div>
                <form>
                    <div className="flex flex-col gap-4">
                        <label className="text-h3 font-bold" htmlFor="name">Name</label>
                        <input className="border border-neu-3 rounded-lg px-4 py-2" type="text" name="name" id="name" value={nameData} onChange={(e) => setNameData(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="text-h3 font-bold" htmlFor="description">Description</label>
                        <input className="border border-neu-3 rounded-lg px-4 py-2" type="text" name="description" id="description" value={descriptionData} onChange={(e) => setDescriptionData(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="text-h3 font-bold" htmlFor="ispublic">Public?</label>
                        <input className="border border-neu-3 rounded-lg px-4 py-2" type="checkbox" name="ispublic" id="ispublic" value={isPublicData} onChange={(e) => setIsPublicData(e.target.value)} />
                    </div>
                </form>
                <Button label="Add Item" action={btnAction} />
            </div>
        </div> 
    </div>
)

