import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import clientApi from '../../api/client';
import { Avatar, Button, Card, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { AuthContext } from '../../contexts/AuthContext';
import { useMediaQuery } from 'react-responsive';

const CommentSection = ({ post_id, commentData, setCommentData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { currentUser, isSignedIn } = useContext(AuthContext);
  const [editedComments, setEditedComments] = useState({});
  const [apiErrors, setApiErrors] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  const styles = {
    card: {
      padding: '20px',
    },
    commentContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '15px',
    },
    commentHead: {
      display: 'flex',
      gap: isMobile ? '5px' : '20px',
      alignItems: 'center',
      marginBottom: isMobile ? '9px' : '0'
    },
    commentHeadContent: {
      margin: 0,
      fontSize: isMobile ? '12px' : 'inherit',
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
    },
    linkText: {
      cursor: 'pointer',
      color: 'gray',
      fontSize: isMobile ? '8px' : 'inherit',
    },
    avatar: {
      width: '50px',
      height: '50px',
    },
    errorText: {
      color: 'red',
    }
  }

  const onSubmit = async (data) => {
    try {
      const headers = {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      };

      const requestData = {
        ...data,
        post_id: post_id
      }

      const response = await clientApi.post(`/posts/${post_id}/comments`, requestData, {
        headers: headers
      });

      const newComment = response.data;

      setCommentData((prevCommentData) => [...prevCommentData, newComment]);

      reset();
    } catch (error) {
      if (error.response && error.response.data) {
        setApiErrors(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleEdit = (commentId) => {
    const editedComment = commentData.find((comment) => comment.id === commentId).body;
    setEditedComments((prevEditedComments) => ({
      ...prevEditedComments,
      [commentId]: editedComment,
    }));
  };

  const handleInputChange = (e, commentId) => {
    setEditedComments((prevEditedComments) => ({
      ...prevEditedComments,
      [commentId]: e.target.value,
    }));
  };

  const handleUpdate = async (commentId) => {
    try {
      const headers = {
        'access-token': Cookies.get('_access_token'),
        'client': Cookies.get('_client'),
        'uid': Cookies.get('_uid'),
      };

      await clientApi.put(`/posts/${post_id}/comments/${commentId}`, {
        body: editedComments[commentId],
      }, {
        headers: headers,
      });

      const updatedComments = commentData.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            body: editedComments[commentId],
          };
        }
        return comment;
      });

      setCommentData(updatedComments);
      setEditedComments((prevEditedComments) => ({
        ...prevEditedComments,
        [commentId]: false,
      }));
    } catch (error) {
      if (error.response && error.response.data) {
        setApiErrors(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleDelete = async (commentId) => {
    const confirmResult = window.confirm('コメントを削除してよろしいですか？');

    if (confirmResult) {
      try {
        const headers = {
          'access-token': Cookies.get('_access_token'),
          'client': Cookies.get('_client'),
          'uid': Cookies.get('_uid'),
        };

        await clientApi.delete(`/posts/${post_id}/comments/${commentId}`, {
          headers: headers
        });

        setCommentData((prevCommentData) => prevCommentData.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('コメントの削除に失敗しました', error);
      }
    }
  };

  return (
    <div>
      <h3>コメント</h3>
      <Card style={styles.card}>
        {commentData.map((comment) => (
          <div key={comment.id}>
            {editedComments[comment.id] ? (
              <>
                <TextField
                  multiline
                  rows={3}
                  value={editedComments[comment.id]}
                  onChange={(e) => handleInputChange(e, comment.id)}
                  fullWidth
                  margin='dense'
                />
                <Button onClick={() => handleUpdate(comment.id)} variant="contained" color="primary">
                  更新
                </Button>
              </>
            ) : (
              <>
                <div style={styles.commentContainer}>
                  <div>
                    {comment.user.image ? (
                      <Avatar style={styles.avatar} alt='ユーザーアイコン' src={comment.user.image.url} />
                    ) : (
                      <img src="/default_user_icon.png" alt="Default User Icon" style={{ width: '100px' }} />
                    )}
                  </div>
                  <div>
                    <div style={styles.commentHead}>
                      <h4 style={styles.commentHeadContent}>{comment.user.name}</h4>
                      <p style={styles.commentHeadContent}>{comment.updatedAtFormatted}</p>
                      {comment.user && currentUser && comment.user.id === currentUser.id && (
                        <div style={styles.buttonContainer}>
                          <div onClick={() => handleEdit(comment.id)} style={styles.linkText}>編集</div>
                          <div onClick={() => handleDelete(comment.id)} style={styles.linkText}>削除</div>
                        </div>
                      )}
                    </div>
                    <div style={styles.bodyText}>
                      {comment.body.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

              </>
            )}
          </div>
        ))}

        {isSignedIn ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              multiline
              rows={isMobile ? '2' : '3'}
              {...register('body', { required: 'コメントを入力してください。' })}
              error={!!errors.body}
              placeholder='コメントする'
              fullWidth
              margin='dense'
              helperText={
                <div style={styles.errorText}>
                  {errors.body?.message || (apiErrors && apiErrors.body)}
                </div>
              }
            />
            <div>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                style={{ marginTop: '1rem' }}
              >
                コメント
              </Button>
            </div>
          </form>
        ) : (
          <h3 style={{textAlign: 'center'}}>ログインすればコメントできます。</h3>
        )}
      </Card>
    </div>
  )
}

export default CommentSection
