import { RequestType, ResponseType } from './constants'
import { self } from 'react-native-threads'

export const processEvents = async (backend, message) => {
    try {
        const { type, data, id } = JSON.parse(message)
        switch (type) {
            case RequestType.REQUEST_LOG:
                console.log("[Main Thread] ",data)
                break;
            case RequestType.REQUEST_ERROR:
                console.error("[Main Thread] ",data)
                break;
            case RequestType.REQUEST_WARN:
                console.warn("[Main Thread] ",data)
                break;
            default:
                break
        }
    } catch (error) {
        console.error(error)
        self.postMessage(JSON.stringify({ type: ResponseType.RESPONSE_ERROR, id, data: error }))
    }
}
