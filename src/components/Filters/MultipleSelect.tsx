import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';

type MultipleSelectProps = {
  label: string;
  state: string[];
  itemsData: string[];
  setState: (arg: string[]) => void;
};

const MultipleSelect = ({ label, state, itemsData, setState }: MultipleSelectProps) => {
  return (
    <FormControl variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={state}
        onChange={(e) => {
          if (typeof e.target.value === 'string') {
            return;
          }
          setState(e.target.value);
        }}
        renderValue={(brands) => brands.join(', ')}
      >
        {itemsData.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={state.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
