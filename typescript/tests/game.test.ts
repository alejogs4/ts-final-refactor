import {expect} from 'chai';
import {describe, it} from 'mocha';
import { Game } from '../src/game.refactor';
import {GameRunner} from '../src/game-runner';

describe('Game tests', () => {
    it('Should win the first player to reach six points', () => {
        const game = new Game()
        game.add('Alejandro')
        game.add('Jhoan')
        let notAWinner = true

        for (let index = 0; index < 6; index++) {
            game.roll(10)
            notAWinner = game.wasCorrectlyAnswered()

            game.roll(1)
            game.wrongAnswer()
        }
        expect(notAWinner).to.be.false
    });

    it('Should win after having a wrong answer', () => {
        const game = new Game()
        game.add('Alejandro')
        game.add('Jhoan')
        let notAWinner = true

        game.roll(1);
        game.wrongAnswer();

        game.roll(0)
        game.wrongAnswer()

        game.roll(15);
        game.wasCorrectlyAnswered()

        game.roll(15)
        game.wasCorrectlyAnswered()

        for (let index = 0; index < 5; index++) {
            game.roll(1)
            notAWinner = game.wasCorrectlyAnswered()

            game.roll(1)
            game.wrongAnswer()
        }
        expect(notAWinner).to.be.false

    });

    it('Should not be a winner if not answer right the enough times', () => {
        const game = new Game()
        game.add('Alejandro')
        game.add('Jhoan')
        let notAWinnerOne = true
        let notAWinnerTwo = true

        for (let index = 0; index < 6; index++) {
            game.roll(14)
            notAWinnerOne = game.wrongAnswer()

            game.roll(16)
            notAWinnerTwo = game.wrongAnswer()
        }
        game.roll(14)
        notAWinnerOne = game.wasCorrectlyAnswered()

        game.roll(16)
        notAWinnerTwo = game.wasCorrectlyAnswered()

        expect(notAWinnerOne).to.be.true
        expect(notAWinnerTwo).to.be.true
    })

    it('Should win second player', () => {
        const game = new Game()
        game.add('Alejandro')
        game.add('Jhoan')
        let notAWinner = true

        for (let index = 0; index < 6; index++) {
            game.roll(10)
            game.wrongAnswer()

            game.roll(1)
            notAWinner = game.wasCorrectlyAnswered()
        }
        expect(notAWinner).to.be.false
    })

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });
});
