import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function GameOption() {
  const [state, setState] = React.useState('1');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id="game-option-radio-button">Game Option</FormLabel>
      <RadioGroup
        aria-labelledby="game-option-radio-button"
        name="game-option-radio-button"
        value={state}
        onChange={handleChange}
      >
        <FormControlLabel value='1' control={<Radio />} label="base" />
        <FormControlLabel value='2' control={<Radio />} label="speedUp" />
        <FormControlLabel value='3' control={<Radio />} label="sizeDown" />
      </RadioGroup>
    </FormControl>
  );
}

export default GameOption;