import PropTypes from 'prop-types';
import React, { startTransition } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import api from 'api';
import Snackbar from 'components/Snackbar';
import { useAuth } from 'hooks/use-auth';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthResetPassword() {
  const [error, setError] = React.useState('');

  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = React.useState({
    o: false,
    n: false,
    c: false
  });

  const handleClickShowPassword = (state, value) => {
    const stateMapping = {
      OLD: 'o',
      NEW: 'n',
      CONFIRM: 'c'
    };

    const key = stateMapping[state];
    if (key) {
      setShowPassword((prevState) => ({
        ...prevState,
        [key]: value
      }));
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const auth = useAuth();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const formik = useFormik({
    initialValues: {
      opassword: '',
      password: '',
      cpassword: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      opassword: Yup.string().max(255).required('Old password is required'),
      password: Yup.string().max(255).required('New password is required'),
      cpassword: Yup.string()
        .max(255)
        .required('Confirm new password')
        .oneOf([Yup.ref('password')], 'Your passwords should match')
    }),
    onSubmit: (values) => {
      api.auth
        .updatePassword({ id: searchParams.get('id'), currentPassword: values.opassword, newPassword: values.password })
        .then(() => {
          window.location.replace(`/free/login`);
        })
        .catch((error) => {
          setError(error.response.data.error);
          formik.setSubmitting(false);
        });
    }
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      {error && <Snackbar message={error} severity="error" handleClose={() => setError('')} />}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Old Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(formik.touched.opassword && formik.errors.opassword)}
              id="n-password-reset"
              type={showPassword.o ? 'text' : 'password'}
              value={formik.values.opassword}
              name="opassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('OLD', showPassword.o === true ? false : true)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword.o ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter old password"
            />
          </Stack>
          {formik.touched.opassword && formik.errors.opassword && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.opassword}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              id="n-password-reset"
              type={showPassword.n ? 'text' : 'password'}
              value={formik.values.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('NEW', showPassword.n === true ? false : true)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword.n ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
          </Stack>
          {formik.touched.password && formik.errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.password}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Confirm Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(formik.touched.cpassword && formik.errors.cpassword)}
              id="c-password-reset"
              type={showPassword.c ? 'text' : 'password'}
              value={formik.values.cpassword}
              name="cpassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('CONFIRM', !showPassword.c)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword.c ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Confirm password"
            />
          </Stack>
          {formik.touched.cpassword && formik.errors.cpassword && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {formik.errors.cpassword}
            </FormHelperText>
          )}
        </Grid>

        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}

        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Reset Password
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}

AuthResetPassword.propTypes = { isDemo: PropTypes.bool };
