import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import Form from 'components/form';

export default function TaskOrder() {
  return (
    <Grid container>
      <Form
        fields={[
          { label: 'name', name: 'name', type: 'text', required: false },
          { label: '_name', name: '_name', type: 'text', required: false },
          { label: '_name', name: '_na_me', type: 'select', required: false, options: [{ value: 'k', label: 'Key-Key' }] }
        ]}
        onSave={(value) => console.log(JSON.stringify(value))}
      />
    </Grid>
  );
}

TaskOrder.propTypes = {};
