// Get input from the command line
const args = process.argv.slice(2);
// Check if the user provided exactly two arguments
if (args.length !== 3) {
    console.error('I need exactly 2 strings & 1 number, in this exact order! ("method" "string to encode" shift)');
    return;
}
// Check if the first argument is a string
if (typeof args[0] !== 'string') {
    console.error('First argument needs to be a string! ("encode" or "decode")');
    return;
}
// Check if the second argument is a string
if (typeof args[1] !== 'string') {
    console.error('Second argument needs to be a string!');
    return;
}
// Check if the second argument is a number
if (isNaN(args[2])) {
    console.error('Second argument needs to be a number!');
    return;
}

// infos to the alphabet to use
const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabetString.length;

// for the translated words to be  stored
let outputArray = [];

// the action to take (encode or decode)
const action = args[0];
// from user input (latin has no upper or lower case)
const inputString = args[1].toLowerCase();

let shiftToUse = args[2];
switch (action) {
    case 'encode':
        // do nothing - take shift as it is
        break;
    case 'decode':
        // reverse shift
        shiftToUse *= -1;
        break;
    default:
        // create error message
        console.error(action,' is neither "encode" nor "decode');
}

// get shift from user input  and make sure it's value is in bounds
const shift = parseInt(shiftToUse) % alphabetLength;

// translate single words
const translateWord = (word) => {
    let resString = '';
    for (let i in word) {
        // get the normal position of the character in the alphabet
        const currentPosition = alphabetString.indexOf(word[i]);
        // add the position-shift to the position
        let newPosition = currentPosition + shift;
        // fix for overflowing  in any direction (add alphabet length and use modulus)
        newPosition += alphabetLength;
        newPosition %= alphabetLength;
        // add the replaced character to the result-string
        resString += alphabetString[newPosition];
    }
    return resString;
}

// split string into words
const inputArray = inputString.split(' ');

// translate all words & storethem into the outputArray
for (let i in inputArray) {
    outputArray.push(translateWord(inputArray[i]));
}

console.log(outputArray.join(' '));
