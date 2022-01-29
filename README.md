![Project Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

![](https://cdn-images-1.medium.com/max/1000/1*WcHHixgDq7o5lN3biKIu9Q.png)
# Code for my blog series:
- [How to build your own Uber-for-X App](https://www.ashwinhariharan.tech/blog/how-to-build-your-own-uber-for-x-app/)
- [How to build your own Uber-for-X App - Part 2](https://www.ashwinhariharan.tech/blog/how-to-build-your-own-uber-for-x-app-part-2/)


## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.JS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) 

## How to install:
- Install [NodeJS](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/)
- Fork this project and clone it in your machine
- `cd` to your project root and run `npm install`
- run `mongoimport --db uberForX --collection cops --drop --file ./db/cops.json` to import sample cop information in MongoDB
- run `mongoimport --db uberForX --collection requests --drop --file ./db/crime-data.json` to import sample crime information in MongoDB

## How to run:
- Run `node app.js` in your project root folder
- Open a demo civilian page by going to http://localhost:8000/civilian.html?userId=YOURNAME
- Open 3 or more cop pages from the imported cop profiles on separate tabs - [01](http://localhost:8000/cop.html?userId=01), [02](http://localhost:8000/cop.html?userId=02), [03](http://localhost:8000/cop.html?userId=03), [04](http://localhost:8000/cop.html?userId=04), [05](http://localhost:8000/cop.html?userId=05), [06](http://localhost:8000/cop.html?userId=06), [07](http://localhost:8000/cop.html?userId=07)


-----

![Made with love](http://ForTheBadge.com/images/badges/built-with-love.svg) 

## Did this project help you? I'd love your support 🙏

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I2131HO)

<a href="https://www.buymeacoffee.com/booleanhunter" target="_blank">
  <img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;">
</a>
 ## To do

- Mimic a moving cop and a moving civilian that continuously send location updates to each other in real time, and update the marker icons on the map.
- Set the status field to closed once the cop has helped the civilian out. Then, you can assign a different colour to visualize closed issues on a heat-map. That way you’ll have an understanding of how efficient cops are in a given area.
- Build a rating system with which a civilian and a cop can rate each other. This way, neither civilian nor cop will misuse the system, and cops can get performance reports.
- Have a cool looking user interface, like Material UI.
- Lastly, have a sign-up and login mechanism!
