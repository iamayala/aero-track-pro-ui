import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import FormSelect from 'components/FormSelect';
import api from 'api';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { downloadPdfDocument } from 'utils/downloadfn';
import { reportHtmlForm } from 'utils/report';

export default function AircraftMonitoring() {
  const [aircrafts, setAircrafts] = useState([]);
  const [activeAircraft, setActiveAircraft] = useState(null);
  const [mappedData, setMappedData] = useState([]);

  const headCells = [
    { id: 'aircraft_id', label: 'A.ID' },
    { id: 'id', label: 'F.No.' },
    { id: 'pilot', label: 'Pilot' },
    { id: 'departure', label: 'Departure' },
    { id: 'arrival', label: 'Arrival' },
    { id: 'range', label: 'Range' },
    { id: 'speed', label: 'Speed' },
    { id: 'fuel', label: 'Fuel' },
    { id: 'status', label: 'Health' }
  ];

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
          range: parseFloat(item.aircraft_max_range).toFixed(1),
          speed: parseFloat(item.aircraft_max_speed).toFixed(1),
          fuel: parseFloat(item.aircraft_fuel_capacity).toFixed(1),
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

  const auth = useAuth();

  const docInfo = {
    title: `${aircrafts.filter((aircraft) => aircraft.value === activeAircraft)[0]?.label} Monitoring Report`,
    generatedBy: auth.cookieman?.full_name
  };

  const onDownloadCSV = () => {
    const _headCells = headCells.map((cell) => {
      return cell.label;
    });
    downloadPdfDocument(
      reportHtmlForm(
        mappedData.filter((item) => item.aircraft_id === activeAircraft),
        _headCells,
        docInfo
      ),
      docInfo.title + ` ${new Date().toISOString()}`
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Grid container>
      <PageTitle title="Aircraft Monitoring" hasButton={true} buttonLabel="Download Report" onPressButton={() => onDownloadCSV()} />
      <FormSelect options={aircrafts} handleChange={(e) => setActiveAircraft(e.target.value)} value={activeAircraft} />
      {aircrafts.length > 0 && activeAircraft && (
        <OrdersTable headCells={headCells} data={mappedData.filter((item) => item.aircraft_id === activeAircraft)} hasAction={false} />
      )}
    </Grid>
  );
}

AircraftMonitoring.propTypes = {};
