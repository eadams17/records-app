# Logikcull Challenge

A small app that stores and display record information, with the ability to edit and search for records by keyword.

## Setup

1. From the root directory, run `npm install`
2. Run `npm run start`

The app should now be accessible from `http://localhost:3000/`

To run tests, run `npm run test` in a separate terminal.

## Overview

This is a purely frontend application using **React** and various **React** packages. The record data is fetched locally from a JSON file and presented in a paginated, grid fashion . The navbar is fixed at the top throughout scroll and has a search bar with various options to search by (all, artist name, album name, year of publication and record condition). The record data that is displayed and available to edit include all of the aforementioned.

Upon load, a `GET` request is made in the `componentDidMount` function of the highest level `App` component to fetch all of the record data. The record data is asynchronously loaded into that component's state and distributed to all children as props. There is an `updateRecords` class function that is passed to children for updating state when record edits and searches are performed. As there is no server, any edits will not persist.

## Technology

I chose to use **React** for building out the UI. I chose **React** because it's fast, well-documented and supports some really cool packages for adding various features. I used `Reactstrap` because they offer some useful `Bootstrap` components that are both responsive and have sleek, easily-customizable design. I also decided to try using `React Spring`. I used it to make the record cards respond to when a user hovers over the card. The package seems to offer some powerful ability to make some really awesome animations based on spring-physics. For styling, I decided to use `CSS Modules`. I like that all styles are scoped locally, helping to keep things more organized. As for testing, I used `Enzyme` and `Jest`. These are both great for testing **React** applications as they make mocking and asserting a breeze.

## Optimizations & Considerations

Since this is purely a frontend application, there are some challenges that came with processing the data. I would have liked to implement a server (I was thinking `Sinatra` since it's a lightweight framework and I've been wanting to use `Ruby` again) possibly with a `PostgreSQL` database. I would have built out a RESTful API, using a `GET` route for handling the fetching of all records. I would have also added optional parameters for limit and offset to handle the pagination on the backend. I would have also built a `PUT` route for handling the record edits and a `POST` and `DELETE` for handling add/removing records.

Being able to have this backend implementation would have also helped with separating out the handling of updating individual records versus multiple, as there are some records that belong to the same artist. I was thinking about building out the UI in a different way where the records would be arranged in rows by artist, which would have made it easier to handle. I ultimately decided to keep the UI like because I felt like it was more aesthetically pleasing.

On that same note, since the state is all being handled at the highest level component, I would have liked to institute some kind of state mangagement system (most likely Redux). This would have helped to keep the data in a unidirection flow.

Given more time, I also would have definitely played around more with the `React Spring` library to build out some more fun, interactive features. Additionally, I would have maybe expanded on accessibility. I tried to make the application fairly accessible by adding various tabbing and using elements that are screen reader friendly when dealing with text descriptions.

I added in some basic unit tests for each component to test the core class functions. I would have liked to add more elaborate tests to each test file as well as adding a whole set of tests for all of the helper functions. I also would have liked to add more validation checks. As it is now, the record update form only checks to make sure that each input is not blank. I would have liked to have added some validations for a valid year and perhaps a character limit for album title and artist name.
