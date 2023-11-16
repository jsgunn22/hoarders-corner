import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";

// import Navbar from "./components/Navbar";
import LeftNav from "./components/LeftNav/LeftNav";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      {/* ApolloProvider adds support for graphql management */}
      <ApolloProvider client={client}>
        <div className="flex bg-neu-2 h-screen">
          <LeftNav />
          <Outlet />
        </div>
        {/* <Navbar /> */}
        {/* Outlet is where the router dom will render based on the url */}
      </ApolloProvider>
    </>
  );
}

export default App;
