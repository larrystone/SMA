[![Maintainability](https://api.codeclimate.com/v1/badges/92567b8c30ec479c0c18/maintainability)](https://codeclimate.com/github/larrystone/SMA/maintainability)

# SMA
SMA is a collection of APIs for the SMS Management Application.

## Hosted Application
https://larrystone-sma.herokuapp.com

## API Documentation


## Installation 
1. Install [`node`](https://nodejs.org/en/download/), version 5 or greater

2. Install [`postgres`](https://www.postgresql.org/download/)

3. Clone the repo and cd into it

    ```
    git clone https://github.com/larrystone/SMA.git"
    cd sma
    ```

4. Install all dependencies

    ```
    yarn install
    ```

5. Configure Postgres

    ```
    configure your environment variables in
    `./api/v1/configs/index.js` using .env.example file template
    ```

6.  Run database migrations

    ```
    $ sequelize db:migrate
    ```

7. Start the app

    ```
    yarn dev
    ```

8. Test the application with POSTMAN or with curl

    ```
    http://localhost:3000/
    ```    

## Testing

The app uses `Mocha`, `Chai` and `Chai-Http` for testing, 
Run `yarn test` to run tests

## Limitations
- You can only view location record with up to 4 level of nesting for depth. However, you can create unlimited level of nesting

## Built With
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
* [ExpressJs](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Sequelize](http://docs.sequelizejs.com/) - An ORM for Node.js that supports the dialects of PostgreSQL and features solid transaction support an relations.
* [Postgres](https://www.postgresql.org/) - A powerful, open source object-relational database system.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


## Author

* **Lawal Lanre E. (Larrystone)** - Aspiring Software Dev.
