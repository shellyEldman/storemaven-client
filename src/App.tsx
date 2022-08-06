import { useEffect, useState, useContext } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Loading from "./components/Loading";
import Alert from "./components/Alert";
import Game from "./components/game/Game";
import useFetchKeyPress from "./hooks/useFetchKeyPress";
import { AuthContext } from "./context/AuthContext";
import { updateUserCount } from "./utils/server-api";
import { State, Side, AlertType } from "./types/types";

const MIN_LOADING_TIME = 2;
const MAM_LOADING_TIME = 5;
const SERVER_HOST = new URL("http://localhost:4000/");

const App = () => {
  const { name } = useContext(AuthContext);
  const keyPressedRight = useFetchKeyPress("l");
  const keyPressedLeft = useFetchKeyPress("a");

  const [startGameTimeout, setStartGameTimeout] = useState< NodeJS.Timeout | undefined>(undefined);
  const [alertToggle, setAlertToggle] = useState<boolean>(false);
  const [state, setState] = useState<State>("auth");
  const [shapeSide, setShapeSide] = useState<Side>("");
  const [alert, setAlert] = useState<AlertType>("");
  const [successCount, setSuccessCount] = useState<number>(0);
  const [largestNumOfSuccess, setLargestNumOfSuccess] = useState<number>(0);

  const initiateGame = () => {
    const randomSide = Math.random();
    if (randomSide < 0.5) {
      setShapeSide("right");
    } else {
      setShapeSide("left");
    }

    setAlert("");
    setState("game");
  };

  const onStartGame = () => {
    setState("loading");

    // random loading time 2-5 sec
    const timeToWait = Math.floor(
      Math.random() * (MAM_LOADING_TIME - MIN_LOADING_TIME) + MIN_LOADING_TIME
    );

    let timer = setTimeout(() => {
      initiateGame();
    }, timeToWait * 1000);

    setStartGameTimeout(timer);
    return () => clearTimeout(timer);
  };

  const resetSuccess = () => {
    setSuccessCount(0);
  };

  useEffect(() => {
    // updae largest num os success
    if (successCount) {
      if (successCount > largestNumOfSuccess) {
        setLargestNumOfSuccess(successCount);
      }
    }
  }, [successCount]);

  useEffect(() => {
    if (largestNumOfSuccess) {
      // update leaderboard
      updateUserCount(SERVER_HOST, name, largestNumOfSuccess);
    }
  }, [largestNumOfSuccess]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (state === "game") {
      timer = setTimeout(() => {
        // remove the shape from the screen
        setShapeSide("");
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    // start new game when alert message
    if (alert) {
      clearTimeout(startGameTimeout); // in case of key pressed too soon
      onStartGame();
    }
  }, [alert, alertToggle]);

  useEffect(() => {
    // handle user key press
    if (keyPressedRight || keyPressedLeft) {
      switch (state) {
        case "loading":
          setAlert("soon");
          resetSuccess();
          break;
        case "game":
          if (shapeSide) {
            if (
              (keyPressedRight && shapeSide === "right") ||
              (keyPressedLeft && shapeSide === "left")
            ) {
              setAlert("success");
              setSuccessCount(successCount + 1);
            } else {
              setAlert("wrong");
              resetSuccess();
            }
          } else {
            setAlert("late");
            resetSuccess();
          }
          break;
        default: // auth
          break;
      }

      setAlertToggle(!alertToggle);
    }
  }, [keyPressedLeft, keyPressedRight, shapeSide]);

  return (
    <div className="App bg-light">
      {state === "auth" && <Auth onStartGame={onStartGame} />}
      {state === "loading" && <Loading />}
      {state === "game" && <Game side={shapeSide} />}
      <Alert alert={alert} />
    </div>
  );
};

export default App;
