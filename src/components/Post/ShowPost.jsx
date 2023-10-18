import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clientApi from '../../api/client';
import { Card, CircularProgress } from '@mui/material';
import CommentSection from '../Comment/CommentSection';
import FavoriteButton from '../Favorite/FavoriteButton';
import ProfileCard from '../User/ProfileCard';
import { useMediaQuery } from 'react-responsive';

const ShowPost = () => {
  const { post_id } = useParams();
  const [postData, setPostData ] = useState();
  const [postLoading, setPostLoading] = useState(true);
  const [commentData, setCommentData] = useState()
  const isTablet = useMediaQuery({ maxWidth: 960 });

  const styles = {
    mainContainer: {
      width: '100%',
      maxWidth: '1200px',
      display: isTablet ? 'block' : 'flex',
      justifyContent: 'center',
    },
    contentContainer: {
      width: '100%',
      heigth: '100%',
      margin:  isTablet ? '0' : '0 20px',
    },
    titleCard: {
      padding: '10px 20px',
      marginBottom: '20px',
    },
    titleCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bodyText: {
      margin: '40px 0',
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
    spinnerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    },
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await clientApi.get(`posts/${post_id}`)

        setPostData(response.data);
        setCommentData(response.data.comments)
      } catch (error) {
        console.error('API レスポンスの取得に失敗しました', error);
      } finally {
        setPostLoading(false);
      }
    };

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
              <div style={styles.titleCardContent}>
                <span>{postData.createdAtFormatted} コメント{postData.comments.length}件</span>
                <FavoriteButton post_id={postData.id} author_id={postData.user.id} />
              </div>
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
            <ProfileCard author={ postData.user } />
          </div>
        </div>
      }
    </>
  )
}

export default ShowPost
