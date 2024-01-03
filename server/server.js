//import

//establish baseline express.static

app.use(express.static(path.join(__dirname, '../client')));

//set your endpoints

//set your global errors

app.get('/getAllData', middleware, (req, res) => {});
