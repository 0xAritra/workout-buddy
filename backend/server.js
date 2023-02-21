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
