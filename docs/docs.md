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

### [Build Style](build-style.md)

A build tool that helps you write modularized [s]CSS and help you deal with CSS variables.

## Work in progress

This is module that will be published next.

### Dynamic components

This help you to load components and use them dynamically, meaning you don't have to hard-code the components you want to use.

## Backlog

These are the modules that are planned to be published in the future. It's not a final list. Priorities may change, some new modules may be added, and some modules may be removed.

- slider
- auto-stories
- build-driver
- build-middleware
- build-config
- dynamic-API
- dynamic-area
- dynamic-pages
