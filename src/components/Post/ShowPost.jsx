import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clientApi from '../../api/client';
import { AuthContext } from '../../contexts/AuthContext';
import { Card, CircularProgress } from '@mui/material';
import CommentSection from '../Comment/CommentSection';
import FavoriteButton from '../Favorite/FavoriteButton';

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
    heigth: '100%',
    margin: '0 20px',
  },
  titleCard: {
    padding: '10px 20px',
    marginBottom: '20px',
  },
  bodyText: {
    margin: '40px 0'
  },
  body: {
    marginBottom: '20px',
  },
  bodyCard: {
    padding: '20px',
  },
  sideBar: {
    maxWidth: '300px',
    width: '100%',
  },
}

const ShowPost = () => {
  const { post_id } = useParams();
  const [postData, setPostData ] = useState();
  const {isSignedIn, currentUser, loading} = useContext(AuthContext);
  const [postLoading, setPostLoading] = useState(true);
  const [commentData, setCommentData] = useState()

  const fetchPost = async () => {
    try {
      const response = await clientApi.get(`posts/${post_id}`)

      setPostData(response.data);
      setCommentData(response.data.comments)
      console.log('postdata', response.data)
      console.log('commentdata', response.data.comments)

    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [post_id])

  if (postLoading) {
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
              <span>{postData.createdAtFormatted}</span>
              <FavoriteButton post_id={postData.id} author_id={postData.user.id} />
            </Card>
            <div style={styles.body}>
              <Card style={styles.bodyCard}>
                <div style={styles.image}>
                  {postData.image.url ? (
                    <img src={postData.image.url} style={{ width: '100%' }} alt="post thumbnail" />
                  ) : (
                    <img src='/default_post_image.png' style={{ width: '100%' }} alt="post thumbnail" />
                  )}
                </div>
                <div style={styles.bodyText}>
                  {postData.body.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </Card>
              <CommentSection post_id={postData.id} commentData={commentData} setCommentData={setCommentData} />
            </div>
          </div>
          <div style={styles.sideBar}>
            <Card>
              プロフィールが入ります。
              プロフィールが入ります。
              プロフィールが入ります。
            </Card>
          </div>
        </div>
      }
    </>
  )
}

export default ShowPost
