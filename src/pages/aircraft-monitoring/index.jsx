import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import FormSelect from 'components/FormSelect';
import api from 'api';
import { useEffect, useState } from 'react';
import { random } from 'lodash';

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
  const [aircrafts, setAircrafts] = useState([]);
  const [activeAircraft, setActiveAircraft] = useState(null);
  const [initialData, setInitialData] = useState([]);
  const [mappedData, setMappedData] = useState([]);

  const headCells = ['Flight No.', 'Pilot', 'Departure', 'Arrival', 'Range', 'Speed', 'Fuel', 'Health'];

  const handleFetchFlights = () => {
    api.flight.get().then((response) => {
      const data = response.data;
      setInitialData(data);
      const _data = data.map((item) => {
        return {
          id: item.flight_number,
          pilot: 'TUENY',
          departure: item.departure_airport + ' - ' + fDateTime(item.departure_datetime),
          arrival: item.arrival_airport + ' - ' + fDateTime(item.arrival_datetime),
          range: random(item.max_range * 0.5, item.max_range).toFixed(1),
          speed: random(item.max_speed * 0.5, item.max_speed).toFixed(1),
          fuel: random(item.fuel_capacity * 0.2, item.fuel_capacity * 0.9).toFixed(1),
          status: item.status
        };
      });
      setMappedData(_data);
    });
  };

  useEffect(() => {
    api.aircraft.get().then((response) => {
      const data = response.data.map((item) => {
        return {
          label: item.manufacturer + ' ' + item.model,
          value: item.id
        };
      });
      handleFetchFlights();
      setAircrafts(data);
      setActiveAircraft(data.id);
    });
  }, []);

  return (
    <Grid container>
      <PageTitle title="Aircraft Monitoring" hasButton={true} buttonLabel="Download CSV" onPressButton={() => {}} />
      <FormSelect options={aircrafts} handleChange={(e) => setActiveAircraft(e.target.value)} value={activeAircraft} />
      {aircrafts.length > 0 && activeAircraft && <OrdersTable headCells={headCells} data={mappedData} hasAction={false} />}
    </Grid>
  );
}

AircraftMonitoring.propTypes = {};
