import { useGameStore } from "../stores/useGameStore";
import "./GameButton.css"

export const GameButton = ({ buttonName }) => {
  const {
    username,
    action,
    direction,
    setDirection,
    setIsStarted,
    isStarted,
    setLabData,
    setIsLoading,
  } = useGameStore();

  let url = "";
  const start_URL = "https://labyrinth.technigo.io/start";
  const action_URL = "https://labyrinth.technigo.io/action";

  /*const userData = {
    username: username
  };*/

  let possibleDirection = [];

  const moveData = {
    username: username,
    type: action,
    direction: direction,
  };

  const checkAndDisableButton = (data) => {
    possibleDirection = ["Start", "Reset"];
    console.log("Inside Checkand Disable: ", data);
    data.actions.map((action) => possibleDirection.push(action.direction));
    console.log(possibleDirection);

    let button = document.getElementById(possibleDirection[2].toLowerCase());
    console.log("Check and Disable button: ", possibleDirection[2].toLowerCase())
    button.classList.add("test");
  };

  const postRequest = () => {
    setIsLoading(true);
    fetch(url, {
      method: "POST", // or 'PUT'
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(moveData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setLabData(data);
        setIsLoading(false);
        checkAndDisableButton(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClick = () => {
    setDirection(buttonName);
    console.log("Inside handleClick: ", buttonName);

    if (buttonName === "Restart") {
      setIsStarted();
    }

    if (buttonName === "Start") {
      console.log("onSubmit check: ", username);
      if (username === "") {
        alert("Please enter an user name");
        return null;
      }
    }

    if (isStarted) {
      url = action_URL;
      postRequest();
    } else if (isStarted === false) {
      url = start_URL;
      setIsStarted();
      postRequest();
    }
  };

  return (
    <button
      id={buttonName.toLowerCase()}
      className={`control-button ${buttonName}-button`}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
};
