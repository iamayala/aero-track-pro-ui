import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import api from 'api';
import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/use-auth';
import { downloadPdfDocument } from 'utils/downloadfn';
import { reportHtmlForm } from 'utils/report';

export default function AutomatedReports() {
  const [mappedData, setMappedData] = useState([]);

  const headCells = [
    { id: 'id', label: 'ID' },
    { id: 'activity_type', label: 'Type' },
    { id: 'activity_description', label: 'Description' },
    { id: 'aircraft', label: 'Aircraft' },
    { id: 'issues_resolved', label: 'Issue Resolved' },
    { id: 'updated_at', label: 'Completed At' },
    { id: 'technician_name', label: 'Assigned To' }
  ];

  useEffect(() => {
    handleFetchActivities();
  }, []);

  const handleFetchActivities = () => {
    api.maintenance.get().then((response) => {
      const data = response.data;
      const _data = data
        .filter((item) => item.status === 'completed')
        .map((item) => {
          return {
            id: item.id,
            activity_type: item.activity_type.toUpperCase(),
            activity_description: item.activity_description,
            aircraft: item.aircraft_manufacturer + ' ' + item.aircraft_model,
            issues_resolved: item.issues_resolved ? item.issues_resolved : 'n/a',
            updated_at: fDateTime(item.updated_at),
            technician_name: item.technician_name
          };
        });
      setMappedData(_data);
    });
  };

  const auth = useAuth();

  const docInfo = {
    title: 'Maintenance Report',
    generatedBy: auth.cookieman?.full_name
  };

  const onDownloadCSV = () => {
    const _headCells = headCells.map((cell) => {
      return cell.label;
    });
    downloadPdfDocument(reportHtmlForm(mappedData, _headCells, docInfo), docInfo.title + ` ${new Date().toISOString()}`);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Grid container>
      <PageTitle title="Maintenance Reports" hasButton={true} buttonLabel="Download Report" onPressButton={() => onDownloadCSV()} />
      <OrdersTable headCells={headCells} data={mappedData} onPressAction={() => {}} hasAction={false} />
    </Grid>
  );
}

AutomatedReports.propTypes = {};
