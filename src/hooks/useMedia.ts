import { Device } from '@/types/devices';
import { useState, useEffect, useMemo } from 'react';

const useMedia = (device: Device.MOBILE | Device.DESKTOP) => {
  const [matches, setMatches] = useState(false);

  const query = useMemo(
    () => ({
      mobile: '(max-width: 960px)',
      desktop: '(min-width: 960px)',
    }),
    []
  );

  useEffect(() => {
    const media = window.matchMedia(query[device]);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [device, matches, query]);
  return matches;
};

export default useMedia;
