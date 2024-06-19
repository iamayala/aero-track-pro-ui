import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { useEffect, useState } from 'react';
import Form from 'components/form';
import api from 'api';
import Snackbar from 'components/Snackbar';

export default function Staff() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [formType, setFormType] = useState('');
  const [selected, setSelected] = useState(null); // To store selected aircraft for editing

  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'full_name', label: 'Full Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' }
  ];

  const handleFetchUsers = () => {
    api.user.get().then((response) => {
      const data = response.data;
      setInitialData(data);
      const _data = data.map((item) => {
        return {
          id: item.id,
          full_name: item.full_name,
          email: item.email,
          role: item.role,
          status: item.status
        };
      });
      setMappedData(_data);
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

  const handleEditUser = (data) => {
    api.user
      .put(data, selected.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'User Updated Successfully',
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

  const handleDeleteRecord = (value) => {
    api.user
      .delete(value.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'User Deleted Successfully',
            severity: 'success'
          });
          handleFetchUsers();
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

  const handleOnActionClick = (value, action) => {
    if (action === 'DELETE') {
      handleDeleteRecord(value);
    } else {
      setFormType(action);
      const dataObject = initialData.filter((ac) => ac.id === value.id);
      setSelected(dataObject[0]);
      setFormView(true);
    }
  };

  return (
    <Grid container>
      <PageTitle
        title="Manage Staff"
        hasButton={!formView}
        onPressButton={() => {
          setFormView(true);
          setFormType('NEW');
        }}
      />

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
              required: true,
              initialValue: selected?.full_name || ''
            },
            { label: 'Username', name: 'username', type: 'text', required: false, initialValue: selected?.username || '' },
            {
              label: 'Email',
              name: 'email',
              type: 'text',
              required: true,
              initialValue: selected?.email || ''
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
              ],
              initialValue: selected?.role || ''
            }
          ]}
          formType={formType}
          initialValues={formType === 'NEW' ? {} : selected}
          onSave={(value) => handleSaveUser(value)}
          onEdit={(value) => handleEditUser(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable
          headCells={headCells}
          data={mappedData}
          onPressAction={(action, row) => handleOnActionClick(row, action)}
          canView={true}
          canEdit={true}
        />
      )}
    </Grid>
  );
}

Staff.propTypes = {};
