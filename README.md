# Smart Grocery List API

[![Build Status](https://travis-ci.org/SmartGroceryList/api.svg?branch=master)](https://travis-ci.org/SmartGroceryList/api)
[![Coverage Status](https://coveralls.io/repos/github/SmartGroceryList/api/badge.svg?branch=master)](https://coveralls.io/github/SmartGroceryList/api?branch=master)
[![Dependencies Status](https://david-dm.org/SmartGroceryList/api.svg)](https://david-dm.org/SmartGroceryList/api)
[![Dev Dependencies Status](https://david-dm.org/SmartGroceryList/api/dev-status.svg)](https://david-dm.org/SmartGroceryList/api?type=dev)

- Table of Contents
	- [Getting Started](#getting-started)
	- [Configuration](#configuration)
	- [API Endpoints](#api-endpoints)
		- [/health](#health)
		- [/lists](#lists)
		- [/lists/{listID}](#listslistid)
		- [/lists/{listID}/items](#listslistiditems)
		- [/lists/{listID}/items/{itemsID}](#listslistiditemsitemid)
	- [Contributing](#contributing)
	- [LICENSE](#license)


## Getting Started

Install the npm packages described in the package.json and verify that it works:

```bash
# Install the dependencies
npm install

# Test
npm test

# Run
npm start
```

Shut it down manually with Ctrl-C.

## Configuration

The configuration file is located in /config/config.js
- PORT
  - Port the api will listen on.
  - Default: '8080';
- ENV
  - Environment the application is running in.
  - Default: 'Development'
  - Options: 'Development', 'Test', 'Production'
- DB
  - Database connection string.
  - Default: 'mongodb://localhost:27017/sgl'
- JWTSECRET
  - The JWT Secret for authentication.
  - Default: ''
- JWTAUDIENCE
  - The JWT Audience for authentication.
  - Default: ''


## API Endpoints

**Swagger:** API is documented using swagger. http://localhost:8080/swagger

### /health
- GET - Returns true is application is running.

### /lists
- GET - Return all lists
- POST - Create or update a list

### /lists/{listID}
- GET - Return a single list
- DELETE - Delete a list

### /lists/{listID}/items
- GET - Return all items
- DELETE - Delete an item

### /lists/{listID}/items/{itemID}
- GET - Return a single item
- DELETE - Delete an item


## Contributing

Fork -> Clone -> Branch -> {CODE} -> Pull Request

All pull requests require passing unit tests via travis and a manual review.

[Contribution guidelines for this project](CONTRIBUTING.md)

## LICENSE

Copyright 2017 Russell Perkins

Licensed under the Attribution-NonCommercial-NoDerivs 3.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://creativecommons.org/licenses/by-nc-nd/3.0/

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
