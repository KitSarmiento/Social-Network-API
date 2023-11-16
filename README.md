# Social-Network-API

This week's challenge is to create an API for a social network where users can share their thoughts, react to their friends' posts, and create a list of friends.

## Table of Contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)

   3.1. [API Routes](#api_routes)

4. [Credits](#credits)
5. [License](#license)
6. [Contact](#contact)

## Description

The main objective of the project is to develop a social media platform that enables users to share their thoughts, react to their friends' thoughts, and maintain a list of their friends. To achieve this goal, Express.js will be utilized for handling routing, and data storage will be managed by the Mongoose ODM in a MongoDB database.

## Installation

To get started, begin by cloning the repository. You can do this by either copying the SSH key or HTTP. Once you have done this, open the application depending on the code editor you are using. In the terminal, run the command `npm install` or `npm i` to install all applicable dependencies. After that, run 'npm start' to launch the application.

## Usage

After running the `npm start` or `node index.js` commands, you can test the API routes by using the Insomnia application. I have provided a list of API routes, as well as a walkthrough video and an image of the application, which should serve as a helpful guide for users on how to use the application.

### API Routes

Users: `/api/users`

Friends: `/api/users/:userId/friends/:friendId`

Thoughts: `/api/thoughts`

Reactions: `/api/thoughts/:thoughtId/reactions`

Check out the Insomnia by Kong walkthrough video that demonstrates and tests the API routes.

Walkthrough video: https://drive.google.com/file/d/1plPCvS7Y7c8FjtP5S5OldPf6FYVUmp6N/view

Project Screenshot:

![image](https://github.com/KitSarmiento/Social-Network-API/assets/135483936/bb52a029-3658-4476-88ff-9cc63933960e)

![image](https://github.com/KitSarmiento/Social-Network-API/assets/135483936/52950398-3f83-45e8-aff1-c027badb76dc)

## Credits

• Email validation: https://www.mongodb.com/community/forums/t/football-social-media-schema/224954

• Time and date - https://momentjs.com/ - https://stackoverflow.com/questions/30888197/format-datetime-to-yyyy-mm-dd-hhmmss-in-moment-js

• Insomnia by Kong - https://insomnia.rest/products/insomnia

• MongoDB: https://www.mongodb.com/docs/manual/

• Codecademy: Learn MongoDB https://www.codecademy.com/learn/learn-mongodb

• Class Activities - References from Module 18 - Activities 23 for application structure and code.

## License

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License. Please refer to the License file in the repository for more information.

## Contact

If you have any questions or inquiries, please feel free to contact me.

- Email: ksarmiento020@gmail.com

- GitHub: https://github.com/KitSarmiento
