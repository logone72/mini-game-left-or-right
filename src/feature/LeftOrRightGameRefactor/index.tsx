import st from "./style.module.scss";
import { canvasSize } from "./constant";
import { useEffect, useRef } from "react";
import GameInstance from "./GameInstance";

function LeftOrRightGameRefactor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameInstanceRef = useRef<GameInstance | null>(null);

  useEffect(() => {
    // start game
    if (canvasRef.current && !gameInstanceRef.current) {
      gameInstanceRef.current = new GameInstance(canvasRef.current);

      gameInstanceRef.current.startRendering();
      void gameInstanceRef.current.startGame();
    }
  }, [canvasRef.current]);

  return (
    <div className={st.LeftOrRightGame}>
      <div>
        <canvas
          id="canvasLR"
          ref={canvasRef}
          height={canvasSize.height}
          width={canvasSize.width}
        />
      </div>
    </div>
  );
}

export default LeftOrRightGameRefactor;
