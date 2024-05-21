import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import FormSelect from 'components/FormSelect';

const data = [
  {
    id: 1,
    activity_type: 'maintenance',
    activity_description: 'Routine maintenance check',
    aircraft_id: 1,
    technician_id: 'technician1',
    start_datetime: '2024-05-10T06:00:00.000Z',
    end_datetime: '2024-05-10T10:00:00.000Z',
    parts_replaced: ['part1', 'part2'],
    issues_resolved: 'No issues found',
    status: 'completed',
    created_at: '2024-05-10T18:36:52.000Z',
    updated_at: '2024-05-10T18:43:49.000Z',
    aircraft_manufacturer: 'Boeing',
    aircraft_model: '737',
    registration_number: 'ABC122',
    technician_name: 'james jr. cameron',
    technician_email: 'jamescameron@aero.pro'
  }
];

export default function AircraftMonitoring() {
  const headCells = ['ID', 'Description', 'Aircraft', 'Start Time', 'End Time', 'Assigned To', 'Status'];

  const mappedData = data.map((item) => {
    return {
      id: item.id,
      activity_type: item.activity_type.toUpperCase(),
      aircraft: item.aircraft_manufacturer + ' ' + item.aircraft_model,
      start_datetime: fDateTime(item.start_datetime),
      end_datetime: fDateTime(item.end_datetime),
      technician_name: item.technician_name,
      status: item.status
    };
  });

  return (
    <Grid container>
      <PageTitle title="Aircraft Monitoring" hasButton={true} buttonLabel="Download CSV" onPressButton={() => {}} />
      <FormSelect />
      <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} />
    </Grid>
  );
}

AircraftMonitoring.propTypes = {};
