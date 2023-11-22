import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_MY_HOARD } from "../utils/queries";
import PageHeader from "../components/Atoms/PageHeader";

function HoardItem({ name, description, isPublic }) {
  return (
    <tr className="">
      <td>{name}</td>
      <td>{description}</td>
      <td>{isPublic ? "isPublic" : "isNotPublic"}</td>
    </tr>
  );
}

export default function MyHoard() {
  const { id } = useParams();
  const { loading, data, error } = useQuery(QUERY_MY_HOARD, {
    variables: { communityId: id },
  });

  const myItems = data?.myHoard || [];

  console.log(myItems);

  return (
    <>
      <PageHeader icon={`fa-solid fa-box`} label="My Hoard (temp)" />
      <table className="w-full h-6 bg-neu-0 rounded-lg shadow-md">
        <thead>
          <th>Item Name</th>
          <th>Description</th>
          <th>Public</th>
        </thead>
        <tbody>
          {myItems.map((item, i) => (
            <HoardItem
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
