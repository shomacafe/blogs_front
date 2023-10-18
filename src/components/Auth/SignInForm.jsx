import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TextField, Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material';
import { signIn } from '../../api/auth';
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


const SignInForm = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true)

    const params = {
      email: email,
      password: password
    }

    try {
      const response = await signIn(params);

      if (response.status === 200) {
        Cookies.set("_access_token", response.headers["access-token"]);
        Cookies.set("_client", response.headers["client"]);
        Cookies.set("_uid", response.headers["uid"]);
        Cookies.set("_expiry", response.headers["expiry"]);
        Cookies.set("_token-type", response.headers["token-type"]);

        setIsSignedIn(true);
        setCurrentUser(response.data.data);

        navigate('/');
        alert('ログインしました。');
      } else {
        alert('ログイン失敗しました。')
      }
    } catch (error) {
      setErrorMessages(error.response.data.errors && error.response.data.errors[0])
    }
  };

  return (
    <div style={styles.container}>
      <form noValidate autoComplete='off'>
        <Card style={styles.card}>
          <CardHeader style={styles.header} title='ログイン' />
          <CardContent>
            {isFormSubmitted && <span style={styles.errorText}>{errorMessages}</span>}
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
              helperText={isFormSubmitted && password === '' ? <span style={styles.errorText}>パスワードを入力してください。</span> : ''}
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              fullWidth
              dasabled={!email || !password ? true : false}
              style={styles.submitBtn}
              onClick={handleSignIn}
            >
              ログイン
            </Button>
            <Box textAlign='center' style={styles.box}>
              <Typography valiant='body2'>
                新規登録ページは<Link to='/signup_form' style={styles.link}>こちら</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default SignInForm
