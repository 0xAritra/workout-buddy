const { default: mongoose } = require("mongoose")
const Workout = require("../models/workoutModel")

// Get all Workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })
  res.status(200).json(workouts)
}

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body
  const emptyFields = []
  if (!title) emptyFields.push("title")
  if (!reps) emptyFields.push("reps")
  if (!load) emptyFields.push("load")
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all the fields!", emptyFields })
  }
  try {
    const workout = await Workout.create({ title, reps, load })
    res.status(200).json(workout)
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: error.message })
  }
}

// Get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "workout not found" })
  }
  const workout = await Workout.findById(id)
  if (!workout) return res.status(404).json({ error: "workout not found" })
  res.status(200).json(workout)
}

// update workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "workout not found" })
    }
    const workout = await Workout.findByIdAndUpdate(id, { ...req.body })
    if (!workout) return res.status(404).json({ error: "workout not found" })
    res.status(200).json({ workout })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

// delete workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "workout not found" })
    }
    const workout = await Workout.findByIdAndDelete(id)
    if (!workout) return res.status(404).json({ error: "workout not found" })
    res.status(200).json(workout)
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

module.exports = { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout }
