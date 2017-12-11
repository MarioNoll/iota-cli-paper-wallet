# iota-cli-paper-wallet
CLI for generating IOTA paper wallets

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/looploooop/iota-cli-paper-wallet/master/LICENSE) [![Dependencies](https://david-dm.org/looploooop/iota-cli-paper-wallet.svg)](https://david-dm.org/looploooop/iota-cli-paper-wallet)

# Preview
![alt text](https://raw.githubusercontent.com/looploooop/iota-cli-paper-wallet/master/iota-cli-paper-wallet-preview.png)

# Support
* OS X
* Linux
* Windows

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

# Secure offline paper wallet generation

##### Prerequisites
* Download latest Node.js binaries from https://nodejs.org/en/ or via wget with 

  `wget https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-x64.tar.xz`

* Download latest iota-cli-paper-wallet release bundle (e.g. iota-cli-paper-wallet-1.0.16.tgz) from https://github.com/looploooop/iota-cli-paper-wallet/releases

* Copy both to an usb stick

### [1. Run live ubuntu from USB or DVD](https://tutorials.ubuntu.com/tutorial/try-ubuntu-before-you-install)

### 2. Install node js and iota-cli-paper-wallet from usb stick
`sudo tar -xf node-v8.9.3-linux-x64.tar.xz --directory /usr/local --strip-components 1`

`sudo npm i -g iota-cli-paper-wallet-1.0.16.tgz`

#### 2.1 Optional verify the checksum of iota-cli-paper-wallet.tgz

`sha256sum iota-cli-paper-wallet-1.0.16.tgz`

Make sure the output equals the checksum provided with the [release bundle](https://github.com/looploooop/iota-cli-paper-wallet/releases)

### 3. Run the following command and create a secure paper wallet :cop:
`iota-cli-paper-wallet`

###### Donations welcome: ALHVWOLOAHRHNFIVMAPBA9NVMIOAFKMUGBKKIZQVZKHITMFSARGVHRNUDCUFNBJKPFTEBYUTMDWNQCTPXNFFXEWPJD
