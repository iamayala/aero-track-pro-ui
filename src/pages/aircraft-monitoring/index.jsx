import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import FormSelect from 'components/FormSelect';
import api from 'api';
import { useEffect, useState } from 'react';

export default function AircraftMonitoring() {
  const [aircrafts, setAircrafts] = useState([]);
  const [activeAircraft, setActiveAircraft] = useState(null);
  const [mappedData, setMappedData] = useState([]);

  const headCells = ['A.ID', 'F.No.', 'Pilot', 'Departure', 'Arrival', 'Range', 'Speed', 'Fuel', 'Health'];

  const handleFetchFlights = () => {
    api.flight.get().then((response) => {
      const data = response.data;
      const _data = data.map((item) => {
        return {
          aircraft_id: item.aircraft_id,
          id: item.flight_number,
          pilot: item.pilot_name,
          departure: item.departure_airport + ' - ' + fDateTime(item.departure_datetime),
          arrival: item.arrival_airport + ' - ' + fDateTime(item.arrival_datetime),
          range: item.aircraft_max_range.toFixed(1),
          speed: item.aircraft_max_speed.toFixed(1),
          fuel: item.aircraft_fuel_capacity.toFixed(1),
          status: item.flight_status
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
      {aircrafts.length > 0 && activeAircraft && (
        <OrdersTable headCells={headCells} data={mappedData.filter((item) => item.aircraft_id === activeAircraft)} hasAction={false} />
      )}
    </Grid>
  );
}

AircraftMonitoring.propTypes = {};
