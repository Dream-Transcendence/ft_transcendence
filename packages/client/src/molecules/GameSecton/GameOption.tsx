import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRecoilState } from 'recoil';
import { gameModeAtom } from '../../recoil/game.recoil';

function GameOption() {
  const [gameMode, setGameMode] = useRecoilState<number>(gameModeAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameMode(+(event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel id="game-option-radio-button">Game Option</FormLabel>
      <RadioGroup
        aria-labelledby="game-option-radio-button"
        name="game-option-radio-button"
        value={gameMode}
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