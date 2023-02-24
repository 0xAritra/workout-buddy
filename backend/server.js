require("dotenv").config()
const express = require("express")
const workoutRoutes = require("./routes/workouts")
const mongoose = require("mongoose")

const app = express()

// Middlewares
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
app.use(function (req, res, next) {
  // cors
  res.header("Access-Control-Allow-Origin", "http://localhost:5173") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
  next()
})

// Routes

app.use("/api/workouts", workoutRoutes)

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome!" })
// })

const PORT = process.env.PORT || 5000

// Connect to DB then start taking requests
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB && Listening on PORT:", PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
