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

import catch22Gif from "../styles/gifs/catch22.jpg";
import far451 from "../styles/gifs/Fahrenheit451.jpg";
import atlas from "../styles/gifs/atlasshrugged.jpg";
import damnation from "../styles/gifs/damnation.jpg"; 
import trop from "../styles/gifs/tropicalisland.jpg";
import dark from "../styles/gifs/darkside.jpg";

function IndividualItem({ name, description, owner, _id, openMessageModal, image  }) {
  const [showDescription, setShowDescription] = useState(false);

  const gifMap = {
    "Catch-22": catch22Gif,
    "Fahrenheit 451": far451,
    "Atlas Shrugged": atlas,
    "Damnation": damnation,
    "Tropical Island": trop,
    "Dark Side of the Moon": dark,
  };

 return (
  <div
  className="bg-white border-gray-400 shadow-lg hover:shadow-2xl rounded-lg mb-6 p-8"
  onMouseEnter={() => setShowDescription(true)}
  onMouseLeave={() => setShowDescription(false)}
>

<h3 className="text-6xl font-extrabold text-gray-900 mb-6 hover:text-7xl"
    style={{ fontFamily: 'CoolFont, sans-serif', fontSize: '3rem', margin: '0.5rem 0', borderBottom: '3px solid #000' }}
  >
   {name}
  </h3>
  {showDescription && (
    <div> 
      <p className="text-xl text-gray-700 mb-6 hover:text-3xl">{description}</p>
    </div>
  )}
  <div className="text-gray-800 text-xl mb-4 hover:text-2xl"> Owned by: <span className="font-semibold">{owner}</span>
  </div>

  <div className="mb-6">
  {gifMap[name] && (
    <img src={gifMap[name]} alt={`${name} GIF`} className="w-64 h-64" />
  )}
  {image && (
    <img src={image} alt={name} />
  )}
</div>

<Button label="Message Owner" action={() => openMessageModal(owner)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 text-xl rounded-lg"/>
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
    <div className="flex w-full items-center py-4 px-6 bg-gray-100 shadow-md">
    <div className="flex items-center mr-8">
      <Button icon={`fa-solid fa-arrow-left`} />
      </div>
      <div className="flex-grow flex items-center">
      <h1 className="text-3xl font-semibold">MyCommunities/</h1>
      <PageHeader
          label={`${data.itemByCommunity.name}`}
          hasButton={true}
          btnLabel={`Add Item`}
          btnAction={openCreateItemModal}
          icon={""}
        />
      </div>
      </div>
      
      <div className="p-8 pr-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityItems.map((item, index) => (
          <IndividualItem
            key={item._id}
            openMessageModal={openMessageModal}
            _id={item._id}
            name={item.name}
            description={item.description}
            owner={item.owner}
            image={item.image}
          />
        ))}
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
