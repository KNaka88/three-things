# Three Things

#### Capstone Project for Epicodus by Koji Nakagawa

## Description
* This app offers cloud based personal diary page
* User can also connect with friends and see others' diaries by adding search keyword

* [Web Page](https://www.three-things.site)

## How to use?

To use three-things, you need to create your account. After you created new account, verification mail will be sent to your email.

![sing up form](/src/assets/readme-image/image-1.png)


On your top page, click "MAKE DIARY" button to write your diary. You can also upload your picture. Picture size will be automatically adjusted to 330x330px so square size would be better.

![top page](/src/assets/readme-image/image-2.png)

On your setting menu, you can change your profile or password or delete account. In addition, you can add your search keyword so that your friend can find you. Once you created your search keyword, you cannot change anymore.

![top page](/src/assets/readme-image/image-4.png)


On your find friends menu, you can search your friends by typing search keyword.

![top page](/src/assets/readme-image/image-5.png)


Once you connected with your friends, you can see their diaries if they set the privacy level as "Friend".

![top page](/src/assets/readme-image/image-3.png)




## Prerequisites
You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Angular CLI](https://cli.angular.io/)

## API Key
You need to get google map api and firebase account
* [Firebase](https://firebase.google.com/docs/web/setup)

## Installation
* Change the file name of `api_keys_template.ts` to `api_keys.ts` (src/app), and add your Firebase api-key
* `git clone this repository`
* `cd three-things`
* `npm install`
* `bower install`
* `ng s` to start a dev server. Navigate to `http://localhost:4200/`.

![add your firebase api](/src/assets/readme-image/api-instruction.png)

## Known Bugs
* Notification badge does not properly working
* Cancel Friend Request, Decline Friend Request is not properly working
* If you go to three-things.site page while you're logged in, navigation menu does not disappear.

## Technologies Used
  * HTML
  * CSS
  * Bootstrap
  * Material Design Lite
  * Javascript
  * Typescript
  * Angular
  * Node.js
  * npm
  * bower
  * Firebase

##### This project was generated with
[angular-cli](https://github.com/angular/angular-cli) version 1.0.0.

[angularfire2](https://github.com/angular/angularfire2) version 4.0.0

## License
  _Copyright (c) 2017 **Sarah Leahy, Jake Campa, Koji Nakagawa**_

  _Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:_

  _The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software._

  _THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE._
