# nextjs-extra

nextjs-extra is a collection of utilities for Next.js.

They have been written originally for different projects, and now they are being published together with proper testing and documentation.

If you have some cool library that you think it would fit here, please open an issue to add it.

## Currently available modules

### [Async Component](async-component.md)

It mounts a component and returns a promise that resolves when the component
closes.

It can be used for confirmation dialogs, prompt dialogs, modals, popups, menus, toasts, etc.

### [Shared State](shared-state.md)

A shared state that uses URL-ish paths to access the values.

It can be used for sharing a state dynamically name-spaced, so following some API-like naming convention, any component can use a few properties to generate the URLs it needs to read and write any related shared value.

## Work in progress

This is module that will be published next.

### build style

A build tool that automatically append all your scss files and compiles one css file.

## Backlog

These are the modules that are planned to be published in the future. It's not a final list. Priorities may change, some new modules may be added, and some modules may be removed.

- build-style
- slider
- dynamic components
- auto-stories
- build-driver
- build-middleware
- build-config
- dynamic-API
- dynamic-area
- dynamic-pages
