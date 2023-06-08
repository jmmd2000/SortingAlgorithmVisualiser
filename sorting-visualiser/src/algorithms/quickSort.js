import playSound from "../playSound";

const quickSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];

  const partition = async (low, high) => {
    const pivot = sortedBars[high].height;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight the j bar in orange
      sortedBars[j].color = "#ff922b";

      setBars([...sortedBars]);

      // Delay between comparisons
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (sortedBars[j].height <= pivot) {
        i++;
        [sortedBars[i], sortedBars[j]] = [sortedBars[j], sortedBars[i]];
        setBars([...sortedBars]);
        if (sound) {
          playSound(sortedBars[j].height);
        }
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
      // Reset the color of the compared bar
      sortedBars[j].color = "#845ef7";
    }

    [sortedBars[i + 1], sortedBars[high]] = [
      sortedBars[high],
      sortedBars[i + 1],
    ];
    setBars([...sortedBars]);
    if (sound) {
      playSound(sortedBars[i + 1].height);
    }
    await new Promise((resolve) => setTimeout(resolve, speed));

    return i + 1;
  };

  const quickSortRecursive = async (low, high) => {
    if (low < high) {
      const pivotIndex = await partition(low, high);

      // Mark the pivot bar
      sortedBars[pivotIndex].color = "#ff6b6b";

      setBars([...sortedBars]);

      await new Promise((resolve) => setTimeout(resolve, speed));

      await quickSortRecursive(low, pivotIndex - 1);
      await quickSortRecursive(pivotIndex + 1, high);
    } else if (low === high) {
      // Mark the sorted bar
      sortedBars[low].color = "#ff922b";

      setBars([...sortedBars]);

      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  };

  await quickSortRecursive(0, sortedBars.length - 1);

  return sortedBars;
};

export default quickSort;
