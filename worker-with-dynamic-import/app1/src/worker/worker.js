import * as Comlink from 'comlink';

async function init(value) {
    const m = await import('./map');

    return m[value];
}

Comlink.expose({init});
