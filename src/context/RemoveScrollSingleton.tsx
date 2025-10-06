// removeScrollBus.ts
type Listener<T> = (payload: T) => void;

function createEventBus<T>() {
  const listeners = new Set<Listener<T>>();

  return {
    // subscribe and get an unsubscribe function
    subscribe(listener: Listener<T>): () => void {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    emit(payload: T): void {
      for (const l of Array.from(listeners)) {
        l(payload);
      }
    },
    clear(): void {
      listeners.clear();
    },
  };
}

/** Domain-specific bus for removeScroll:boolean */
const removeScrollBus = createEventBus<boolean>();

let removeScroll = false;

export function setRemoveScroll(value: boolean): void {
  if (removeScroll === value) return; // optional: avoid redundant emits
  removeScroll = value;
  removeScrollBus.emit(value);
}

export function getRemoveScroll(): boolean {
  return removeScroll;
}

export function subscribeToRemoveScroll(cb: (value: boolean) => void): () => void {
  return removeScrollBus.subscribe(cb); // returns () => void
}
