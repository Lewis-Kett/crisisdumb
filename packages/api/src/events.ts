import { EventEmitter } from 'events'

export const eventBus = new EventEmitter()

export const emitEvent = (type: string, payload: any) => {
  eventBus.emit(type, payload)
  console.log(`[EVENT] ${type}:`, payload)
}


