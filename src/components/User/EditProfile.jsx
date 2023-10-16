import React, { useState, useContext, useEffect } from 'react'
import { TextField, Button, Card, CardHeader, CardContent, Avatar, CircularProgress } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import clientApi from '../../api/client'
import Cookies from 'js-cookie'

const styles = {
  container: {
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    // [theme.breakpoints.down('xs')]: {
    //   padding: '0',
    // },
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
    padding: '20px',
    // [theme.breakpoints.down('xs')]: {
    //   padding: 0,
    // }
  },
  form: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: '120px',
    height: '120px',
    marginBottom: '1rem'
  },
  avatarButton: {
    margin: '1rem',
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

const EditProfile = () => {
  const { handleSubmit, control, setValue } = useForm();
  const { currentUser, loading } = useContext(AuthContext);
  const [avatarPreview, setAvatarPreview] = useState()
  const [userImage, setUserImage] = useState();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    profile: '',
  });

  useEffect(() => {
    if (currentUser && currentUser.image && currentUser.image.url) {
      setAvatarPreview(currentUser.image.url);
    } else {
      setAvatarPreview('/default_user_icon.png');
    }
  }, [currentUser]);

  const onSubmit = async (data) => {
    const confirmResult = window.confirm('プロフィールを更新してよろしいですか？');

    if (confirmResult) {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        const requestData = new FormData();
        requestData.append('user[name]', data.name);
        requestData.append('user[profile]', data.profile);

        if (userImage) {
          requestData.append('user[image]', userImage);
        }

        const response = await clientApi.put(`/users/profile`, requestData, {
          headers: headers,
        });

        console.log('API レスポンス', response.data)
        navigate('/my_page');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors
          console.log('error.response.data.errors', error.response.data.errors)

          setErrorMessages({
            name: apiErrors.find((e) => e.includes('名前')) || '',
            profile: apiErrors.find((e) => e.includes('プロフィール')) || '',
          })
        }

        console.log(errorMessages)
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


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      setValue('avatar', file)
      setUserImage(file);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={styles.card}>
          <CardHeader style={styles.header} title='プロフィール編集' />
          <CardContent>
            <div style={styles.avatarContainer}>
              <Avatar style={styles.avatar} alt='ユーザーアイコン' src={avatarPreview} />
              <input
                accept='image/*'
                id='avatarInput'
                type='file'
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor='avatarInput'>
                <Button
                  style={styles.avatarButton}
                  variant='contained'
                  color='primary'
                  component='span'
                >
                  画像を選択
                </Button>
              </label>
            </div>
            <Controller
              name='name'
              control={control}
              defaultValue={currentUser.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='名前'
                  variant='outlined'
                  fullWidth
                  helperText={<span style={styles.errorText}>{errorMessages.name}</span>}
                />
              )}
            />
            <div style={styles.form}>
              <Controller
                name="profile"
                control={control}
                defaultValue={currentUser.profile}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='プロフィール'
                    fullWidth
                    margin="normal"
                    minRows={4}
                    multiline
                    variant="outlined"
                    helperText={<span style={styles.errorText}>{errorMessages.profile}</span>}
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

export default EditProfile
