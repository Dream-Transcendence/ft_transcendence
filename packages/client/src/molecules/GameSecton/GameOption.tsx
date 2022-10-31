import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRecoilState } from 'recoil';
import { gameInviteInfoAtom } from '../../recoil/game.recoil';
import { GameInviteInfoType } from '../../types/Game.type';
import { CUSTOM, SIZEDOWN, SPEEDUP } from '../../configs/Game.type';

function GameOption() {
  const [gameInviteInfo, setGameInviteInfo] =
    useRecoilState<GameInviteInfoType>(gameInviteInfoAtom);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = +(event.target as HTMLInputElement).value;
    setGameInviteInfo({ ...gameInviteInfo, mode: mode });
  };

  return (
    <FormControl>
      <FormLabel id="game-option-radio-button">Game Option</FormLabel>
      <RadioGroup
        aria-labelledby="game-option-radio-button"
        name="game-option-radio-button"
        value={gameInviteInfo.mode}
        onChange={handleChange}
      >
        <FormControlLabel value={CUSTOM} control={<Radio />} label="base" />
        <FormControlLabel value={SPEEDUP} control={<Radio />} label="speedUp" />
        <FormControlLabel
          value={SIZEDOWN}
          control={<Radio />}
          label="sizeDown"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default GameOption;
