import { Button, FormControl, FormLabel, Grid, MenuItem, Select, Stack, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';

const Form = ({ fields, initialValues = {}, formType, onCancel, onSave, onEdit }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [formTypeLocal, setFormTypeLocal] = useState(formType);

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

  const handleEdit = () => {
    if (validateForm()) {
      onEdit(formValues);
    }
  };

  return (
    <Grid container direction={'row'} columnSpacing={2.75}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container direction={'row'} columnSpacing={2.75} mt={2} mb={1}>
            {fields.map((field) => (
              <Grid item md={4} mb={2} key={field.name}>
                <FormControl fullWidth error={!!formErrors[field.name]}>
                  <FormLabel>
                    {field.label} {field.required && ' *'}
                  </FormLabel>
                  {field.type === 'select' ? (
                    <Select value={formValues[field.name] || ''} disabled={formTypeLocal === 'VIEW'} onChange={handleChange(field.name)}>
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
                      value={formValues[field.name] || ''} // Use initialValues or empty string
                      onChange={handleChange(field.name)}
                      helperText={formErrors[field.name]}
                      error={!!formErrors[field.name]}
                      disabled={formTypeLocal === 'VIEW'}
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => (formTypeLocal === 'VIEW' ? setFormTypeLocal('EDIT') : formTypeLocal === 'EDIT' ? handleEdit() : handleSave())}
            >
              {formTypeLocal === 'VIEW' ? 'Edit' : 'Save'}
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Form;
