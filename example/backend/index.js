
import { self } from 'react-native-threads'
import { processEvents } from './events'
export class BackendController {
    initialized = false
    constructor() {
        self.onmessage = (data) => processEvents(this, data) 
    }
}

new BackendController()