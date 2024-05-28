import { Alert, Snackbar as CustomSnack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const Snackbar = ({ severity, message, handleClose }) => {
  return (
    <CustomSnack anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={true} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity ?? 'error'} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </CustomSnack>
  );
};

export default Snackbar;

Snackbar.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func
};
