export interface GreenThread {
  id: number;
  generator: Generator<void, void, unknown>;
  done: boolean;
  spriteId: string;
}

let nextThreadId = 0;

export class Scheduler {
  threads: GreenThread[] = [];
  private maxIterationsPerFrame: number = 10000;

  addThread(
    generator: Generator<void, void, unknown>,
    spriteId: string,
  ): GreenThread {
    const thread: GreenThread = {
      id: nextThreadId++,
      generator,
      done: false,
      spriteId,
    };
    this.threads.push(thread);
    return thread;
  }

  removeThread(thread: GreenThread): void {
    thread.done = true;
    this.threads = this.threads.filter((t) => t !== thread);
  }

  removeThreadsForSprite(spriteId: string): void {
    this.threads = this.threads.filter((t) => {
      if (t.spriteId === spriteId) {
        t.done = true;
        return false;
      }
      return true;
    });
  }

  step(): void {
    let iterations = 0;
    const activeThreads = [...this.threads];

    for (const thread of activeThreads) {
      if (thread.done) continue;
      if (iterations >= this.maxIterationsPerFrame) break;

      try {
        const result = thread.generator.next();
        iterations++;
        if (result.done) {
          thread.done = true;
        }
      } catch (e) {
        console.error(`Thread ${thread.id} error:`, e);
        thread.done = true;
      }
    }

    this.threads = this.threads.filter((t) => !t.done);
  }

  clear(): void {
    this.threads.forEach((t) => (t.done = true));
    this.threads = [];
  }

  get activeThreadCount(): number {
    return this.threads.length;
  }
}
