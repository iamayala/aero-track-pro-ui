import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import Header from './Header';
import navigation from 'menu-items';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { useAuth } from 'hooks/use-auth';
import { Button, Typography } from '@mui/material';

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  const userData = sessionStorage.getItem('cookieman');

  if (!userData)
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: '15px'
        }}
      >
        <Typography>You are not authorized to view this page</Typography>
        <Button
          onClick={() => {
            window.location.replace(`/free/login`);
          }}
        >
          Go to login
        </Button>
      </Box>
    );

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} />
        <Outlet />
      </Box>
    </Box>
  );
}
