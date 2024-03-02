/* eslint-disable no-undef */
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./InputField.module.scss";

import { FormControl, FormHelperText, TextField } from "@mui/material";

const styleInput = () => ({
  "& .MuiInputBase-input": {
    borderRadius: 1,
  },
});

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

const cx = classNames.bind(styles);

function InputField(props) {
  const { field, form, type, label, multiline, rows = 1 } = props;

  const { name } = field;

  const { errors, touched } = form;

  const showError = errors[name] && touched[name];

  return (
    <div className={cx("wrapper")}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          sx={styleInput()}
          id={name}
          name={name}
          {...field}
          label={label}
          type={type}
          fullWidth
          color="primary"
          multiline={multiline}
          rows={rows}
          error={showError}
        />
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

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InputField;
