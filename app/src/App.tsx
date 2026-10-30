import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import { applySettings, useSettings } from './i18n/settings';
import { stopSpeaking } from './i18n/speech';
import { ArcadePage } from './pages/ArcadePage';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Library, LibraryArticle } from './pages/Library';
import { Player } from './pages/Player';
import { SelfCheck } from './pages/SelfCheck';
import { SharedDna } from './pages/SharedDna';

export default function App() {
  const lang = useSettings((s) => s.lang);
  const largeText = useSettings((s) => s.largeText);

  useEffect(() => {
    applySettings({ lang, largeText });
    stopSpeaking();
  }, [lang, largeText]);

  return (
    <>
      {/* Before <Routes> so it subscribes before any screen's onEnter effects run. */}
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/learn" element={<Home />} />
        <Route path="/home" element={<Navigate to="/learn" replace />} />
        <Route path="/arcade/:gameId" element={<ArcadePage />} />
        <Route path="/check" element={<SelfCheck />} />
        <Route path="/play/:moduleId/:chapterId/:screenId" element={<Player />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:slug" element={<LibraryArticle />} />
        <Route path="/dna/s/:token" element={<SharedDna />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
