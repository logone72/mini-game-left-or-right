import st from "./style.module.scss";
import { canvasSize } from "./constant";
import { useCallback, useEffect, useRef } from "react";
import GameInstance from "./GameInstance";

function LeftOrRightGameRefactor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameInstanceRef = useRef<GameInstance | null>(null);

  const renderGame = useCallback(() => {
    if (gameInstanceRef.current === null) return;

    gameInstanceRef.current.render();

    requestAnimationFrame(renderGame);
  }, []);

  useEffect(() => {
    // start game
    if (canvasRef.current && !gameInstanceRef.current) {
      gameInstanceRef.current = new GameInstance(canvasRef.current);

      void gameInstanceRef.current.startGame();

      renderGame();
    }
  }, [canvasRef.current, renderGame]);

  return (
    <div className={st.LeftOrRightGame}>
      <div>
        <canvas
          id="canvasLR"
          ref={canvasRef}
          height={canvasSize.height}
          width={canvasSize.width}
          // onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
}

export default LeftOrRightGameRefactor;
