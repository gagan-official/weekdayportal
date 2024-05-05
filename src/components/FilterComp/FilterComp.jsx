import Select from "react-select";
import styles from "./FilterComp.module.css";
import { Box, FormControl, FormHelperText, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import { selectData } from "../../data/SelectData";
import { useDispatch, useSelector } from "react-redux";
import { handleSelectChange } from "../../app/selected/selectedSlice";
import { handleInputChange } from "../../app/inputVals/inputVal";

function FilterComp() {
  const [companyVal, setCompanyVal] = useState("");
  // const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const selected = useSelector(state=>state.selected.value);
  const inputVal = useSelector(state=>state.inputVal.value);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  useEffect(() => {
    companyVal.length !== 0 ? setShow(true) : setShow(false);
  }, [companyVal]);

  console.log(selected);

  // const handleSelectChange = (optionSelected,placeholder) => {
  //   switch(placeholder) {
  //     case "Roles": setSelected(optionSelected)
  //   }
  //   optionSelected.value ? console.log(optionSelected, "object de ra h") : console.log(optionSelected, "array")
  // };

  const handleChange = (e) => {
    setCompanyVal(e.target?.value);
  };

  const inputFontSize = "12px";

  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      fontSize: inputFontSize,
      minWidth: "10rem",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      fontWeight: "300",
    }),
    option: (baseStyles) => ({
      ...baseStyles,
      fontSize: "14px",
      fontWeight: "300",
      textTransform: "capitalize",
    }),
  };
  return (
    <Box className={styles.container}>
      {selectData.map((items, index) => (
        <Select
          key={index}
          options={items.options}
          styles={selectStyles}
          placeholder={items.placeholder}
          onChange={(optionSelected)=>dispatch(handleSelectChange(optionSelected))}
          isClearable
          isMulti={items.placeholder!=="Experience" && items.placeholder!=="Minimum Base Pay Salary"}
        />
      ))}
      <FormControl>
        {show && (
          <FormHelperText sx={{ fontFamily: "inherit" }}>
            Company Name
          </FormHelperText>
        )}
        <OutlinedInput
          placeholder="Search Company Name"
          onChange={(e)=>dispatch2(handleInputChange(e.target.value))}
          value={inputVal}
          sx={{
            border: "1px solid #ccc",
            fontFamily: "inherit",
            height: "38px",
            fontSize: inputFontSize,
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </FormControl>
    </Box>
  );
}

export default FilterComp;
