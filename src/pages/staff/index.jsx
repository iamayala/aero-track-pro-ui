import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { useEffect, useState } from 'react';
import Form from 'components/form';
import api from 'api';
import Snackbar from 'components/Snackbar';

const data = [
  {
    id: 1,
    username: 'james.cameron',
    password: '$2b$10$CcTGA.8X16kR7Y5PpTP9t.uXZ2WsNfQwZ3/V/qoR7kY6uEMSWQNwK',
    email: 'jamescameron@aero.pro',
    role: 'technician',
    full_name: 'james jr. cameron',
    status: 1,
    created_at: '2024-05-08T09:51:30.000Z',
    updated_at: '2024-05-08T10:02:36.000Z'
  }
];

export default function Staff() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = ['ID', 'Full Name', 'Email', 'Role', 'Status'];

  const handleFetchUsers = () => {
    api.user.get().then((user) => {
      const data = user.data.map((item) => {
        return {
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          role: item.role,
          status: item.status
        };
      });
      setMappedData(data);
    });
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleSaveUser = (data) => {
    api.user
      .post({ ...data, password: 'password' })
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'User Saved Successfully',
            severity: 'success'
          });
          handleFetchUsers();
          setFormView(false);
        }
      })
      .catch((error) => {
        setFormResponse({
          visible: true,
          message: error.message,
          severity: 'error'
        });
      });
  };

  return (
    <Grid container>
      <PageTitle title="Manage Staff" hasButton={!formView} onPressButton={() => setFormView(true)} />

      {formResponse.visible && (
        <Snackbar
          message={formResponse.message}
          severity={formResponse.severity}
          handleClose={() => setFormResponse({ ...formResponse, visible: false })}
        />
      )}

      {formView ? (
        <Form
          fields={[
            {
              label: 'Full Name',
              name: 'full_name',
              type: 'text',
              required: true
            },
            { label: 'Username', name: 'username', type: 'text', required: false },
            {
              label: 'Email',
              name: 'email',
              type: 'text',
              required: true
            },
            {
              label: 'Role',
              name: 'role',
              type: 'select',
              required: true,
              options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Technician', value: 'technician' },
                { label: 'Staff', value: 'staff' }
              ]
            }
          ]}
          onSave={(value) => handleSaveUser(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} canView={false} />
      )}
    </Grid>
  );
}

Staff.propTypes = {};
