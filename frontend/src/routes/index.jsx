import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import UsersPage from '../features/users/UsersPage';
import NotFound from '../components/common/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
