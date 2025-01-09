import React, { useRef, useEffect, useState, memo } from "react";

//이미지
import BlueMonsterImg from "../../assets/BlueMonster.png";
import GreenMonsterImg from "../../assets/GreenMonster.png";
import ArrowLeftButtonImg from "../../assets/neonArrowLeft.png";
import ArrowRightButtonImg from "../../assets/neonArrowRight.png";
// 화살표 버튼 소스(다른 색도 있음) https://www.iconsdb.com/barbie-pink-icons/arrow-left-icon.html
import tutorialImage from "../../assets/tutorialLeftRight.png";

import st from "./style.module.scss";

//게임 시작 애니메이션
//총 3.7초 3700
import {
  ClearCanvas,
  drawGameStart,
  drawRoundRect,
  gameStartAnimation,
} from "./util";
import GameInstance from "./gameInstance";
import Confetti from "./Confetti";
import { makeNewMonster } from "./Monster";
import type { radius } from "./type";

function LeftOrRightGame() {
  //canvas 사용을 위해 필요한 선언 1
  const canvasRef: any = useRef(null);

  const [instance] = useState(() => new GameInstance());

  let wrongMonster: any = null;
  const monsterList: any = [];
  const monsterLRList: any = [];

  let score = 0;

  // 이미지 로딩
  const blueMonster = new Image();
  blueMonster.src = BlueMonsterImg;
  const greenMonster = new Image();
  greenMonster.src = GreenMonsterImg;
  const ArrowLeftButton = new Image();
  ArrowLeftButton.src = ArrowLeftButtonImg;
  const ArrowRightButton = new Image();
  ArrowRightButton.src = ArrowRightButtonImg;
  const tutorial = new Image();
  tutorial.src = tutorialImage;

  //키보드 좌우 클릭 감지
  useEffect(() => {
    setTimeout(function () {
      window.addEventListener("keydown", (event) => {
        if (instance.state.ended === true) return;

        if (event.key === "ArrowLeft") {
          leftOrRightEventHandle("left");
        } else if (event.key === "ArrowRight") {
          leftOrRightEventHandle("right");
        }
      });
    }, 3700 + 4000);
  });

  // onclick + touch handler in canvas tag
  const handleCanvasClick = (event: any) => {
    if (
      instance.state.ended === true ||
      instance.gameStartAnimation.value <= 10000
    )
      return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left; //canvas.offsetLeft or Right
    const y = event.clientY - rect.top;

    // left button for Green
    if (
      x >= 0 &&
      instance.button.left.x + instance.button.width + 20 >= x &&
      y >= instance.button.left.y - 20 &&
      instance.button.left.y + instance.button.height + 40 >= y
    ) {
      leftOrRightEventHandle("left");
    } else if (
      // right button for Blue
      x >= instance.button.right.x - 20 &&
      instance.button.right.x + instance.button.width + 40 >= x &&
      y >= instance.button.right.y - 20 &&
      instance.button.right.y + instance.button.height + 40 >= y
    ) {
      leftOrRightEventHandle("right");
    }
  };

  function leftOrRightEventHandle(whichPressed: "left" | "right") {
    const ball = monsterList.pop();
    let success = true;

    if (
      (ball.isBlue && whichPressed === "right") ||
      (!ball.isBlue && whichPressed === "left")
    ) {
      success = true;
    } else {
      success = false;
    }

    // 성적 체크;
    if (!success) {
      score -= 2;

      // 실패 효과 출력
      wrongMonster = ball;
      setTimeout(() => {
        wrongMonster = null;
      }, 400);
    } else {
      score += 1;

      if (whichPressed === "left") {
        ball.goLeft = true;
      } else {
        ball.goLeft = false;
      }
      monsterLRList.push(ball);
    }

    // 새 공 추가
    const monster = makeNewMonster();
    monsterList.unshift(monster);

    moveMonster();
  }



  // on button click, start the animation
  function moveMonster() {
    //세로 이동
    let initialY = 0;
    //현재 공의 위치를 저장한 뒤에, setinterval로 해당 공을 32px 아래만큼 이동시키고 clearinterval
    initialY += monsterList[1].y;

    const ballDownSpeed = 2;

    const animation = setInterval(function () {
      monsterList.forEach(function (item: any, index: any, array: any) {
        array[index].y = item.y + ballDownSpeed;
      });

      if (monsterList[1].y - monsterList[0].y < instance.ballDistance.y) {
        monsterList[0].y -= ballDownSpeed;
      }

      if (initialY + instance.ballDistance.y <= monsterList[1].y) {
        clearInterval(animation);
      }
    }, 5);

    if (monsterLRList.length === 0) return;
    // 가로 이동
    let cnt2 = 0;

    const animationLR = setInterval(function () {
      monsterLRList.forEach(function (item: any, index: any, array: any) {
        if (item.goLeft) {
          array[index].x = item.x - 2;
        } else {
          array[index].x = item.x + 2;
        }
      });
      cnt2 += 1;
      if (cnt2 > 130) {
        clearInterval(animationLR);
      }
    }, 10);
  }

  // draw monster ball
  function drawMonster(ctx: any) {
    if (monsterList.length === 0) return;

    for (let i = 0; i < monsterList.length; i++) {
      const monsterBall: any = monsterList[i];

      if (monsterBall.isBlue) {
        ctx.drawImage(
          blueMonster,
          monsterBall.x,
          monsterBall.y,
          monsterBall.width,
          monsterBall.height
        );
      } else {
        ctx.drawImage(
          greenMonster,
          monsterBall.x,
          monsterBall.y,
          monsterBall.width,
          monsterBall.height
        );
      }
    }
  }

  function drawMonsterLeftRight(ctx: any) {
    if (monsterLRList.length === 0) return;

    for (let i = 0; i < monsterLRList.length; i++) {
      const monsterLRBall: any = monsterLRList[i];

      if (monsterLRBall.isBlue) {
        ctx.drawImage(
          blueMonster,
          monsterLRBall.x,
          monsterLRBall.y,
          monsterLRBall.width,
          monsterLRBall.height
        );
      } else {
        ctx.drawImage(
          greenMonster,
          monsterLRBall.x,
          monsterLRBall.y,
          monsterLRBall.width,
          monsterLRBall.height
        );
      }
    }
  }

  function drawButton(ctx: any) {
    ctx.drawImage(
      ArrowLeftButton,
      instance.button.left.x,
      instance.button.left.y,
      instance.button.width,
      instance.button.height
    );

    ctx.drawImage(
      ArrowRightButton,
      instance.button.right.x,
      instance.button.right.y,
      instance.button.width,
      instance.button.height
    );
  }

  function drawWhichLR(ctx: any, location: string) {
    let positionX = 0;
    let text = "";
    let img: HTMLImageElement = greenMonster;
    if (location === "left") {
      positionX = instance.button.left.x;
      text = "좌측으로";
    } else if (location === "right") {
      positionX = instance.button.right.x;
      text = "우측으로";
      img = blueMonster;
    }

    const radius: radius = {
      tl: 5,
      tr: 5,
      br: 40,
      bl: 40,
    };
    // 하얀색 아래쪽 둥근 바탕
    ctx.save();
    ctx.fillStyle = "#DC143C";
    drawRoundRect(
      ctx,
      positionX,
      instance.button.left.y - 110 - 30,
      instance.button.width,
      110,
      radius,
      true,
      false
    );
    ctx.restore();

    //header
    const radiusHeader: radius = {
      tl: 5,
      tr: 5,
      br: 0,
      bl: 0,
    };

    ctx.save();
    ctx.fillStyle = "white";
    drawRoundRect(
      ctx,
      positionX,
      instance.button.left.y - 110 - 30,
      instance.button.width,
      25,
      radiusHeader,
      true,
      false
    );
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#DC143C";
    ctx.font = "bold 18px Trebuchet MS";
    ctx.fillText(
      `${text}`,
      positionX + 3,
      instance.button.left.y - 110 - 30 + 21
    );
    ctx.restore();

    ctx.drawImage(
      img,
      positionX + 7,
      instance.button.left.y - 110 - 30 + 25 + 12,
      60,
      60
    );
  }

  function drawScore(ctx: any) {
    ctx.save();
    ctx.font = "bold 100px Trebuchet MS";
    ctx.fillStyle = "white";

    if (score < 10 && score >= 0) {
      // 양수 일의 자리
      ctx.fillText(`${score}`, 180 - 20, instance.score.location);
    } else if (score < -1 && score > -10) {
      // 음수 일의 자리
      ctx.fillText(`${score}`, 180 - 50, instance.score.location);
    } else if (score <= -10) {
      // 음수 10이상
      ctx.fillText(`${score}`, 180 - 90, instance.score.location);
    } else {
      // 양수 10이상
      ctx.fillText(`${score}`, 180 - 60, instance.score.location);
    }

    ctx.save();
    ctx.font = "bold 30px Trebuchet MS";
    ctx.fillText("your score", 180 - 70, instance.score.location + 30);
    ctx.restore();
    ctx.restore();
  }

  function drawTimer(ctx: any) {
    const time = instance.timer.time;
    //header
    const radius: radius = {
      tl: 17,
      tr: 17,
      br: 17,
      bl: 17,
    };
    ctx.save();
    ctx.fillStyle = "DarkRed";
    drawRoundRect(ctx, 40, 30, 360 - 40 - 40, 30, radius, true, false);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    // 흰색 바
    drawRoundRect(ctx, 40, 30, instance.timer.width, 30, radius, true, false);

    ctx.beginPath();
    ctx.arc(40 + 15, 30 + 15, 15, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#ff4d4d";
    ctx.font = "bold 16px Trebuchet MS";
    ctx.fillText(`${time.toFixed(2)}`, 180 - 15, 30 + 20);
    ctx.restore();
  }

  function drawWrong(ctx: any) {
    if (wrongMonster === null) return;
    let img;

    if (wrongMonster.isBlue) {
      img = blueMonster;
    } else {
      img = greenMonster;
    }
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "red";

    ctx.drawImage(
      img,
      wrongMonster.x,
      wrongMonster.y,
      wrongMonster.width,
      wrongMonster.height
    );

    ctx.beginPath();
    ctx.arc(
      wrongMonster.x + 75 / 2,
      wrongMonster.y + 75 / 2,
      75 / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();
  }

  const confNum = Math.floor(instance.gameCanvas.width / 4);
  const confs = new Array(confNum)
    .fill(undefined)
    .map(() => new Confetti(instance));

  function drawGameFinish(ctx: any) {
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "black";
    ctx.fillRect(
      0,
      0,
      instance.gameCanvas.width,
      instance.gameCanvas.height + instance.ifEnd.height
    );

    ctx.restore();

    ctx.save();
    confs.forEach((conf) => {
      conf.update();
      conf.draw(ctx);
    });
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "bold 100px Trebuchet MS";
    ctx.fillText(
      "FINISH",
      35 + instance.ifEnd.height,
      instance.gameCanvas.height / 2
    );
    ctx.restore();
  }

  function ifGameFinish() {
    instance.state.ended = true;

    const gameEndtimer = setInterval(function () {
      instance.ifEnd.height += instance.gameCanvas.height / 100;
      if (instance.ifEnd.height > 0) {
        instance.ifEnd.height = 0;

        clearInterval(gameEndtimer);
      }
    }, 10);
  }

  // initialize game
  useEffect(() => {
    // load monster balls
    // 처음엔 공 9개만 출력해야 문제 안생김!
    setTimeout(function () {
      for (let i = 1; i < 10; i++) {
        const monster = makeNewMonster();

        //위부터 아래까지 일렬로 늘어지게
        const sth = instance.ballDistance.y;
        monster.y += sth * i; // 32 * 9 = 288 최저 위치

        monsterList.push(monster);
      }
    }, 3700 + 4000);
  });

  useEffect(() => {
    setTimeout(function () {
      instance.state.started = true;
      gameStartAnimation(instance, instance.gameCanvas.width);
    }, 4000);

    //타이머
    setTimeout(function () {
      const timer = setInterval(function () {
        instance.timer.time += 0.01;
        instance.timer.width +=
          (instance.timer.maxWidth - 30) / (instance.timer.maxPlayTime * 100);
        if (instance.timer.time > instance.timer.maxPlayTime) {
          instance.timer.time = instance.timer.maxPlayTime;
          instance.timer.width = instance.timer.maxWidth;

          // 게임 종료
          ifGameFinish();
          clearInterval(timer);
        }
      }, 10);
    }, 3700 + 4000); //

    //일정 시간 후 게임 결과 송신
    setTimeout(function () {
      console.log("game terminate");
    }, instance.timer.maxPlayTime * 1000 + 3000 + 3700 + 4000);
  });

  useEffect(() => {
    render();
  });

  const render = () => {
    if (canvasRef.current === null) return;
    //canvas 사용을 위해 필요한 선언 2
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ClearCanvas(ctx, canvas);

    drawTimer(ctx);
    drawScore(ctx);

    drawMonster(ctx);
    drawWrong(ctx);

    drawMonsterLeftRight(ctx);

    drawWhichLR(ctx, "left");
    drawWhichLR(ctx, "right");

    drawButton(ctx);

    if (instance.state.ended) {
      drawGameFinish(ctx);
    }

    drawGameStart(
      ctx,
      instance.gameCanvas.width,
      instance.gameCanvas.height,
      instance.gameStartAnimation.value
    );

    if (!instance.state.started) {
      ctx.drawImage(tutorial, 0, 75, instance.gameCanvas.width, 34 * 14.4);
    }

    requestAnimationFrame(render);
  };

  return (
    <div className={st.LeftOrRightGame}>
      <div>
        <canvas
          id="canvasLR"
          ref={canvasRef}
          height={instance.gameCanvas.height}
          width={instance.gameCanvas.width}
          onClick={handleCanvasClick}
        />
      </div>
    </div>
  );
}

export default memo(LeftOrRightGame);
