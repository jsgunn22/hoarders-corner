import { useQuery, useMutation } from "@apollo/client";
import Button from "../Atoms/Button";
import { LEAVE_COMMUNITY } from "../../utils/mutations";
import {
  QUERY_MY_COMMUNITIES,
  QUERY_COMMUNITY_ITEMS,
} from "../../utils/queries";

import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

export default function CommunityRow({
  _id,
  name,
  members,
  items,
  isMyCommunity,
  join,
  hasButton,
}) {
  const [leaveCommunity, { err }] = useMutation(LEAVE_COMMUNITY, {
    refetchQueries: [QUERY_MY_COMMUNITIES, "communities"],
  });
  const communityId = _id;
  const { loading, data, error } = useQuery(QUERY_COMMUNITY_ITEMS, {
    variables: { communityId: communityId },
  });

  const myCommunityItems =
    (Auth.loggedIn() &&
      data?.itemByCommunity.items.filter(
        (item) => item.owner === Auth.getProfile().authenticatedPerson.username
      )) ||
    [];

  const leaveCommunityAction = async (communityId, communityName) => {
    if (myCommunityItems.length > 0) {
      alert("You have items in this community. Please remove them first");
      return;
    } else {
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
    }
  };

  return (
    <div className="w-full bg-neu-0 h-16 flex rounded-lg shadow-md hover:shadow-lg cursor-pointer">
      <div className="px-6 flex items-center w-full">
        <Link className="flex items-center" to={`/communities/${_id}`}>
          <h3 className="text-h3 font-bold text-pri-5 mr-1">{name}</h3>
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
      <div className="flex items-center min-w-[128px]">
        <i className="fa-solid fa-users mr-1 text-pri-5 "></i>
        <h4 className="text-h4 font-bold">{members} Members</h4>
      </div>
      <div className="flex items-center min-w-[96px]">
        <i className="fa-solid fa-tag mr-1 text-pri-5"></i>
        <h4 className="text-h4 font-bold">{items} Items</h4>
      </div>
      <div className="flex px-6 items-center h-full">
        {hasButton &&
          (isMyCommunity ? (
            <Button
              label="Leave"
              action={() => leaveCommunityAction(_id, name)}
              style="warning"
            />
          ) : (
            <Button label="Join" action={() => join(_id)} />
          ))}
      </div>
    </div>
  );
}
