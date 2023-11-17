   const TempItems = [
    {
        id: 1, 
        name: "Item 1",
        description: "This is item 1", 
        owner: "Owner 1"
    },
    {
        id: 2,
        name: "Item 2",
        description: "This is item 2",
        owner: "Owner 2"
    },
    {
        id: 3,
        name: "Item 3",
        description: "This is item 3",
        owner: "Owner 3"
    }
];
   
   
   
   function IndividualItem (item) {
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
                {TempItems.map((item, index) => <IndividualItem name={item.name} description={item.description} owner={item.owner} key={index}/>)}
            </tbody>
        </table>
      </div>
    </div>
    )
    ;
  }
  