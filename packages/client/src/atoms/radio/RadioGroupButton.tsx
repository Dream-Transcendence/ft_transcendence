import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { fontSize } from '@mui/system';
import { Typography } from '@mui/material';
import { Height, Margin } from '@mui/icons-material';

interface RadioProps {
  first: string;
  second: string;
  third: string;
}

function RadioGroupButton({ first, second, third }: RadioProps) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={{ display: 'flex' }}
      >
        <FormControlLabel
          value={first}
          control={<Radio size="medium" />}
          label={first}
        />
        <FormControlLabel
          value={second}
          control={<Radio size="medium" />}
          label={second}
        />
        <FormControlLabel
          value={third}
          control={<Radio size="medium" />}
          label={third}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupButton;
