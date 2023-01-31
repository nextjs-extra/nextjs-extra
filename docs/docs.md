# nextjs-extra

nextjs-extra is a collection of utilities for Next.js.

They have been written originally for different projects, and now they are being published together with proper testing and documentation.

If you have some cool library that you think it would fit here, please open an issue to add it.

## Currently available modules

### [Async Component](async-component.md)

It mounts a component and returns a promise that resolves when the component
closes.

It can be used for confirmation dialogs, prompt dialogs, modals, popups, menus, toasts, etc.

### [Build Style](build-style.md)

A build tool that helps you write modularized [s]CSS and help you deal with CSS variables.

### [Dynamic Components](dynamic-components.md)

If you need to go beyond the usual conditional rendering, you can use this module that gives you an abstract component, capable of rendering any other component or html element, based on the props you pass to it.
### [Shared State](shared-state.md)

A shared state that uses URL-ish paths to access the values.

It can be used for sharing a state dynamically name-spaced, so following some API-like naming convention, any component can use a few properties to generate the URLs it needs to read and write any related shared value.


## Work in progress

This is module that will be published next.

### Build Driver

This help you to create decoupled abstraction layers so you can work with different up-stream and down stream providers, in a way that makes it easier for you to choose different providers for different environments and scenarios.

[ ] refactored
[ ] tested
[ ] published
[ ] examples
[ ] documented

## Backlog

These are the modules that are planned to be published in the future. It's not a final list. Priorities may change, some new modules may be added, and some modules may be removed.

- slider
- auto-stories
- build-middleware
- build-config
- dynamic-API
- dynamic-area
- dynamic-pages
