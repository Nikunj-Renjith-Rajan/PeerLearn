import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/app/pages/HomePage';
import { ClassDetail } from '@/app/pages/ClassDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/class/:id" element={<ClassDetail />} />
      </Routes>
    </Router>
  );
}
