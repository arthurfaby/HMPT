import { RangeSelector } from "@/components/utils/range-selector";
import { PreferenceDto } from "@/dtos/preference_dto";
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@radix-ui/react-slider";
import { useEffect, useState } from "react";

interface AgeGapProps {
  preferences: PreferenceDto;
  setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>;
}

export default function AgeGap({ preferences, setPreferences }: AgeGapProps) {
  const [ageMin, setAgeMin] = useState<number>(preferences.age_gap_min);
  const [ageMax, setAgeMax] = useState<number>(preferences.age_gap_max);

  useEffect(() => {
    preferences.age_gap_min = ageMin;
    preferences.age_gap_max = ageMax;
    setPreferences(preferences);
  }, [ageMin, ageMax]);

  useEffect(() => {
    setAgeMin(preferences.age_gap_min);
    setAgeMax(preferences.age_gap_max);
  }, [preferences]);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col justify-between gap-4 text-xl font-semibold">
        <div className="flex w-full items-center justify-between">
          <h1>Écart d'âge</h1>
          <p>
            {ageMin} - {ageMax}
          </p>
        </div>
        <RangeSelector
          limitMax={150}
          limitMin={18}
          maxValue={ageMax}
          minValue={ageMin}
          minText="Min"
          maxText="Max"
          setMaxCallback={setAgeMax}
          setMinCallback={setAgeMin}
          step={1}
        />
      </div>
    </div>
  );
}
