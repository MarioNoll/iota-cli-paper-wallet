# iota-cli-paper-wallet
CLI for generating IOTA paper wallets

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/looploooop/iota-cli-paper-wallet/master/LICENSE) [![Dependencies](https://david-dm.org/looploooop/iota-cli-paper-wallet.svg)](https://david-dm.org/looploooop/iota-cli-paper-wallet)

# Preview
![alt text](https://raw.githubusercontent.com/looploooop/iota-cli-paper-wallet/master/iota-cli-paper-wallet-preview.png)

# Support
OS X
Linux
Windows

# Installation

### [1. Install Node.js](https://nodejs.org/)

### 2 `npm install -g iota-cli-paper-wallet`

#### 2.1 Windows users please make sure [Python](https://www.python.org/downloads/) is installed and availabe in PATH


# Usage

`iota-cli-paper-wallet [options]`

 Options:

    -V, --version                      output the version number
    -i, --index [index]                Index of the generated address
    -s, --seed [seed]                  An optional seed for the paper wallet
    -l, --security-level [1, 2, 3]     Security level of the generated address
    -d, --discret                      Do not create qr codes
    -q, --qr-error-level [L, M, Q, H]  Error correction level for the qr codes
    -o, --output                       Display the options used for address and qr generation
    -h, --help                         output usage information


# Save as file

`iota-cli-paper-wallet > paper_wallet.txt`

This file can be printed from your browser or any editor which supports the fonts for the qr codes.


###### Donations welcome: ALHVWOLOAHRHNFIVMAPBA9NVMIOAFKMUGBKKIZQVZKHITMFSARGVHRNUDCUFNBJKPFTEBYUTMDWNQCTPXNFFXEWPJD
