import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Library, LibraryArticle } from './pages/Library';
import { Player } from './pages/Player';
import { SharedDna } from './pages/SharedDna';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/play/:moduleId/:chapterId/:screenId" element={<Player />} />
      <Route path="/library" element={<Library />} />
      <Route path="/library/:slug" element={<LibraryArticle />} />
      <Route path="/dna/s/:token" element={<SharedDna />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
