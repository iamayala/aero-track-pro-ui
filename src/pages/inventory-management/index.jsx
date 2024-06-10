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
  const [initialData, setInitialData] = useState([]);
  const [formType, setFormType] = useState('');
  const [selected, setSelected] = useState(null);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = ['ID', 'Part Number', 'Part Name', 'Manufacturer', 'Quantity', 'Status'];

  const handleFetchParts = () => {
    api.part.get().then((response) => {
      const data = response.data;
      setInitialData(data);
      const _data = data.map((item) => {
        return {
          id: item.id,
          part_number: item.part_number,
          part_name: item.part_name,
          manufacturer: item.manufacturer,
          quantity: item.quantity,
          status: item.status
        };
      });
      setMappedData(_data);
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

  const handleEditPart = (data) => {
    api.part
      .put({ ...data, location: 'N/A', status: 'available' }, selected.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Part Updated Successfully',
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

  const handleDeleteRecord = (value) => {
    api.part
      .delete(value.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Part Deleted Successfully',
            severity: 'success'
          });
          handleFetchParts();
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
        title="Parts and Invetory"
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
              label: 'Part Number',
              name: 'part_number',
              type: 'number',
              required: true,
              initialValue: selected?.part_number || ''
            },
            { label: 'Part Name', name: 'part_name', type: 'text', required: true, initialValue: selected?.part_name || '' },
            { label: 'Description', name: 'description', type: 'text', required: true, initialValue: selected?.description || '' },
            { label: 'Manufacturer', name: 'manufacturer', type: 'text', required: true, initialValue: selected?.manufacturer || '' },
            { label: 'Unit Price', name: 'unit_price', type: 'number', required: true, initialValue: selected?.unit_price || '' },
            { label: 'Quantity', name: 'quantity', type: 'number', required: true, initialValue: selected?.quantity || '' }
          ]}
          formType={formType}
          initialValues={formType === 'NEW' ? {} : selected}
          onSave={(value) => handleSavePart(value)}
          onEdit={(value) => handleEditPart(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable headCells={headCells} data={mappedData} onPressAction={(action, row) => handleOnActionClick(row, action)} />
      )}
    </Grid>
  );
}

Inventory.propTypes = {};
