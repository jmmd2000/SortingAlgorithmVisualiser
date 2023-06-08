import playSound from "../playSound";

const bubbleSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];

  for (let i = 0; i < sortedBars.length - 1; i++) {
    for (let j = 0; j < sortedBars.length - i - 1; j++) {
      // sortedBars[j].color = "#ff6b6b"; // Highlight the j bar in red
      sortedBars[j].color = "#339af0"; // Highlight the j bar in blue

      setBars([...sortedBars]); // Update the state to trigger re-rendering

      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between cycles

      if (sortedBars[j].height > sortedBars[j + 1].height) {
        [sortedBars[j], sortedBars[j + 1]] = [sortedBars[j + 1], sortedBars[j]];
      }

      sortedBars[j].color = "#845ef7"; // Reset the color of the compared bar

      setBars([...sortedBars]); // Update the state to reflect the color changes

      if (sound) {
        playSound(sortedBars[j].height);
      }
    }

    sortedBars[sortedBars.length - i - 1].color = "#ff922b"; // Mark the sorted bars

    setBars([...sortedBars]); // Update the state to reflect the color changes
  }

  sortedBars[0].color = "#ff922b"; // Mark the last remaining bar as sorted

  return sortedBars;
};

export default bubbleSort;
