let audioContext = null;

const playSound = (height, multiplier) => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const duration = 100; // Duration of the beep sound in milliseconds
  const startTime = audioContext.currentTime;

  let pitchMultiplier;

  // Increase the pitch by multiplying the height value
  if (!multiplier) {
    pitchMultiplier = 4;
  } else {
    pitchMultiplier = multiplier;
  }

  const pitch = height * pitchMultiplier;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.frequency.value = pitch;
  gainNode.gain.setValueAtTime(1, startTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + duration / 1000
  );

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration / 1000);
};

export default playSound;
