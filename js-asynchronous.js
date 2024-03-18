"use strict";

const NUMBERS_API_BASE_URL = "http://numbersapi.com";

async function showNumberTrivia(number) {
  const resp = await fetch(`http://numbersapi.com/${number}`, {
    headers: {"Content-Type": "application/json"}
  }
  );
  const data = await resp.json();
  console.log("Number fact: ", data.text);
}

showNumberTrivia(5);