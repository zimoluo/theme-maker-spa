# Theme Maker

The unofficial single-page static web app for the Theme Maker of Zimo Web, modded from the site's original codebase. All other functionalities have been stripped away; only those related to the Theme Maker is kept. The static web app is also [hosted online](https://zimo-web-theme-maker-spa.s3.us-east-2.amazonaws.com/index.html).

## Installation

To install the SPA offline, use `build.sh` (for Unix-based systems such as Linux and macOS) or `build.bat` (for Windows) to create a static build of the website from the source code. These scripts require `node` and `npm`.

An additional script, `publish.py`, is provided for administrators to execute and update the website with the latest build. This script requires Python 3 and the `dotenv` library. Install the library using

```
pip install python-dotenv
```

To update the website, a `.env.local` file that contains necessary information is required.
