# Code for my blog post - [How to build your own Uber-for-X App](https://medium.freecodecamp.com/how-to-build-your-own-uber-for-x-app-33237955e253#.hhddn3s2m)

### How to install:

- Clone or fork this repo
- Install NodeJS and MongoDB
- Run `sudo npm install`
- run `mongoimport --db myUberApp --collection policeData --drop --file ./cops.json` to import sample cop information in MongoDB
- run `mongoimport --db myUberApp --collection requestsData --drop --file ./crime-data.json` to import sample crime information in MongoDB

### How to run: 

- run `node app.js`
- Open a demo citizen page by going to http://localhost:8000/citizen.html?userId=YOURNAME
- Open 3 or more cop pages from the imported cop profiles on separate tabs - [01](http://localhost:8000/cop.html?userId=01), [02](http://localhost:8000/cop.html?userId=02), [03](http://localhost:8000/cop.html?userId=03), [04](http://localhost:8000/cop.html?userId=04), [05](http://localhost:8000/cop.html?userId=05), [06](http://localhost:8000/cop.html?userId=06), [07](http://localhost:8000/cop.html?userId=07)