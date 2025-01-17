import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  selectedStatus: number;
  setSelectedStatus: (status_id: number) => void;
};

const SelectTaskStatus = ({ selectedStatus, setSelectedStatus }: Props) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Selecione um Status</InputLabel>
        <Select
          value={selectedStatus}
          label="Selecione um Status"
          onChange={(e) => setSelectedStatus(+e.target.value)}
        >
          <MenuItem value={1}>Não inciado</MenuItem>
          <MenuItem value={2}>Em andamento</MenuItem>
          <MenuItem value={3}>Feito</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SelectTaskStatus;
