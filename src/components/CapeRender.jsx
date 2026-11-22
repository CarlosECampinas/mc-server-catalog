import { useEffect, useRef } from "react";
import { SkinViewer, IdleAnimation } from "skinview3d";

export default function CapeRender({
  skinUrl,
  capeUrl,
  width = 140,
  height = 180,
  zoom = 0.85,
  angleOffset = 0, // Use ex: -0.35 ou 0.35 se quiser um leve 3/4 de costas
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !skinUrl) return;

    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width,
      height,
      skin: skinUrl,
    });

    if (capeUrl) {
      viewer.loadCape(capeUrl).catch((err) => {
        console.warn("Não foi possível carregar a capa:", capeUrl, err);
      });
    }

    // Math.PI = 180° (de costas, voltado para a capa)
    viewer.playerObject.rotation.y = Math.PI + angleOffset;
    viewer.zoom = zoom;

    // Mantém uma animação leve sem permitir interação manual
    viewer.animation = new IdleAnimation();
    viewer.animation.speed = 0.5;

    viewer.controls.enableRotate = false;
    viewer.controls.enableZoom = false;
    viewer.controls.enablePan = false;

    return () => {
      viewer.dispose();
    };
  }, [skinUrl, capeUrl, width, height, zoom, angleOffset]);

  return (
    <div
      className={`flex justify-center items-center pointer-events-none select-none ${className}`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
