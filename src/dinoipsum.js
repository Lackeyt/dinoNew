export class Game{
  constructor(answer){
    this.answer = answer;
    this.answerHidden = answer.toString().replace(/./g, '_ ').trim();
    this.guessWrong = [];
  }

  checkGuess(guess){
    if (this.answer.includes(guess)){
      this.updateHidden(guess)
    } else {
      if (this.guessWrong.length > 0 && !this.guessWrong.includes(guess)){
        this.guessWrong.push(guess);
      } else if (this.guessWrong.length === 0) {
        this.guessWrong.push(guess);
      }
    }
  }

  updateHidden(guess){
    let answerArray = this.answer.split("");
    let answerHiddenArrayOld = this.answerHidden.split(" ");
    let answerHiddenArrayNew = [];
    for(let i=0; i < answerArray.length; i++){
      if (answerArray[i] === guess){
        answerHiddenArrayNew.push(guess);
      } else {
        if (answerHiddenArrayOld[i] === "_"){
          answerHiddenArrayNew.push("_");
        } else {
          answerHiddenArrayNew.push(answerHiddenArrayOld[i]);
        }
      }
    }
    this.answerHidden = answerHiddenArrayNew.join(" ");
  }

  checkAddSolve(solve){
    if (this.answer === solve){
      let answerArray = this.answer.split("");
      let answerHiddenArray = [];
      for(let i=0; i < answerArray.length; i++){
        answerHiddenArray.push(answerArray[i]);
      }
      this.answerHidden = answerHiddenArray.join(" ");
    } else {
      this.guessWrong.push(solve);
    }
  }
}