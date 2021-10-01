const express = require("express");
const apiRoutes = require("./routes") 
let app = express();
// app.use(express.json());

app.use('/tv-shows/',apiRoutes)


const PORT = 3000;
app.listen(PORT, () => console.info(`server has started on ${PORT}`));

