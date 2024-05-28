import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime } from 'utils/format-time';
import Form from 'components/form';
import { useEffect, useState } from 'react';
import api from 'api';
import Snackbar from 'components/Snackbar';

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

export default function MaintenanceSchedule() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });
  const [aircrafts, setAircrafts] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const headCells = ['ID', 'Description', 'Aircraft', 'Start Time', 'End Time', 'Assigned To', 'Status'];

  const handleFetchActivities = () => {
    api.maintenance.get().then((user) => {
      const data = user.data.map((item) => {
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
      setMappedData(data);
    });
  };

  useEffect(() => {
    api.user.get().then((response) => {
      const data = response.data
        .filter((item) => item.role === 'technician')
        .map((item) => {
          return {
            label: item.full_name,
            value: item.id
          };
        });
      setTechnicians(data);
    });
    api.aircraft.get().then((response) => {
      const data = response.data.map((item) => {
        return {
          label: item.manufacturer + ' ' + item.model,
          value: item.id
        };
      });
      setAircrafts(data);
    });
  }, []);

  useEffect(() => {
    handleFetchActivities();
  }, []);

  const handleSaveActivity = (data) => {
    api.maintenance
      .post({ ...data, parts_replaced: '', issues_resolved: '', status: 'scheduled' })
      .then((response) => {
        if (response.status === 201) {
          setFormResponse({
            visible: true,
            message: 'Activity Saved Successfully',
            severity: 'success'
          });
          handleFetchActivities();
          setFormView(false);
        }
      })
      .catch((error) => {
        setFormResponse({
          visible: true,
          message: error.message,
          severity: 'error'
        });
      });
  };

  return (
    <Grid container>
      <PageTitle title="Maintenance Schedules" hasButton={!formView} onPressButton={() => setFormView(true)} />

      {formResponse.visible && (
        <Snackbar
          message={formResponse.message}
          severity={formResponse.severity}
          handleClose={() => setFormResponse({ ...formResponse, visible: false })}
        />
      )}

      {formView ? (
        <Form
          fields={[
            {
              label: 'Activity Type',
              name: 'activity_type',
              type: 'select',
              required: true,
              options: [
                { label: 'Maintenance', value: 'maintenance' },
                { label: 'Repair', value: 'repair' }
              ]
            },
            { label: 'Description', name: 'activity_description', type: 'text', required: true },
            {
              label: 'Aircraft',
              name: 'aircraft_id',
              type: 'select',
              required: true,
              options: aircrafts
            },
            {
              label: 'Technician',
              name: 'technician_id',
              type: 'select',
              required: true,
              options: technicians
            },
            {
              label: 'Start Date Time',
              name: 'start_datetime',
              type: 'datetime-local',
              required: true
            },
            {
              label: 'End Date Time',
              name: 'end_datetime',
              type: 'datetime-local',
              required: true
            },
            {
              label: 'Priority Level',
              name: 'priority',
              type: 'select',
              required: true,
              options: [
                { label: 'High', value: 1 },
                { label: 'Medium', value: 2 },
                { label: 'Low', value: 3 },
                { label: 'No Priority', value: 4 }
              ]
            }
          ]}
          onSave={(value) => handleSaveActivity(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} />
      )}
    </Grid>
  );
}

MaintenanceSchedule.propTypes = {};
