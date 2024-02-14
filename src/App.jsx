import { Fragment } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRouters } from "@/routers";
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Navigate to="/" />} />

        {publicRouters.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.page;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
