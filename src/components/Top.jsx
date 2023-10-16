import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clientApi from '../api/client';
import { Box, Card, Typography } from '@mui/material';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  blogContainer: {
    flexDirection: 'column'
  },
  blogCard: {
    maxWidth: '1200px',
    width: '100%',
    padding: '20px',
    margin: '20px',
  },
  blogLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  latestPost: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
}

const Top = () => {
  const [blogData, setBlogData] = useState();

  const fetchBlog = async () => {
    try {
      const response = await clientApi.get(`/posts/blogs`);
      const postData = response.data;

      setBlogData(postData);
    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [])

  return (
    <>
      <div style={styles.container}>
        <h2>ブログ一覧</h2>
        {blogData ? (
          blogData.map((blog) => (
            <Card style={styles.blogCard} key={blog.id}>
              <Link to={`/posts/blogs/${blog.id}`} style={styles.blogLink}>
                <Typography variant="h4">{blog.name}さんのブログ</Typography>
                <h3>最新投稿</h3>
                <div style={styles.latestPost}>
                  {blog.posts[0] && blog.posts.slice().reverse()[0].image.url ? (
                    <img src={blog.posts.slice().reverse()[0].image.url} style={{ width: '300px' }} alt="post thumbnail" />
                  ) : (
                    <img src='/default_post_image.png' style={{ width: '300px' }} alt="post thumbnail" />
                  )}
                  <h2>{blog.posts[0] && blog.posts.slice().reverse()[0].title}</h2>
                </div>
              </Link>
            </Card>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  )
}

export default Top
