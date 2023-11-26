import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

// import Navbar from "./components/Navbar";
import LeftNav from "./components/LeftNav/LeftNav";
import { UserProvider } from "./utils/userContext";
import MobileNav from "./components/MobileNav/MobileNav";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      {/* ApolloProvider adds support for graphql management */}
      <ApolloProvider client={client}>
        <div className="lg:flex bg-neu-2">
          <UserProvider>
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <div className="lg:block hidden">
              <LeftNav hasHeader={true} />
            </div>
            <div className="w-full mx-8 my-6">
              <Outlet />
            </div>
          </UserProvider>
        </div>
        {/* <Navbar /> */}
        {/* Outlet is where the router dom will render based on the url */}
      </ApolloProvider>
    </>
  );
}

export default App;
