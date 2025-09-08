# TODO

Features/Enhancements/Fixes TODO

## Features

- Icon Badge (some sites load a page multiple times or are SPAs so they don't trigger certain listeners, making the badge sometimes not show up/flicker)
  - indicates if a site is saved to history, or blocked from history
  - Ability to turn badge off, as some might find it annoying
- Button to fill Add Exception input with current page url
- Some way to persist a single page without adding it to exceptions to prevent exception list cluttering
  - not sure how to accomplish this. Possibly add an option to only delete new history?
- Test sync storage
  - should be supported, but haven't tested it yet
- Paginated exceptions list
  - if it gets long enough, it might not render well or be slow
- Duplicate detection warning icon + text
  - Example www.example.com/test and www.example.com/*)
  - Text: "<exception> is covered by <wildcard_exception>"
  - Put this on both the add input, and in the list; Don't prevent adding it
- Quicker On/Off Toggle
  - somewhat annoying to enter the settings every time you want to disable
- Open logger/debugger
  - add ***useful*** debug statements throughout
- Internationalization
- Separate UI page
  - similar to something like UBlock settings page
  - makes for a more broad view of the state of the extension
- Tracking?
  - Number of history prevented (total, this session, etc)
  - ?
- Custom Icon
  - rather than just using a material-ui icon, make my own (and with the supported sizes)

## Enhancements

- Caching of exceptions so it isn't retrieved every time a page is visited
  - Would need to share data between the exceptions popup and the main js file
- Make "Filter Exceptions" input stand out less
  - pulls your attention away, can make you want to try adding the exception in there
- Shrink build output size
  - probably some tree-shaking could be done (maybe using TS would simplify it?)
- More refined UI
  - initial ui is pretty dirty, despite using mui libs. Dammit Jim, I'm a software engineer, not a UX designer!
- Tests
  - verify the integrity of the extensions

## Bug Fixes

- None Yet...

## Future

- Publish plugin for anyone to use
  - gotta get it up to snuff, and more generalized...
- Translate this file to github issues/project tasks
- Convert to Typescript?
  - not a huge fan, but might simplify the build process instead of needing webpack/babel which are also annoying to deal with...
