import { Stage, Layer, Rect, Text } from 'react-konva';
import { useState } from 'react';
import { useStyleStack } from '../store/useStyleStack';

export default function CanvasStage() {
  const palette = useStyleStack((s) => s.palette);
  const activeFill = useStyleStack((s) => s.activeFill);
  const defaultFill = activeFill ?? palette?.primary?.[0] ?? '#cccccc';

  const [shapes, setShapes] = useState<
    { id: string; type: 'rect' | 'text'; x: number; y: number }[]
  >([]);

  const addRect = () =>
    setShapes((s) => [
      ...s,
      { id: crypto.randomUUID(), type: 'rect', x: 50, y: 50 },
    ]);
  const addText = () =>
    setShapes((s) => [
      ...s,
      { id: crypto.randomUUID(), type: 'text', x: 50, y: 150 },
    ]);

  return (
    <>
      <button onClick={addRect}>+ Rectangle</button>{' '}
      <button onClick={addText}>+ Text</button>
      <Stage width={800} height={600} style={{ border: '1px solid #ddd' }}>
        <Layer>
          {shapes.map((s) =>
            s.type === 'rect' ? (
              <Rect
                key={s.id}
                x={s.x}
                y={s.y}
                width={150}
                height={100}
                fill={defaultFill}
                draggable
              />
            ) : (
              <Text
                key={s.id}
                text="Heading"
                x={s.x}
                y={s.y}
                fontSize={32}
                fill={defaultFill}
                draggable
              />
            ),
          )}
        </Layer>
      </Stage>
    </>
  );
}
