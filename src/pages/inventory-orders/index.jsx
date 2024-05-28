import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import api from 'api';
import React from 'react';

const data = [
  {
    id: 1,
    part_id: 1,
    quantity: 100,
    order_date: '2024-05-11T22:00:00.000Z',
    expected_delivery_date: '2024-05-24T22:00:00.000Z',
    status: 'available',
    created_at: '2024-05-10T17:52:27.000Z',
    updated_at: '2024-05-10T17:53:09.000Z',
    part_number: 'P12345',
    part_name: 'Engine Spark Plug',
    manufacturer: 'ACME Corporation',
    description: 'High-performance spark plug for aircraft engines',
    unit_price: '50.00',
    location: 'Warehouse A'
  }
];

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
