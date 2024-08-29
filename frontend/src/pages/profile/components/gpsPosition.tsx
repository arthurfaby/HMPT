import { Input } from "@/components/ui/input";
import { RangeSelector } from "@/components/utils/range-selector";
import { useAuth } from "@/hooks/useAuth";
import { useAccountStore } from "@/stores/account-store";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

export function GPSPosition() {
  const { account } = useAuth();

  const [latitude, setLatitude] = useState(account?.geolocation?.latitude || 0);
  const [directLatitude, setDirectLatitude] = useState(
    account?.geolocation?.latitude || 0,
  );
  const [longitude, setLongitude] = useState(
    account?.geolocation?.longitude || 0,
  );
  const [directLongitude, setDirectLongitude] = useState(
    account?.geolocation?.latitude || 0,
  );

  useEffect(() => {
    if (latitude > 90) setLatitude(90);
    if (latitude < -90) setLatitude(-90);
    setDirectLatitude(latitude);
    if (account) {
      if (account.geolocation == null) {
        account.geolocation = { latitude, longitude };
      } else {
        account.geolocation.latitude = latitude;
      }
    }
  }, [latitude]);

  useEffect(() => {
    if (longitude > 180) setLongitude(180);
    if (longitude < -180) setLongitude(-180);
    setDirectLongitude(longitude);
    if (account) {
      if (account.geolocation == null) {
        account.geolocation = { latitude, longitude };
      } else {
        account.geolocation.longitude = longitude;
      }
    }
  }, [longitude]);

  return (
    <div className="mx-auto flex max-w-80 gap-2">
      <div className="flex flex-col justify-center gap-2">
        <Label>Latitude</Label>
        <Input
          type="number"
          step={0.00001}
          value={directLatitude}
          onChange={(e) => setDirectLatitude(+e.target.value)}
          onBlur={(e) => setLatitude(+e.target.value)}
          placeholder="Latitude"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Label>Longitude</Label>
        <Input
          type="number"
          step={0.00001}
          value={directLongitude}
          onChange={(e) => setDirectLongitude(+e.target.value)}
          onBlur={(e) => setLongitude(+e.target.value)}
          placeholder="Longitude"
        />
      </div>
    </div>
  );
}
