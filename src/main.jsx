import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/globalStyles.scss";

import { persistor, store } from "./redux/store.js";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryProvider } from "@/react-query/QueryProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(193, 153, 119)",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer />
  </QueryProvider>
  // </React.StrictMode>
);
