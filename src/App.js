import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserDataProvider } from "./contexts/UserDataContext";
import Header from "./components/Header";
import Content from "./pages/Content";
import Footer from "./components/Footer";

const styles = {
  root: {
    backgroundColor: '#f7f7f7',
    minHeight: '100vh'
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px 10px',
  },
};


function App() {

  return (
    <div style={styles.root}>
      <AuthProvider>
        <UserDataProvider>
          <CssBaseline />
          <BrowserRouter>
            <Header />
            <div style={styles.mainContainer}>
              <Content />
            </div>
            <Footer />
          </BrowserRouter>
        </UserDataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
