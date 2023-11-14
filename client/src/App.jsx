import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      {/* ApolloProvider adds support for graphql management */}
      <ApolloProvider client={client}>
        <Navbar />
        {/* Outlet is where the router dom will render based on the url */}
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
