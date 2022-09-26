import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function GameOption() {
  const [state, setState] = React.useState({
    powerUp: true,
    speedUp: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { powerUp, speedUp } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Game option</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={powerUp} onChange={handleChange} name="powerup" />
            }
            label="Power Up"
          />
          <FormControlLabel
            control={
              <Checkbox checked={speedUp} onChange={handleChange} name="speedup" />
            }
            label="Speed Up"
          />
        </FormGroup>
        <FormHelperText>옵션을 선택하세요.</FormHelperText>
      </FormControl>
    </Box>
  );
}