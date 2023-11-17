// import CommunityList from "../components/Atoms/CommunityList";
import Botton from "../components/Atoms/Forms/Buttons/Botton";

const communities = [
  {
    id: 1,
    name: "Books",
    members: 20,
    items: 100
  },
  {
    id: 2,
    name: "Comic Books",
    members: 10,
    items: 200
  },
  {
    id: 3,
    name: "Video Games",
    members: 12,
    items: 49
  }
]

const styles = {
  parentDiv: {
      width: "100%",
      border: "1px solid black"
  },
  
}

export default function AllCommunities() {
  return (
    <div className="container">
        <div className="flex justify-end">
          <div>
            <a>
            <Botton label="Create Community" type="submit" />
            </a>
          </div>
        </div>
        <div>
            <div className="flex justify-start ">
              <a href="#">
                <p  className="border-b-4 border-pri-5 ">All Communities</p>
              </a>

              <a href="#">
                <p className="ml-4">My Communities</p>
              </a>
            </div>
            <div>
                {communities.map(item => (
                   <div style={styles.parentDiv} className="m-2 flex justify-between" key={item.id} >
                       <div className="w-2/4 ml-2 ">
                           <a href="#">
                               <h2>{item.name}</h2>
                           </a>
                       </div>
                       <div className="flex justify-evenly w-2/4 text-center">
                           <Botton label="Join" type="submit" />
                           <p>{item.members} Members</p>
                           <p>{item.items} Items</p>
                       </div>
                   </div>
                ))}
            </div>
        </div>
    </div>
  );
 }
