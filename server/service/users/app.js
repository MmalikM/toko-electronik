  if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

  const express = require("express");
  const cors = require("cors");
  const app = express();
  const port = process.env.PORT || 4001;
  const router = require("./routes/index");
  const { mongoConnect } = require("./config/mongoConenction");
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(router);
 
mongoConnect().then(()=>{
  console.log("bebas");
    app.listen(port, () => { console.log(`Example app listening on port ${port}`);});
})


  