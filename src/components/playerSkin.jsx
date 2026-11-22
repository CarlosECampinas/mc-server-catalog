import { useEffect, useRef, useState } from "react";
import {
  SkinViewer,
  IdleAnimation,
  WalkingAnimation,
  SwimAnimation,
  WaveAnimation,
} from "skinview3d";
import {
  Footprints,
  SportShoe,
  Pause,
  WavesHorizontal,
  Hand,
} from "lucide-react";

const MODES = ["idle", "walk", "run", "swim", "wave"];

export default function Skin3D({
  skinUrl,
  width = 225,
  height = 300,
  capeUrl = null,
  zoom = 0.85,
  className = "",
}) {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const [moveMode, setMoveMode] = useState("idle");

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

    // Posição inicial levemente virada
    viewer.playerObject.rotation.y = 0.45;

    // Zoom ajustado para enquadrar o corpo inteiro (e a capa)
    viewer.zoom = zoom;

    // Permite girar o boneco com o mouse, mas bloqueia zoom e pan
    viewer.controls.enableRotate = true;
    viewer.controls.enableZoom = false;
    viewer.controls.enablePan = false;

    viewerRef.current = viewer;

    return () => {
      viewer.dispose();
      viewerRef.current = null;
    };
  }, [skinUrl, capeUrl, width, height, zoom]);

  // Alterna entre parado (idle), andando (walk) e correndo (run)
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    if (moveMode === "idle") {
      viewer.animation = new IdleAnimation();
      viewer.animation.speed = 0.6;
    } else if (moveMode === "walk") {
      viewer.animation = new WalkingAnimation();
      viewer.animation.speed = 0.85;
    } else if (moveMode === "run") {
      viewer.animation = new WalkingAnimation();
      viewer.animation.speed = 1.9;
    } else if (moveMode === "swim") {
      viewer.animation = new SwimAnimation();
      viewer.animation.speed = 1.5;
    } else if (moveMode === "wave") {
      viewer.animation = new WaveAnimation();
      viewer.animation.speed = 1;
    }
  }, [moveMode]);

  const handleCycleMode = () => {
    setMoveMode((prev) => {
      const nextIndex = (MODES.indexOf(prev) + 1) % MODES.length;
      return MODES[nextIndex];
    });
  };

  const buttonConfig = {
    idle: {
      icon: Pause,
      style: "bg-[#131813] hover:bg-[#1a221a] text-[#8d998d] border-[#222c22]",
    },
    walk: {
      icon: Footprints,
      style:
        "bg-[#1b2914] hover:bg-[#23361a] text-[#9ad63e] border-[#2e4722] shadow-[0_0_12px_rgba(154,214,62,0.08)]",
    },
    run: {
      icon: Footprints,
      style:
        "bg-[#b4ee55] hover:bg-[#c2f56b] text-[#0b0e0b] border-[#c8fa78] shadow-[0_0_16px_rgba(180,238,85,0.28)]",
    },
    swim: {
      icon: WavesHorizontal,
      style:
        "bg-[#112429] hover:bg-[#163036] text-[#5ce1e6] border-[#1f4750] shadow-[0_0_14px_rgba(92,225,230,0.16)]",
    },
    wave: {
      icon: Hand,
      style:
        "bg-[#242914] hover:bg-[#2f361a] text-[#e5f279] border-[#424d22] shadow-[0_0_14px_rgba(229,242,121,0.14)]",
    },
  }[moveMode];

  const Icon = buttonConfig.icon;

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
        title="Arraste para girar a skin"
      />

      <button
        type="button"
        onClick={handleCycleMode}
        title="Alternar entre andar, correr e parado"
        className={`px-3 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${buttonConfig.style}`}
      >
        <Icon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
