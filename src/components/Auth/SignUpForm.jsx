import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { TextField, Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material';
import { signUp } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthContext';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    marginTop: '2rem',
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: '2rem',
    maxWidth: 400
  },
  errorText: {
    color: 'red',
  },
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true)

    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    try {
      const response = await signUp(params);

      if (response.status === 200) {
        Cookies.set("_access_token", response.headers["access-token"]);
        Cookies.set("_client", response.headers["client"]);
        Cookies.set("_uid", response.headers["uid"]);
        Cookies.set("_expiry", response.headers["expiry"]);
        Cookies.set("_token-type", response.headers["token-type"]);

        setIsSignedIn(true);
        setCurrentUser(response.data.data);

        navigate('/');
        alert('新規登録しました');
      } else {
        alert('新規登録できませんでした')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors
        console.log(apiErrors)

        setErrorMessages({
          name: apiErrors.name ?　apiErrors.name[0] : '',
          password: apiErrors.password ? apiErrors.password.find((e) => e.includes('パスワード')) || '' : '',
          passwordConfirmation: apiErrors.passwordConfirmation ? apiErrors.passwordConfirmation.find((e) => e.includes('確認用パスワード')) || '' : '',
        })
      }
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form noValidate autoComplete='off'>
        <Card className={styles.card}>
          <CardHeader className={styles.header} title='新規登録' />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
              helperText={
                ((isFormSubmitted && name === '') && <span className={styles.errorText}>名前を入力してください。</span>) ||
                <span className={styles.errorText}>{errorMessages.name}</span>
              }
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='メールアドレス'
              value={email}
              margin='dense'
              onChange={(e) => setEmail(e.target.value)}
              helperText={isFormSubmitted && email === '' ? <span className={styles.errorText}>メールアドレスを入力してください。</span> : ''}
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='パスワード'
              type='password'
              value={password}
              margin='dense'
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                (isFormSubmitted && password === '' && <span className={styles.errorText}>パスワードを入力してください。</span>) ||
                <span className={styles.errorText}>{errorMessages.password}</span>
              }
            />
            <TextField
              variant='outlined'
              required
              fullWidth
              label='パスワード確認'
              type='password'
              value={passwordConfirmation}
              margin='dense'
              autoComplete='current-password'
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              helperText={
                ((isFormSubmitted && passwordConfirmation ) === '' && <span className={styles.errorText}>パスワード確認を入力してください。</span>) ||
                isFormSubmitted && <span className={styles.errorText}>{errorMessages.passwordConfirmation}</span>
              }
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              dasabled={!name || !email || !password || !passwordConfirmation ? true : false}
              className={styles.submitBtn}
              onClick={handleSignUp}
            >
              登録
            </Button>
            <Box textAlign='center' className={styles.box}>
              <Typography valiant='body2'>
                ログインは<Link to='/signin_form' className={styles.link}>こちら</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default SignUpForm
