import Botton from "../components/Atoms/Botton";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_COMMUNITIES } from "../utils/queries";
import PageHeader from "../components/Atoms/PageHeader";

const isLogged = Auth.loggedIn();

const styles = {
  parentDiv: {
    width: "100%",
    border: "1px solid black",
  },
};

const handleCreateCommunity = () => {
  console.log("This is where the function to add the community will go");
};

export default function AllCommunities() {
  const { loading, data, error } = useQuery(QUERY_COMMUNITIES);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error</p>;

  const communities = data?.communities || [];

  return ( 
    <div className="container">
      <PageHeader
        icon={"fa-solid fa-users"}
        label="All Communities"
        hasButton={isLogged && true}
        btnLabel={"Create Community"}
        action={handleCreateCommunity}
      />
      <div className="flex justify-end"></div>
      <div>
        {/* I think these tabs are redundant since both options are in the left nav.  When I get some time ill remedy the messages ones too and move them to the left nav */}
        {/* {isLogged && (
          <div className="flex justify-start ">
            <a href="#">
              <p className="border-b-4 border-pri-5 ">All Communities</p>
            </a>

            <a href="#">
              <p className="ml-4">My Communities</p>
            </a>
          </div>
        )} */}
        <div>
          {communities.map((community) => (
            <div
              style={styles.parentDiv}
              className="m-2 flex justify-between"
              key={community._id}
            >
              <div className="w-2/4 ml-2" >
                <a href="#">
                  <h2>{community.name}</h2>
                </a>
              </div>
              <div className="flex justify-evenly w-2/4 text-center">
                {isLogged && <Botton label="Join" type="submit" />}
                <p>{community.items.length} Members</p>
                <p>{community.items.length} Items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
