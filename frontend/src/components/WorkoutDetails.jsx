import { formatDistanceToNow } from "date-fns"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const clickHandler = async () => {
    const response = await fetch("http://localhost:5000/api/workouts/" + workout._id, {
      method: "DELETE",
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json })
      console.log("deleted workout: ", json)
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        No. of Reps: <strong>{workout.reps}</strong>
      </p>
      <p>
        Load (kg): <strong>{workout.load}</strong>
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={clickHandler}>
        delete
      </span>
    </div>
  )
}

export default WorkoutDetails
