import React, { useState, useContext } from 'react'
import { TextField, Button, Card, CardHeader, CardContent, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import clientApi from '../../api/client';
import Cookies from 'js-cookie';

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
  },
  submitBtn: {
    marginTop: '20px',
    flexGrow: 1,
    textTransform: 'none'
  },
  header: {
    textAlign: 'center'
  },
  card: {
    padding: '20px',
  },
  form: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
};

const EditAccount = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({
    password: '',
    email: '',
  });

  const onSubmit = async (data) => {
    const confirmResult = window.confirm('アカウントを更新してよろしいですか？');

    if (confirmResult) {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        const requestData = {
          email: data.email,
          current_password: data.currentPassword,
          password: data.password,
          password_confirmation: data.confirmPassword,
        };

        await clientApi.put(`/users/account`, requestData, {
          headers: headers,
        });

        alert('アカウントを更新しましたので、再度ログインをお願いいたします。')
        navigate('/signin_form');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors

          setErrorMessages({
            password: apiErrors.find((e) => e.includes('パスワード')) || '',
            email: apiErrors.find((e) => e.includes('メールアドレス')) || '',
          })
        }

        console.error('API レスポンスの取得に失敗しました', error);
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={styles.card}>
          <CardHeader style={styles.header} title='アカウント編集' />
          <CardContent>
            <Controller
              name='email'
              control={control}
              defaultValue={currentUser.email}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='メールアドレス'
                  variant='outlined'
                  fullWidth
                  helperText={<span style={styles.errorText}>{errorMessages.email}</span>}
                />
              )}
            />
            <div style={styles.form}>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="現在のパスワード"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </div>
            <div style={styles.form}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="新しいパスワード"
                    variant="outlined"
                    fullWidth
                    helperText={<span style={styles.errorText}>{errorMessages.password}</span>}
                  />
                )}
              />
            </div>
            <div style={styles.form}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="新しいパスワード（確認用）"
                    variant="outlined"
                    fullWidth
                    helperText={<span style={styles.errorText}>{errorMessages.password}</span>}
                  />
                )}
              />
            </div>
            <div style={styles.form}>
              <Button variant="contained" color="primary" component={Link} to={'/my_page'}>
                戻る
              </Button>
              <Button type="submit" variant="contained" color="primary">
                変更する
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default EditAccount
