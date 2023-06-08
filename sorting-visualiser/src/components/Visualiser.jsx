import { useState, useEffect } from "react";
import classes from "./Visualiser.module.css";
import bubbleSort from "../algorithms/bubbleSort";
import mergeSort from "../algorithms/mergeSort";
import insertionSort from "../algorithms/insertionSort";
import selectionSort from "../algorithms/selectionSort";
import quickSort from "../algorithms/quickSort";
import heapSort from "../algorithms/heapSort";
import Controls from "./Controls";
import playSound from "../playSound";

const Visualizer = () => {
  const [bars, setBars] = useState([]);
  const [numBars, setNumBars] = useState(10);
  // const [maxBars, setMaxBars] = useState();
  const [speed, setSpeed] = useState(10);
  const [sound, setSound] = useState(true);
  const [algo, setAlgo] = useState("bubble");

  useEffect(() => {
    resetBars();
  }, []);

  const soundHandler = () => {
    setSound(!sound);
  };

  const generateRandomBars = () => {
    // calculateMaxBars();
    const randomBars = [];
    for (let i = 0; i < numBars; i++) {
      const minHeight = 50;
      const maxHeight = 300;
      const height =
        Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      randomBars.push({
        height,
        color: "#845ef7",
      });
    }
    return randomBars;
  };

  const resetBars = () => {
    const randomBars = generateRandomBars();
    setBars(randomBars);
  };

  const startSorting = async () => {
    let sortedBars;
    switch (algo) {
      case "bubble":
        sortedBars = await bubbleSort(bars, setBars, speed, sound);
        break;
      case "merge":
        sortedBars = await mergeSort(bars, setBars, speed, sound);
        break;
      case "insertion":
        sortedBars = await insertionSort(bars, setBars, speed, sound);
        break;
      case "selection":
        sortedBars = await selectionSort(bars, setBars, speed, sound);
        break;
      case "quick":
        sortedBars = await quickSort(bars, setBars, speed, sound);
        break;
      case "heap":
        sortedBars = await heapSort(bars, setBars, speed, sound);
        break;
      default:
        sortedBars = await bubbleSort(bars, setBars, speed, sound);
    }

    sweepAndResetBars(sortedBars);
  };

  const sweepAndResetBars = (sortedBars) => {
    const sweepBars = [...sortedBars];

    for (let i = 0; i < sweepBars.length; i++) {
      setTimeout(() => {
        sweepBars[i].color = "#51cf66";

        setBars([...sweepBars]);

        if (sound) {
          playSound(sweepBars[i].height);
        }
      }, i * 20);
    }
  };

  const renderBars = () => {
    return bars.map((bar, index) => (
      <div
        key={index}
        className={classes.bar}
        style={{
          height: `${bar.height / 10}rem`,
          backgroundColor: bar.color,
        }}
      >
        {bar.height}
      </div>
    ));
  };

  return (
    <>
      <h1 className={classes.rotateMessage}>
        Please rotate your device for a better experience.
      </h1>
      <div className={classes.mainContainer}>
        <h1 className={classes.heading}>{algo} sort</h1>
        <div className={classes.barContainer}>{renderBars()}</div>
        <Controls
          generateArray={resetBars}
          sort={startSorting}
          onSpeedChange={setSpeed}
          onNumberChange={setNumBars}
          onSoundChange={soundHandler}
          onAlgoChange={setAlgo}
        />
      </div>
    </>
  );
};

export default Visualizer;
