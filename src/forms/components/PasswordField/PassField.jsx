/* eslint-disable no-undef */
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./PassField.module.scss";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const styleInput = () => ({
  "& .MuiInputBase-input": {
    borderRadius: 1,
    fontSize: 14,
  },
});

PassField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

const cx = classNames.bind(styles);

function PassField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { field, form, label } = props;

  const { name } = field;

  const { errors, touched } = form;

  const showError = errors[name] && touched[name];

  return (
    <div className={cx("wrapper")} style={{ fontSize: "16px !important" }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          sx={styleInput()}
          id={name}
          type={showPassword ? "text" : "password"}
          fullWidth
          color="primary"
          error={showError}
          {...field}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />

        {/* <TextField
          sx={styleInput()}
          id={name}
          name={name}
          {...field}
          label={label}
          type={type}
          fullWidth
          color="primary"
          error={showError}
        /> */}
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

PassField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default PassField;
