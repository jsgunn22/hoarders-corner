import Button from "../Atoms/Button";
import { useMutation } from "@apollo/client";
import { LEAVE_COMMUNITY } from "../../utils/mutations";
import { QUERY_MY_COMMUNITIES } from "../../utils/queries";

export default function CommunityRow({ _id, name, members, items }) {
  const [leaveCommunity, { err }] = useMutation(LEAVE_COMMUNITY, {
    refetchQueries: [QUERY_MY_COMMUNITIES, "communities"],
  });
  const leaveCommunityAction = async (communityId, communityName) => {
    try {
      const { data } = await leaveCommunity({ variables: { communityId } });
    } catch (error) {
      console.error(error);
    }

    if (communityId) {
      alert(`You are no longer following ${communityName}`);
    } else if (!communityId) {
      alert("Didn't successfully leave");
    }
  };

  return (
    <tr className="w-full bg-neu-0 h-16 flex rounded-lg shadow-md hover:shadow-xl cursor-pointer ">
      <td className="px-6 flex items-center w-full">
        <h3 className="text-h3 font-bold text-pri-5">{name}</h3>
      </td>
      <td className="flex items-center min-w-[128px]">
        <i className="fa-solid fa-users mr-1 text-pri-5 "></i>
        <h4 className="text-h4 font-bold">{members} Members</h4>
      </td>
      <td className="flex items-center min-w-[96px]">
        <i className="fa-solid fa-tag mr-1 text-pri-5"></i>
        <h4 className="text-h4 font-bold">{items} Items</h4>
      </td>
      <td className="flex px-6 items-center h-full">
        <Button
          label="Leave"
          action={() => leaveCommunityAction(_id, name)}
          style="warning"
        />
      </td>
    </tr>
  );
}
