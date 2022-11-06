import { EventBus } from "@nestjs/cqrs";

export class TabemanoEventBus {
  private static _instance: EventBus;

  private constructor() {}

  public static instance(eventBus?: EventBus) {
    if (TabemanoEventBus._instance) {
      return TabemanoEventBus._instance;
    }

    if (!eventBus) {
      throw new Error('You need a nest event bus instance to initialize the class')
    }

    TabemanoEventBus._instance = eventBus;
  }
}