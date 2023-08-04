<br/>

## Table Of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [API Docs](#api-docs)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [License](#license)

## About The Project

REST API for ecommerce using Node.js, Express.js, and MongDB.

<strong>Please read the "Getting Started" section before opening an issue.</strong>

## Features
- Authentication System ( login, logout, register )
- CRUD operations for brands.
- CRUD operations for Categories.
- CRUD operations for Products.
- Cart Logic.
- Order Logic.
- Search Functionality.

## API Docs
<a href="https://documenter.getpostman.com/view/17672386/2s9XxyQsn1#8dad336f-8256-4e8e-bd5a-1d92781df681" target="_blank"> Link to api docs </a>

## Built With

* Node.js
* Express.js
* MongoDB | Mongoose

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Node.js
* Express.js
* MongoDB

### Installation

1. Clone the repo

```sh
    git clone https://github.com/MUSTAFA-Hamzawy/eCommerce_api_express.js.git
```

2. Make your own copy of the .env file (To set your own environmental variables).
```sh
    cp .env.example .env
 
    PORT= 3005
    CONNECTION_STRING= your db connection string
    JWT_ACCESS_TOKEN_KEY= generate it (run node in terminal --> require('crypto').randomBytes(60).toString('hex')
    JWT_REFRESH_TOKEN_KEY= generate it (run node in terminal --> require('crypto').randomBytes(60).toString('hex')
    ACCESS_TOKEN_EXPIRED_TIME  // 15m is recommended
    REFRESH_TOKEN_EXPIRED_TIME // Set duration as you like ( examples: 18h, 2d )
```

3. Install dependecies

```sh
    npm install
```
4. Start Running
```sh
    npm start
```


## License
See [LICENSE](https://github.com/MUSTAFA-Hamzawy/eCommerce_api_express.js/blob/main/LICENSE) for more information.
- MIT License
- Copyright 2020 © [Mustafa Hamzawy](https://github.com/MUSTAFA-Hamzawy)
