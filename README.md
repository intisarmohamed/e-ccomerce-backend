## E-Commerce Back End

### Description

This project builds the back end for an e-commerce site by configuring a working Express.js API and using Sequelize to interact with a MySQL database.View the walk-through video of this application
[here](https://drive.google.com/file/d/1pXe19G4nBTZNcI4Wbptb02W_id8MZ7IK/view)

### Technologies Used

- JavaScript
- Express
- Sequelize
- Node JS

### User Story

```
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

### Acceptance Criteria

```
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database

```

### Usage

To seed database
`npm run seed`

To run application
`npm run start`
