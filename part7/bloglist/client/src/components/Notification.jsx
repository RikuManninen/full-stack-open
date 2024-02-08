import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Notification = ({ message }) => {
  if (message === null || message === undefined) {
    return null;
  }

  const severity = message.type;

  return (
    <Stack sx={{ width: '100%', bottom: 4, position: 'fixed', zIndex: 99 }} spacing={2}>
      <Alert severity={severity}>{message.message}</Alert>
    </Stack>
  );
};

export default Notification;
