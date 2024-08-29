import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type RangeSelectorProps = {
  limitMin: number;
  limitMax: number;
  minValue: number;
  maxValue: number;
  minText: string;
  maxText: string;
  setMinCallback: (value: number) => void;
  setMaxCallback: (value: number) => void;
  className?: string;
  step?: number;
};

export function RangeSelector(props: RangeSelectorProps) {
  const {
    limitMin,
    limitMax,
    minValue,
    maxValue,
    minText,
    maxText,
    setMinCallback: setMin,
    setMaxCallback: setMax,
    className,
    step,
  } = props;

  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);

  useEffect(() => {
    if (minValue < limitMin) {
      setMin(limitMin);
    }
    if (minValue > maxValue) {
      setMax(minValue);
    }
    setLocalMin(minValue);
  }, [minValue]);

  useEffect(() => {
    if (maxValue > limitMax) {
      setMax(limitMax);
    }
    if (maxValue < minValue) {
      setMin(maxValue);
    }
    setLocalMax(maxValue);
  }, [maxValue]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <label htmlFor="min-selector" className="text-nowrap">
          {minText}
        </label>
        <Input
          type="number"
          id="min-selector"
          step={step}
          value={localMin}
          onChange={(e) => setLocalMin(+e.target.value)}
          onBlur={(e) => setMin(+e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="max-selector" className="text-nowrap">
          {maxText}
        </label>
        <Input
          type="number"
          step={step}
          id="max-selector"
          value={localMax}
          onChange={(e) => setLocalMax(+e.target.value)}
          onBlur={(e) => setMax(+e.target.value)}
        />
      </div>
    </div>
  );
}
