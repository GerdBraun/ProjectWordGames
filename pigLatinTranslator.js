// Get input from the command line
const args = process.argv.slice(2);
// Check if the user provided exactly one sentence
if (args.length !== 1) {
    console.error('I need something to translate!');
    return;
}
// Check if the first argument is a string
if (typeof args[0] !== 'string') {
    console.error('The argument needs to be a string!');
    return;
}

// the translated words
const outArray = [];

// check if the character is a vowel
const isVowel = (char) => "aeiouAEIOU".indexOf(char) !== -1;

// check if the character is a vowel
const isPunctuation = (char) => ".,:;?!".indexOf(char) !== -1;

// capitalize the first letter
const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

const translateWord = (word) => {
    // the translated word 
    let outString = word;

    // a place to add the removed punctuation
    let punctuation = '';

    // check if word begins with uppercase character
    const isUpperCase = word[0] === word[0].toUpperCase();

    // remove punctuation
    if (isPunctuation(word.slice(-1))) {
        punctuation = word.slice(-1);
        word = word.slice(0, -1);
    }

    // transform word to lower case
    word = word.toLowerCase();

    // translation conditions
    if (!isVowel(word[0]) && isVowel(word[1])) {
        // If a word starts with a consonant and a vowel, put the first letter of the word at the end of the word and add “ay.”
        const firstLetter = word[0];
        const restString = word.slice(1);
        outString = restString + firstLetter + 'ay';

    } else if (!isVowel(word[0]) && !isVowel(word[1])) {
        // If a word starts with two consonants move the two consonants to the end of the word and add “ay.”
        const firstTwoLetters = word.slice(0, 2);
        const restString = word.slice(2);
        outString = restString + firstTwoLetters + 'ay';
    } else if (isVowel(word[0])) {
        // If a word starts with a vowel add the word “way” at the end of the word.
        outString = word + 'way';
    }

    // capitalize first letter if needed
    outString = (isUpperCase) ? capitalizeFirstLetter(outString) : outString;

    // add removed punctuation
    outString += punctuation;

    // nothing to translate
    return outString;
}

const  wordsArray = args[0].split(' ');
// translate the words of the sentence
for (let i in wordsArray) {
    outArray.push(translateWord(wordsArray[i]))
}

console.log(outArray.join(' '));