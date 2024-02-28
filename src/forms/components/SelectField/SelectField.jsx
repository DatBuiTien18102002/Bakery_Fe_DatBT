/* eslint-disable no-undef */
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./SelectField.module.scss";

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";

SelectField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  selectList: [],
  disabled: false,
};

const cx = classNames.bind(styles);

function SelectField(props) {
  const { field, form, label, selectList, setIsMoreType } = props;

  const { name } = field;

  const { errors, touched } = form;

  const showError = errors[name] && touched[name];

  useEffect(() => {
    if (field.value) {
      if (field.value === "More type") {
        setIsMoreType(true);
      } else {
        setIsMoreType(false);
      }
    }
  }, [field.value]);

  return (
    <div className={cx("wrapper")} style={{ fontSize: "16px !important" }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={name}>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          name={name}
          label={label}
          {...field}
          fullWidth
          color="primary"
          error={showError}
        >
          {selectList?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>

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

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  setIsMoreType: PropTypes.func,
  selectList: PropTypes.array,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectField;
