# ⚒️ Super SvelteKit CLI 🧰

### What is Super Sveltekit CLI?

**Super Sveltekit CLI** is a command line tool for the Sveltekit framework. The idea behind this tool is to facilitate the creation of routes and integration of libraries and services.

The tool will expand by adding integrations with other libraries, creating examples or facilitating the whole process to start working with the different libraries.

The good thing is that you can start using it since it is not a dependency but a tool, so although it is in an early stage of development maybe it can be useful.

The command will automatically watch for typescript, so it will generate server.js or server.ts for example depending of your setup.

## Things to see 👀
- [Features](#features)
- [Next steps 🚀](#next-steps)
- [Commands](#commands):
    - [create](#create)
        - [route](#route)
        - [api](#api)

## Features

- Routes with files generation: +page.server.js|ts(with load function and optional action), +page.svelte(with optional action form) and optional: +layout.svelte and +layout.server.ts
- Api endpoints and routes: generate api endpoints with routes and http operations inside of it: GET,POST,PUT,PATCH,DELETE.

## Next steps

- Improve cli messages
- New command to generate actions
- Ask for sveltekit project scaffold when the command is used outside a sveltekit project.
- More commands...

## Installation 🛬

```
npm i -g super-sveltekit-cli
```
PNPM
```
pnpm i -g super-sveltekit-cli
```

**Is a command line tool!** You dont have to install it as a dependency.

## Commands

### Create

Creates files, see below al the commands available and documentation.

#### Route

By default all paths created by this command will be created under the folder **src/routes**

<table>
    <thead>
        <tr>
            <th colspan="3">Arguments</th>
        </tr>
        <tr>
            <th>Argument</th>
            <th>Description</th>
            <th>Valid Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Name or names of the path to be created</td>
            <td>name | path/name | path/"("group")/name" | path/[slug]/name | if no value is provided will ask for a name</td>
        </tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th colspan="3">Flags</th>
        </tr>
        <tr>
            <th>Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--layout | -l</td>
            <td>Adds to the route a layout file inside of it</td>
        </tr>
        <tr>
            <td>--layout-only | -lo</td>
            <td>Creates the route only with the layout file, useful when you want to create a route with a layout and inside of it a route with all the files: blog/+layout.svelte and after that blog/post/+page.svelte</td>
        </tr>
        <tr>
            <td>--layout-server | -ls</td>
            <td>Adds to the route a layout server file with a load function</td>
        </tr>
    </tbody>
</table>

#### Description
Creates a route under **src/routes** folder, by default the command will generate **+page.svelte** and **+page.server.js|ts** with a load function inside of it, you can extend the command with flags to add **layout files, layout server files or only layout files**  

- Alias: c p

```bash
$ ssc create route name
```

This comand will create the next route **./src/routes/name** with **+page.svelte** and **+page.server.js** files inside of it

You can create sub routes too:

```bash
$ ssc create route name/test/ssc
```
Create a route with a slug:
```bash
$ ssc create route name/[slug]/ssc
```


Grouping routes:

```bash
$ ssc create route name/"("group")"/test
```
And it will create the route: **routes/name/(group)/test**
| :exclamation: Grouping routes                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The command line has some limitation for example you cannot create a group of routes this way **routes/(group)/route-name** the command line will throw an error, you must scape the parenthesis with double quotes **routes/"("group")"/route-name** |

#### Api

By default all paths created by this command will be created under the folder **src/api**

<table>
    <thead>
        <tr>
            <th colspan="3">Arguments</th>
        </tr>
        <tr>
            <th>Argument</th>
            <th>Description</th>
            <th>Valid Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>Name or path of the path to be created</td>
            <td>name | path/name | path/"("group")/name" | path/[slug]/name | if no value is provided will ask for a name</td>
        </tr>
    </tbody>
</table>
<table>
    <thead>
        <tr>
            <th colspan="3">Flags</th>
        </tr>
        <tr>
            <th>Flag</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--crud | -c</td>
            <td>Generates the server file with crud operations</td>
        </tr>
        <tr>
            <td>--get | -g</td>
            <td>Adds to the file a GET operation</td>
        </tr>
        <tr>
            <td>--post | -p</td>
            <td>Adds to the file a POST operation</td>
        </tr>
        <tr>
            <td>--put | -pt</td>
            <td>Adds to the file a PUT operation</td>
        </tr>
        <tr>
            <td>--patch | -pa</td>
            <td>Adds to the file a PUT operation</td>
        </tr>
        <tr>
            <td>--delete | -d</td>
            <td>Adds to the file a DELETE operation</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Combine all this flags to create the server file you need, see examples below</td>
        </tr>
    </tfoot>
</table>

#### Examples

- Create a empty server file:
```
$ ssc create api name
```
- Create a server file with crud operations:
```
$ ssc create api name -c
```
- Create a server file with different operations:
```
$ ssc create api name -g
```
Generates the file with a GET operation
```
$ ssc create api name -g -p -d
```
Generates the file with GET, POST and DELETE operations