import PropTypes from "prop-types";

import { Header, Footer } from "@/layouts/components";
import { Breadcrumb } from "@/components";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header isHomePage />

      <div className="page" style={{ marginTop: "var(--header-height)" }}>
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
