export class Counter {
  count = $state(812);

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  reset() {
    this.count = 0;
  }

  get counter() {
    return this.count;
  }

  get double() {
    return this.count * 2;
  }
}

let instance: Counter | null = null;
export function getCounterStore() {
  if (!instance) instance = new Counter();
  return instance;
}
