import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState("")
  const [load, setLoad] = useState("")
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch } = useWorkoutsContext()

  const submitHandler = async (e) => {
    e.preventDefault()

    const workout = { title, reps, load }
    const response = await fetch("http://localhost:5000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle("")
      setReps("")
      setLoad("")
      setError(null)
      setEmptyFields([])
      console.log("new workout added: ", json)
      dispatch({ type: "CREATE_WORKOUT", payload: json })
    }
  }

  return (
    <form className="create" onSubmit={submitHandler}>
      <label>Exercise Title:</label>
      <input
        type="text"
        className={emptyFields.includes("title") ? "error" : ""}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>No. of Reps:</label>
      <input
        type="number"
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
