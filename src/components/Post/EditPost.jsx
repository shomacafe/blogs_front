import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button,Card, CardHeader } from '@mui/material';
import clientApi from '../../api/client';
import Cookies from 'js-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const EditPost = () => {
  const { post_id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [apiErrors, setApiErrors] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
      margin: 'auto',
    },
    header: {
      textAlign: "center"
    },
    card: {
      padding: isMobile ? '5px' : '30px',
    },
    editButtons: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    imageButton: {
      margin: '10px 0',
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await clientApi.get(`/posts/${post_id}`);
        const postData = response.data;

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
    const confirmResult = window.confirm('記事を更新してよろしいですか？');

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

        await clientApi.put(`/posts/${post_id}`, requestData, {
          headers: headers,
        });

        navigate('/posts/my_posts');
      } catch (error) {
        if (error.response && error.response.data) {
          setApiErrors(error.response.data);
        } else {
          console.error(error);
        }
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
            helperText={
              <div style={styles.errorText}>
                {errors.title?.message || (apiErrors && apiErrors.title)}
              </div>
            }
            fullWidth
            margin="dense"
          />
          <TextField
            multiline
            rows={25}
            {...register('body', { required: '本文を入力してください。' })}
            error={!!errors.body}
            helperText={
              <div style={styles.errorText}>
                {errors.body?.message || (apiErrors && apiErrors.body)}
              </div>
            }
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
              style={styles.imageButton}
            >
              サムネイル画像を選択
            </Button>
          </label>
          <div>
            {thumbnailPreview && <img alt='サムネイルプレビュー' src={thumbnailPreview} width='300px' />}
          </div>
          <div style={styles.editButtons}>
            <Button
              variant="contained"
              color="inherit"
              size='large'
              component={Link}
              to={'/posts/my_posts'}
            >
              戻る
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
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
