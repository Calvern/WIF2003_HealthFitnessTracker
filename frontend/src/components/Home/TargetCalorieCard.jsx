import { Bullseye, Fire } from "react-bootstrap-icons";
import { FaPizzaSlice } from "react-icons/fa";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
const TargetCalorieCard = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-between gap-2 border p-4 rounded-4 w-100 shadow "
      style={{ backgroundColor: "#15455F", height: "350px", width: "350px" }}
    >
      <h3 className="fw-bold text-white">Calories</h3>
      <div style={{ width: "150px", height: "200px" }}>
        <CircularProgressbarWithChildren
          value={50}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#A1C6EA",
          })}
        >
          <span className="fw-bold text-white">2700 kCal</span>
          <span className="fw-bold text-white">Remaining</span>
        </CircularProgressbarWithChildren>
      </div>

      <h4 className="text-white fw-bold text-center ">50% of your progress</h4>
    </div>
  );
};

export default TargetCalorieCard;
