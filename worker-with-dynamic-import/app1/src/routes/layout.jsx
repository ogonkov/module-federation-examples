import { Outlet } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [output, setOutput] = useState();

  useEffect(() => {
    let skip = false;

    const w = new Worker(new URL('../worker/worker.js', import.meta.url), {
      name: 'example-worker',
      type: 'module',
    });

    w.onmessage = ({data}) => {
        if (!skip) {setOutput(data.answer);}
    };
    w.postMessage({value: 'foo'});

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
