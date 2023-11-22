import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_MY_HOARD } from "../utils/queries";
import PageHeader from "../components/Atoms/PageHeader";
import Checkbox from "../components/Atoms/Checkbox";
import { UPDATE_ITEM_PUBLIC } from "../utils/mutations";

function HoardItem({ _id, index, name, description, isPublic }) {
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

  const deleteItem = () => {
    console.log(_id);
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
          onClick={deleteItem}
        ></i>
      </td>
    </tr>
  );
}

export default function MyHoard() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(QUERY_MY_HOARD, {
    variables: { communityId: id },
  });

  const myItems = data?.myHoard || [];
  const pageTitle = data?.myHoard[0].community;
  console.log(pageTitle);

  return (
    <>
      <PageHeader
        icon={`fa-solid fa-box`}
        label={
          <>
            My Hoard <span className="text-pri-5">{pageTitle}</span>
          </>
        }
      />
      <table className="w-full h-6 bg-neu-0 rounded-lg shadow-md">
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
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
