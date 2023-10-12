import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Box, Typography, Card, CardHeader, Avatar } from '@mui/material';
import clientApi from '../../api/client';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const styles = {
  container: {
    padding: '2rem',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: '2rem',
  }
}

const EditPost = () => {
  const { post_id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await clientApi.get(`/posts/${post_id}`);
        const postData = response.data;

        console.log(postData.title)

        setValue('title', postData.title);
        setValue('body', postData.body);

        if (postData.image && postData.image.url) {
          setThumbnailPreview(postData.image.url);
        }
      } catch (error) {
        console.error('API レスポンスの取得に失敗しました', error);
      }
    };

    fetchPost();
  }, [post_id, setValue]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setThumbnail(file);
    }
  };

  const onSubmit = async (data) => {
    const confirmResult = window.confirm('記事を登録してよろしいですか？');

    if (confirmResult) {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        const requestData = new FormData();
        requestData.append('post[title]', data.title);
        requestData.append('post[body]', data.body);

        if (thumbnail) {
          requestData.append('post[image]', thumbnail);
        }

        const response = await clientApi.put(`/posts/${post_id}`, requestData, {
          headers: headers,
        });
        console.log('API レスポンス', response.data)
        navigate('/posts/my_posts');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card style={styles.card}>
          <CardHeader style={styles.header} title='記事を編集する' />
          <TextField
            {...register('title', { required: 'タイトルを入力してください。' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
            margin="dense"
          />
          <TextField
            multiline
            rows={25}
            {...register('body', { required: '本文を入力してください。' })}
            error={!!errors.body}
            helperText={errors.body?.message}
            fullWidth
            margin="dense"
          />
          <h4>サムネイル画像</h4>
          <input
            accept='image/*'
            id='thumbnailInput'
            type='file'
            onChange={handleThumbnailChange}
            style={{ display: 'none' }}
          />
          <label htmlFor='thumbnailInput'>
            <Button
              variant='contained'
              color='primary'
              component='span'
            >
              サムネイル画像を選択
            </Button>
          </label>
          <div>
            {thumbnailPreview && <img alt='サムネイルプレビュー' src={thumbnailPreview} width='300px' />}
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              更新する
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditPost;
