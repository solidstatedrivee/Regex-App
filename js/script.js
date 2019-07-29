console.log("The script is working!");

//regexTest finds any number that isnt followed by a decimal point
let regexTest = /\d+(?!\.)/;
let findNum = regexTest.exec("3.14159");
console.log(findNum[0]); //prints 14159 and not 3.14159 because the 3 is followed by a decimal point
// note that exec() returns an array in which the values are the results of the search

//alternatively, numBeforeDecimal looks for a number that is followed by a decimal and matches just that number
//this is an example of lookahead
let numBeforeDecimal = /\d+(?=\.)/
let findNumBeforeDecimal = numBeforeDecimal.exec("64.51515");
console.log(findNumBeforeDecimal[0]); //prints just 64 because it is followed by a decimal

const threeDigits = /^\d{3}$/; //looks for just three digits in succession
const threeDigitsInARow = /^(\d)\1{2}$/ //looks for a repeat of the same three digits in succession
const hasThreeDigits = threeDigits.test("123"); //returns true because its any three digits in a row
const hasThreeDigitsInARow = threeDigitsInARow.test("777"); // returns true because it is three digits of the same value in succession
console.log(hasThreeDigits);
console.log(hasThreeDigitsInARow);
//note that test() returns a boolean depending on if the input matches the regex

// let textInput = document.querySelector("textarea").value; //grabs the text in the textbox
// console.log(textInput);

// const validEmail = /^\w+@\w+\.(?:com|org|edu)$/; //regex that matches email addresses ending in com, org, or edu. could rewrite this to include more TLD names
const getSubmitButton = document.getElementById("submit"); //grabs the submit button
// function that runs when submit is clicked. Creates a <p> element and a text node and appends the text node to the element. 
//The content of the text node varies on whether the email adress is matched or not
let getMatchResultsElement = document.getElementById("matchResults");

let displayMatch = () => {
    let textInput = document.querySelector("textarea").value; //grabs the text in the textbox
    const validEmail = /^\w+@\w+\.(?:com|org|edu)$/; //regex that matches email addresses ending in com, org, or edu. could rewrite this to include more TLD names

    let createP = document.createElement("p");
    // createP.innerHTML = validEmail.test(textInput);
    getMatchResultsElement.appendChild(createP);

    let printMatchResult; //= document.createTextNode(validEmail.test(textInput));
    if (validEmail.test(textInput) == true) {
        // printMatchResult = document.createTextNode("This email is valid");
        // createP = document.createElement("p");
        createP.innerHTML = "This email is valid";
        // getMatchResultsElement.appendChild(createP);

    } else {
        // printMatchResult = document.createTextNode("The email is not valid");
        // createP = document.createElement("p");
        createP.innerHTML = "This email is not valid";

    }
    getMatchResultsElement.appendChild(createP);

    // createP.appendChild(printMatchResult);
    console.log(createP);

}
// getSubmitButton.removeEventListener("blur", displayMatch);
getSubmitButton.addEventListener("click", displayMatch); //attaches an event listener to the submit button and runs displayMatch() upon click


// console.log(validEmail.test("nsims@ggc.edu"));

// console.log(getSubmitButton);

let textTest = "This is text that contains a few phone numbers 770-313-5330 and 770-448-9443 and also 678-900-0918 and one last one 770-314-1371"
let phoneNumbersRegex = /(\d{3})\-\d{3}\-\d{4}/g;
let logResults = textTest.match(phoneNumbersRegex);
console.log(logResults)
console.log(phoneNumbersRegex.test(textTest))
for (let i = 0; i < logResults.length; i++) {
    // document.write(logResults[i] + "<br>");
}

//the code below displays the phone numbers that are within the text area when the 'print phone numbers' button is clicked
const getPrintButton = document.getElementById("printPhoneNumbers"); //grabs the 'print phone numbers' button

//function attached to the event listener
let printMatches = () => {
    let newP;
    // console.log(logResults)
    // console.log(phoneNumbersRegex.test(textTest))
    let phoneNumbersRegex = /\d{3}\-\d{3}\-\d{4}/g; //regular expression that matches phone numbers in dash format. could try to match phone numbers in multiple formats
    let getTextBoxValue = document.querySelector("textarea").value; //grabs the current entered text in text area

    let logResults = getTextBoxValue.match(phoneNumbersRegex); //creates an array that holds the numbers matched
    newP = document.createElement("p"); //creates new <p> element that will be appended to printedNumbers div

    //loop that grabs the individual index values of logResults and assigns them to the inner text of the generated <p>
    for (let i = 0; i < logResults.length; i++) {
        newP.innerHTML += logResults[i] + "<br>";
    }
    console.log(logResults);

    let getPrintedNumbers = document.getElementById("printedNumbers"); //grab the printedNumbers div
    getPrintedNumbers.append(newP); //append the generated <p> so that it displays in the browser
}
getPrintButton.addEventListener("click", printMatches); //assigns an event listener to 'print phone numbers' button when it it clicked

// let getTextAreaValue = document.querySelector("textarea").value;
// let results;

// console.log(getTextAreaValue.match(phoneNumbersRegex));
// // console.log(results);
// // phoneNumbersRegex.exec(getTextAreaValue);
// // console.log(results);

// while((results = phoneNumbersRegex.exec(getTextAreaValue)) !== null) {
//     // phoneNumbersRegex.exec(getTextAreaValue);
//     console.log(results);
//     // console.log(phoneNumbersRegex.lastIndex);
// }

//The code below is a similar event handler to the code above except it utilizes the exec() method in order to match multiple phone numbers and display their area codes as well
//The exec() method is useful if you need to match multiple strings and also use capture groups
let getExecButton = document.getElementById("exec"); //grabs the 'print using exec()' button

//The event function that matches phone numbers in the text area along with their respective area codes
let printMatchUsingExec = () => {
    let getTextAreaValue = document.querySelector("textarea").value; //grab the text in the text area
    let newP2 = document.createElement("p"); //create a new <p> element which will display the match results
    let phoneNumbersRegex = /(\d{3})\-\d{3}\-\d{4}/g; //the regex (with a capture group) that matches the phone number and remebers the area code
    let results; //the variable that holds the matches in an array so that they can be accessed

    //if youre using exec() on a regex with a global flag you must create a loop that grabs each result before the iterations become null
    //the nature of exec() is that it only accesses one match consecutively each time that it is called. So you need a while loop if you want to display all of the matches.
    //it reaches null when it has reached the end of the amount of matches
    while ((results = phoneNumbersRegex.exec(getTextAreaValue)) !== null) {
        // phoneNumbersRegex.exec(getTextAreaValue);
        newP2.innerHTML += `The phone number is: ${results[0]}. The area code for this number is ${results[1]}` + "<br>"; //set the inner text of the generated <p>'s to the results of the matches phone numbers
        console.log(results); //log the results for debugging
        // console.log(phoneNumbersRegex.lastIndex);
    }

    let getPrintedNumbers = document.getElementById("printedNumbers"); //grab the printedNumbers div
    getPrintedNumbers.append(newP2); //append the generated and now modified <p> to the the printedNumbers div so that the results display in the browser
    // console.log("this button was clicked");


}

// console.log(getExecButton);
getExecButton.addEventListener("click", printMatchUsingExec); //grab the 'printMatchUsingExec' button and attach an event listener to it so that the matches display in the browser upon click

//practice on split()
//split() splits a string object into an array of strings by separating the strings into substrings, using a specified separator string to determine 
//where to make each split

let splitText = "The world is a beautiful place and I am no longer afraid to die";
const re = /\s+/;
let splitArray = splitText.split(re);
for (let i = 0; i < splitArray.length; i++) {
    // document.write(splitArray[i] + "<br>");
}
console.log(splitArray);

//syntax: str.split([separator[, limit]])
//separator is treated as a string or regex. if separator is omitted or does not occur the array returns contains one element consisting of the entire string
//if separator is an empty string, str is converted to an array having one element for each character of str
//limit specifies number of splits to be found

//if separator is not found or omitted, the array contains one element consisting of the entire string
let notFoundText = "This text will be tested for a separator that will not be found";
let notFoundRegex = /!+/;
let notFoundArray = notFoundText.split(notFoundRegex);
console.log(notFoundArray); //prints the entire string because there are no exclamation marks

//if separator is an empty string, str is converted to an array of characters
let charArray = splitText.split('');
console.log(charArray);

//if separator appears at the beginning or end of the string, or both, the array begins, end, or both begins and ends, respectively, with an empty string
const emptyStringRegex = /[A-Z].+[a-z][\.\!\?]?/; //produces empty string at beginning and end of array on the splitText string
const emptyStringRegexBeginning = /^[A-Z]/; //produices empty string at beginning of array
const emptyStringRegexEnd = /[A-Z]$/i; //produces empty string at end of array

let emptyStringArray = splitText.split(emptyStringRegex);
console.log(emptyStringArray);

//if separator is a regular expression that contains capturing parentheses,
//then each time separator is matched, the results of the capturing parentheses 
//are spliced into the output array
const spaceFollowedByALetter = /\s([a-z])/i; //regex that matches any space followed by any case insensitive letter
let spaceFollowedByALetterArray = splitText.split(spaceFollowedByALetter);
console.log(spaceFollowedByALetterArray);

//create a function in which the arguments are the string to split and the separator that splits them
//print the original string
//print the separator
//print the amount of elements in the output array and the individual values of the array

let splitStringFn = (stringToSplit, separator) => {
    let stringToSplitArray = stringToSplit.split(separator);
    console.log(`The original string is: ${stringToSplit}`);
    console.log(`The separator is: ${separator}`);
    console.log(`The amount of elements in the output array is: ${stringToSplitArray.length}. The values of this array are: ${stringToSplitArray.join(' / ')}`);
}

let splitStringFnText = "I am going to use a function on this text to split up all of these words";
let splitStringFnRegex = /\s/;

splitStringFn(splitStringFnText, splitStringFnRegex);

//String.prototype.replace()
//the replace() method returns a new string with some or all matches of a *pattern* replaced by a *replacement*.
//the pattern can be a string or a regex, and the replacement can be a string or a function to be called for each match.
//if the pattern is a string, only the first occurrence will be replaced

let replaceText = "All that glitters is not gold and all that is gold does not glitter";
let replaceRegex = /gold/g;
let newReplaceText = replaceText.replace(replaceRegex, "silver");
console.log(newReplaceText);
let newReplaceTextUsingString = replaceText.replace("gold", "silver");
console.log(newReplaceTextUsingString);

//Syntax: var newStr = str.replace(regex|substr, newSubstr|function)
//regex|substr are the patterns
//newSubstr|function are the replacements
//replace() returns a new string with some or all matches of a pattern replaced by a replacement
//this method does not mutate the original string unless you assign the string to the method call (i.e. s = s.replace(str, newSubstr))

//you can specify a function as the second parameter. In this case, the function will be invoked after each match has been performed.
//the function's return value will be used as the replacement string.
//the function will be invoked multiple times if the regex has a global flag

//the function that uses p1, p2, p3 as the capture groups for the regex and separates the output with a forward slash. Returns a string
let replaceFn = (match, p1, p2, p3, offset, string) => {
    return [p1, p2, p3].join(" / ");
}
let replaceFnText = "abc123!@#";
let replaceFnRegex = /([^\d]*)(\d*)([\W]*)/; //matches zero or more non-digits, followed by zero or more digits, followed by zero or more non-alphanumeric characters
let replaceFnNewText = replaceFnText.replace(replaceFnRegex, replaceFn);
console.log(replaceFnNewText); //outputs abc / 123 / !@#

//the replacement string can include special replacement patterns
let stringParameterText = "Who doesn't love money?";
let stringParameterRegex = /(\w+)([\.\?\!])$/;
stringParameterArray = stringParameterText.match(stringParameterRegex);
console.log(stringParameterArray[1]);
let stringParameterTextNew = stringParameterText.replace(stringParameterRegex, '$$?'); //expected output: 'Who doesn't love $?'
console.log(stringParameterTextNew);
// console.log(stringParameterText.match(stringParameterRegex));

//Switching words in a string
let nameRegex = /(\w+)\s(\w+)/; //matches one or more alphanumeric followed by a space followed by one or more alphanumeric
let nameExample = "Nate Sims";
let lastNameFirstName = nameExample.replace(nameRegex, '$2, $1'); //the replacement string uses the captured groups to display the last name(group 2) then the first name(group 1)
console.log(lastNameFirstName);

//Using an inline function that modifies the matched characters
//below is a function that takes a camel case property name (such as borderTop) and converts it to hyphen format (border-top)
const styleHyphenFormat = (propertyName) => {
    const upperToHyphenLower = (match, offset, string) => {
        return (offset > 0 ? '-' : '') + match.toLowerCase(); //if there is a matched substring (a capital letter) then display a dash followed by the match converted to lowercase
    }
    return propertyName.replace(/[A-Z]/g, upperToHyphenLower) //runs a closure if a capital letter is found
}

console.log(styleHyphenFormat('backgroundColor')); //output is 'background-color'

//replacing a farenheit degree with its celsius equivalent 
//below is a function that accepts a string argument (in the format 32.0F)
//it converts the input to celsius 
function f2c(x) {
    function convert(str, p1, offset, s) {
        return ((p1 - 32) * 5 / 9) + 'C'; //takes the first captured group and converts it to Celsius
    }
    var s = String(x); //takes the input argument and converts it to a String object
    //below is a regex that matches an optional dash followed by one or more digits followed by a 
    //literal period followed by one or more digits followed by the 'F' character. 
    //The first captured group is all of the numbers before the 'F'
    var test = /(-?\d+(?:\.\d+)?)F\b/g;
    return s.replace(test, convert);
}

let currentTemp = '47F';
console.log(`The current temperature is ${currentTemp}. The temperature in Celsius is ${f2c(currentTemp)}`);

//Use an inline function with a regex to avoid for loops
let str = 'x-x_';
let retArr = [];
let strMatch = /(x_*)|(-)/g; //matches an 'x' followed by zero or more '_' or a '-' throughout a string
// first captured group (p1) is an x followed by zero or more '_'
//second captured group (p2) is a '-'
str.replace(strMatch, function (match, p1, p2) {
    if (p1) {
        retArr.push({
            on: true,
            length: p1.length
        });
    } //adds an object to the array if the first captured group is found
    if (p2) {
        retArr.push({
            on: false,
            length: 1
        });
    }
});

console.log(retArr);


//the function below is an event listener that displays the text in the text area
//by grabbing each individual word (more literally a sequence of characters separated by a space)
//and assigning each to a span element
//upon mouse hover of each word, the css styling is slightly changed
//and each word is replaced randomly by another word in the paragraph
const displayText = () => {
    // alert("This button was clicked!");
    let getTextAreaValueGlobal = document.querySelector("textarea").value;
    // let getTextAreaValueRegex = /("?\w+[-.,"']?)/
    let getTextAreaValueRegex = /\s/ //the regex used in split() that separates groups of characters by a space

    // let createParagraphElement = document.createElement("p");
    // let paragraphInnerText = getTextAreaValueGlobal.split(getTextAreaValueRegex);
    let createSpanArray = getTextAreaValueGlobal.split(getTextAreaValueRegex); //creates an array of "words"
    // paragraphInnerText = 
    let getresultsDiv = document.getElementById("paragraphMatchResults"); //grab the div that will append the generated span elements

    //a loop that creates the span elements that will contain the matched words
    //also contains two event listeners which will change the styling of each span on focus and blur
    for (let i = 0; i < createSpanArray.length; i++) {
        // createParagraphElement.innerHTML += paragraphInnerText[i] + " ";
        let createSpan = document.createElement("span"); //create span elements for each element in the array created by split()
        createSpan.innerHTML += createSpanArray[i] + " "; //sets the inner text of each span to each value in the array respectively. follow each value by a space for formatting
        getresultsDiv.append(createSpan); //append the generated spans to the div for better control in css
        createSpan.style.backgroundColor = "#696969";

        //nested event listeners that alter the styling and inner text of each span (word) hovered over or not hovered over
        createSpan.addEventListener("mouseover", function logSpan() {
            // console.log("You are hovering over each span element");
            console.log(this);
            this.style.color = "black";
            this.style.backgroundColor = "#e60f1e";
            this.innerHTML = createSpanArray[Math.floor(Math.random() * createSpanArray.length)] + " "; //replaces the text of the span with another random word from the paragraph
            this.style.fontSize = "32px";
            //when a word is not hovered over anymore, return the original styling
            createSpan.addEventListener("mouseleave", function returnToNormalFontSize() {
                this.style.fontSize = "16px";
                createSpan.style.backgroundColor = "#696969";
                this.style.color = "white";

            })
            // this.innerText.style.color = "black";
            // console.log(createSpanArray[i]);
            // createSpan.style.color = "black";
        })

    }
    // createParagraphElement.append(paragraphInnerText);
    let getTextAreaValueGlobalCharArray = getTextAreaValueGlobal.split('');
    console.log(getTextAreaValueGlobalCharArray);
    // getresultsDiv.append(createParagraphElement);
    // console.log(paragraphInnerText);
    console.log(getTextAreaValueGlobal);
}

let getDisplayTextButton = document.getElementById("displayText");
getDisplayTextButton.addEventListener("click", displayText);