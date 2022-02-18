# Moral Code

Moral Code is an implementation of [Dame GM's Blog Post] from 2015, adding an alternative to the classic 3x3 Alignment grid to Foundry VTT.

Currently the module adds itself as a Header Button to Actor Sheets for GMs and the actors' owners.
Systems can also register sheets and themes to customize Moral Code to their own tastes.

Moral Code currently offers built-in support for the following systems:

- D&D 5th Edition
- Pathfinder 2nd Edition

Don't see your system on the list? Check the [Wiki](https://github.com/FloRad/moral-code/wiki) on how the registration works

## Installation

Look at the [Releases Page] for manual installation instructions

## Development

### ToDo

- [ ] Support for the SWADE system
- [ ] Make selection tracks more accessible
- [ ] Expand sheet registration possibilities

### Prerequisites

In order to build this module, recent versions of `node` and `npm` are
required. Most likely, using `yarn` also works, but only `npm` is officially
supported. We recommend using the latest lts version of `node`. If you use `nvm`
to manage your `node` versions, you can simply run

```
nvm install
```

in the project's root directory.

You also need to install the project's dependencies. To do so, run

```
npm install
```

### Building

You can build the project by running

```
npm run build
```

Alternatively, you can run

```
npm run build:watch
```

to watch for changes and automatically build as necessary.

### Linking the built project to Foundry VTT

In order to provide a fluent development experience, it is recommended to link
the built module to your local Foundry VTT installation's data folder. In
order to do so, first add a file called `foundryconfig.json` to the project root
with the following content:

```
{
  "dataPath": "/absolute/path/to/your/FoundryVTT"
}
```

(if you are using Windows, make sure to use `\` as a path separator instead of
`/`)

Then run

```
npm run link-project
```

On Windows, creating symlinks requires administrator privileges, so unfortunately
you need to run the above command in an administrator terminal for it to work.

### Creating a release

The workflow works basically the same as the workflow of the [League Basic JS Module Template], please follow the
instructions given there.

## Licensing

This project is being developed under the terms of the
[LIMITED LICENSE AGREEMENT FOR MODULE DEVELOPMENT] for Foundry Virtual Tabletop.

Repository content licensed under [Apache License 2.0]

[dame gm's blog post]: https://damegm.wordpress.com/2015/07/29/an-alternative-to-alignment/
[league basic js module template]: https://github.com/League-of-Foundry-Developers/FoundryVTT-Module-Template
[limited license agreement for module development]: https://foundryvtt.com/article/license/
[apache license 2.0]: https://github.com/FloRad/moral-code/blob/main/LICENSE
