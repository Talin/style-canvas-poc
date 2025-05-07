import { extractPaletteFromBlob } from '../utils/extractPalette';
import { useStyleStack } from '../store/useStyleStack';
import { useState } from 'react';

export function PromptBar() {
  const setPalette = useStyleStack((s) => s.setPalette);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      // 1️⃣  ask dev‑server to return a JSON { imageUrl }
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!genRes.ok) throw new Error(`gen ${genRes.status}`);
      const { imageUrl } = await genRes.json();

      // 2️⃣  proxy the remote image -> same‑origin Blob
      const imgBlob = await (
        await fetch('/api/fetch-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl }),
        })
      ).blob();

      // 3️⃣  extract palette
      const palette = await extractPaletteFromBlob(imgBlob);
      setPalette(palette);
    } catch (err) {
      console.error('Prompt fetch failed', err);
      alert('Generate failed – see console');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your visual…"
        style={{ width: 320, padding: 8 }}
      />
      <button type="submit" disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? 'Generating…' : 'Generate'}
      </button>
    </form>
  );
}
