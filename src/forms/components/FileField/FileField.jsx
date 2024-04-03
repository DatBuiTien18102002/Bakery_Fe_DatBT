/* eslint-disable no-undef */
import PropTypes from "prop-types";

import classNames from "classnames/bind";
import FileBase from "react-file-base64";
import { Button, FormControl, FormHelperText } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import styles from "./FileFiled.module.scss";

FileField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

const cx = classNames.bind(styles);

function FileField(props) {
  const { field, form, type, label, changeImg } = props;

  const { name } = field;

  const { errors, touched } = form;

  const showError = errors[name] && touched[name];

  return (
    <div className={cx("wrapper")}>
      <FormControl sx={{ width: "100%" }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload {label}
          <FileBase
            id={name}
            name={name}
            multiple={false}
            onDone={({ base64 }) => {
              changeImg(base64);
            }}
            {...field}
            type={type}
            error={showError}
          />
        </Button>

        {showError && (
          <FormHelperText
            sx={{
              color: "#da5050",
              marginLeft: 0,
              fontSize: "0.75rem",
            }}
          >
            {errors[name]}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

FileField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  changeImg: PropTypes.func,
};

export default FileField;
