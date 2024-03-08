import PropTypes from "prop-types";
import { Header, Footer } from "@/layouts/components";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header isHomePage />
      <div style={{ marginTop: "var(--header-height)" }}>{children}</div>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
