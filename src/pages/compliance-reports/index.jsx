import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import { useEffect, useState } from 'react';
import api from 'api';
import { downloadPdfDocument } from 'utils/downloadfn';
import { reportHtmlForm } from 'utils/report';
import { useAuth } from 'hooks/use-auth';

export default function ComplianceReports() {
  const [mappedData, setMappedData] = useState([]);

  const headCells = [
    { id: 'report_id', label: 'Report ID' },
    { id: 'aircraft', label: 'Aircraft Model' },
    { id: 'description', label: 'Description' },
    { id: 'findings', label: 'Findings' },
    { id: 'corrective_actions', label: 'Corrective Actions' },
    { id: 'report_date', label: 'Report Date' }
  ];

  const handleFetchComplianceReports = () => {
    api.reports.getComplianceReports().then((response) => {
      const data = response.data;
      const _data = data.map((item) => {
        return {
          report_id: item.report_id,
          aircraft: item.manufacturer + '-' + item.model,
          description: item.description,
          findings: item.findings,
          corrective_actions: item.corrective_actions,
          report_date: fDateTime(item.report_date)
        };
      });
      setMappedData(_data);
    });
  };

  useEffect(() => {
    handleFetchComplianceReports();
  }, []);

  const auth = useAuth();

  const docInfo = {
    title: 'Compliance Report',
    generatedBy: auth.cookieman?.full_name
  };

  const onDownloadCSV = () => {
    downloadPdfDocument(reportHtmlForm(mappedData, headCells, docInfo), docInfo.title + ` ${new Date().toISOString()}`);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Grid container>
      <PageTitle title="Compliance Reports" hasButton={true} buttonLabel="Download Report" onPressButton={() => onDownloadCSV()} />
      <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} hasAction={false} />
    </Grid>
  );
}

ComplianceReports.propTypes = {};
