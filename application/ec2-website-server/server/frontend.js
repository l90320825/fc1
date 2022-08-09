const express = require('express');
const path = require('path');
const app = express();

//Outputs the react front end
//To use:
//npm run build - from my-app folder
//node frontend.js - from this folder
//app.use(express.static(path.join(__dirname, '../..', 'front-end/my-app/build')));
app.use(express.static(path.join(__dirname, '../..', 'website-code/client/build')));

app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, '../..', 'front-end/my-app/build', 'index.html'));
  res.sendFile(path.join(__dirname, '../..', 'website-code/client/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Listening on port ${port}`);
