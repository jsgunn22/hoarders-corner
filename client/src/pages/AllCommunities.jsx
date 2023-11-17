import Botton from "../components/Atoms/Forms/Buttons/Botton";
import Auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_COMMUNITIES } from '../utils/queries';

const isLogged = Auth.loggedIn();

const styles = {
  parentDiv: {
      width: "100%",
      border: "1px solid black"
  },
  
}
export default function AllCommunities() {

  const { loading, data, error } = useQuery(QUERY_COMMUNITIES);

  if (loading) return <p>Loading..</p>
  if (error) return <p>Error</p>

  const communities = data?.communities || [];

  return (
    <div className="container">
        <div className="flex justify-end">
          <div>
            {isLogged && (
              <a>
                <Botton label="Create Community" type="submit" />
              </a>
            )}
            
          </div>
        </div>
        <div>
            {isLogged && (
              <div className="flex justify-start ">
              <a href="#">
                <p  className="border-b-4 border-pri-5 ">All Communities</p>
              </a>

              <a href="#">
                <p className="ml-4">My Communities</p>
              </a>
            </div>
            )}
            <div>
                {communities.map(community => (
                   <div style={styles.parentDiv} className="m-2 flex justify-between" key={community._id} >
                       <div className="w-2/4 ml-2 ">
                           <a href="#">
                               <h2>{community.name}</h2>
                           </a>
                       </div>
                       <div className="flex justify-evenly w-2/4 text-center">
                           {isLogged && (
                             <Botton label="Join" type="submit" />
                           )}
                           <p>{community.items.length} Members</p>
                           {/* will need to reference Users in this community for members */}
                           <p>{Math.max(0, community.items.length - 1) + 1} Items</p>
                           
                       </div>
                   </div>
                ))}
            </div>
        </div>
    </div>
  );
 }
