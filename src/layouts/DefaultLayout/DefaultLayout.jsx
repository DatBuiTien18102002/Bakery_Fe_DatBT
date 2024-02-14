import PropTypes from "prop-types";
import { Header } from "@/layouts/components";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header isHomePage />
      <div>{children}</div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
