type BezierCurve = [number, number, number, number];

function getBezierValue(t: number, curve: BezierCurve): number {
  const p1 = (1 - t) ** 3;
  const p2 = 3 * (1 - t) ** 2 * t;
  const p3 = 3 * (1 - t) * t ** 2;
  const p4 = t ** 3;

  return p1 * curve[0] + p2 * curve[1] + p3 * curve[2] + p4 * curve[3];
}

export function animateValue(
  defaultValue: number,
  finalValue: number,
  callback: (value: number) => void,
  onComplete?: () => void,
  duration = 1000,
  curve: BezierCurve = [0, 0, 1, 1],
): void {
  let startTime: number | undefined;

  const animate = (currentTime: DOMHighResTimeStamp): void => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;

    if (elapsedTime >= duration) {
      callback(finalValue);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    const t = elapsedTime / duration;
    const interpolatedValue =
      defaultValue + (finalValue - defaultValue) * getBezierValue(t, curve);

    callback(interpolatedValue);

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}
