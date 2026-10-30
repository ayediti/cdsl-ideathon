import { Volume2, VolumeX } from 'lucide-react';
import { useT } from '../i18n/t';
import { useSettings } from '../i18n/settings';
import { stopSpeaking } from '../i18n/speech';

/** Language, text size and read-aloud switches. Same everywhere, so people learn them once. */
export function AccessControls() {
  const { lang, largeText, readAloud, setLang, toggleLargeText, toggleReadAloud } = useSettings();
  const t = useT();

  const onReadAloud = () => {
    if (readAloud) stopSpeaking();
    toggleReadAloud();
  };

  return (
    <div className="access" role="group" aria-label="Accessibility">
      <button
        className="access__btn access__lang"
        onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
        aria-label={lang === 'en' ? t('Switch to Hindi') : t('Switch to English')}
        title={lang === 'en' ? t('Switch to Hindi') : t('Switch to English')}
      >
        {lang === 'en' ? 'हिंदी' : 'English'}
      </button>
      <button
        className={`access__btn ${largeText ? 'access__btn--on' : ''}`}
        onClick={toggleLargeText}
        aria-pressed={largeText}
        aria-label={t('Larger text')}
        title={t('Larger text')}
      >
        A<span className="access__plus">+</span>
      </button>
      <button
        className={`access__btn ${readAloud ? 'access__btn--on' : ''}`}
        onClick={onReadAloud}
        aria-pressed={readAloud}
        aria-label={t('Read aloud')}
        title={t('Read aloud')}
      >
        {readAloud ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
}
