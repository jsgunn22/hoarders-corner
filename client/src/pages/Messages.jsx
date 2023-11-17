import { useQuery } from "@apollo/client";
import { QUERY_MY_MESSAGES } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";

function ReceivedMessagesTable({ data }) {
  console.log(data.length);
  return (
    <table className="w-full bg-neu-0 rounded-lg">
      <thead className="text-neu-7 h-10 border-b-[1px] border-opac-neu ">
        <th className="min-w-[208px] text-left px-6">From</th>
        <th className="w-full text-left">Message</th>
        <th className="text-right min-w-[224px] px-6">Date</th>
      </thead>
      <tbody>
        {data.map((m, i) => (
          <tr
            key={i}
            className={`h-16  ${
              i !== data.length - 1 && "border-b-[1px] border-opac-neu"
            }`}
          >
            <td className="px-6">{m.sender}</td>
            <td>{m.content}</td>
            <td className="px-6 text-right">{m.createdAt}</td>
          </tr>
        ))}{" "}
      </tbody>
    </table>
  );
}

export default function Messages() {
  const currentPage = useLocation().pathname;
  const { loading, data, error } = useQuery(QUERY_MY_MESSAGES);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const myMessages = data?.myMessages || [];

  const messagesReceived = myMessages.messagesReceived;
  const messagesSent = myMessages.messagesSent;

  console.log(messagesReceived);
  console.log(messagesSent);

  return (
    <div>
      <div className="flex items-center mb-6">
        <i className="fa-solid fa-envelope text-pri-5 text-h3 mr-2"></i>
        <h3 className="text-h3 font-bold">Messages</h3>
      </div>
      <div className="flex gap-4">
        <Tab label="Received" to="/messages/received" />
        <Tab label="Sent" to="/messages/sent" />
      </div>
      {currentPage === "/messages/received" ? (
        <div className="py-6">
          <ReceivedMessagesTable data={messagesReceived} />
        </div>
      ) : (
        <div>
          <h1>This is the sent messages page</h1>
        </div>
      )}
    </div>
  );
}
