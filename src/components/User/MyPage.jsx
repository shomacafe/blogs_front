import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import {Typography, CircularProgress, Button, Card, CardContent, CardHeader, Avatar } from '@mui/material'

const styles = {
  container: {
    margin: 'auto',
    maxWidth: 800,
    width: '100%',
  },
  accountCard: {
    padding: '20px',
  },
  submitBtn: {
    marginTop: '2rem',
    flexGrow: 1,
    textTransform: 'none'
  },
  link: {
    textDecoration: 'none'
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottom: `1px solid `,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
    marginRight: '2rem',
  },
  value: {
    flex: 2,
  },
  avatar: {
    width: '120px',
    height: '120px',
    marginBottom: '1rem'
  },
  headline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3rem'
  },
};

const MyPage = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div style={styles.container}>
      <Card style={styles.accountCard}>
        <CardHeader style={styles.cardHeader} title="アカウント" />
        <CardContent>
          <div>
            <div style={styles.headline}>
              <h2>プロフィール</h2>
              <Button
                variant='contained'
                size='large'
                color='primary'
                component={Link}
                to={'/profile/edit'}
              >
                変更
              </Button>
            </div>
            <div style={styles.infoRow}>
              <Typography style={styles.label}>アイコン</Typography>
              <Typography style={styles.value}>
                {currentUser.image ? (
                  <Avatar style={styles.avatar} alt='ユーザーアイコン' src={currentUser.image.url} />
                ) : (
                  <img src="/default_user_icon.png" alt="Default User Icon" style={{ width: '100px' }} />
                )}
              </Typography>
            </div>
            <div style={styles.infoRow}>
              <Typography style={styles.label}>名前</Typography>
              <Typography style={styles.value}>{currentUser.name}</Typography>
            </div>
            <div style={styles.infoRow}>
              <Typography style={styles.label}>自己紹介</Typography>
              <Typography style={styles.value}>{currentUser.profile !== null ? currentUser.profile : ''}</Typography>
            </div>
            <div style={styles.headline}>
              <h2>アカウント</h2>
              <Button
                variant='contained'
                size='large'
                color='primary'
                component={Link}
                to={`/account/edit`}
              >
                変更
              </Button>
            </div>
            <div style={styles.infoRow}>
              <Typography style={styles.label}>メールアドレス</Typography>
              <Typography style={styles.value}>{currentUser.email}</Typography>
            </div>
            <div style={styles.infoRow}>
              <Typography style={styles.label}>パスワード</Typography>
              <Typography style={styles.value}>**********</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyPage
