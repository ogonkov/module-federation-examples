export class BlobWorker {
    constructor(scriptURL, options) {
        const object = URL.createObjectURL(
            new Blob([`importScripts(${JSON.stringify(scriptURL)})`], {
                type: 'application/javascript',
            }),
        );

        this.instance = new Worker(object, options);

        URL.revokeObjectURL(object);
    }

    postMessage(message, transfer) {
        this.instance.postMessage(message, transfer);
    }

    addEventListener(
        type,
        listener,
        options,
    ) {
        this.instance.addEventListener(type, listener, options);
    }

    removeEventListener(
        type,
        listener,
        options,
    ) {
        this.instance.removeEventListener(type, listener, options);
    }

    terminate() {
        this.instance.terminate();
    }
}
