import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type AuthProps = {
  onStartGame: () => void;
};

const Auth = ({ onStartGame }: AuthProps) => {
  const [name, setName] = useState<string>("");
  const { setUserName } = useContext(AuthContext);

  const onSubmit = () => {
    setUserName(name);
    onStartGame();
  };

  return (
    <div className="auth">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="form-control"
        placeholder="Enter your name.."
      />
      <button
        type="button"
        disabled={!name}
        onClick={onSubmit}
        className="btn btn-primary"
      >
        START
      </button>
    </div>
  );
};

export default Auth;
