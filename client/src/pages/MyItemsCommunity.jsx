const TempItems = [
    {
        id: 1, 
        name: "Item 1",
        description: "This is item 1",
        public: "checked" 
    },
    {
        id: 2,
        name: "Item 2",
        description: "This is item 2",
        public: "disabled"
    },
    {
        id: 3,
        name: "Item 3",
        description: "This is item 3",
        public: "checked"
    }
];
   
   
   
   function MyIndividualItem (item) {
    return (
     <tr className="border font-bold py-2 px-4">
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="item.public" class="sr-only peer"/>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Public</span>
            </label>
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
                {TempItems.map((item, index) => <MyIndividualItem name={item.name} description={item.description} public={item.public} key={index}/>)}
            </tbody>
        </table>
      </div>
    </div>
    )
    ;
  }