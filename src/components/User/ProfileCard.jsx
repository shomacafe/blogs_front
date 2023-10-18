import { Avatar, Card } from '@mui/material'
import React from 'react'

const styles = {
  avatar: {
    width: '80px',
    height: '80px',
    marginBottom: '1rem'
  },
  profileCard: {
    padding: '20px',
  },
  authorContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  authorContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  }
}

const ProfileCard = ({ author }) => {

  return (
    <Card style={styles.profileCard}>
      <div style={styles.authorContainer}>
        <div style={styles.authorContent}>
          <h3>投稿者のプロフィール</h3>
          {author.image ? (
            <Avatar style={styles.avatar} alt='ユーザーアイコン' src={author.image.url} />
          ) : (
            <img src="/default_user_icon.png" alt="Default User Icon" style={{ width: '100px' }} />
          )}
          <div>{author.name}</div>
        </div>
      </div>
      <div>{author.profile}</div>
    </Card>
  )
}

export default ProfileCard
