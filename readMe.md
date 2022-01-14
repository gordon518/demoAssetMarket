# Special Feature
Make difference by innovating frameworks. Convension over config. Our back-end router is different, system will automatically process every URL requests, and dispatch requests to relevant processor in api folder.
For example: for the URL call of "/api/login", system will dispatch this call to the file of "/api/login.js".
By this convension, we can get rid of config of every URL calls.
<br>
This project use node express(back end)/react(front end) framework. The front use function as react component, and react hooks.
<br>
The main page will show building list. You can search by ID, Name in the page, the name search supports fuzzy lookup. The page also support sorting by each column.
<br>
The functionality of finding nearest tower used KD-Tree to speed up searching. There is the file of test/testApi.js for unit test of this API.

# Run Guide
1 Install Node-v12.22.0<br>
2 Run "npm install" to install node modules.<br>
3 Run "npm run pack" to pack react codes.<br>
4 Run "node app.js" to start the app.<br>
5 Open a web browser, go to "localhost:8888"<br>
