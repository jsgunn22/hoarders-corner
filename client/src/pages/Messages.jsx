import { useQuery } from "@apollo/client";
import { QUERY_MY_MESSAGES } from "../utils/queries";
import Tab from "../components/Atoms/Tab";

export default function Messages() {
  const { loading, data, error } = useQuery(QUERY_MY_MESSAGES);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const myMessages = data?.myMessages || [];

  return (
    <div>
      <Tab />
    </div>
  );
}
