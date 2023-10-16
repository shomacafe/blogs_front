import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box, Card } from '@mui/material';
import clientApi from '../../api/client';
import { Link, useParams } from 'react-router-dom';
import ProfileCard from '../User/ProfileCard';

const styles = {
  container: {
    width: '100%',
    maxWidth: '1300px',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
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
      <div style={styles.container}>
        <div style={styles.mainContainer}>
          <div>
            {postData.map((post) => (
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
            ))}
          </div>
          <div style={styles.sideBar}>
            <ProfileCard author={ postData[0].user } />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostByUser
