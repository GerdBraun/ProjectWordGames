// all the possible moves
const possibleMovesObject = {
    rock: {
        name: 'mighty rock',
        beats: ['scissors'],
    },
    paper: {
        name: 'sheet of paper',
        beats: ['rock'],
    },
    scissors: {
        name: 'sharp scissors',
        beats: ['paper'],
    },
    atomicBomb: {
        name: 'all powerful atomic bomb',
        beats: ['rock', 'paper', 'scissors'],
    },
};
// an array that holds the object keys ('rock','paper',...)
const possibleMovesNames = Object.keys(possibleMovesObject);

// Get input from the command line
const args = process.argv.slice(2);

// Check if the user provided exactly one argument
if (args.length !== 1) {
    console.error('Please provide exactly one move');
    return;
}

// the user move (it's a string already)
const userMove = args[0];

// check if the argument matches one of the possible moves
const isPossibleMove = possibleMovesNames.some(
    (move) => move === userMove
);
if (!isPossibleMove) {
    console.error(`'${userMove}' is not allowed as a move! Please use 'rock', 'paper' or 'scissors'`);
    return;
}

// pick random move for computer
const rnd = parseInt(Math.random() * (possibleMovesNames.length));
const computerMove = possibleMovesNames[rnd];

// check if user beats computer
const userChoice = possibleMovesObject[userMove];
const isUserWinner = userChoice.beats.some(
    (move) => {
        return move === computerMove
    }
);

// calculate feedback
let feedback = '';
if(userMove === computerMove){
    // both user and computer chose the same move
    feedback = "It's a draw!";
}else{
     // someone has won
     feedback = isUserWinner ? 'You win!' : 'Computer wins!';
}

console.info(`You chose the '${possibleMovesObject[userMove].name}'. Computer chose the '${possibleMovesObject[computerMove].name}'. ${feedback}`);