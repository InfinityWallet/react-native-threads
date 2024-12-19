import { Thread } from 'react-native-threads'
import { RequestType } from './backend/constants'

import { Chains, Protocol } from '@infinity/core-sdk/lib/commonjs/networks'
import { TransactionType } from '@infinity/database/lib/commonjs/Transactions/model'

let messageId = 0
const pendingRequests = new Map()
const onmessage = (message: any) => {
    const { id, data, error } = JSON.parse(message)
    const pending = pendingRequests.get(id)
    if (pending) {
        if (error) {
            pending.reject(new Error(error))
        } else {
            pending.resolve(data)
        }
        pendingRequests.delete(id)
    }
}
const worker = Object.assign(new Thread('./backend/index.js'), { onmessage })

export const sendRequest = (type: string, data?: any) => {
    const id = messageId++
    const message = JSON.stringify({ id, type, data })
    return new Promise((resolve, reject) => {
        pendingRequests.set(id, { resolve, reject })
        worker.postMessage(message)
    })
}

export class MessageController {
    static getAddress = (data: {
        accountIndex: number
        changeIndex: number
        protocol: Protocol
        addressIndex: number
        chainId: Chains
        publicExtended?: string
        seed?: string
    }) => sendRequest(RequestType.REQUEST_GET_ADDRESS, data)
    static getCoinDetails = (coinId: string) => sendRequest(RequestType.REQUEST_GET_COIN_DETAILS, coinId)
    static getCoinList = () => sendRequest(RequestType.REQUEST_GET_COIN_LIST)
    static getTransactions = (data: {
        limit?: number
        offset?: number
        chainId?: Chains
        coinId?: string
        transactionType?: TransactionType
        from?: string
        to?: string
        dateFrom?: string
        dateTo?: string
        hash?: string
    }) => sendRequest(RequestType.REQUEST_GET_TRANSACTIONS, data)
    static getSeed = (password: string, walletName: string) =>
        sendRequest(RequestType.REQUEST_GET_SEED, { password, walletName })
    static setSeed = (seed: string, password: string, walletName: string) =>
        sendRequest(RequestType.REQUEST_SET_SEED, { seed, password, walletName })

    static initialize = () => sendRequest(RequestType.REQUEST_INITIALIZE)

    static log = (log: string) => sendRequest(RequestType.REQUEST_LOG,log)
    static error = (log: string) => sendRequest(RequestType.REQUEST_ERROR,log)
    static warn = (log: string) => sendRequest(RequestType.REQUEST_WARN,log)

}
