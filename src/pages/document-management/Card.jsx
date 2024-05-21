import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

import { fDate } from 'utils/format-time';

export default function DocCard({ item }) {
  return (
    <MainCard contentSX={{ p: 2.25, cursor: 'pointer' }} onClick={() => {}}>
      <Stack spacing={0.5}>
        <Grid container direction={'column'} alignItems="left">
          <Grid item>
            <Chip variant="combined" color={'primary'} label={`${item.document_type}`} sx={{ mb: 1.25 }} size="small" />
          </Grid>
          <Grid item>
            <Typography variant="h4" color="inherit">
              {item.document_name}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" color="text.secondary">
          {item.document_description}
        </Typography>
      </Stack>
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="text.secondary">
          Created on{' '}
          <Typography variant="caption" sx={{ color: `${'primary'}.main` }}>
            {fDate(item.created_at)}
          </Typography>{' '}
        </Typography>
      </Box>
    </MainCard>
  );
}

DocCard.propTypes = {
  item: PropTypes.any
};
