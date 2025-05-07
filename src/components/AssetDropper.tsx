import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStyleStack } from '../store/useStyleStack';

export default function AssetDropper() {
  const setPalette = useStyleStack((s) => s.setPalette);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const url = URL.createObjectURL(file);

      try {
        /* 👉 always load the *browser* bundle and grab its named export */
        const { Vibrant } = await import('node-vibrant/browser');

        const palettes = await Vibrant.from(url).getPalette();

        setPalette({
          primary: [
            palettes.Vibrant?.hex ?? '#ff6b6b',
            palettes.Muted?.hex ?? '#9e9e9e',
          ],
          neutrals: [
            palettes.LightMuted?.hex ?? '#cccccc',
            palettes.DarkMuted?.hex ?? '#333333',
          ],
        });
      } catch (err) {
        console.error('Palette extraction failed', err);
      } finally {
        URL.revokeObjectURL(url);
      }
    },
    [setPalette],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #aaa',
        padding: 40,
        marginBottom: 20,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive
        ? 'Drop the image here…'
        : 'Drag & drop an image, or click to select'}
    </div>
  );
}
