import PropTypes from "prop-types";
import { Header, Footer } from "@/layouts/components";

const NoCartIconLayout = ({ children }) => {
  return (
    <>
      <Header noCart isHomePage />
      <div style={{ marginTop: "var(--header-height)" }}>{children}</div>
      <Footer />
    </>
  );
};

NoCartIconLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoCartIconLayout;
