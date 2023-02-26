# Weather Dashboard
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Link to site

https://daisyeverard.github.io/Weather-Dashboard/

## Preview

<p align="center">
  <img src="./assets/images/preview.png" width="700" alt="screenshot of site">
</p>

## Overview

A dashboard where you can search for a city and see the current weather conditions, and forecast for the next 5 days

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Issues and Solutions](#issues-and-solutions)
- [Contacts](#contacts)

## Features

- Seach bar for desired city
- clear button to remove history buttons and remove local storage item
- History buttons showing 10 most recently searched cities
- If city searched already in buttons, that button moves to most recent
- When button clicked, that button moves to most recent
- Box for today's weather with: 
    - Today's date
    - Icon to represent the weather
    - Temperature
    - Humidity
    - Wind Speed

- Boxes for 5 days in the future, each at the same time of day with:
    - Day
    - Temperature
    - Wind Speed
    - Humidity

- Tomorrow box has unique title 'tomorrow', different colour, and larger size on most screens. 

## Technologies

- HTML
- Bootstrap
- FontAwesome
- CSS
- JavaScript
- moment.js
- jQuery

## Issues and Solutions

#### Make most recent searches/clicks come to top of list

The structure of the functions was changed so one handled button display `storedBtnFunc` and one handled adding to local storage `newStorageFunc`. This was so the same logic could easily be applied to both the search box and button click events. 
The local storage could then be edited by splicing the index that matched the search, and sifting the new (same) term to the front of the storage array. 
The button display was then updated to reflect the change

#### In cities with more than one word, duplicates were still created

The original loop to prevent duplicates standarized capitals by taking the whole word to lower case, the then first item to upper case. This means only first word was capitalised. 

A more complex word processing structure was adopted using an array with each word of the search term, processing them seperately, then joining again. The capitalizing process was also moved outside of the `if()` statement to verify if `history` already existed or not. 

## Contacts

- GitHub: [DaisyEverard](https://github.com/DaisyEverard)
- LinkedIn: [daisy-everard](https://www.linkedin.com/in/daisy-everard/)
- Email: msdeverard@gmail.com

## License

MIT License
