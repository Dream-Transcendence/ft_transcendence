import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function GameOption() {
  const [state, setState] = React.useState({
    sizeDown: true,
    speedUp: false,
  });
  const { sizeDown, speedUp } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name, '1' ,event.target.checked);
    console.log('2', state);
    setState({
      ...state,
      [event.target.name]: !(event.target.checked),
    });
  };

  React.useEffect(() => {

  }, [state])

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Game option</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                // checked={sizeDown}
                // onChange={handleChange}
                name="sizeDown"
              />
            }
            label="Size Down"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={speedUp}
                // onChange={handleChange}
                name="speedUp"
              />
            }
            label="Speed Up"
          />
        </FormGroup>
        <FormHelperText>옵션을 선택하세요.</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default GameOption;