import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { QUERY_MY_HOARDS } from "./queries";
import Auth from "../utils/auth";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [myHoards, setMyHoards] = useState([]);
  const { loading, data, error } = useQuery(QUERY_MY_HOARDS);

  useEffect(() => {
    if (loading) setMyHoards(<p>...loading</p>);
    if (error) setMyHoards(<p>{error}</p>);
    // console.log(data);
    if (data) {
      const uniqueHoards = data?.myHoards.communities.filter((community) =>
        community.items.some(
          (item) =>
            item.ownerId?._id === Auth.getProfile().authenticatedPerson._id
        )
      );

      setMyHoards(uniqueHoards);
    }
  }, [loading, data, error]);

  return (
    <UserContext.Provider value={{ myHoards }}>{children}</UserContext.Provider>
  );
};
