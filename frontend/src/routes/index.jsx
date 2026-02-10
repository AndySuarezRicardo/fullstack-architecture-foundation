import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import NotFound from '../components/common/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      {/* Add more routes here as modules grow */}
    </Routes>
  );
};

export default AppRoutes;
