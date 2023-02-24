import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) throw Error("useWorkoutsContext can be used only inside an WorkoutsContextProvider")

  return context
}
