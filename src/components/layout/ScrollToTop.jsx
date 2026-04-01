import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollToY } from '../../utils/scroll';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToY(0, 700);
  }, [pathname]);

  return null;
}
