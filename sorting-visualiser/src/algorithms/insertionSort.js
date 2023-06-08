import playSound from "../playSound";

const insertionSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];

  for (let i = 1; i < sortedBars.length; i++) {
    let j = i;
    sortedBars[j].color = "#ff6b6b"; // Highlight the j bar in red

    setBars([...sortedBars]); // Update the state to trigger re-rendering

    await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between cycles

    while (j > 0 && sortedBars[j - 1].height > sortedBars[j].height) {
      [sortedBars[j], sortedBars[j - 1]] = [sortedBars[j - 1], sortedBars[j]];
      j--;

      setBars([...sortedBars]); // Update the state to reflect the bar swap
      if (sound) {
        playSound(sortedBars[j].height);
      }

      await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between bar comparisons
    }

    sortedBars[j].color = "#ff922b"; // Reset the color of the compared bar

    setBars([...sortedBars]); // Update the state to reflect the color changes
  }

  return sortedBars;
};

export default insertionSort;
