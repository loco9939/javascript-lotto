const MissionUtils = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");

class App {
  constructor() {
    this.LottoCount = 8;
    this.Lotto = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 2, 4, 6],
    ];
    this.winNum = [1, 2, 3, 4, 5, 6];
    this.bonusNum = 7;
    this.score = {};
  }

  play() {
    // 구입 금액 입력
    // this.getLottoCount();
    // 구입 금액만큼 로또 번호 출력
    // this.buyLotto();
    // 당첨 번호 입력
    // this.getWinNum();
    // 보너스 번호 입력
    // this.getBonusNum();
    // 당첨 결과 출력
    this.compareWinToLotto();
  }

  getLottoCount() {
    MissionUtils.Console.readLine("구입금액을 입력해 주세요.", (answers) => {
      this.checkPrice(answers);
      this.LottoCount = answers / 1000;
    });
  }

  checkPrice(answers) {
    if (typeof answers !== "number")
      throw new TypeError("[ERROR] 숫자를 입력해주세요.");
    if (answers % 1000)
      throw new RangeError("[ERROR] 1,000 단위로만 입력가능합니다.");
  }

  buyLotto() {
    for (let i = 0; i < this.LottoCount; i++) {
      this.Lotto = [...this.Lotto, new Lotto()];
    }
  }

  getWinNum() {
    MissionUtils.Console.readLine("당첨 번호를 입력해 주세요.", (answers) => {
      this.checkWinNum(answers);
      this.winNum = answers.split(",").map(Number);
    });
  }

  checkWinNum(answers) {
    const winNum = answers.split(",");
    if (winNum.length !== 6)
      throw new RangeError(
        "[ERROR] 숫자 6개를 쉽표(,)로 구분하여 입력해주세요."
      );
    if (winNum.every((num) => typeof num === "number"))
      throw new TypeError(
        "[ERROR] 숫자 6개를 쉽표(,)로 구분하여 입력해주세요."
      );
  }

  getBonusNum() {
    MissionUtils.Console.readLine("당첨 번호를 입력해 주세요.", (answers) => {
      this.checkBonusNum(+answers);
      this.bonusNum = +answers;
    });
  }

  checkBonusNum(answers) {
    if (typeof answers !== "number" || isNaN(answers))
      throw new TypeError("[ERROR] 보너스 번호는 숫자를 입력해주세요.");
    if (answers < 1 || answers > 45)
      throw new RangeError(
        "[ERROR] 보너스 번호는 1~45 사이의 숫자를 입력하세요"
      );
  }

  compareWinToLotto() {
    const winNumWithBonus = [...this.winNum, this.bonusNum];
    for (let i = 0; i < this.LottoCount; i++) {
      let count = 0;
      for (let j = 0; j < winNumWithBonus.length; j++) {
        if (this.Lotto[i].includes(winNumWithBonus[j])) {
          count += 1;
        }
      }
      if (count < 3) continue;
      if (count === 6) {
        if (this.Lotto[i].includes(this.bonusNum)) {
          count = "bonus";
        }
      }
      this.score[count] = this.score[count] ?? 0 + 1;
    }
  }
}

const app = new App();
app.play();

// module.exports = App;
