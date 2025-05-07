import AssetDropper from './components/AssetDropper';
import PaletteBar from './components/PaletteBar';
import CanvasStage from './components/CanvasStage';
import { PromptBar } from './components/PromptBar';
import { useCallback } from 'react';
import { useStyleStack } from './store/useStyleStack';

export default function App() {
  const setPalette = useStyleStack((s) => s.setPalette); // reuse existing setter

  // reuse AssetDropper's extraction logic
  const handleBlob = useCallback(
    async (blob: Blob) => {
      const file = new File([blob], 'gen.png', { type: blob.type });
      // Delegate to the same onDrop path:
      (await import('./components/AssetDropper')).default.handleExternalFile(
        file,
        setPalette,
      );
    },
    [setPalette],
  );
  return (
    <div style={{ padding: 20 }}>
      <AssetDropper />
      <PaletteBar />
      <CanvasStage />
      <PromptBar onImageReady={handleBlob} />
    </div>
  );
}
