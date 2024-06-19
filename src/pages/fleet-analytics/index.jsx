import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { useEffect, useState } from 'react';
import Form from 'components/form';
import api from 'api';
import Snackbar from 'components/Snackbar';

export default function FleetAnalytics() {
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
    { id: 'registration_number', label: 'Registration Number' },
    { id: 'name', label: 'Name' },
    { id: 'year_of_manufacture', label: 'Year' },
    { id: 'capacity', label: 'Capacity' }
  ];

  const handleFetchAircrafts = () => {
    api.aircraft.get().then((response) => {
      const data = response.data;
      setInitialData(data);
      const _data = data.map((item) => {
        return {
          id: item.id,
          registration_number: item.registration_number,
          name: item.manufacturer + ' ' + item.model,
          year_of_manufacture: item.year_of_manufacture,
          capacity: item.capacity
        };
      });
      setMappedData(_data);
    });
  };

  useEffect(() => {
    handleFetchAircrafts();
  }, []);

  const handleSaveAircraft = (data) => {
    api.aircraft
      .post({ ...data, current_location: null, status: 1 })
      .then((response) => {
        if (response.status === 201) {
          setFormResponse({
            visible: true,
            message: 'Aircraft Saved Successfully',
            severity: 'success'
          });
          handleFetchAircrafts();
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

  const handleEditAircraft = (data) => {
    api.aircraft
      .put({ ...data, current_location: null, status: 1 }, selected.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Aircrafts Updated Successfully',
            severity: 'success'
          });
          handleFetchAircrafts();
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
    api.aircraft
      .delete(value.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Aircraft Deleted Successfully',
            severity: 'success'
          });
          handleFetchAircrafts();
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
        title="Fleet Analytics"
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
              label: 'Registration Number',
              name: 'registration_number',
              type: 'text',
              required: true,
              initialValue: selected?.registration_number || ''
            },
            {
              label: 'Manufacturer',
              name: 'manufacturer',
              type: 'text',
              required: true,
              initialValue: selected?.manufacturer || ''
            },
            { label: 'Model', name: 'model', type: 'text', required: true, initialValue: selected?.model || '' },
            {
              label: 'Year Of Manufacture',
              name: 'year_of_manufacture',
              type: 'text',
              required: true,
              initialValue: selected?.year_of_manufacture || ''
            },
            { label: 'capacity', name: 'capacity', type: 'number', required: true, initialValue: selected?.capacity || '' },
            {
              label: 'Fuel Capacity (in Litres)',
              name: 'fuel_capacity',
              type: 'number',
              required: true,
              initialValue: selected?.fuel_capacity || ''
            },
            {
              label: 'Max Speed (in kph)',
              name: 'max_speed',
              type: 'number',
              required: true,
              initialValue: selected?.max_speed || ''
            },
            { label: 'Max Range', name: 'max_range', type: 'number', required: true, initialValue: selected?.max_range || '' }
          ]}
          formType={formType}
          initialValues={formType === 'NEW' ? {} : selected}
          onSave={(value) => handleSaveAircraft(value)}
          onEdit={(value) => handleEditAircraft(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable
          headCells={headCells}
          data={mappedData}
          onPressAction={(action, row) => handleOnActionClick(row, action)}
          canDelete={false}
        />
      )}
    </Grid>
  );
}

FleetAnalytics.propTypes = {};
