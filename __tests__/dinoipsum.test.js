import { Game } from "../src/dinoipsum"

describe('', () => {
  let reusableGame;

  beforeEach(() => {
    reusableGame = new Game("string");
  })


  test('should create class with answer property and wrong guess property', () => {
    expect(reusableGame.answer).toBe("string");
  })

  test('created class should have a property of hidden answer that converts string values to underscores', () => {
    expect(reusableGame.answerHidden).toBe("_ _ _ _ _ _");
  })

  test('If guess exists in answer update answerHidden so that underscore at that hidden letter reveals the hidden letter', () => {
    reusableGame.checkAddGuess("r");
    expect(reusableGame.answerHidden).toBe("_ _ r _ _ _");
  })

  test('If guess does not exist in answer, add guess to guessWrong array', () => {
    reusableGame.checkAddGuess("x");
    expect(reusableGame.guessWrong).toEqual(["x"]);
  })

  test('If solve guess is equal to the answer, reveal hidden answer', () => {
    reusableGame.checkAddSolve("string");
    expect(reusableGame.answerHidden).toBe("s t r i n g");
  })

  test('If solve guess is not equal to the answer, add guess to guessWrong array', () => {
    reusableGame.checkAddSolve("blah");
    expect(reusableGame.guessWrong).toEqual(["blah"]);
  })

})
