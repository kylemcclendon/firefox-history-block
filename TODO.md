# TODO

Features/Enhancements/Fixes TODO

## Features

- Icon Badge (some sites load a page multiple times or are SPAs so they don't trigger certain listeners, making the badge sometimes not show up/flicker)
  - indicates if a site is saved to history, or blocked from history
  - Ability to turn badge off, as some might find it annoying
- Button to fill Add Exception input with current page url
- Some way to persist a single page without adding it to exceptions to prevent exception list cluttering
  - not sure how to accomplish this. Possibly add an option to only delete new history?
- Support sync storage
- Paginated exceptions list
  - if it gets long enough, it might not render well
- Duplicate detection warning icon + text
  - Example www.example.com/test and www.example.com/*)
  - Text: "<exception> is covered by <wildcard_exception>"
  - Put this on both the add input, and in the list; Don't prevent adding it
- On/Off Toggle
  - might want to save history for a bit
- Open logger/debugger
  - add ***useful*** debug statements throughout
- Internationalization
- Separate UI page
  - similar to something like UBlock settings page
  - makes for a more broad view of the state of the extension
- Tracking?
  - Number of history prevented
  - ?
- Custom Icon
  - rather than just using a material-ui icon, make my own (and with the supported sizes)

## Enhancements

- Caching of exceptions so it isn't retrieved every time a page is visited
  - Would need to share data between the exceptions popup and the main js file
- Make exceptions filter input stand out less
  - pulls your attention away, can make you want to try adding the exception in there
- Shrink build output size
  - probably some tree-shaking could be done
- More refined UI
  - initial ui is pretty dirty, despite using mui libs
- Dev build
  - so i can iterate faster. building, reloading, testing takes too long, when it's just a simple change.
  - probably would require a ui page. not sure how the webextension-polyfill works with that
- Tests
  - verify the integrity of the extensions

## Bug Fixes

- Some exceptions don't work. Example: https://backloggery.com/games.php?user=ERROR372
  - most likely has to do with the dot, question mark, or equals sign
- Doesn't support things not using www (such as docs.google.com)

## Future

- Publish plugin for anyone to use
  - gotta get it up to snuff, and more generalized...
- Translate this file to github issues/project tasks
