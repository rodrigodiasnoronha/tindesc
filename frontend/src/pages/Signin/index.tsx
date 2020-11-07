import React, { useRef, useCallback, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Copyright from '../../components/Copyright'
import { useAuth } from '../../hooks/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório')
})

interface FormSubmitData {
  email: string
  password: string
}

const Signin: React.FC = () => {
  const { login } = useAuth()
  const classes = useStyles()

  const email = useRef(null)
  const password = useRef(null)

  const [error, setError] = useState<boolean>(false)

  const handleLogin = useCallback(
    async ({ email, password }: FormSubmitData) => {
      try {
        await login({ email, password })
      } catch (err) {
        setError(true)

        setTimeout(() => {
          setError(false)
        }, 10000)
      }
    },
    [login]
  )

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" children="Tindesc - Entrar" />
          {error && (
            <Typography
              component="h4"
              variant="h5"
              children="Ocorreu um erro ao fazer login"
              style={{ color: '#e02' }}
            />
          )}

          <Formik
            onSubmit={handleLogin}
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
          >
            {(props) => (
              <form className={classes.form} onSubmit={props.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!props.errors.email}
                  value={props.values.email}
                  onChange={props.handleChange('email')}
                  onBlur={props.handleBlur}
                  ref={email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!props.errors.password}
                  value={props.values.password}
                  onChange={props.handleChange('password')}
                  onBlur={props.handleBlur}
                  ref={password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se lembrar"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  children="ENTRAR"
                  className={classes.submit}
                  disabled={props.isSubmitting}
                />
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      children="Esqueceu a senha?"
                    />
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      children="Não tem uma conta? Cadastre-se"
                    />
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  )
}

export default Signin

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
