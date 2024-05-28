import { MenuItem, Select, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ options, value, handleChange }) => {
  return (
    <Stack mb={2} width>
      <Select value={value} onChange={handleChange} fullWidth sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '50px' }}>
        <MenuItem value="">Select Aircraft</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default FormSelect;

FormSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired
};
