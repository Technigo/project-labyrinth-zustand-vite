import { useEffect, useState } from "react";
import useGameStore from "../store/gameStore";
import "../css/GameComponent.css";

export const GameComponent = ({ changeImage, onRestart }) => {
  const { coordinates, description, actions, performAction, restart } =
    useGameStore();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  useEffect(() => {
    console.log("Current coordinates:", coordinates);
    changeImage(coordinates);
  }, [changeImage, coordinates]);

  return (
    <div className="game-container">
      <h2>{description}</h2>
      {actions.length > 0 && (
        <div>
          {actions.map((action, index) => (
            <div key={index}>
              {showDetails && <p>{action.description}</p>}
              <button
                className="action-btn"
                onClick={() => {
                  console.log("Performing action:", action.direction);
                  performAction(action.direction);
                }}
              >
                Move {action.direction}
              </button>
            </div>
          ))}
        </div>
      )}

      {actions.length > 0 && (
        <button className="show-more-btn" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Me More"}
        </button>
      )}

      <button
        className="restart-btn"
        onClick={() => {
          restart();
          changeImage("start");
          if (onRestart) {
            onRestart();
          }
        }}
      >
        <img
          src="/src/assets/restart.png"
          alt="Restart"
          className="restart-icon"
        />
      </button>
    </div>
  );
};

// GameComponent should focus solely on rendering the game UI and handling actions. */}
