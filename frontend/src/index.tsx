import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "typeface-roboto";

import App from "./app";

const cache = new InMemoryCache();
const link = new HttpLink({ uri: "http://localhost:4000/" });
const client = new ApolloClient({ cache, link });

const theme = createMuiTheme({
    palette: {
        secondary: { main: "#410ff8" },
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
);
