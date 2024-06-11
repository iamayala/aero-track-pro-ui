// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import Avatar from 'components/@extended/Avatar';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import { useAuth } from 'hooks/use-auth';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const auth = useAuth();

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
        <Grid item>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Avatar alt="profile user" src={avatar1} sx={{ width: 32, height: 32 }} />
            <Stack alignItems={'flex-start'}>
              <Typography variant="h6">{auth.cookieman?.full_name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {auth.cookieman?.role}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Tooltip title="Logout">
          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={() => auth.logout()}>
            <LogoutOutlined />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
