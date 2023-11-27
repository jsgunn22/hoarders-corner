import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_COMMUNITY_ITEMS,
  QUERY_MY_MESSAGES,
  QUERY_COMMUNITIES,
  QUERY_USERS,
} from "../utils/queries";
import { useParams } from "react-router-dom";
import Button from "../components/Atoms/Button";
import {
  SEND_MESSAGE,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
} from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import Modal from "../components/Modals/Modal";
import TextArea from "../components/Atoms/TextArea";
import PageHeader from "../components/Atoms/PageHeader";
import CreateItemForm from "../components/CreateItemForm/CreateItemForm";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function IndividualItem({ name, description, owner, _id, openMessageModal }) {
  return (
    <div className="border-b-[1px] border-opac-neu  py-2  flex w-full">
      <div className="flex min-w-[204px] px-6 py-3">{name}</div>
      <div className="flex w-full px-6 py-3">{description}</div>
      <div className="flex min-w-[204px] text-left px-6 py-3">{owner}</div>
      <div className="flex min-w-[184px] justify-end py-3 px-6">
        <Button label="Message Owner" action={() => openMessageModal(owner)} />
      </div>
    </div>
  );
}

function MessageModal({ name, closeModal }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [sendMessage, { error }] = useMutation(SEND_MESSAGE, {
    refetchQueries: [QUERY_MY_MESSAGES, "messages"],
  });

  const sendToOwner = async () => {
    console.log(textAreaValue);
    if (textAreaValue.trim()) {
      try {
        const { data } = await sendMessage({
          variables: {
            sender: Auth.getProfile().authenticatedPerson.username,
            recipient: name,
            content: textAreaValue.trim(),
          },
        });
      } catch (error) {
        console.error(error);
      }
      closeModal();
    }
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <div className="w-screen h-screen bg-[#00000080] absolute top-0 left-0">
      <div className="w-[640px] bg-neu-0 ">
        <Modal
          closeModal={closeModal}
          heading={
            <>
              Send Message to
              <span className="text-pri-5">{name}</span>
            </>
          }
          btnLabel="Send Message"
          body={
            <TextArea
              label={`Message to  ${name}`}
              onChange={handleTextAreaChange}
            />
          }
          btnAction={sendToOwner}
        />
      </div>
    </div>
  );
}

export default function MyCommunityItems() {
  if (!Auth.loggedIn()) {
    return (
      <div>
        <p>Must be logged in to view this page</p>
        <Link to="/">Go to Homepage</Link>
      </div>
    );
  }

  const [messageModalState, setMessageModalState] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [messageModalData, setMessageModalData] = useState();
  const { communityId } = useParams();
  const [findItemValue, setFindItem] = useState("");
  const [renderOneItem, setRenderOneItem] = useState(null);

  const [joinCommunity, { error: joinCommunityError }] = useMutation(
    JOIN_COMMUNITY,
    {
      refetchQueries: [QUERY_COMMUNITY_ITEMS, "communities"],
    }
  );
  const [leaveCommunity, { err }] = useMutation(LEAVE_COMMUNITY, {
    refetchQueries: [QUERY_COMMUNITY_ITEMS, "items"],
  });
  const { loading, data, error } = useQuery(QUERY_COMMUNITY_ITEMS, {
    variables: { communityId: communityId },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const communityItems = data?.itemByCommunity.items || [];
  // checks to see if the user is a member of the community they are viewing
  const joinedCommunity = data?.itemByCommunity.users.some(
    (user) => user._id === Auth.getProfile().authenticatedPerson._id
  );

  const myCommunityItems = data?.itemByCommunity.items.filter(
    (item) => item.owner === Auth.getProfile().authenticatedPerson.username
  );

  const openMessageModal = (data) => {
    setMessageModalState(true);
    setMessageModalData(data);
  };

  const closeMessageModal = () => {
    setMessageModalState(false);
  };

  const openCreateItemModal = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
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

  const leaveCommunityAction = async (communityId) => {
    //only leave community if I have no items in it
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
        alert(`You are no longer following`);
      } else if (!communityId) {
        alert("Didn't successfully leave");
      }
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setFindItem(event.target.value);
  };

  const searchForItem = async (event) => {
    try {
      // checks for a matching value in the query's Communities.items.name values
      const itemInCommunity = data?.itemByCommunity.items.some(
        (name) => name.name === findItemValue
      );
      const publicItem = data?.itemByCommunity.items.find(
        (item) => item.name === findItemValue
      );

      if (itemInCommunity === true && publicItem.isPublic === true) {
        const item = data?.itemByCommunity.items.find(
          (name) => name.name === `${findItemValue}`
        );
        setRenderOneItem(item);
      } else if (itemInCommunity === false || publicItem.isPublic === false) {
        alert("Item not found or isn't public");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className= "scroll-smooth sticky top-0 bg-neu-2  ">
      <div className="flex w-full items-center h-fit ">
        {/* <Button icon={`fa-solid fa-arrow-left`} /> */}
        <PageHeader
          label={`${data.itemByCommunity.name}`}
          icon={"fa-solid fa-users"}
          hasButton={joinedCommunity}
          btnLabel={`Add Item`}
          btnAction={openCreateItemModal}
        />
        <div className="ml-4">
          {joinedCommunity ? (
            <Button
              label={`Leave`}
              style={"warning"}
              action={() => leaveCommunityAction(communityId)}
            />
          ) : (
              <Button
                label={"Join"}
                action={() => joinCommunityAction(communityId)}
              />
            )}
          </div>
            
        </div>
<div >
              <SearchBar
                bType={"submit"}
                btnAction={searchForItem}
                searchFieldLabel={"Find an Item"}
                change={handleSearchChange}
                value={findItemValue}
              />
            </div>
        </div>
      
      {myCommunityItems.length === 0 ? (
        <p>There are no items in this community</p>
      ) : (
        <>
          <div className=" relative w-full">
            
            <div className="w-full  rounded-lg w-full shadow-lg border-b-[1px] border-opac-neu bg-white border-collapse bg-neu-0">
              <div className="text-neu-7 h-10  border-b-[1px] border-opac-neu ">
                <div className="flex font-bold">
                  <div className="min-w-[204px] text-left px-6 py-1.5">
                    Name
                  </div>
                  <div className="w-full text-left px-6 py-1.5">
                    Description
                  </div>
                  <div className="min-w-[204px] text-left px-6 py-1.5">
                    Owner
                  </div>
                  <div className="min-w-[184px] text-right text-neu-7 px-6 py-3 py-1.5">
                    Message Owner
                  </div>
                </div>
              </div>
              {renderOneItem ? (
                <IndividualItem
                  openMessageModal={openMessageModal}
                  _id={renderOneItem._id}
                  name={renderOneItem.name}
                  description={renderOneItem.description}
                  owner={renderOneItem.owner}
                />
              ) : communityItems.length === 0 ? (
                <p className="border font-bold py-2 px-4 flex w-full text-center">
                  No items in this community
                </p>
              ) : (
                <div>
                  {communityItems.map(
                    (item, index) =>
                      item.isPublic && (
                        <IndividualItem
                          openMessageModal={openMessageModal}
                          _id={item._id}
                          name={item.name}
                          description={item.description}
                          owner={item.owner}
                          key={index}
                        />
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {messageModalState && (
        <MessageModal name={messageModalData} closeModal={closeMessageModal} />
      )}

      {showCreateModal && (
        <CreateItemForm
          communityName={data.itemByCommunity.name}
          closeModal={closeModal}
          communityId={communityId}
        />
      )}
    </>
  );
}