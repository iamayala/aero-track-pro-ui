import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';
import { fDateTime, formatTimestamp } from 'utils/format-time';
import Form from 'components/form';
import { useEffect, useState } from 'react';
import api from 'api';
import Snackbar from 'components/Snackbar';

export default function MaintenanceSchedule() {
  const [formView, setFormView] = useState(false);
  const [mappedData, setMappedData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [formType, setFormType] = useState('');
  const [selected, setSelected] = useState(null);

  const [formResponse, setFormResponse] = useState({
    visible: false,
    message: '',
    severity: 'error'
  });
  const [aircrafts, setAircrafts] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const headCells = ['ID', 'Description', 'Aircraft', 'Start Time', 'End Time', 'Assigned To', 'Status'];

  const handleFetchActivities = () => {
    api.maintenance.get().then((response) => {
      const data = response.data;
      setInitialData(data);
      const _data = data.map((item) => {
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
      setMappedData(_data);
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

  const handleEditActivity = (data) => {
    api.maintenance
      .put({ ...data, parts_replaced: '', issues_resolved: '', status: 'scheduled' }, selected.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Activity Updated Successfully',
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

  const handleDeleteRecord = (value) => {
    api.maintenance
      .delete(value.id)
      .then((response) => {
        if (response.status === 200) {
          setFormResponse({
            visible: true,
            message: 'Activity Deleted Successfully',
            severity: 'success'
          });
          handleFetchActivities();
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

  const handleOnActionClick = (value, action) => {
    if (action === 'DELETE') {
      handleDeleteRecord(value);
    } else {
      setFormType(action);
      const dataObject = initialData.filter((ac) => ac.id === value.id);
      setSelected({
        ...dataObject[0],
        start_datetime: formatTimestamp(dataObject[0]?.start_datetime),
        end_datetime: formatTimestamp(dataObject[0]?.end_datetime)
      });
      setFormView(true);
    }
  };

  return (
    <Grid container>
      <PageTitle
        title="Maintenance Schedules"
        hasButton={!formView}
        onPressButton={() => {
          setFormView(true);
          setFormType('NEW');
        }}
      />

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
              ],
              initialValue: selected?.activity_type || ''
            },
            { label: 'Description', name: 'activity_description', type: 'text', required: true },
            {
              label: 'Aircraft',
              name: 'aircraft_id',
              type: 'select',
              required: true,
              options: aircrafts,
              initialValue: selected?.activity_id || ''
            },
            {
              label: 'Technician',
              name: 'technician_id',
              type: 'select',
              required: true,
              options: technicians,
              initialValue: selected?.technician_id || ''
            },
            {
              label: 'Start Date Time',
              name: 'start_datetime',
              type: 'datetime-local',
              required: true,
              initialValue: formatTimestamp(selected?.start_datetime) || ''
            },
            {
              label: 'End Date Time',
              name: 'end_datetime',
              type: 'datetime-local',
              required: true,
              initialValue: formatTimestamp(selected?.end_datetime) || ''
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
              ],
              initialValue: selected?.priority || ''
            }
          ]}
          formType={formType}
          initialValues={formType === 'NEW' ? {} : selected}
          onSave={(value) => handleSaveActivity(value)}
          onEdit={(value) => handleEditActivity(value)}
          onCancel={() => setFormView(false)}
        />
      ) : (
        <OrdersTable headCells={headCells} data={mappedData} onPressAction={(action, row) => handleOnActionClick(row, action)} />
      )}
    </Grid>
  );
}

MaintenanceSchedule.propTypes = {};
