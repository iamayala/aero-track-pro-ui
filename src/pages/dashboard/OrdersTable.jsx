import PropTypes from 'prop-types';
// material-ui
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// project import
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableSortLabel, TextField } from '@mui/material';
import useSortableData from './Sorting';

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ headCells, hasAction, onRequestSort, order, orderBy }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? <span>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span> : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
        {hasAction && <TableCell>Actions</TableCell>}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Active';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({
  headCells,
  data,
  hasAction = true,
  canView = true,
  canEdit = true,
  canDelete = true,
  onPressAction,
  handleRefresh,
  canSearch = false
}) {
  const handlePressAction = useCallback(
    (action, row) => {
      onPressAction(action, row);
    },
    [onPressAction]
  );

  const [open, setOpen] = useState(false);
  const [proneToDelete, setProneToDelete] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {}, [query]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { order, orderBy, sortedData, handleRequestSort } = useSortableData(data);

  return (
    <MainCard content={true} style={{ width: '100%' }}>
      <Dialog
        // selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        notifi
      >
        <DialogTitle id="alert-dialog-title">You are to delete a record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete this item, note that this action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handlePressAction('DELETE', proneToDelete);
            }}
            variant="contained"
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          {data.length === 0 ? (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 2 }}>
              <h3>No data found</h3>
              <Button onClick={handleRefresh} variant="contained" autoFocus color="primary">
                Refresh
              </Button>
            </Stack>
          ) : (
            <>
              {canSearch && <TextField variant="outlined" fullWidth value={query} onChange={(e) => setQuery(e.target.value)} />}
              <Table aria-labelledby="tableTitle">
                <OrderTableHead
                  headCells={headCells}
                  hasAction={hasAction}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  {sortedData.map((row, index) => (
                    <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
                      {Object.entries(row).map(([key, value]) => (
                        <TableCell key={key}>{key === 'status' ? <OrderStatus status={value} /> : value}</TableCell>
                      ))}
                      {hasAction && (
                        <TableCell>
                          <Stack direction={'row'} gap={'10px'}>
                            {canView && (
                              <IconButton color="success" size="small" onClick={() => handlePressAction('VIEW', row)}>
                                <EyeOutlined style={{ fontSize: '1.15rem' }} />
                              </IconButton>
                            )}

                            {canEdit && (
                              <IconButton color="warning" size="small" onClick={() => handlePressAction('EDIT', row)}>
                                <EditOutlined style={{ fontSize: '1.15rem' }} />
                              </IconButton>
                            )}

                            {canDelete && (
                              <IconButton
                                color="error"
                                size="small"
                                onClick={() => {
                                  setProneToDelete(row);
                                  handleClickOpen();
                                }}
                              >
                                <DeleteOutlined style={{ fontSize: '1.15rem' }} />
                              </IconButton>
                            )}
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
      </Box>
    </MainCard>
  );
}

OrderTable.propTypes = {
  OrderTable: PropTypes.arrayOf(PropTypes.any),
  data: PropTypes.arrayOf(PropTypes.any),
  hasAction: PropTypes.bool,
  canView: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  onPressAction: PropTypes.func,
  handleRefresh: PropTypes.func
};

OrderTableHead.propTypes = { headCells: PropTypes.arrayOf(PropTypes.any), hasAction: PropTypes.bool };

OrderStatus.propTypes = { status: PropTypes.number };
