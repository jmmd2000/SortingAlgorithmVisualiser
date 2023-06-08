import playSound from "../playSound";

const mergeSort = async (bars, setBars, speed, sound) => {
  const sortedBars = [...bars];

  await mergeSortHelper(
    sortedBars,
    0,
    sortedBars.length - 1,
    setBars,
    speed,
    sound
  );

  // Update the state with the final sorted bars
  setBars([...sortedBars]);

  return sortedBars;
};

const mergeSortHelper = async (bars, start, end, setBars, speed, sound) => {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);

  await mergeSortHelper(bars, start, mid, setBars, speed, sound);
  await mergeSortHelper(bars, mid + 1, end, setBars, speed, sound);
  await merge(bars, start, mid, end, setBars, speed, sound);
};

const merge = async (bars, start, mid, end, setBars, speed, sound) => {
  const left = bars.slice(start, mid + 1);
  const right = bars.slice(mid + 1, end + 1);

  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    // left[i].color = "#ff6b6b"; // Highlight the left bar being compared
    left[i].color = "#339af0"; // Highlight the left bar being compared
    // right[j].color = "#ff6b6b"; // Highlight the right bar being compared
    right[j].color = "#339af0"; // Highlight the right bar being compared

    if (left[i] !== undefined && sound) {
      playSound(left[i].height);
    }

    setBars([...bars]); // Update the state to trigger re-rendering

    await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between comparisons

    if (left[i].height <= right[j].height) {
      bars[k] = left[i];
      i++;
    } else {
      bars[k] = right[j];
      j++;
    }

    k++;
  }

  while (i < left.length) {
    left[i].color = "#ff922b"; // Highlight the remaining left bars
    bars[k] = left[i];
    i++;
    k++;

    if (left[i] !== undefined && sound) {
      playSound(left[i].height);
    }

    setBars([...bars]); // Update the state to reflect the color changes

    await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between comparisons
  }

  while (j < right.length) {
    right[j].color = "#ff922b"; // Highlight the remaining right bars
    bars[k] = right[j];
    j++;
    k++;

    setBars([...bars]); // Update the state to reflect the color changes

    await new Promise((resolve) => setTimeout(resolve, speed)); // Delay between comparisons
  }
};

export default mergeSort;
