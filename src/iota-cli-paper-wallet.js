#!/usr/bin/env node
const exec = require('child-process-promise').exec
const IOTA = require('iota.lib.js')
const args = require('commander')
const path = require("path")
const pkginfo = require(path.join(__dirname, "../package.json"))

const iota = new IOTA({
    "host": null,
    "port": null
})

args.version(pkginfo.version)
    .option('-i, --index [index]', 'Index of the generated address', parseInt)
    .option('-s, --seed [seed]', 'An optional seed for the paper wallet')
    .option('-l, --security-level [1, 2, 3]', 'Security level of the generated address', parseInt)
    .option('-d, --discret', 'Do not create qr codes')
    .option('-q, --qr-error-level [L, M, Q, H]', 'Error correction level for the qr codes')
    .option('-o, --output', 'Display the options used for address and qr generation')
    .parse(process.argv)

const SEED = require('./seed')
const ADDRESS = require('./address')
const qr = require('./qr')

async function main() {
    let version = pkginfo.version
    let iotaVersion = pkginfo.dependencies['iota.lib.js'].replace('^', '')
    console.log(`\n----------------- IOTA CLI Paper Wallet Generator v${pkginfo.version} (based on iota.lib.js v${iotaVersion}) -----------------\n`)

    // Create seed
    let seed = await SEED.create()
    if (!seed) return
    let checksum = SEED.checksum(seed)

    // Get an address
    let address = await ADDRESS.get(seed)
    if (!address) return

    console.log(` Seed:    ${seed}`)

    if (!args.discret) {
        // Create qr codes for seed and adress
        await qr.print(seed, checksum, address)
    }

    console.log(`\n Address: ${address}`)

    if (args.output) {
        // Print options used for address generation
        let options = ADDRESS.getOptions()
        console.log(`\n Address generation: ${options}`)

        if (!args.discret) {
            // Print options used for qr code generation
            qr.printOptions()
        }
    }

    console.log("\n----------------------------------------------------------------------------------------------------------\n")
}

main()
