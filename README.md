# History Block

This project is a Firefox Extension meant to prevent saving of non-root domains to History. Supports specifying exceptions in simple domains or using wildcards

Examples:

- https://www.google.com (auto-saved by being a root level domain)
- https://www.youtube.com/watch?<some-video-id> (deleted for not being a root level domain)
- https://www.reddit.com/r/reddit (with a defined exception of "https://www.reddit.com/r/*", saved for matching exception)
- https://www.reddit.com/r/reddit/comments... (with a defined exception of "https://www.reddit.com/r/*", deleted for not matching any exception)

## How To Build

- Either run build.sh using BASH or ZSH

OR

- Install Node 24 and NPM 11 (if not already installed)
- Navigate to project root
- Run `npm ci`
- Run `npm run build`
- Outputs to "dist" directory
- Navigate to "dist" directory
- run `zip -r -FS ../history-block.zip *`
- Outputs history-block.zip file to project root

## Tools Used

- Ubuntu 24.04.3 LTS
- BASH
- Node 24.7.0
- NPM 11.5.1
- Webpack (packaging and minification)
- Babel (Transpiling from ES6+ to ES5 for compatability)
- React (UI Development)
- Material UI (@mui NPM library) (Material Components)
