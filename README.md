# History Block

This project is a Firefox Extension meant to prevent saving of non-top level domains to History. Supports specifying exceptions in simple domains or using wildcards

## How To Build

- Either run build.sh using BASH or ZSH

OR

- Install Node 18 and NPM 8 (if not already installed)
- Navigate to project root
- Run `npm ci`
- Run `npm run build`
- Outputs to "dist" directory
- Navigate to "dist" directory
- run `zip -r -FS ../history-block.zip *`
- Outputs history-block.zip file to project root

## Tools Used

- Ubuntu 22.04.1 LTS
  - BASH & ZSH
- Node 18.13.0
- NPM 8.19.3
- Webpack (packaging and minification)
- Babel (Transpiling from ES6+ to ES5 for compatability)
- React (UI Development)
- Material UI (@mui NPM library) (Material Components)
