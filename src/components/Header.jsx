import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { AppBar, Button, Menu, MenuItem, Avatar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from '../api/auth';

const styles = {
  iconButton: {
    marginRight: '2rem',
  },
  appBar: {
    padding: '10px 30px',
    minHeight: '80px',
  },
  headerImageArea: {
    margin: 'auto',
  },
  headerImage: {
    maxWidth: '200px',
    height: '50px',
  },
  avatar: {
    marginLeft: '10px',
    cursor: 'pointer',
  },
  linkBtn: {
    textTransform: "none"
  },
  menuLinks: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: '2rem',
      textDecoration: 'none',
      color: 'inherit',
    }
  },
  signOutHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  singInHeader: {
    display: 'flex',
  },
  signInUserInfo: {
    position: 'absolute',
    top: '12px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  signOutUserInfo: {
    position: 'absolute',
    top: '20px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
  },
}

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  console.log('loading', loading)
  console.log('isSignedIn', isSignedIn)

  const handleSignOut = async () => {
    try {
      const response = await signOut();

      if (response.data.success === true) {
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')
        Cookies.remove('_expiry')
        Cookies.remove('_token-type')
        Cookies.remove('isGuest')

        setIsSignedIn(false);
        navigate('/');

        alert('ログアウトしました。');
      } else {
        alert('ログアウトに失敗しました。');
      }
    } catch (error) {
      console.error('ログアウトエラー:', error.message);
    }
  };

  const AuthButtons = () => {
    if (!loading) {
      if (!isSignedIn) {
        return (
          <>
            <Button
              component={Link}
              to='/signin_form'
              color='inherit'
              style={styles.linkBtn}
            >
              ログイン
            </Button>
            <Button
              component={Link}
              to='/signup_form'
              color="inherit"
              style={styles.linkBtn}
            >
              新規登録
            </Button>
          </>
        )
      }
    }
  };

  return (
    <div>
      <AppBar position="static" style={styles.appBar}>
        <div style={isSignedIn ? styles.singInHeader : styles.signOutHeader}>
          <div style={styles.headerImageArea}>
            <Link to={'/'}>ブログ</Link>
          </div>
          <div style={isSignedIn ? styles.signInUserInfo : styles.signOutUserInfo}>
            <AuthButtons />
            <p style={styles.currentUserName}>{isSignedIn ? currentUser && currentUser.name : '' }</p>
            {isSignedIn &&
              <Avatar
                style={styles.avatar}
                alt='ユーザーアイコン'
                src={'/default_user_icon.png'}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
            }
          </div>
        </div>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        style={{ margin: '40px auto' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        { isSignedIn && (
          <>
            {/* <MenuItem component={Link} to="/account" onClick={() => setAnchorEl(null)}>
              アカウント
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                handleSignOut();
              }}
            >
              ログアウト
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  )
}

export default Header
