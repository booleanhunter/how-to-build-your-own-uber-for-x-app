![](https://cdn-images-1.medium.com/max/1000/1*WcHHixgDq7o5lN3biKIu9Q.png)
# Code for my blog series:
- [How to build your own Uber-for-X App](https://blog.booleanhunter.com/how-to-build-your-own-uber-for-x-app/)
- [How to build your own Uber-for-X App - Part 2](https://blog.booleanhunter.com/how-to-build-your-own-uber-for-x-app-part-2/)

### How to install:
- Clone or fork this repo
- Install NodeJS and MongoDB
- Run `npm install`
- run `mongoimport --db uberForX --collection cops --drop --file ./db/cops.json` to import sample cop information in MongoDB
- run `mongoimport --db uberForX --collection requests --drop --file ./db/crime-data.json` to import sample crime information in MongoDB

### How to run:
- run `node app.js`
- Open a demo civilian page by going to http://localhost:8000/civilian.html?userId=YOURNAME
- Open 3 or more cop pages from the imported cop profiles on separate tabs - [01](http://localhost:8000/cop.html?userId=01), [02](http://localhost:8000/cop.html?userId=02), [03](http://localhost:8000/cop.html?userId=03), [04](http://localhost:8000/cop.html?userId=04), [05](http://localhost:8000/cop.html?userId=05), [06](http://localhost:8000/cop.html?userId=06), [07](http://localhost:8000/cop.html?userId=07)

### Did this project help you? I'd love your support.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I2I2131HO)

<a href="https://www.buymeacoffee.com/booleanhunter" target="_blank">
  <img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;">
</a>