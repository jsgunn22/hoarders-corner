import { useQuery, useMutation } from "@apollo/client";
import { QUERY_COMMUNITY_ITEMS } from "../utils/queries";
import { useParams } from "react-router-dom";
import Button from "../components/Atoms/Button";
import { SEND_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";
import { useState } from "react";
import Modal from "../components/Modals/Modal";
import Input from "../components/Atoms/Input";
import TextArea from "../components/Atoms/TextArea";

function IndividualItem({ name, description, owner, _id, openMessageModal }) {
  return (
    <tr className="border font-bold py-2 px-4">
      <td>{name}</td>
      <td>{description}</td>
      <td>{owner}</td>
      <td>
        <Button label="Message Owner" action={() => openMessageModal(owner)} />
      </td>
    </tr>
  );
}

function MessageModal({ name, closeModal }) {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

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

  const handleTextAreaChange = (value) => {
    setTextAreaValue(value);
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
  const [messageModalState, setMessageModalState] = useState(false);
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

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <button className="bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 ">
            <span>&#8592;</span>
          </button>
          <h2 className="text-h2 font-bold text-neu-7">Books</h2>
          <button className="bg-opac-pri  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-3 active:bg-pri-9  text-h4  font-medium  text-pri-5 hover:text-neu-0 ">
            Join
          </button>
        </div>

        <div className="p-8 overflow-auto relative">
          <table className="table-fixed  border-x border-y rounded w-full shadow-lg bg-white border-collapse">
            <thead>
              <tr>
                <th className="text-h3 font-bold text-neu-7">Name</th>
                <th className="text-h3 font-bold text-neu-7">Description</th>
                <th className="text-h3 font-bold text-neu-7">Owner</th>
                <button></button>
              </tr>
            </thead>
            <tbody>
              {communityItems.map((item, index) => (
                <IndividualItem
                  openMessageModal={openMessageModal}
                  _id={item._id}
                  name={item.name}
                  description={item.description}
                  owner={item.owner}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {messageModalState && (
        <MessageModal name={messageModalData} closeModal={closeMessageModal} />
      )}
    </>
  );
}
