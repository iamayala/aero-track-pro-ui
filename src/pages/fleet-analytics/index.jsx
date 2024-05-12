import PropTypes from 'prop-types';
// material-ui
import Grid from '@mui/material/Grid';
import PageTitle from 'components/@extended/PageTitle';
import OrdersTable from '../dashboard/OrdersTable';

const data = [
  {
    "id": 1,
    "registration_number": "ABC122",
    "manufacturer": "Boeing",
    "model": "737",
    "year_of_manufacture": 2010,
    "capacity": 150,
    "fuel_capacity": "20000.00",
    "max_speed": "500.00",
    "max_range": "3000.00",
    "current_location": "New York",
    "status": 1,
    "created_at": "2024-05-10T18:01:31.000Z",
    "updated_at": "2024-05-10T18:40:12.000Z"
  }
]


export default function FleetAnalytics() {
  
  const headCells = ["ID", "Registration Number", "Name", "Year", "Capacity", "Current Location"]

  const mappedData = data.map(item => {
    return {
      id: item.id,
      registration_number: item.registration_number,
      name: item.manufacturer + " " + item.model,
      year_of_manufacture: item.year_of_manufacture,
      capacity: item.capacity,
      current_location: item.current_location
    }
  })

  return (
     <Grid container>
      <PageTitle title="Fleet Analytics" hasButton={false}  />
          <OrdersTable headCells={headCells} data={mappedData} onPressAction={(value, row) => console.log(value, row)} />
      </Grid>
  )}

FleetAnalytics.propTypes = {};
