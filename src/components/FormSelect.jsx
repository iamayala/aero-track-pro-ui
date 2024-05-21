import { MenuItem, Select, Stack } from '@mui/material';
import React from 'react';

const FormSelect = () => {
  return (
    <Stack mb={2} width>
      <Select value={'Julius'} onChange={() => {}} fullWidth sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '50px' }}>
        <MenuItem value="">Select Aircraft</MenuItem>
        {[
          { value: 'Julius', label: 'Julius' },
          { value: 'James', label: 'James' }
        ].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default FormSelect;
