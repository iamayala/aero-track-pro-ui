// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useAuth } from 'hooks/use-auth';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const auth = useAuth();

  const removeGroupsByIds = (arr, ids) => {
    console.log(arr);
    return arr.filter((item) => !ids.includes(item.id));
  };

  let updatedMenuItems = [];

  switch (auth.cookieman?.role) {
    case 'inventory_manager':
      updatedMenuItems = removeGroupsByIds(menuItem.items, ['task-management', 'aircraft', 'users']);
      break;
    case 'activity_manager':
      updatedMenuItems = removeGroupsByIds(menuItem.items, ['parts', 'users']);
      break;
    case 'technician':
      updatedMenuItems = removeGroupsByIds(menuItem.items, ['parts', 'aircraft', 'users', 'report']);
      break;
    default:
      updatedMenuItems = menuItem.items;
      break;
  }

  const navGroups = updatedMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
