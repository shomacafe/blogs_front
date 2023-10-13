import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box, Card } from '@mui/material';
import clientApi from '../../api/client';
import { Link, useParams } from 'react-router-dom';

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
    minHeight: '100vh',
  },
  contentContainer: {
    width: '100%',
    padding: '20px',
    margin: '0 20px',
  },
  sideBar: {
    maxWidth: '300px',
    width: '100%',
  },
}

const PostByUser = () => {
  const { blog_id } = useParams();
  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await clientApi.get('posts/index_by_user', {
        params: {
          user_id: blog_id,
        },
      });

      console.log('params', blog_id)

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
      <div style={styles.mainContainer}>
        <Card style={styles.contentContainer}>
          <h2>ブログ記事一覧</h2>
          {postData.map((post) => (
            <div key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <Box mb={2}>
                  <Typography variant="h4">{post.title}</Typography>
                  <Typography>{post.createdAtFormatted}</Typography>
                  {post.image.url && (
                    <img src={post.image.url} style={{ width: '200px' }} alt="post thumbnail" />
                  )}
                  <Typography>
                  {post.body.length > 50 ? `${post.body.slice(0, 50)}...` : post.body}
                  </Typography>
                </Box>
              </Link>
            </div>
          ))}
        </Card>
        <div style={styles.sideBar}>
            <Card>
              プロフィールが入ります。
            </Card>
          </div>
      </div>
    </>
  )
}

export default PostByUser
