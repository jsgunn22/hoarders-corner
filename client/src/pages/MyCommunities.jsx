import PageHeader from "../components/Atoms/PageHeader";
import CommunityRow from "../components/CommunityRow/CommunityRow";
import { QUERY_MY_COMMUNITIES } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_COMMUNITY } from "../utils/mutations";
import Modal from "../components/Modals/Modal";

export default function MyCommunities() {
  const { loading, data, error } = useQuery(QUERY_MY_COMMUNITIES);
  const [addCommunity, { error: addCommunityError }] = useMutation(
    ADD_COMMUNITY,
    {
      refetchQueries: [QUERY_MY_COMMUNITIES, "communities"],
    }
  );
  const [showModal, setShowModal] = useState(false);
  const [name, setInputValue] = useState("");

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error}</p>;

  const myCommunities = data?.myCommunities.communities || [];

  // CREATE COMMUNITY
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

  return myCommunities.length === 0 ? (
    <p>You are not a memember of any communities</p>
  ) : (
    <>
      <PageHeader
        label="My Communities"
        icon="fa-solid fa-user"
        hasButton={true}
        btnLabel="Create Community"
        btnAction={handleCreateCommunity}
      />
      <table className="w-full mt-2">
        <tbody className="flex flex-col gap-4">
          {myCommunities.map((c, i) => (
            <CommunityRow
              key={i}
              _id={c._id}
              name={c.name}
              members={c.users.length}
              items={c.items.length}
            />
          ))}
        </tbody>
      </table>
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
    </>
  );
}
