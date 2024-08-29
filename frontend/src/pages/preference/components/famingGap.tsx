import { RangeSelector } from "@/components/utils/range-selector";
import { PreferenceDto } from "@/dtos/preference_dto";
import { useEffect, useState } from "react";

interface FamingGapProps {
  preferences: PreferenceDto;
  setPreferences: React.Dispatch<React.SetStateAction<PreferenceDto>>;
}
export default function FamingGap({
  preferences,
  setPreferences,
}: FamingGapProps) {
  const [famingMin, setFamingMin] = useState<number>(
    preferences.fame_rating_min,
  );
  const [famingMax, setFamingMax] = useState<number>(
    preferences.fame_rating_max,
  );

  useEffect(() => {
    setFamingMin(preferences.fame_rating_min);
    setFamingMax(preferences.fame_rating_max);
  }, [preferences]);

  useEffect(() => {
    preferences.fame_rating_min = famingMin;
    preferences.fame_rating_max = famingMax;
    setPreferences(preferences);
  }, [famingMin, famingMax]);

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col justify-between gap-4 text-xl font-semibold">
        <div className="flex w-full items-center justify-between">
          <h1>Écart de fame</h1>
          <p>
            {famingMin} - {famingMax}
          </p>
        </div>
        <RangeSelector
          limitMax={5}
          limitMin={0}
          maxValue={famingMax}
          minValue={famingMin}
          minText="Min"
          maxText="Max"
          setMaxCallback={setFamingMax}
          setMinCallback={setFamingMin}
          step={0.01}
        />
      </div>
    </div>
  );
}
