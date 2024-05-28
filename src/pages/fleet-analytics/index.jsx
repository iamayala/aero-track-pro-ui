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
    registration_number: 'ABC122',
    manufacturer: 'Boeing',
    model: '737',
    year_of_manufacture: 2010,
    capacity: 150,
    fuel_capacity: '20000.00',
    max_speed: '500.00',
    max_range: '3000.00',
    current_location: 'New York',
    status: 1,
    created_at: '2024-05-10T18:01:31.000Z',
    updated_at: '2024-05-10T18:40:12.000Z'
  }
];

export default function FleetAnalytics() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = ['ID', 'Registration Number', 'Name', 'Year', 'Capacity'];

  const handleFetchAircrafts = () => {
    api.aircraft.get().then((response) => {
      const data = response.data.map((item) => {
        return {
          id: item.id,
          registration_number: item.registration_number,
          name: item.manufacturer + ' ' + item.model,
          year_of_manufacture: item.year_of_manufacture,
          capacity: item.capacity
          // current_location: item.current_location
        };
      });
      setMappedData(data);
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

  return (
    <Grid container>
      <PageTitle title="Fleet Analytics" hasButton={!formView} onPressButton={() => setFormView(true)} />
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
              required: true
            },
            { label: 'Manufacturer', name: 'manufacturer', type: 'text', required: true },
            { label: 'Model', name: 'model', type: 'text', required: true },
            { label: 'Year Of Manufacture', name: 'year_of_manufacture', type: 'text', required: true },
            { label: 'capacity', name: 'capacity', type: 'number', required: true },
            { label: 'Fuel Capacity (in Litres)', name: 'fuel_capacity', type: 'number', required: true },
            { label: 'Max Speed (in kph)', name: 'max_speed', type: 'number', required: true },
            { label: 'Max Range', name: 'max_range', type: 'number', required: true }
          ]}
          onSave={(value) => handleSaveAircraft(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable
          headCells={headCells}
          data={mappedData}
          onPressAction={(value, row) => console.log(value, row)}
          canDelete={false}
          canEdit={false}
        />
      )}
    </Grid>
  );
}

FleetAnalytics.propTypes = {};
