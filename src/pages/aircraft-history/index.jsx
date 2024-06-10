// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import FormSelect from 'components/FormSelect';
import { useEffect, useState } from 'react';
import api from 'api';

export default function AircraftHistory() {
  const [aircrafts, setAircrafts] = useState([]);
  const [activeAircraft, setActiveAircraft] = useState(null);
  const [mappedData, setMappedData] = useState([]);

  const headCells = ['ID', 'A.ID.', 'Description', 'Aircraft', 'Start Time', 'End Time', 'Assigned To', 'Status'];

  const handleFetchActivities = () => {
    api.maintenance.get().then((response) => {
      const data = response.data;
      const _data = data.map((item) => {
        return {
          id: item.id,
          aircraft_id: item.aircraft_id,
          activity_type: item.activity_type.toUpperCase(),
          aircraft: item.aircraft_manufacturer + ' ' + item.aircraft_model,
          start_datetime: fDateTime(item.start_datetime),
          end_datetime: fDateTime(item.end_datetime),
          technician_name: item.technician_name,
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
      handleFetchActivities();
      setAircrafts(data);
      setActiveAircraft(data.id);
    });
  }, []);

  return (
    <Grid container>
      <PageTitle title="History and Logbook" hasButton={false} buttonLabel="Download CSV" onPressButton={() => {}} />

      <FormSelect options={aircrafts} handleChange={(e) => setActiveAircraft(e.target.value)} value={activeAircraft} />
      <OrdersTable headCells={headCells} data={mappedData.filter((item) => item.aircraft_id === activeAircraft)} hasAction={false} />
    </Grid>
  );
}

AircraftHistory.propTypes = {};
