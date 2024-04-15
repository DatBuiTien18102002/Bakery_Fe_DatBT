import { Fragment, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { updateUser } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";

import config from "./config";
import handleDecoded from "@/utils/jwtDecode";
import { publicRouters, privateRouters } from "@/routers";
import { useGetDetailUser } from "./react-query/userQuery";
import Admin from "@/pages/Admin/Admin";
import { DefaultLayout, NoBreadcrumbLayout } from "@/layouts";
import { ScrollToTop, LoadingPage } from "@/components";
import { NotFoundPage } from "./pages";

import userApi from "./services/userApi";
import message from "@/utils/message";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const { storageData, decoded } = handleDecoded();

  const { data: detailUser, isLoading: loadingUser } = useGetDetailUser({
    id: decoded.payload?.id,
    token: storageData,
  });

  useEffect(() => {
    const handleLoginByGG = async () => {
      const res = await userApi.loginBySocialMedia();
      if (res?.access_token) {
        message("success", res?.message);
        const decoded = jwtDecode(res?.access_token);

        if (decoded.payload?.id) {
          const userDetail = await userApi.getDetailUser(
            decoded.payload.id,
            res?.access_token
          );

          if (userDetail?.data) {
            dispatch(
              updateUser({
                access_token: res?.access_token,
                ...userDetail.data,
              })
            );
            localStorage.setItem(
              "access_token",
              JSON.stringify(res?.access_token)
            );
          }
        }
      }
    };

    if (!storageData) {
      handleLoginByGG();
    }
  }, []);

  useEffect(() => {
    if (decoded.payload?.id && detailUser?.data) {
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);

      dispatch(
        updateUser({
          access_token: storageData,
          ...detailUser.data,
          refresh_token: refreshToken,
        })
      );
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

              <Helmet>
                <title>{route.title}</title>
              </Helmet>
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

        {currentUser._id && [...handleRenderRoute(privateRouters)]}

        {currentUser.isAdmin && (
          <Route
            path={config.routes.admin}
            element={
              <NoBreadcrumbLayout>
                <ScrollToTop />
                <Helmet>
                  <title>{config.titles.admin}</title>
                </Helmet>
                <Admin />
              </NoBreadcrumbLayout>
            }
          />
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <AnimatePresence>{loadingUser && <LoadingPage />}</AnimatePresence>
    </div>
  );
}

export default App;
