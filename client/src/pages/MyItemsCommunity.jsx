import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MY_ITEMS } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ADD_ITEM } from "../utils/mutations";
import Auth from "../utils/auth";
import Input from "../components/Atoms/Input";
import { Link } from "react-router-dom";

import Modal from "../components/Modals/Modal";
   function MyIndividualItem ({name, description, isPublic}) {
    return (
     <tr className="border font-bold py-2 px-4">
        <td>{name}</td>
        <td>{description}</td>
        <td>
            <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault" 
                checked={isPublic}/>
            <label
                 class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="flexSwitchCheckDefault"
                >Public</label>
        </td>
    </tr>
    );}
   
export default function MyItemsCommunity() {
  if (!Auth.loggedIn()) {

    return (
     <div>
       <p>Must be logged in to view this page</p> 
       <Link to="/">Go to Homepage</Link>
     </div>
    )}
       const [modalState, setModalState] = useState(false);
       function openModal(){
          setModalState(true);
       }
       function closeModal(){
          setModalState(false);
       }
        const { loading, data, error } = useQuery(QUERY_MY_ITEMS);
    if (loading) return <p>Loading..</p>;
    if (error) return <p>Error</p>;
  function saveItem(){ 
    console.log('this will save an item')
  }
function handleChange(event){

  console.log(event.target.value) 
}

    const item = data?.items || [];
  
       return (
    <div>
      <div className="flex items-center justify-between">
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 "><span>&#9830;</span></button> 
        <h2 className="text-h2 font-bold text-neu-7">My Books</h2>
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 " onClick={openModal}>Add Item</button> 
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
            {item.length === 0 ? <p>No items yet!</p> :
                item.map((item, index) => <MyIndividualItem name={item.name} description={item.description} isPublic={item.isPublic} key={index}/>)}
            </tbody>
        </table>
      </div>
       {modalState && <Modal closeModal={closeModal} heading={'Add Item'} body={
       <div className="flex flex-col gap-6">
        <Input label={'Item Name'} type={'text'} name={'name'} value={''} change={handleChange} />
        <Input label={'Item Description'} type={'text'} name={'description'} value={''} change={handleChange} />
        {/* insert checkbox */}
        </div>
       } btnLabel={'Save Item'} btnAction={saveItem}/>}   
   
    </div>
    )
    ;
  }



 


 
 

