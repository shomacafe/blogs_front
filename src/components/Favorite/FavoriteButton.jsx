import React, { useContext, useEffect, useState } from 'react'
import clientApi from '../../api/client';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import { AuthContext } from '../../contexts/AuthContext';

const FavoriteButton = ({ post_id, author_id }) => {
  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, isSignedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        const user_id = currentUser.id;
        const response = await clientApi.get(`/posts/${post_id}/favorite_status?user_id=${user_id}`, {
          headers: headers
        })

        setFavorite(response.data.isFavorite);
        console.log('favorite', favorite);

      }  catch (error) {
        console.error('お気に入り状態の取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteStatus();
  }, [post_id, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFavorite = async () => {
    try {
      const headers = {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      };

      const requestData = {
        post_id: post_id
      }

      console.log('Request Data:', requestData);

      if (favorite) {
        await clientApi.delete(`/posts/${post_id}/unfavorite`, {
          headers: headers
        });
      } else {
        await clientApi.post(`/posts/${post_id}/favorite`, requestData, {
          headers: headers
        });
      }

      setFavorite(prevFavorite => !prevFavorite);
    } catch (error) {
      console.error('お気に入りの操作に失敗しました', error);
    }
  }

  return (
    <Button
      onClick={() => handleFavorite()}
      variant='contained'
      color='success'
      disabled={(!isSignedIn) || (currentUser && currentUser.id === author_id)}
    >
      {favorite ? 'お気に入りを解除する' : 'お気に入り登録する'}
    </Button>
  )
}

export default FavoriteButton
