import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box, Button, Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import clientApi from '../api/client';
import Cookies from 'js-cookie';

const styles = {
  container: {
    width: '100%',
    maxWidth: '1300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
  },
  mainContainer: {
    maxWidth: '1000px',
    width: '100%',
    minHeight: '100vh',
  },
  contentContainer: {

  },
  newButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '20px',
  },
  postCard: {
    width: '100%',
    padding: '20px',
    margin: '0 20px 20px 0',
  },
  postInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  postInfoContent: {
    marginLeft: '20px',
  },
  postBody: {
    marginTop: '20px',
  },
  myPostButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
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

const MyPost = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const headers = {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      };

      const response = await clientApi.get('posts/my_posts', {
        headers: headers
      });

      console.log('レス',response.data);

      setPostData(response.data);
    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleEditClick = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleDeleteClick = async (postId) => {
    const confirmResult = window.confirm('記事を削除してよろしいですか？');

    if (confirmResult) {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        const response = await clientApi.delete(`/posts/${postId}` , {
          headers: headers,
        });

        fetchPosts();

        console.log('API レスポンス', response.data)
      } catch (error) {
        console.error('記事の削除に失敗しました', error);
      }
    }
  }

  if (postLoading) {
    return (
      <div style={ styles.spinnerContainer}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.header}>投稿した記事</h2>
        <div style={styles.mainContainer}>
          <div>
            <div style={styles.newButton}>
              <Button
                variant="contained"
                color="info"
                component={Link}
                to={'/new/post'}
              >
                新規投稿する
              </Button>
            </div>
            {postData.length > 0 ? (
              postData.map((post) => (
                <div key={post.id}>
                  <Card style={styles.postCard}>
                    <Link to={`/posts/${post.id}`} style={styles.postLink}>
                      <div style={styles.postInfo}>
                        <div>
                          {post.image.url ? (
                            <img src={post.image.url} style={{ width: '200px' }} alt="post thumbnail" />
                          ) : (
                            <img src='/default_post_image.png' style={{ width: '200px' }} alt="post thumbnail" />
                          )}
                        </div>
                        <div style={styles.postInfoContent}>
                          <Typography variant="h4">{post.title}</Typography>
                          <Typography>{post.createdAtFormatted} コメント{post.comments.length}件</Typography>
                          <Typography style={styles.postBody}>
                            {post.body.length > 50 ? `${post.body.slice(0, 50)}...` : post.body}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                    <div style={styles.myPostButtons}>
                      <Button variant='outlined' color='primary'onClick={() => handleEditClick(post.id)}>
                        編集
                      </Button>
                      <Button variant='outlined' color='error'onClick={() => handleDeleteClick(post.id)}>
                        削除
                      </Button>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>投稿した記事がありません。</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPost
