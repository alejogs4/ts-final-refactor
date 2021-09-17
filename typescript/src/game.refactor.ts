export class Game {
  private players: Array<string> = [];
  private places: Array<number> = [];
  private purses: Array<number> = [];
  private inPenaltyBox: Array<boolean> = [];
  private currentPlayer: number = 0;
  private isGettingOutOfPenaltyBox: boolean = false;

  private popQuestions: Array<string> = [];
  private scienceQuestions: Array<string> = [];
  private sportsQuestions: Array<string> = [];
  private rockQuestions: Array<string> = [];

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(this.createCategoryQuestion("Pop", i));
      this.scienceQuestions.push(this.createCategoryQuestion("Science", i));
      this.sportsQuestions.push(this.createCategoryQuestion("Sports", i));
      this.rockQuestions.push(this.createCategoryQuestion("Rock", i));
    }
  }

  private createCategoryQuestion(category: string, index: number): string {
    return `${category} Question ${index}`;
  }

  public add(name: string): boolean {
    this.players.push(name);
    const currentPlayers = this.howManyPlayers() - 1;
    this.places[currentPlayers] = 0;
    this.purses[currentPlayers] = 0;
    this.inPenaltyBox[currentPlayers] = false;

    console.log(name + " was added");
    console.log("They are player number " + this.howManyPlayers());

    return true;
  }

  private howManyPlayers(): number {
    return this.players.length;
  }

  public roll(roll: number) {
    const currentPlayer = this.players[this.currentPlayer];
    console.log(currentPlayer + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(currentPlayer + " is getting out of the penalty box");
        this.updatePlaces(roll);

        console.log(
          currentPlayer +
            "'s new location is " +
            this.places[this.currentPlayer]
        );
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(currentPlayer + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.updatePlaces(roll);

      console.log(
        currentPlayer + "'s new location is " + this.places[this.currentPlayer]
      );
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  }

  private updatePlaces(roll: number): void {
    this.places[this.currentPlayer] += roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] -= 12;
    }
  }

  private askQuestion(): void {
    switch (this.currentCategory()) {
      case "Pop":
        console.log(this.popQuestions.shift());
        break;
      case "Science":
        console.log(this.scienceQuestions.shift());
        break;
      case "Sports":
        console.log(this.sportsQuestions.shift());
        break;
      case "Rock":
        console.log(this.rockQuestions.shift());
        break;
      default:
        break;
    }
  }

  private currentCategory(): string {
    const popPlaces = [0, 4, 8];
    const sciencePlaces = [1, 5, 9];
    const sportsPlaces = [2, 6, 10];
    const currentPlace = this.places[this.currentPlayer];
    // @ts-ignore
    if (popPlaces.includes(currentPlace)) return "Pop";
    // @ts-ignore
    if (sciencePlaces.includes(currentPlace)) return "Science";
    // @ts-ignore
    if (sportsPlaces.includes(currentPlace)) return "Sports";
    return "Rock";
  }

  private didPlayerWin(): boolean {
    return !(this.purses[this.currentPlayer] == 6);
  }

  public wrongAnswer(): boolean {
    console.log("Question was incorrectly answered");
    console.log(
      this.players[this.currentPlayer] + " was sent to the penalty box"
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }

  public wasCorrectlyAnswered(): boolean {
    const isInPenalty = this.inPenaltyBox[this.currentPlayer];
    if (!isInPenalty) {
      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " + this.purses[this.currentPlayer] +
          " Gold Coins."
      );

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    }

    if (this.isGettingOutOfPenaltyBox) {
      console.log("Answer was correct!!!!");
      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " + this.purses[this.currentPlayer] + " Gold Coins.");

      var winner = this.didPlayerWin();
      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

      return winner;
    } else {
      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
      return true;

    }
  }
}
