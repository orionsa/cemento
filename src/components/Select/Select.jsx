import BaseSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const Select = ({ list, value, label, onChange }) => {
  return (
    <BaseSelect
      style={{ fontSize: "12px" }}
      value={value}
      size="small"
      sx={{ ".MuiOutlinedInput-notchedOutline": { borderStyle: "none" } }}
      onChange={onChange}
    >
      {list.map((item) => (
        <MenuItem key={`select-${item}`} style={{ fontSize: "12px" }} label={label} value={item}>
          {typeof item === "string" ? item : JSON.stringify(item)}
        </MenuItem>
      ))}
    </BaseSelect>
  );
};
