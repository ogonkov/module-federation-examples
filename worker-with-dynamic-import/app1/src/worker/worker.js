self.onmessage = async (event) => {
    const m = await import('./map');
    const v = event.data.value;
    
    self.postMessage({
        answer: m.map[v],
    });    
};
