import React, { useEffect, useState } from 'react'
import { CircularProgress, Typography, Card } from '@mui/material';
import clientApi from '../../api/client';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMediaQuery } from 'react-responsive';

const PostByUser = () => {
  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1300px',
    },
    header: {
      textAlign: 'center'
    },
    mainContainer: {
      width: '100%',
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center'
    },
    contentContainer: {
      maxWidth: '1000px',
    },
    postCard: {
      padding: '20px',
      margin: isMobile ? '10px 0' : '0 20px 20px 0',
    },
    postInfo: {
      display: isMobile ? 'block' : 'flex',
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

  const fetchPosts = async () => {
    try {
      const headers = {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      };

      const response = await clientApi.get('posts/favorite_posts', {
        headers: headers,
      });

      console.log(response.data);

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
        <h2 style={styles.header}>お気に入り</h2>
        <div style={styles.mainContainer}>
          <div>
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
                </Card>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>お気に入り登録した記事がありません。</p>
          )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostByUser
