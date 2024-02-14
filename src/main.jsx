import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import "@/globalStyles.css";

import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const queryClient = new QueryClient();
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
