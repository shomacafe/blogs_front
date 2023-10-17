import React from 'react'
import { Typography } from '@mui/material';

const styles = {
  footer: {
    backgroundColor: '#20b2aa',
    padding: '10px 16px',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '10px'
  },
  footerImage: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerImageItem: {
    maxWidth: '210px',
    margin: '10px',
  },
}

const Footer = () => {

  return (
    <footer style={styles.footer}>
      <Typography variant='body2' style={styles.footerText}>
        &copy; {new Date().getFullYear()} Blog app
      </Typography>
    </footer>
  )
}

export default Footer
