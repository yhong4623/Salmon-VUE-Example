interface NuiMessage {
    type: string;
    [key: string]: any;
}

export class NuiProxy {
    private static instance: NuiProxy;
    private callbacks: Map<string, Function[]> = new Map();

    private constructor() {
        window.addEventListener('message', this.handleMessage.bind(this));
    }

    public static getInstance(): NuiProxy {
        if (!NuiProxy.instance) {
            NuiProxy.instance = new NuiProxy();
        }

        return NuiProxy.instance;
    }

    private handleMessage(event: MessageEvent<NuiMessage>) {
        const { type, ...data } = event.data;
        const handlers  = this.callbacks.get(type);

        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    public on(type: string, callback: Function) {
        if (!this.callbacks.has(type)) {
            this.callbacks.set(type, []);
        }

        this.callbacks.get(type)?.push(callback);
    }

    public off(type: string, callback: Function) {
        const handlers = this.callbacks.get(type);

        if (handlers) {
            const index = handlers.indexOf(callback);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    public emit(resource: string, data: any) {
        return fetch(`http://${resource}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }
}

export const nuiProxy = NuiProxy.getInstance()