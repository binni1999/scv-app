
import { ToastContainer } from 'react-toastify';
import './App.css';
import AllRoutes from './components/AllRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import UserNavbar from './screen/UserNavbar';
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux';
import Sidebar from './screen/Sidebar';
import { useState } from 'react';

function App() {
  const { userInfo } = useSelector(state => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };


  return (
    <div className="App dark:bg-dark">
      {userInfo ? <UserNavbar toggleSidebar={toggleSidebar} /> : <Header />}
      <AllRoutes />
      {userInfo && <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <Footer />
      <ToastContainer autoClose={3000} position='top-right' />
    </div>
  );
}

export default App;
