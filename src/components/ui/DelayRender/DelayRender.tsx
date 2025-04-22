import { useEffect, useState } from 'react';

export default function DelayRender({ children }: { children: any }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show ? children : null;
}
