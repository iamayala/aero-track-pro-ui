import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import api from 'api';
import React, { useState } from 'react';
import Snackbar from 'components/Snackbar';

export default function InventoryOrders() {
  const [mappedData, setMappedData] = useState([]);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });

  const headCells = ['ID', 'Part Number', 'Part Name', 'Manufacturer', 'Quantity', 'Unit Price', 'Total', 'Status'];

  const handleFetchOrders = () => {
    api.order.get().then((response) => {
      const data = response.data.map((item) => {
        console.log(item);
        return {
          id: item.id,
          part_number: item.part_number,
          part_name: item.part_name,
          manufacturer: item.manufacturer,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.unit_price * item.quantity,
          status: item.status
        };
      });
      setMappedData(data);
    });
  };

  React.useEffect(() => {
    handleFetchOrders();
  }, []);

  const handleDeleteRecord = (value) => {
    api.order
      .delete(value.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Order Deleted Successfully',
            severity: 'success'
          });
          handleFetchOrders();
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
      console.log(value);
    }
  };

  return (
    <Grid container>
      <PageTitle title="Orders" hasButton={false} />

      {formResponse.visible && (
        <Snackbar
          message={formResponse.message}
          severity={formResponse.severity}
          handleClose={() => setFormResponse({ ...formResponse, visible: false })}
        />
      )}

      <OrdersTable
        headCells={headCells}
        data={mappedData}
        onPressAction={(action, row) => handleOnActionClick(row, action)}
        handleRefresh={handleFetchOrders}
        canEdit={false}
        canView={false}
      />
    </Grid>
  );
}

InventoryOrders.propTypes = {};
