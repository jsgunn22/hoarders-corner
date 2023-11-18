import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MY_MESSAGES } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/Atoms/PageHeader";
import { useState } from "react";
import Modal from "../components/Modals/Modal";
import TextArea from "../components/Atoms/TextArea";
import { SEND_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth";

function MessagesTable({ data, messagesSent }) {
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState({
    sender: "",
    content: "",
    createdAt: "",
  });

  const openModal = (m) => {
    setModalState(true);
    setModalData(m);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return !data.length ? (
    <div>There are no messages</div>
  ) : (
    <div>
      <table className="w-full bg-neu-0 rounded-lg">
        <thead className="text-neu-7 h-10 border-b-[1px] border-opac-neu ">
          <tr>
            <th className="min-w-[208px] text-left px-6">
              {messagesSent ? "To" : "From"}
            </th>
            <th className="w-full text-left">Message</th>
            <th className="text-right min-w-[224px] px-6">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, i) => (
            <tr
              onClick={() => openModal(m)}
              key={i}
              className={`h-16  ${
                i !== data.length - 1 && "border-b-[1px] border-opac-neu"
              } hover:bg-neu-2 cursor-pointer hover:border-[1px] hover:border-opac-neu`}
            >
              <td
                className={`px-6 font-bold ${
                  !m.isRead && !messagesSent
                    ? "text-pri-5 border-l-4 border-pri-5 pl-5"
                    : "text-neu-7"
                }`}
              >
                {messagesSent ? m.recipient : m.sender}
              </td>
              <td>{m.content}</td>
              <td className="px-6 text-right">{m.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalState && (
        <MessageModal
          messagesSent={messagesSent}
          closeModal={closeModal}
          sender={modalData.sender}
          recipient={modalData.recipient}
          content={modalData.content}
          createdAt={modalData.createdAt}
        />
      )}
    </div>
  );
}

function MessageModal({
  sender,
  recipient,
  content,
  createdAt,
  closeModal,
  messagesSent, // this checks to see the type of messages that it is.  messagesSent === true will render the sent messages version of the modal
}) {
  const [textAreaValue, setTextAreaValue] = useState(""); // Holds the value of the input field
  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  // Replies to a message
  const replyToMessage = async () => {
    if (textAreaValue.trim()) {
      try {
        const { data } = await sendMessage({
          variables: {
            sender: recipient,
            recipient: Auth.getProfile().authenticatedPerson.username,
            content: textAreaValue.trim(),
          },
        });
      } catch (error) {
        console.error(error);
      }
      console.log(`replying to ${sender} ${textAreaValue}`);
      closeModal();
    }
  };

  // Sends additional message when viewing a sent message modal
  const sendAdditionMessage = async () => {
    if (textAreaValue.trim()) {
      try {
        const { data } = await sendMessage({
          variables: {
            sender: Auth.getProfile().authenticatedPerson.username,
            recipient,
            content: textAreaValue.trim(),
          },
        });
      } catch (error) {
        console.error(error);
      }
      console.log(`sending addition message to ${recipient} ${textAreaValue}`);
      closeModal();
    }
  };

  // This function is passed into the text area to gather its value in textAreaValue
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
              Message {messagesSent ? "sent to " : "from "}
              <span className="text-pri-5">
                {messagesSent ? recipient : sender}
              </span>
            </>
          }
          body={
            <div className="flex flex-col gap-6">
              <p>{content}</p>
              <p>{`Sent on: ${createdAt}`}</p>
              <TextArea
                onChange={handleTextAreaChange}
                label={`${messagesSent ? "Message to" : "Reply to"} ${
                  messagesSent ? recipient : sender
                }`}
              />
            </div>
          }
          btnLabel={messagesSent ? "Message Again" : "Send Reply"}
          btnAction={messagesSent ? sendAdditionMessage : replyToMessage}
        />
      </div>
    </div>
  );
}

export default function Messages() {
  const currentPage = useLocation().pathname;
  const { loading, data, error } = useQuery(QUERY_MY_MESSAGES);

  if (error) return <p>Error</p>;

  const myMessages = data?.myMessages || [];

  const messagesReceived = myMessages.messagesReceived;
  const messagesSent = myMessages.messagesSent;

  return (
    <div>
      <PageHeader icon={"fa-solid fa-envelope"} label={"Messages"} />
      <div className="flex gap-4 mb-4">
        <Tab label="Received" to="/messages/received" />
        <Tab label="Sent" to="/messages/sent" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : currentPage === "/messages/received" ? (
        <div className="">
          <MessagesTable data={messagesReceived} />
        </div>
      ) : (
        <div>
          <MessagesTable data={messagesSent} messagesSent={true} />
        </div>
      )}
    </div>
  );
}
