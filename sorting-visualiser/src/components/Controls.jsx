import { useState } from "react";
import classes from "./Controls.module.css";
import PropTypes from "prop-types";

const Controls = ({
  generateArray,
  sort,
  onSpeedChange,
  onNumberChange,
  onSoundChange,
  onAlgoChange,
}) => {
  Controls.propTypes = {
    generateArray: PropTypes.func.isRequired,
    sort: PropTypes.func.isRequired,
    onSpeedChange: PropTypes.func.isRequired,
    onNumberChange: PropTypes.func.isRequired,
    onSoundChange: PropTypes.func.isRequired,
    onAlgoChange: PropTypes.func.isRequired,
  };
  const [disabled, setDisabled] = useState(false);
  const [numValue, setNumValue] = useState(10);
  const [speedValue, setSpeedValue] = useState(1);

  const clickHandler = async () => {
    setDisabled(true);
    await sort();
    setDisabled(false);
  };

  const calcSpeedMultiplier = (speed) => {
    let multiplier = 10 / speed;
    multiplier = multiplier.toFixed(2);
    setSpeedValue(multiplier);
  };

  return (
    <div className={classes.controls}>
      <div className={classes.controlsLeft}>
        <button
          onClick={clickHandler}
          id="sortButton"
          disabled={disabled}
          className={classes.button}
        >
          Sort
        </button>
        <button
          onClick={generateArray}
          id="newArrayButton"
          disabled={disabled}
          className={classes.button}
        >
          New Array
        </button>
        <select
          name="algo"
          id="algoSelect"
          disabled={disabled}
          className={classes.algoSelect}
          onChange={(e) => {
            onAlgoChange(e.target.value);
            generateArray();
          }}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>
      </div>
      <div className={classes.controlsRight}>
        <label htmlFor="speed">Speed ({speedValue}x)</label>
        <input
          type="range"
          id="speedSlider"
          name="speed"
          min="1"
          max="40"
          defaultValue="10"
          disabled={disabled}
          onChange={(e) => {
            onSpeedChange(e.target.value);
            calcSpeedMultiplier(e.target.value);
          }}
        />
        <label htmlFor="number">Number ({numValue})</label>
        <input
          type="range"
          id="numberSlider"
          name="number"
          min="10"
          max="30"
          defaultValue="10"
          disabled={disabled}
          onChange={(e) => {
            onNumberChange(e.target.value);
            setNumValue(e.target.value);
            generateArray();
          }}
        />
        <input
          type="checkbox"
          name="sound"
          id="soundRadio"
          disabled={disabled}
          defaultChecked={true}
          onChange={(e) => {
            onSoundChange(e.target.checked);
          }}
        />
        <label htmlFor="sound">Sound</label>
      </div>
    </div>
  );
};

export default Controls;
