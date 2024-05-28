import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import OrdersTable from '../dashboard/OrdersTable';
import PageTitle from 'components/@extended/PageTitle';
import api from 'api';
import { useEffect, useState } from 'react';
import Form from 'components/form';
import Snackbar from 'components/Snackbar';

export default function Inventory() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = ['ID', 'Part Number', 'Part Name', 'Manufacturer', 'Quantity', 'Status'];

  const handleFetchParts = () => {
    api.part.get().then((response) => {
      const data = response.data.map((item) => {
        return {
          id: item.id,
          part_number: item.part_number,
          part_name: item.part_name,
          manufacturer: item.manufacturer,
          quantity: item.quantity,
          status: item.status
        };
      });
      setMappedData(data);
    });
  };

  useEffect(() => {
    handleFetchParts();
  }, []);

  const handleSavePart = (data) => {
    api.part
      .post({ ...data, location: 'N/A', status: 'available' })
      .then((response) => {
        if (response.status === 201) {
          setFormResponse({
            visible: true,
            message: 'Part Saved Successfully',
            severity: 'success'
          });
          handleFetchParts();
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
      <PageTitle title="Parts and Invetory" hasButton={!formView} onPressButton={() => setFormView(true)} />

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
              label: 'Part Numer',
              name: 'part_number',
              type: 'number',
              required: true
            },
            { label: 'Part Name', name: 'part_name', type: 'text', required: true },
            { label: 'Description', name: 'description', type: 'text', required: true },
            { label: 'Manufacturer', name: 'manufacturer', type: 'text', required: true },
            { label: 'Unit Price', name: 'unit_price', type: 'number', required: true },
            { label: 'Quantity', name: 'quantity', type: 'number', required: true }
          ]}
          onSave={(value) => handleSavePart(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} />
      )}
    </Grid>
  );
}

Inventory.propTypes = {};
