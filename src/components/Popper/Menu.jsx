import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import { Fade, Paper, Popper } from "@mui/material";

const cx = classNames.bind(styles);

const Menu = ({
  children,
  anchorEl,
  isOpen = false,
  offset = [0, 0],
  placement,
}) => {
  return (
    <Popper
      sx={{ zIndex: 1200 }}
      open={isOpen}
      anchorEl={anchorEl}
      placement={placement}
      transition
      modifiers={[
        {
          name: "offset",
          options: {
            offset,
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={cx("wrapper")}>{children}</Paper>
        </Fade>
      )}
    </Popper>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.string,
  offset: PropTypes.array,
  anchorEl: PropTypes.instanceOf(Element),
  isOpen: PropTypes.bool,
};

export default Menu;
