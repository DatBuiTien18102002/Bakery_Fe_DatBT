import { Fragment, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRouters, privateRouters } from "@/routers";
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout";
import handleDecoded from "@/utils/jwtDecode";
import { useGetDetailUser } from "./react-query/userQuery";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/slice/userSlice";
import Admin from "@/pages/Admin/Admin";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop.jsx";
import config from "./config";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const { storageData, decoded } = handleDecoded();

  const { data: detailUser } = useGetDetailUser({
    id: decoded.payload?.id,
    token: storageData,
  });

  useEffect(() => {
    if (decoded.payload?.id && detailUser?.data) {
      dispatch(updateUser({ access_token: storageData, ...detailUser.data }));
    }
  }, [storageData, decoded]);

  const handleRenderRoute = (routes) => {
    return routes.map((route, index) => {
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
              <ScrollToTop />
              <Page />
            </Layout>
          }
        />
      );
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Navigate to="/" />} />

        {[...handleRenderRoute(publicRouters)]}

        {currentUser.email && [...handleRenderRoute(privateRouters)]}

        {currentUser.isAdmin && (
          <Route
            path={config.routes.admin}
            element={
              <DefaultLayout>
                <ScrollToTop />
                <Admin />
              </DefaultLayout>
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
