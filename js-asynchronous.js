"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";

/** makes a request to the Numbers API
 * to get trivia about your favorite number.
 */

async function showNumberTrivia(number) {
  const resp = await fetch(`http://numbersapi.com/${number}`, {
    headers: {"Content-Type": "application/json"}
  }
  );
  const data = await resp.json();
  console.log("Number fact: ", data.text);
}

showNumberTrivia(5);


/** requests trivia about four different numbers,
 * log the piece of trivia for the winning number
 * as soon as one request returns
*/

async function showNumberRace(num1, num2, num3, num4) {
  const firstNum = fetch(`http://numbersapi.com/${num1}?json`);
  const secondNum = fetch(`http://numbersapi.com/${num2}?json`);
  const thirdNum = fetch(`http://numbersapi.com/${num3}?json`);
  const fourthNum = fetch(`http://numbersapi.com/${num4}?json`);

  const answerPromise = await Promise.race([firstNum, secondNum, thirdNum, fourthNum])
  const data = await answerPromise.json()

  console.log("Number fact: ", data.text);
}

showNumberRace(1124, 43, 266, 123);