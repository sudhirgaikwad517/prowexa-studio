import { useEffect, useState } from "react";

export function useCountUp(
  end: number,
  inView: boolean,
  duration = 2000,
  suffix = "",
  prefix = "",
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const step = end / (duration / 16);
    let frame: number;

    const animate = () => {
      start += step;
      if (start >= end) {
        setCount(end);
        return;
      }
      setCount(Math.floor(start));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration]);

  return `${prefix}${count}${suffix}`;
}
