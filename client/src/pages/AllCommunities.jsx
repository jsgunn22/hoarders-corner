import Auth from "../utils/auth";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_COMMUNITIES, QUERY_MY_COMMUNITIES, QUERY_COMMUNITY } from "../utils/queries";
import { ADD_COMMUNITY, LEAVE_COMMUNITY } from "../utils/mutations";
import { JOIN_COMMUNITY } from "../utils/mutations";

import CommunityRow from "../components/CommunityRow/CommunityRow";
import PageHeader from "../components/Atoms/PageHeader";
import Modal from "../components/Modals/Modal";
import SearchBar from "../components/SearchBar";

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
  const [findCommunityValue, setFindCommunity] = useState("");

  const { loading, data, error } = useQuery(QUERY_COMMUNITIES);
  const {loading: communityLoading, data: communityData, error: communityError } = useQuery(QUERY_COMMUNITY, {
    variables: { name: findCommunityValue},
  });

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

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const communities = data?.communities || [];
  
  const oneCommunity = communityData?.communityName || [];
  

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

  const handleSearchChange = (event) => {
    event.preventDefault();
    setFindCommunity(event.target.value);
    console.log(findCommunityValue);
  }

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

  const searchForCommunity = async (event) => {

    try {
      console.log(oneCommunity);
      console.log(oneCommunity._id);
      window.location.href = `/communities/${oneCommunity._id}`;
      
    } catch (error) {
      console.log(error);
    }
    // need to query using the findcommunityvalue to grab the communities id and then put that into the window location
  }


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

  // function for searching for a community
  const findACommunity = async () => {

  }




  const myUserId = isLogged && Auth.getProfile().authenticatedPerson._id;

  return (
    <div className="container">
      <PageHeader
        icon={"fa-solid fa-users"}
        label="All Communities"
        hasButton={isLogged && true}
        btnLabel={"Create Community"}
        btnAction={handleCreateCommunity}
      />
      <div className="w-full mt-2">
        <SearchBar
          bType={"submit"}
          btnAction={searchForCommunity}
          body={
            <input
              type="text"
              placeholder="Find a Community"
              value={findCommunityValue}
              onChange={handleSearchChange}
            />
          }
        />
        <div className="flex flex-col gap-4">
          {communities.map((c, i) => (
            <div key={i}>
              <CommunityRow
                _id={c._id}
                name={c.name}
                members={c.users.length}
                items={c.items.length}
                join={joinCommunityAction}
                hasButton={isLogged === true}
                isMyCommunity={c.users.some((user) => user._id === myUserId)}
              />
            </div>
          ))}
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
    </div>
  );
}
