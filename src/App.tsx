import AssetDropper from './components/AssetDropper';
import PaletteBar from './components/PaletteBar';
import CanvasStage from './components/CanvasStage';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <AssetDropper />
      <PaletteBar />
      <CanvasStage />
    </div>
  );
}
