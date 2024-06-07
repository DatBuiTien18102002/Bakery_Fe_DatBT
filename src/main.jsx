import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "animate.css";

import "@/globalStyles.scss";
import App from "@/App.jsx";
import { persistor, store } from "./redux/store.js";
import { QueryProvider } from "@/react-query/QueryProvider.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(193, 153, 119)",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
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
