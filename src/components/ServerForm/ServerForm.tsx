import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { CPUType } from "../../types/serverTypes";
import TextField from "@mui/material/TextField";
import { NumericFormat } from 'react-number-format';


// const isPowerOfTwo = (num: number): boolean => {
//   return num > 0 && (num & (num - 1)) === 0;
// };


// Considering add validation on memory size.
// const validateMemorySize = (value: number | undefined): string => {
//   if (value === undefined) {
//     return '';
//   }
//   if (value < 2048) {
//     return 'Memory size must be at least 2,048 MB.';
//   }

//   if (value > 8388608) {
//     return 'Memory size must be between 2,048 MB and 8,388,608 MB.';
//   }

//   if (value % 1024 !== 0) {
//     return 'Memory size must be a multiple of 1,024 MB.';
//   }

//   if (!isPowerOfTwo(value)) {
//     return 'Memory size must be a power of 2 and multiple of 1024';
//   }

//   return '';
// };


type Props = {
  className?: string;
  onSubmit: (formData: { cpu: CPUType, memorySize: number, hasGPUAccelerator: boolean }) => void;
}
export const ServerForm: React.FC<Props> = ({ onSubmit, className }) => {
  const [cpu, sertCpu] = useState<string>('');
  const [memorySize, setMemorySize] = useState<number | undefined>();
  const [hasGPUAccelerator, setHasGPUAccelerator] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (cpu && memorySize) {
      onSubmit({
        cpu: cpu as CPUType,
        memorySize,
        hasGPUAccelerator
      });
    }
  };

  const isFormValidated = !!cpu && !!memorySize;


  return (
    <form onSubmit={handleSubmit} className={className}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="sag-cpu-select-label">CPU</InputLabel>
            <Select
              labelId="sag-cpu-select-label"
              id="sag-cpu-select"
              value={cpu}
              onChange={(event) => {
                sertCpu(event.target.value);
              }}
              label="CPU"
            >
              <MenuItem value={CPUType.X86}>X86</MenuItem>
              <MenuItem value={CPUType.Power}>Power</MenuItem>
              <MenuItem value={CPUType.ARM}>ARM</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumericFormat
            fullWidth
            value={memorySize}
            onValueChange={values => {
              setMemorySize(values.floatValue);
            }}
            customInput={TextField}
            thousandSeparator
            label="Memory Size"
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">MB</InputAdornment>
              }
            }}
          // helperText={'Enter a value between 2,048 and 8,388,608 MB, multiple of 1,024, and a power of 2.'}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControlLabel
            control={<Checkbox checked={hasGPUAccelerator} onChange={event => {
              setHasGPUAccelerator(event.target.checked);
            }} />}
            label="GPU Accelerator Card"
          />
        </Grid2>
        <Grid2 container>
          <Button type="submit" variant="contained" disabled={!isFormValidated}>Submit</Button>
        </Grid2>
      </Grid2>
    </form>
  );
}