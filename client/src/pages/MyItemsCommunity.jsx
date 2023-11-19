import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MY_ITEMS } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/Atoms/PageHeader";
import { useEffect, useState } from "react";
import Modal from "../components/Modals/Modal";
import TextArea from "../components/Atoms/TextArea";
import { ADD_ITEM } from "../utils/mutations";
import Auth from "../utils/auth";
import Button from "../components/Atoms/Button";

const TempItems = [
    {
        id: 1, 
        name: "Item 1",
        description: "This is item 1",
        ispublic: false 
    },
    {
        id: 2,
        name: "Item 2",
        description: "This is item 2",
        ispublic: true
    },
    {
        id: 3,
        name: "Item 3",
        description: "This is item 3",
        ispublic: false
    }
];
   
   
   
   function MyIndividualItem (item) {
    return (
     <tr className="border font-bold py-2 px-4">
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>
            <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault" 
                checked={item.ispublic}/>
            <label
                 class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="flexSwitchCheckDefault"
                >Public</label>
        </td>
    </tr>
    );}
   
    
export default function ItemsCommunity() {
    return (
    <div>
      <div className="flex items-center justify-between">
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 "><span>&#9830;</span></button> 
        <h2 className="text-h2 font-bold text-neu-7">My Books</h2>
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 ">Add Item</button> 
      </div>
        
      <div className="p-8 overflow-auto relative">
        <table className="table-fixed  border-x border-y rounded w-full shadow-lg bg-white border-collapse">
            <thead>
                <tr>
                    <th className="text-h3 font-bold text-neu-7">Name</th>
                    <th className="text-h3 font-bold text-neu-7">Description</th>
                    <th className="text-h3 font-bold text-neu-7">Public</th>
                </tr>
            </thead>
            <tbody>
                {TempItems.map((item, index) => <MyIndividualItem name={item.name} description={item.description} ispublic={item.ispublic} key={index}/>)}
            </tbody>
        </table>
      </div>
    </div>
    )
    ;
  }


function MessagesTable({ data, messagesSent }) {
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

}

  //adds an item modal
    const addItem = async () => {
        if (textAreaValue.trim()) {
        try {
            const { data } = await addItem({
            variables: {
                name: nameData.trim(),
                description: descriptionData.trim(),
                ispublic: isPublicData.trim(),
            },
            });
        } catch (error) {
            console.error(error);
            }
        closeModal();
        }
    };

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

  

 
 

