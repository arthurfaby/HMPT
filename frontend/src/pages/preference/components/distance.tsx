import { Input } from "@/components/ui/input";
import { PreferenceDto } from "@/dtos/preference_dto";
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@radix-ui/react-slider";
import { useEffect, useState } from "react";

interface preferences {
  preferences: PreferenceDto;
  setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>;
}

export default function DistanceMax({
  preferences,
  setPreferences,
}: preferences) {
  const [distanceMax, setDistanceMax] = useState<number>(preferences.distance);
  const [localDistanceMax, setLocalDistanceMax] = useState<number>(
    preferences.distance,
  );

  useEffect(() => {
    setDistanceMax(preferences.distance);
    setLocalDistanceMax(preferences.distance);
  }, [preferences.distance]);

  useEffect(() => {
    if (localDistanceMax < 0) setLocalDistanceMax(0);
    if (localDistanceMax > 22000) setLocalDistanceMax(22000);
    if (distanceMax < 0) setDistanceMax(0);
    if (distanceMax > 22000) setDistanceMax(22000);

    if (distanceMax < 0) {
      preferences.distance = 0;
    } else if (distanceMax > 22000) {
      preferences.distance = 22000;
    } else {
      preferences.distance = distanceMax;
    }
    setPreferences(preferences);
  }, [distanceMax]);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-row justify-between text-xl font-semibold">
        <h1>Distance max</h1>
        <p>{distanceMax} km</p>
      </div>
      <Input
        type="number"
        value={localDistanceMax}
        onChange={(e) => setLocalDistanceMax(+e.target.value)}
        onBlur={(e) => setDistanceMax(+e.target.value)}
        placeholder="Distance max"
      />
    </div>
  );
}
