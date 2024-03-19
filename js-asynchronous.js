"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";

/** makes a request to the Numbers API
 * to get trivia about your favorite number.
 */

async function showNumberTrivia(number) {
  const resp = await fetch(`http://numbersapi.com/${number}?json`);
  const data = await resp.json();
  console.log("showNumberTrivia: ", data.text);
}


/** requests trivia about four different numbers,
 * log the piece of trivia for the winning number
 * as soon as one request returns
*/

async function showNumberRace(num1, num2, num3, num4) {
  // TODO: use map (put in array) -- tighten up code
  // TODO: recieve an array of numbers
  const firstNum = fetch(`http://numbersapi.com/${num1}?json`);
  const secondNum = fetch(`http://numbersapi.com/${num2}?json`);
  const thirdNum = fetch(`http://numbersapi.com/${num3}?json`);
  const fourthNum = fetch(`http://numbersapi.com/${num4}?json`);

  // indicate that we are only getting one response back
  const winner = await Promise.race([firstNum, secondNum, thirdNum, fourthNum]);
  const data = await winner.json();

  console.log("showNumberRace: ", data.text);
}


/** Request trivia for three numbers from the numbers API. Console logs array
 * of objects with data about each response.
*/

async function showNumberAll(num1, num2, num3) {
  // TODO: use map (put in array) -- tighten up code
  // TODO: recieve an array of numbers
  const firstNum = fetch(`http://numbersapi.com/${num1}?json`);
  const secondNum = fetch(`http://numbersapi.com/${num2}?json`);
  const thirdNum = fetch(`http://numbersapi.com/${num3}?json`);

  const results = await Promise.allSettled([firstNum, secondNum, thirdNum]);

  // const okResponses = results
  // .filter(r => r.status === "fulfilled" && r.value.ok === true)
  // const badResponses = results
  // .filter(r => r.status === "fulfilled" && r.value.ok === false);

  const okArr = [];
  const badArr = [];

  for (let response of results) {
    if (response.status === "fulfilled" && response.value.ok === true) {
      let data = await response.value.json();
      okArr.push(data.text);
    }
    else {
      badArr.push(response.value.statusText)
    }
  }

  console.log("showNumberAll fulfilled:", okArr);
  console.log("showNumberAll rejected:", badArr);

}

/** calls all three of those functions, in order,
 * moving onto the next function only after
 * the current function fully completes.
 */

async function main() {
  const r1 = await showNumberTrivia(5);
  const r2 = await showNumberRace(1124, 43, 266, 123);
  const r3 = await showNumberAll(459, 5, "wrong");

  let results = [r1, r2, r3];
  console.log(results);

}

main();

