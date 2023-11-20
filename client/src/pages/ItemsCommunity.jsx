import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ITEMS_COMMUNITIES } from "../utils/queries";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";

   

   
   
   
   function IndividualItem (name, description, owner) {
    return (
     <tr className="border font-bold py-2 px-4">
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.owner}</td>
        <td>
           <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 ">Message Owner</button> 
        </td>
    </tr>
    );}
   
    
export default function ItemsCommunity() {
    const { loading, data, error } = useQuery(QUERY_ITEMS_COMMUNITIES);
    if (loading) return <p>Loading..</p>;
    if (error) return <p>Error</p>;
    
    const item = data?.itemByCommunity || [];
    return (
    <div>
      <div className="flex items-center justify-between">
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 "><span>&#8592;</span></button> 
        <h2 className="text-h2 font-bold text-neu-7">Books</h2>
        <button className= "bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 ">Join</button> 
      </div>
        
      <div className="p-8 overflow-auto relative">
        <table className="table-fixed  border-x border-y rounded w-full shadow-lg bg-white border-collapse">
            <thead>
                <tr>
                    <th className="text-h3 font-bold text-neu-7">Name</th>
                    <th className="text-h3 font-bold text-neu-7">Description</th>
                    <th className="text-h3 font-bold text-neu-7">Owner</th>
                    <button></button>
                </tr>
            </thead>
            <tbody>
                {item.map((item, index) => <IndividualItem name={item.name} description={item.description} owner={item.owner} key={index}/>)}
            </tbody>
        </table>
      </div>
    </div>
    )
    ;
  }
  