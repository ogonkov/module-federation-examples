import { Outlet } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';

import {BlobWorker as Worker} from '../utils/BlobWorker';

export default function Layout() {
  const [output, setOutput] = useState();

  useEffect(() => {
    let skip = false;

    const handleMessage = ({data}) => {
        if (!skip) {setOutput(data.answer);}
    };

    const w = new Worker(new URL('../worker/worker.js', import.meta.url), {
      name: 'example-worker',
      type: 'module',
    });

    w.addEventListener('message', handleMessage);

    w.postMessage({value: 'foo'});

    return () => {
      w.removeEventListener('message', handleMessage);
      w.terminate();
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
