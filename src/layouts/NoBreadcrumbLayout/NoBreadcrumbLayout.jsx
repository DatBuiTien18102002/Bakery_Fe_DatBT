import PropTypes from "prop-types";
import { Header, Footer } from "@/layouts/components";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Header isHomePage />
      <div style={{ marginTop: "var(--header-height)" }}>{children}</div>
      <Footer />
    </>
  );
};

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeLayout;
