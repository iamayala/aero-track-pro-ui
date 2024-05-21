import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import OrdersTable from '../dashboard/OrdersTable';
import PageTitle from 'components/@extended/PageTitle';

export default function Inventory() {
  const headCells = ['ID', 'Part Number', 'Part Name', 'Manufacturer', 'Quantity', 'Status'];

  const data = [
    {
      id: 1,
      part_number: 'P12345',
      part_name: 'Engine Spark Plug',
      manufacturer: 'ACME Corporation',
      description: 'High-performance spark plug for aircraft engines',
      unit_price: '50.00',
      quantity: 100,
      location: 'Warehouse A',
      status: 'available',
      created_at: '2024-05-10T17:52:27.000Z',
      updated_at: '2024-05-10T17:53:09.000Z'
    }
  ];

  const mappedData = data.map((item) => {
    return {
      id: item.id,
      part_number: item.part_number,
      part_name: item.part_name,
      manufacturer: item.manufacturer,
      quantity: item.quantity,
      status: item.status
    };
  });

  return (
    <Grid container>
      <PageTitle title="Parts and Invetory" hasButton={false} />
      <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} />
    </Grid>
  );
}

Inventory.propTypes = {};
