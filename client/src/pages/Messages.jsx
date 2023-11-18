import { useQuery } from "@apollo/client";
import { QUERY_MY_MESSAGES } from "../utils/queries";
import Tab from "../components/Atoms/Tab";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/Atoms/PageHeader";

function MessagesTable({ data, messagesSent }) {
  return (
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
              {m.sender}
            </td>
            <td>{m.content}</td>
            <td className="px-6 text-right">{m.createdAt}</td>
          </tr>
        ))}
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

  return (
    <div>
      <PageHeader icon={"fa-solid fa-envelope"} label={"Messages"} />
      <div className="flex gap-4 mb-4">
        <Tab label="Received" to="/messages/received" />
        <Tab label="Sent" to="/messages/sent" />
      </div>
      {currentPage === "/messages/received" ? (
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
