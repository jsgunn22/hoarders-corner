import Button from "../components/Atoms/Button";
import Auth from "../utils/auth";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_COMMUNITIES } from "../utils/queries";
import { ADD_COMMUNITY, LEAVE_COMMUNITY } from "../utils/mutations";
import { JOIN_COMMUNITY } from "../utils/mutations";

import PageHeader from "../components/Atoms/PageHeader";
import Modal from "../components/Modals/Modal";
const isLogged = Auth.loggedIn();

const styles = {
  parentDiv: {
    width: "100%",
    border: "1px solid black",
  },
};

export default function AllCommunities() {
  const [showModal, setShowModal] = useState(false);
  const [name, setInputValue] = useState("");

  const { loading, data, error } = useQuery(QUERY_COMMUNITIES);

  const [addCommunity, { error: addCommunityError }] = useMutation(
    ADD_COMMUNITY,
    {
      refetchQueries: [QUERY_COMMUNITIES, "communities"],
    }
  );

  const [joinCommunity, { error: joinCommunityError }] = useMutation(
    JOIN_COMMUNITY,
    {
      refetchQueries: [QUERY_COMMUNITIES, "communities"],
    }
  );

  const [leaveCommunity, { err }] = useMutation(LEAVE_COMMUNITY, {
    refetchQueries: [QUERY_COMMUNITIES, "communities"],
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const communities = data?.communities || [];

  // displays Modal since set to true
  const handleCreateCommunity = () => {
    setShowModal(true);
    setInputValue("");
  };

  // grabs user input
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  // function for creating a community
  const submitCommunityForm = async (event) => {
    try {
      const { data } = await addCommunity({
        variables: { name },
      });
    } catch (err) {
      console.error(err);
    }

    if (data) {
      setShowModal(false);
      setInputValue("");
    } else {
      console.log("didn't create community");
    }
  };

  const joinCommunityAction = async (communityId) => {
    try {
      const { data } = await joinCommunity({
        variables: { communityId },
      });
    } catch (joinCommunityError) {
      console.log(joinCommunityError);
    }

    // data returns as array of communities but function still works

    if (communityId) {
      alert("Successfully Joined!");
    } else if (!communityId) {
      alert("Didn't successfully join");
    }
  };

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

  const myUserId = Auth.getProfile().authenticatedPerson._id;

  return (
    <div className="container">
      <PageHeader
        icon={"fa-solid fa-users"}
        label="All Communities"
        hasButton={isLogged && true}
        btnLabel={"Create Community"}
        btnAction={handleCreateCommunity}
      />
      <div className="flex justify-end"></div>
      <div>
        <div>
          {communities.map((community) => (
            <div
              style={styles.parentDiv}
              className="m-2 flex justify-between"
              key={community._id}
            >
              <div className="w-2/4 ml-2">
                <a href="#">
                  <h2>{community.name}</h2>
                </a>
              </div>
              <div className="flex justify-evenly w-2/4 text-center">
                {isLogged && (
                  <>
                    {community.users.some((user) => user._id === myUserId) ? (
                      <Button
                        label="Leave"
                        style="warning"
                        action={() =>
                          leaveCommunityAction(community._id, community.name)
                        }
                      />
                    ) : (
                      <Button
                        label="Join"
                        type="submit"
                        action={() => joinCommunityAction(community._id)}
                      />
                    )}
                  </>
                )}
                <p>{community.users.length} Members</p>
                <p>{community.items.length} Items</p>
              </div>
            </div>
          ))}
        </div>
        {showModal && (
          <Modal
            heading={"Create A Community"}
            body={
              <input
                type="text"
                placeholder="Title it here"
                value={name}
                onChange={handleInputChange}
              />
            }
            btnLabel={"Create"}
            btnAction={() => submitCommunityForm()}
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
