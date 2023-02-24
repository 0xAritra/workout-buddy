import { useReducer } from "react"
import { WorkoutsContext, workoutsReducer } from "./WorkoutsContext"

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  })

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutsContext.Provider>
  )
}
