# Smart Grocery List API

[![Build Status](https://travis-ci.org/SmartGroceryList/api.svg?branch=master)](https://travis-ci.org/SmartGroceryList/api)
[![Build Status](https://david-dm.org/SmartGroceryList/api.svg)](https://david-dm.org/SmartGroceryList/api)

## Getting Started

Environment variables jwtsecret and jwtaudience must be set for authentication to work.

Install the npm packages described in the package.json and verify that it works:

```bash
# Install the dependencies
npm install

# Run
npm start
```

Shut it down manually with Ctrl-C.

## Contributing

Fork -> Clone -> Branch -> {CODE} -> Pull Request

All pull requests require passing unit tests via travis and a manual review. 

[Contribution guidelines for this project](CONTRIBUTING.md)

## Swagger
API is documented using swagger. http://localhost:8080/swagger

## LICENSE
Copyright 2017 Russell Perkins

Licensed under the Attribution-NonCommercial 4.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://creativecommons.org/licenses/by-nc/4.0/

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
