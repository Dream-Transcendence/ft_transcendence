import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import StarRateIcon from '@mui/icons-material/StarRate';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const AdminActions = [
  { icon: <RemoveCircleIcon />, name: 'User Ban' },
  { icon: <VolumeOffIcon />, name: 'Mute' },
];

const OwnerActions = [
  { icon: <StarRateIcon />, name: 'Admin' },
  { icon: <RemoveCircleIcon />, name: 'User Ban' },
  { icon: <VolumeOffIcon />, name: 'Mute' },
];

export default function BasicSpeedDial() {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: 'absolute',
        width: '48px',
        height: '48px',
      }}
      icon={<SettingsApplicationsIcon />}
      direction="right"
    >
      {OwnerActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
