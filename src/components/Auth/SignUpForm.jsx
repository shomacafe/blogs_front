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
    textTransform: "none",
  },
  header: {
    textAlign: "center",
  },
  card: {
    maxWidth: '600px',
  },
  box: {
    marginTop: "2rem",
  },
  link: {
    textDecoration: "none",
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
  const [errorMessages, setErrorMessages] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

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
        alert('新規登録できませんでした');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        const fullMessages = apiErrors.fullMessages;

        setErrorMessages(fullMessages)
      }
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <form noValidate autoComplete='off'>
        <Card style={styles.card}>
          <CardHeader style={styles.header} title='新規登録' />
          {errorMessages.map((message, index) => (
            <div key={index} style={styles.errorText}>
              {message}
            </div>
          ))}
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
                ((isFormSubmitted && name === '') && <span style={styles.errorText}>名前を入力してください。</span>) ||
                <span style={styles.errorText}>{errorMessages.name}</span>
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
              helperText={isFormSubmitted && email === '' ? <span style={styles.errorText}>メールアドレスを入力してください。</span> : ''}
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
                (isFormSubmitted && password === '' && <span style={styles.errorText}>パスワードを入力してください。</span>) ||
                <span style={styles.errorText}>{errorMessages.password}</span>
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
                ((isFormSubmitted && passwordConfirmation  === '') && <span style={styles.errorText}>パスワード確認を入力してください。</span>) ||
                (isFormSubmitted && <span style={styles.errorText}>{errorMessages.passwordConfirmation}</span>)
              }
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              dasabled={!name || !email || !password || !passwordConfirmation ? true : false}
              style={styles.submitBtn}
              onClick={handleSignUp}
            >
              登録
            </Button>
            <Box textAlign='center' style={styles.box}>
              <Typography valiant='body2'>
                ログインは<Link to='/signin_form' style={styles.link}>こちら</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default SignUpForm
