import Box from "./Box";
import Instructions from "../Instructions";
import { Side } from "../../types/types";

type GameProps = {
  side: Side;
};

const Game = ({ side }: GameProps) => {
  return (
    <div className="game">
      <Instructions />
      <div className="row">
        <div className="col-6">{side === "left" && <Box />}</div>
        <div className="col-6">{side === "right" && <Box />}</div>
      </div>
    </div>
  );
};

export default Game;
