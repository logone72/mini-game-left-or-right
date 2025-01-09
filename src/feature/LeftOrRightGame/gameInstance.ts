type TGameCanvas = {
  height: number;
  width: number;
};

class GameInstance {
  gameCanvas: TGameCanvas = {
    width: 360,
    height: 500 + 140,
  };

  gameStartAnimation = {
    value: 0,
  };

  state = {
    ended: false,
    started: false,
  };

  ifEnd = {
    height: -(500 + 140),
  };

  ballDistance = {
    x: 10,
    y: 32, //공 위아래 간격
  };

  timer = {
    width: 30,
    maxWidth: 360 - 40 * 2,
    maxPlayTime: 15, //15초
    cntDownTime: 3700,
    time: 0,
  };

  score = {
    location: 160,
  };

  button = {
    // 버튼 위치 세로 = height/ 3 = 167 * 2 = 334, 가로 좌우 마진 30px 4등분 300 / 4 = 75, 왼쪽 75 오른쪽 225
    height: 75,
    width: 75,
    margin: 25,

    left: {
      x: 25,
      y: 500 + 140 - 75 - 50, //canvas height - button Height - 50;
    },

    right: {
      x: 360 - 75 - 25, //canvas width - button width - margin
      y: 500 + 140 - 75 - 50,
    },
  };
}

export default GameInstance;