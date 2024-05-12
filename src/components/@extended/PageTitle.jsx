import React from 'react'
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';


const PageTitle = ({title, buttonLabel, onPressButton, hasButton=true}) => {
  return (
          <Grid container direction="row" sx={{ mb: 2, ml: "5px" }} justifyContent="space-between" alignItems="center" spacing={1}>
              <Grid sx={{ mt: 2 }}>
                <Typography variant="h4">{title}</Typography>
              </Grid>
              { hasButton &&
              <Button variant='contained' onClick={onPressButton}>{buttonLabel ?? "Add New"}</Button> }
          </Grid>
  )
}

export default PageTitle

PageTitle.propTypes = {
    title: PropTypes.string,
    hasButton: PropTypes.bool,
    buttonLabel: PropTypes.string,
    onPressButton: PropTypes.func
}