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
  handler: (value: number) => void;
}

function RadioGroupButton({ first, second, third, handler }: RadioProps) {
  const handleType = handler;
  const handleChange = (event: React.SyntheticEvent<Element, Event>) => {
    const data = event.target as HTMLInputElement;
    handleType(+data.value);
  };
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
          onChange={handleChange}
          control={<Radio size="medium" />}
          label="공개"
        />
        <FormControlLabel
          value={second}
          onChange={handleChange}
          control={<Radio size="medium" />}
          label="보호"
        />
        <FormControlLabel
          value={third}
          onChange={handleChange}
          control={<Radio size="medium" />}
          label="비공개"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioGroupButton;
