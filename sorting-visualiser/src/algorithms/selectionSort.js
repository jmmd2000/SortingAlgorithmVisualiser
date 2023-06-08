import playSound from "../playSound";

const selectionSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];

  for (let i = 0; i < sortedBars.length - 1; i++) {
    let minIndex = i;
    // Highlight the minimum bar
    // sortedBars[minIndex].color = "#ff6b6b";
    sortedBars[minIndex].color = "#339af0";

    setBars([...sortedBars]);
    // Delay between cycles
    await new Promise((resolve) => setTimeout(resolve, speed));

    for (let j = i + 1; j < sortedBars.length; j++) {
      // Highlight the j bar in orange
      sortedBars[j].color = "#ff922b";

      setBars([...sortedBars]);
      // Delay between bar comparisons
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (sortedBars[j].height < sortedBars[minIndex].height) {
        // Reset the color of the previous minimum bar
        sortedBars[minIndex].color = "#845ef7";
        minIndex = j;
        // Highlight the new minimum bar in red
        // sortedBars[minIndex].color = "#ff6b6b";
        sortedBars[minIndex].color = "#339af0";
      } else {
        // Reset the color of the compared bar
      }
      sortedBars[j].color = "#845ef7";

      setBars([...sortedBars]);
      if (sound) {
        playSound(sortedBars[j].height);
      }
    }

    if (minIndex !== i) {
      [sortedBars[i], sortedBars[minIndex]] = [
        sortedBars[minIndex],
        sortedBars[i],
      ];
    }
    // Mark the sorted bars
    sortedBars[i].color = "#ff922b";

    setBars([...sortedBars]);
  }
  // Mark the last remaining bar as sorted
  sortedBars[sortedBars.length - 1].color = "#ff922b";

  return sortedBars;
};

export default selectionSort;
