const args = require('commander')
const IOTA = require('iota.lib.js')

const iota = new IOTA({
    "host": null,
    "port": null
})
const options = parseOptions()

module.exports.get = async (seed) => {
    try {
        let addresses = await getIotaAddressAsync(seed, options)
        return addresses[0]
    } catch (err) {
        console.log(` Address generation failed: ${err}`)
    }
}

module.exports.getOptions = () => {
    return JSON.stringify(options)
}

function getIotaAddressAsync(seed, options) {
    return new Promise(function (resolve, reject) {
        iota.api.getNewAddress(seed, options, function (error, address) {
            if (error) {
                reject(error)
            } else {
                resolve(address)
            }
        })
    })
}

function parseOptions() {
    let index = getIndex()
    let security = getSecurityLevel()

    return {
        index: index,
        checksum: true,
        total: 1,
        security: security
    }
}

function getSecurityLevel() {
    let defaultSecurity = 2
    let securityArg = args.securityLevel
    if (securityArg != undefined) {
        if (typeof securityArg === 'number' &&
            securityArg >= 1 && securityArg <= 3) {
            return securityArg
        }
        console.log(` Invalid security level specified - Using default value ${defaultSecurity}\n`)
    }
    return defaultSecurity
}

function getIndex() {
    let defaultIndex = 0
    let indexArg = args.index
    if (indexArg != undefined) {
        if (typeof indexArg === 'number') {
            return indexArg
        }
        console.log(` Invalid address index - Using default value ${defaultIndex}\n`)
    }
    return defaultIndex
}