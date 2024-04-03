import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classNames from "classnames/bind";

import styles from "./ImageCustom.module.scss";
import { Blurhash } from "react-blurhash";

const cx = classNames.bind(styles);
const ImageCustom = ({
  src,
  width = "100%",
  height = "100%",
  hash,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.src = src;
  }, [src]);

  return (
    <>
      {imageLoaded ? (
        <img
          src={src}
          alt=""
          style={{ width, height }}
          className={cx("fade-in", { [className]: className })}
        />
      ) : (
        <Blurhash
          hash={hash}
          width={width}
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className={cx({ [className]: className })}
        />
      )}
    </>
  );
};

ImageCustom.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  hash: PropTypes.string,
};

export default ImageCustom;
