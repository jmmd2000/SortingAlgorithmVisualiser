import playSound from "../playSound";

const heapSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];
  const n = sortedBars.length;

  const heapify = async (heapSize, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (
      left < heapSize &&
      sortedBars[left].height > sortedBars[largest].height
    ) {
      largest = left;
    }

    if (
      right < heapSize &&
      sortedBars[right].height > sortedBars[largest].height
    ) {
      largest = right;
    }

    if (largest !== i) {
      [sortedBars[i], sortedBars[largest]] = [
        sortedBars[largest],
        sortedBars[i],
      ];
      setBars([...sortedBars]);
      // If sound exists, play it
      if (sound) {
        playSound(sortedBars[i].height);
      }
      // Delay between swaps
      await new Promise((resolve) => setTimeout(resolve, speed));

      await heapify(heapSize, largest);
    }
  };

  const buildMaxHeap = async () => {
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }
  };

  const heapSortRecursive = async () => {
    await buildMaxHeap();

    for (let i = n - 1; i > 0; i--) {
      // Highlight the current bar in red
      sortedBars[i].color = "#ff6b6b";
      [sortedBars[0], sortedBars[i]] = [sortedBars[i], sortedBars[0]];
      setBars([...sortedBars]);
      if (sound) {
        playSound(sortedBars[i].height);
      }
      // Delay between swaps
      await new Promise((resolve) => setTimeout(resolve, speed));
      // Reset the color of the compared bar
      sortedBars[i].color = "#ff922b";

      await heapify(i, 0);
    }
  };

  await heapSortRecursive();

  setBars([...sortedBars]);
  return sortedBars;
};

export default heapSort;
