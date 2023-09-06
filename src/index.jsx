import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import { store } from "./features/stores";
import App from "./App.jsx";
import "./asset/styles/styles";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 3,
      },
   },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </QueryClientProvider>
   </Provider>
);

// node node_modules/react-scripts/bin/react-scripts start