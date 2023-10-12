import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import clientApi from '../api/client';
import Cookies from 'js-cookie';

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }
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
      <h2>自分の投稿一覧</h2>
      {postData.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <Box mb={2}>
              <Typography variant="h4">{post.title}</Typography>
              <Typography>{post.createdAt}</Typography>
              {post.image.url && (
                <img src={post.image.url} style={{ width: '200px' }} alt="post thumbnail" />
              )}
              <Typography>
                {post.body.length > 50 ? `${post.body.slice(0, 50)}...` : post.body}
              </Typography>
            </Box>
          </Link>
          <Button variant='outlined' onClick={() => handleEditClick(post.id)}>
            編集
          </Button>
          <Button variant='outlined' onClick={() => handleDeleteClick(post.id)}>
            削除
          </Button>
        </div>
      ))}
    </>
  )
}

export default MyPost
