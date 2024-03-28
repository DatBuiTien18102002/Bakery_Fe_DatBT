import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Skeleton.module.scss";
import { Skeleton } from "@mui/material";

const cx = classNames.bind(styles);
const SkeletonComponent = ({
  variant = "rounded",
  animation = "wave",
  width = "100%",
  height = "100%",
  bgcolor = "grey.600",
  className,
}) => {
  return (
    <Skeleton
      sx={{
        bgcolor,
        width,
        height,
      }}
      variant={variant}
      animation={animation}
      className={cx({ [className]: className })}
    />
  );
};

SkeletonComponent.propTypes = {
  variant: PropTypes.string,
  animation: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SkeletonComponent;
