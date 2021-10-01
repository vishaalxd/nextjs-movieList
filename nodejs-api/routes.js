const router = require("express").Router();
const axios = require('axios');


router.get("/avengers", async (req, res) => {
  try {
    const requestData = await axios(
      "https://api.tvmaze.com/search/shows?q=avengers");
    const {data} = requestData;
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
    console.log(err, "Failed to get LIST OF MOVIES");
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const requestData = await axios(`https://api.tvmaze.com/shows/${id}`);
    const {data} = requestData;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send('Error');
    console.log(err, "Failed to get details");
  }
});



module.exports = router;