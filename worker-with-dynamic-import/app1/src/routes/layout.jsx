import { Outlet } from '@modern-js/runtime/router';
import * as Comlink from 'comlink';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    const w = Comlink.wrap(new Worker(new URL('../worker/worker.ts', import.meta.url)));

    console.log(w);
  }, []);


  return (
    <div>
      <Outlet />
    </div>
  );
}
