import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clientApi from '../../api/client';
import { AuthContext } from '../../contexts/AuthContext';
import { Card, CircularProgress } from '@mui/material';

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  mainContainer: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    margin: '0 20px',
  },
  titleCard: {
    padding: '20px',
    marginBottom: '20px',
  },
  bodyCard: {
    padding: '20px',
    marginBottom: '20px',
    height: '100%',
  },
  sideBar: {
    maxWidth: '300px',
    width: '100%',
    height: '100px',
    padding: '20px',
  },
}

const ShowPost = () => {
  const { post_id } = useParams();
  const [postData, setPostData ] = useState();
  const {isSignedIn, currentUser, loading} = useContext(AuthContext);
  const [postLoading, setPostLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const response = await clientApi.get(`posts/${post_id}`)

      setPostData(response.data);
      console.log('postdata', response.data)

    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [post_id])

  if (loading) {
    return (
      <div style={ styles.spinnerContainer}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      {postData &&
        <div style={styles.mainContainer}>
          <div style={styles.contentContainer}>
            <Card style={styles.titleCard}>
              <h2>{postData.title}</h2>
            </Card>
            <Card style={styles.bodyCard}>
              <div>{postData.body}</div>
            </Card>
          </div>
          <Card style={styles.sideBar}>
            プロフィールが入ります。
          </Card>
        </div>
      }
    </>
  )
}

export default ShowPost
