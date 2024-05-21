import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';

const Form = ({ fields, onCancel, onSave }) => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (fieldName) => (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: event.target.value
    }));

    // Clear error when field value is changed
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formValues);
    }
  };

  return (
    <Grid container direction={'row'} columnSpacing={2.75}>
      <Grid item xs={8}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Form</Typography>
          </Stack>

          <Grid container direction={'row'} columnSpacing={2.75} mt={2} mb={1}>
            {fields.map((field) => (
              <Grid item md={6} mb={2} key={field.name}>
                <FormControl fullWidth error={!!formErrors[field.name]}>
                  <FormLabel>
                    {field.label} {field.required && ' *'}
                  </FormLabel>
                  {field.type === 'select' ? (
                    <Select value={formValues[field.name] || ''} onChange={handleChange(field.name)}>
                      <MenuItem value="">Select {field.label}</MenuItem>
                      {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <TextField
                      variant="outlined"
                      fullWidth
                      required={field.required}
                      type={field.type}
                      value={formValues[field.name] || ''}
                      onChange={handleChange(field.name)}
                      helperText={formErrors[field.name]}
                      error={!!formErrors[field.name]}
                    />
                  )}
                </FormControl>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={4}>
        <MainCard>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Preview</Typography>
          </Stack>
          <Stack>
            {Object.entries(formValues).map(([fieldName, value], index) => (
              <React.Fragment key={fieldName}>
                <ListItem disableGutters>
                  <ListItemText primary={fieldName} secondary={value} />
                </ListItem>
                {index !== Object.entries(formValues).length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Form;
