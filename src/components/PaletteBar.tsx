import { useStyleStack } from '../store/useStyleStack';

export default function PaletteBar() {
  const palette = useStyleStack((s) => s.palette);
  const activeFill = useStyleStack((s) => s.activeFill);
  const setActiveFill = useStyleStack((s) => s.setActiveFill);

  if (!palette) return null; // nothing extracted yet

  const swatches = [...palette.primary, ...palette.neutrals];

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {swatches.map((color) => (
        <button
          key={color}
          onClick={() => setActiveFill(color)}
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: color === activeFill ? '2px solid #000' : '1px solid #ccc',
            background: color,
            cursor: 'pointer',
          }}
          title={color}
        />
      ))}
    </div>
  );
}
