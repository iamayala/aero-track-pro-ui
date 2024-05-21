import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import DocCard from './Card';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';

export default function Documents() {
  const documents = [
    {
      id: 2,
      document_type: 'maintenance_manual',
      document_name: 'Aircraft Maintenance Manual',
      document_description: 'Describing Aircraft Maintenance Manual',
      document_url: 'https://pdfobject.com/pdf/sample.pdf',
      created_at: '2024-05-10T00:00:00.000Z',
      updated_at: '2024-05-10T00:00:00.000Z'
    },
    {
      id: 3,
      document_type: 'maintenance_manual',
      document_name: 'Aircraft Maintenance Manual',
      document_description: 'Describing Aircraft Maintenance Manual',
      document_url: 'https://pdfobject.com/pdf/sample.pdf',
      created_at: '2024-05-10T00:00:00.000Z',
      updated_at: '2024-05-10T00:00:00.000Z'
    }
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <PageTitle title="Documents" buttonLabel="New Document" hasButton={false} onPressButton={() => handleClickOpen()} />
      <Grid container rowSpacing={1.5} columnSpacing={1.5}>
        {documents.map((item, i) => {
          return (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
              <DocCard item={item} />
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle variant="h5">Add New Document</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              document_name: '',
              document_type: '',
              document_url: '',
              document_description: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              document_name: Yup.string().max(255).required('Document name is required'),
              document_type: Yup.string().required('Document type is required'),
              document_url: Yup.string().required('Document url is required')
            })}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form>
                <Grid container direction={'column'} spacing={3}>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="document_name">Name</InputLabel>
                      <OutlinedInput
                        id="document_name"
                        type=""
                        value={values.document_name}
                        name="document_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        fullWidth
                        error={Boolean(touched.document_name && errors.document_name)}
                      />
                    </Stack>
                    {touched.document_name && errors.document_name && <FormHelperText error>{errors.document_name}</FormHelperText>}
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="document_description">Description</InputLabel>
                      <OutlinedInput
                        id="document_description"
                        type=""
                        value={values.document_description}
                        name="document_description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Description"
                        fullWidth
                        error={Boolean(touched.document_description && errors.document_description)}
                      />
                    </Stack>
                    {touched.document_description && errors.document_description && (
                      <FormHelperText error>{errors.document_description}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      {/* <InputLabel htmlFor="document_type">Type</InputLabel> */}
                      <Select
                        id="document_type"
                        value={values.document_type}
                        label="Age"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                        error={Boolean(touched.document_type && errors.document_type)}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Stack>
                    {touched.document_type && errors.document_type && <FormHelperText error>{errors.document_type}</FormHelperText>}
                  </Grid>
                  <Grid item>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="document_name">Name</InputLabel>
                      <OutlinedInput
                        id="document_name"
                        type=""
                        value={values.document_name}
                        name="document_name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter Document Name"
                        fullWidth
                        error={Boolean(touched.document_name && errors.document_name)}
                      />
                    </Stack>
                    {touched.document_name && errors.document_name && <FormHelperText error>{errors.document_name}</FormHelperText>}
                  </Grid>
                </Grid>
                <Grid mt={2}>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

Documents.propTypes = {};
