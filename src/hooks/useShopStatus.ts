import { useEffect, useState } from 'react';

export interface ShopStatus {
  open: boolean;
  /** Current hour (0–23) in the shop's local time (IST). */
  hour: number;
}

const OPEN_HOUR = 9;
const CLOSE_HOUR = 21; // 9 PM

/** Current hour in the shop's timezone (Asia/Kolkata), robust to the visitor's TZ. */
function getShopHour(): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false,
    }).formatToParts(new Date());
    const hourPart = parts.find((p) => p.type === 'hour');
    let h = hourPart ? parseInt(hourPart.value, 10) : new Date().getHours();
    if (h === 24) h = 0; // some engines emit 24 for midnight
    return h;
  } catch {
    return new Date().getHours();
  }
}

/**
 * Live "open now / closed" indicator for the shop (9 AM – 9 PM IST). Re-checks
 * every minute so the badge flips at opening/closing without a reload.
 */
export function useShopStatus(): ShopStatus {
  const compute = (): ShopStatus => {
    const hour = getShopHour();
    return { hour, open: hour >= OPEN_HOUR && hour < CLOSE_HOUR };
  };

  const [status, setStatus] = useState<ShopStatus>(compute);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(compute()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}
