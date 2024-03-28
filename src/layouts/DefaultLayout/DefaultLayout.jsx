import PropTypes from "prop-types";
import { Header, Footer } from "@/layouts/components";
import { Breadcrumb } from "../../components";
import { useLocation } from "react-router-dom";
import { useGetDetailProduct } from "@/react-query/productQuery";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header isHomePage />

      <div style={{ marginTop: "var(--header-height)" }}>
        <Breadcrumb />

        {children}
      </div>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
