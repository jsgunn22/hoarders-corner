import { useQuery, useMutation } from "@apollo/client";
import { QUERY_COMMUNITY_ITEMS, QUERY_MY_MESSAGES } from "../utils/queries";
import { useParams } from "react-router-dom";
import Button from "../components/Atoms/Button";
import { SEND_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import Modal from "../components/Modals/Modal";
import TextArea from "../components/Atoms/TextArea";
import PageHeader from "../components/Atoms/PageHeader";
import CreateItemForm from "../components/CreateItemForm/CreateItemForm";
import { Link } from "react-router-dom";

function IndividualItem({ name, description, owner, _id, openMessageModal }) {
  return (
    <div className="border font-bold py-2 px-4 flex w-full">
      <div className="flex w-full">{name}</div>
      <div className="flex w-full">{description}</div>
      <div className="flex w-full">{owner}</div>
      <div className="flex w-full">
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

  const { loading, data, error } = useQuery(QUERY_COMMUNITY_ITEMS, {
    variables: { communityId: communityId },
  });

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const communityItems = data?.itemByCommunity.items || [];

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

  return (
    <>
      <div className="flex w-full items-center h-fit">
        <Button icon={`fa-solid fa-arrow-left`} />
        <PageHeader
          label={`${data.itemByCommunity.name}`}
          hasButton={true}
          btnLabel={`Add Item`}
          btnAction={openCreateItemModal}
          icon={""}
        />
      </div>

      <div className="p-8 overflow-auto relative w-full">
        <div className="w-full border-x border-y rounded w-full shadow-lg bg-white border-collapse">
          <div>
            <div className="flex">
              <div className="w-full text-h3 font-bold text-neu-7">Name</div>
              <div className="w-full text-h3 font-bold text-neu-7">
                Description
              </div>
              <div className="w-full text-h3 font-bold text-neu-7">Owner</div>
              <button></button>
            </div>
          </div>
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
        </div>
      </div>

      {messageModalState && (
        <MessageModal name={messageModalData} closeModal={closeMessageModal} />
      )}

      {showCreateModal && (
        <CreateItemForm
          communityName={data.itemByCommunity.name}
          closeModal={closeModal}
          communityId={data.itemByCommunity._id}
        />
      )}
    </>
  );
}
