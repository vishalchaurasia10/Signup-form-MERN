const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const {mongoose} = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db connected");
}).catch((e) => {console.log(e);})

const app = express();
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"].
        methods: ["POST" , "GET"],
        credentials: true
    }
    ));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


app.use("/",require("./routes/authRoute"));

// const port = 8000;
const port = process.env.PORT || 8000;

app.listen(port , () => {
    console.log(`server running on port ${port}`);
})
