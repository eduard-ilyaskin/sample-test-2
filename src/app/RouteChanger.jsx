import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useEffect, useRef } from 'react';
import { useHunting } from '../lib/hunter';

function usePrevious(state) {
  const ref = useRef();

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}

export function RouteChanger() {
  const location = useLocation();
  const prevPathname = usePrevious(location.pathname);
  const hunter = useHunting();

  useEffect(() => {
    if (prevPathname && prevPathname !== location.pathname) {
      hunter.setPage(location);
    }
  }, [location.pathname, prevPathname]);

  return null;
}
