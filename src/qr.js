const qrcode = require('qrcode-terminal')
const args = require('commander')

const errorLevel = getErrorLevel()
qrcode.setErrorLevel(errorLevel)

module.exports.print = async (seed, checksum, address) => {
    try {
        let seedQR = await createQRCode(seed)
        let addressQR = await createQRCode(address)

        printToTerminal(seedQR, checksum, addressQR)
    } catch (err) {
        console.log(`  QR Code generation failed: ${err}`)
    }
}

module.exports.printOptions = () => {
    let errorLevelDesc = getErrorLevelDesc(errorLevel)
    console.log(` QR code error correction: Level ${errorLevelDesc}`)
}

function printToTerminal(seedQR, checksum, addressQR) {
    let seedQRLines = seedQR.split('\n').filter(v => v != '')
    let addressQRLines = addressQR.split('\n').filter(v => v != '')
    let numLines = Math.max(seedQRLines.length, addressQRLines.length)

    let logo = [
        "  ___ ___ _____ _   ",
        "|_ _/ _ \\_   _/_\\  ",
        " | | (_) || |/ _ \\ ",
        "|___\\___/ |_/_/ \\_\\"]

    let seedDesc = `PRIVATE SEED (CHECKSUM = ${checksum})`
    let addressDesc = "PUBLIC RECEIVING ADDRESS"

    let seedDescSpaceCnt = (seedQRLines[0].length - seedDesc.length) / 2
    let seedDescArr = Array(Math.ceil(seedDescSpaceCnt) + 1).join(" ")

    let addressDescSpaceCnt = (addressQRLines[0].length - addressDesc.length) / 2
    let addressDescArr = Array(Math.ceil(addressDescSpaceCnt) + 1).join(" ")

    let logoStartLine = Math.floor((numLines - logo.length) / 2)
    let logoEndLine = logoStartLine + logo.length

    let spaceArr = Array(26).join(" ")

    // Print headline
    process.stdout.write('\n' +
        seedDescArr + seedDesc + seedDescArr +
        spaceArr +
        addressDescArr + addressDesc + addressDescArr +
        "\n")

    // Print qr
    for (let i = 0; i < numLines; i++) {
        let seedQRLine = i < seedQRLines.length ? seedQRLines[i] : Array(seedQRLines[0].length + 1).join(" ")
        let addressQRLine = i < addressQRLines.length ? addressQRLines[i] : ""
        let middle = i >= logoStartLine && i < logoEndLine ? logo[i - logoStartLine] : spaceArr

        let middleLength = middle.length;
        let spaceArrLength = spaceArr.length

        if (middle.length < spaceArr.length) {
            let missingSpaceAll = spaceArr.length - middle.length
            let spaceLeft = Math.floor(missingSpaceAll / 2)
            let spaceRight = spaceLeft + missingSpaceAll % 2

            middle = Array(spaceLeft + 1).join(" ") + middle + Array(spaceRight + 1).join(" ")
        }
        process.stdout.write(" " + seedQRLine + middle + addressQRLine + '\n')
    }
}

function createQRCode(input) {
    return new Promise(function (resolve, reject) {
        try {
            qrcode.generate(input, { small: true }, function (qrcode) {
                resolve(qrcode)
            })
        } catch (err) {
            reject(err)
        }
    })
}

function getErrorLevel() {
    let defaultErrorLevel = 'M'
    let errorLevelArg = args.qrErrorLevel

    if (errorLevelArg != undefined) {
        if (['L', 'M', 'Q', 'H'].includes(errorLevelArg)) {
            return errorLevelArg
        }
        console.log(` Invalid qr error level specified - Using default value ${defaultErrorLevel}\n`)
    }
    return defaultErrorLevel
}

function getErrorLevelDesc(errorLevel) {
    switch (errorLevel) {
        case 'L':
            return 'L – up to 7% damage'
        case 'M':
            return 'M – up to 15% damage'
        case 'Q':
            return 'Q – up to 25% damage'
        case 'H':
            return 'H – up to 30% damage'
    }
}