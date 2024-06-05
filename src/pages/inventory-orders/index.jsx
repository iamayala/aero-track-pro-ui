import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import api from 'api';
import React from 'react';

export default function InventoryOrders() {
  const [mappedData, setMappedData] = React.useState([]);

  const headCells = ['ID', 'Part Number', 'Part Name', 'Manufacturer', 'Quantity', 'Unit Price', 'Total', 'Status'];

  const handleFetchOrders = () => {
    api.order.get().then((response) => {
      const data = response.data.map((item) => {
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

  return (
    <Grid container>
      <PageTitle title="Orders" hasButton={false} />
      <OrdersTable
        headCells={headCells}
        data={mappedData}
        onPressAction={(value, row) => console.log(value, row)}
        handleRefresh={handleFetchOrders}
      />
    </Grid>
  );
}

InventoryOrders.propTypes = {};
