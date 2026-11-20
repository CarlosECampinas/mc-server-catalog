import { useEffect, useRef } from "react";
import { SkinViewer, IdleAnimation } from "skinview3d";

export default function Skin3D({
  skinUrl,
  width = 225,
  height = 300,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width,
      height,
      skin: skinUrl,
    });

    // Posição inicial levemente virada (igual ao print)
    viewer.playerObject.rotation.y = 0.45;

    // Zoom ajustado para enquadrar o corpo inteiro
    viewer.zoom = 0.85;

    // Animação suave de respiração/movimento
    viewer.animation = new IdleAnimation();
    viewer.animation.speed = 0.6;

    // Permite girar o boneco com o mouse, mas bloqueia zoom com scroll da página
    viewer.controls.enableRotate = true;
    viewer.controls.enableZoom = false;
    viewer.controls.enablePan = false;

    return () => {
      viewer.dispose();
    };
  }, [skinUrl, width, height]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing {className}"
        title="Arraste para girar a skin"
      />
    </div>
  );
}
