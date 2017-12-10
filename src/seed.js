const args = require('commander')
const IOTA = require('iota.lib.js')
const exec = require('child-process-promise').exec
const path = require("path")

const iota = new IOTA({
    "host": null,
    "port": null
})
const requiredSeedLength = 81

module.exports.create = async function () {
    var seed = ""
    if (!args.seed) {
        seed = await createSeed()
    } else if (iota.valid.isTrytes(args.seed, requiredSeedLength)) {
        seed = args.seed
    } else if (args.seed.length != requiredSeedLength) {
        console.log(` Invalid seed length! Please make sure your seed is ${requiredSeedLength} characters long.`)
    } else {
        console.log("  Invalid seed! Please make sure your seed only consists of uppercase [A-Z] and 9.")
    }
    return seed
}

module.exports.checksum = function (seed) {
    return iota.utils.addChecksum(seed, 3, false).substr(-3);
}

async function createSeed() {
    try {
        let scriptPath = getSeedScriptPath()
        let seed = await getSeedFromScript(scriptPath)
        return seed
    } catch (err) {
        console.log(` Seed generation failed: ${err}`)
    }
}

function getSeedScriptPath() {
    let scriptPath = path.join(__dirname, "../scripts/seed/")
    switch (process.platform) {
        case 'darwin': return scriptPath += "osx.sh"
        case 'linux': return scriptPath += "linux.sh"
        default: return scriptPath += "default.py"
    }
}

async function getSeedFromScript(scriptPath) {
    var result = await exec(scriptPath)
    if (!result.code === 0 || !result.stdout || result.stderr) {
        trhow(result.stderr)
    }
    return result.stdout
}