import { useEffect, useState } from "react";

export default function useLocalTimeZone() {
  const [localTimezone, setLocalTimezone] = useState<string>("");

  useEffect(() => {
    // Get the local timezone
    const getLocalTimezone = () => {
      const currentTime = new Date();
      const localTimeZoneId = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Fallback to 'America/New_York' if the local timezone is not detected correctly
      setLocalTimezone(localTimeZoneId || "America/New_York");
    };

    getLocalTimezone();
  }, []);

  return localTimezone;
}