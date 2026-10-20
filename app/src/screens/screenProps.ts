export interface ScreenProps<T> {
  def: T;
  /** `${moduleId}/${chapterId}/${screenId}` — used for once-only effect keys. */
  screenKey: string;
  /** Enables the Continue button. */
  setReady: (ready: boolean) => void;
}
