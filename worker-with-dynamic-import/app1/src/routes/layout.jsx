import { Outlet } from '@modern-js/runtime/router';
import * as Comlink from 'comlink';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [output, setOutput] = useState();

  useEffect(() => {
    let skip = false;
    const w = Comlink.wrap(new Worker(new URL('../worker/worker.js', import.meta.url)));

    w.init('foo').then((v) => {
      if (!skip) {setOutput(v)}}
    );

    return () => {
      skip = true;
    }
  }, []);


  return (
    <div>
      <p>{output}</p>
      <Outlet />
    </div>
  );
}
