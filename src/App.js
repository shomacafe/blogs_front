import { Grid, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserDataProvider } from "./contexts/UserDataContext";
import Header from "./components/Header";
import Content from "./pages/Content";

const styles = {
  root: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  mainContainer: {
    flex: '1',
    justifyContent: 'center',
    padding: '20px 10px',
  },
};


function App() {

  return (
    <Grid container direction='column' style={styles.root}>
      <AuthProvider>
        <UserDataProvider>
          <CssBaseline />
          <BrowserRouter>
            <Header />
            <Grid container style={styles.mainContainer}>
              <Content />
            </Grid>
            {/* <Footer /> */}
          </BrowserRouter>
        </UserDataProvider>
      </AuthProvider>
    </Grid>
  );
}

export default App;
