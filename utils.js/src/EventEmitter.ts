export type EventCallback = (data?: any) => void;

export interface EventDisposable {
  dispose: () => void;
}

export type EventList = Array<EventCallback>;

export class EventEmitter {

  private events: Map<string, EventList>;

  constructor() {

    this.events = new Map<string, EventList>();
  }

  on(event: string, callback: EventCallback): EventDisposable {

    const events = this.events.get(event);

    if (events) {

      events.push(callback);

    } else {

      this.events.set(event, [callback]);
    }

    return { dispose: () => this.off(event, callback) };
  }

  once(event: string, callback: EventCallback): EventDisposable {

    const cb = (data: any) => {

      callback(data);

      this.off(event, cb);
    }

    this.on(event, cb);

    return { dispose: () => this.off(event, cb) };
  }

  off(event: string, callback?: EventCallback): void {

    const events = this.events.get(event);

    if (callback) {

      if (events) {

        const index = events.indexOf(callback);

        if (index >= 0) {

          events.splice(index, 1);
        }
      }

    } else {

      this.events.set(event, []);
    }
  }

  emit(event: string, data?: any): void {

    const events = this.events.get(event);

    if (events) {

      events.forEach(event => event(data));
    }
  }
}
