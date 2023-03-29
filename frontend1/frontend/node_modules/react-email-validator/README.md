# react-email-validator
A simple module to validate an e-mail address

![travis build](https://img.shields.io/badge/build-passing-brightgreen)
![version](https://img.shields.io/npm/v/react-email-validator.svg?style=flat-square)
![downloads](https://img.shields.io/npm/dm/react-email-validator.svg?style=flat-square)


## Installation
Install via NPM:

```bash
npm install react-email-validator

```



## Usage

#### javascript

```javascript

var validate = require("react-email-validator");

validate("test@email.com"); // true

validate("test.com"); // false

```

#### TypeScript

```typescript

import { validate } from 'email-validator';

validate("test@email.com"); // true

validate("test.com"); // false

```

You can also get the result from the `res` variable.

### Usage

```javascript

var validate = require("react-email-validator");
var res = require("react-email-validator");

validate("test@email.com");
 if(res){
     // the email is valid
 }else {
     // the email is invalid
 }

```

#### TypeScript

```typescript

import { validate, res } from 'email-validator';

validate("test@email.com"); // true
if(res){
     // the email is valid
 }else {
     // the email is invalid
 }

```