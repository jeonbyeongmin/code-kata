const BaseballGame = require('./BaseballGame');

class App {
  play() {
    this.baseballGame = new BaseballGame();
    this.baseballGame.play();
  }
}

const app = new App();
app.play();

module.exports = App;
