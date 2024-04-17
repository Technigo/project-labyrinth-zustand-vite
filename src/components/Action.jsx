// action description
// action button
// action onclick that calls the API  https://labyrinth.technigo.io/action
import { useLabyrinthStore } from '../store/useLabyrinthStore'
import '../styles/Action.css'
import { useNavigate } from 'react-router-dom'

export const Action = () => {
  const { actions, updateActions, updateLoggedIn, changeLocation } = useLabyrinthStore()
  const navigate = useNavigate();

  return (
    <>
      {actions.map((action, index) => (
        <div key={index} className={action.direction}>
          <button
            id={action.direction}
            type="submit"
            value={action.direction}
            onClick={e => {
                const directionChoice = e.target.value
                updateActions(directionChoice)
                changeLocation()
            }}> 
            {action.direction}
          </button>
          <p>{action.description}</p>
        </div>
      ))}
      <button type="submit" onClick={() => {
        navigate("/") 
        updateLoggedIn(false)}}>Restart</button>
    </>
  )
}
