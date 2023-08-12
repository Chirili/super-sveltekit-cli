# Documentation of Super SvelteKit CLI

### What is Super Sveltekit CLI?

**Super Sveltekit CLI** is a command line tool for the Sveltekit framework. The idea behind this tool is to facilitate the creation of routes and integration of libraries and services.

The tool will expand by adding integrations with other libraries, creating examples or facilitating the whole process to start working with the different libraries.

The good thing is that you can start using it since it is not a dependency but a tool, so although it is in an early stage of development maybe it can be useful.



## Commands available

<table>
    <thead>
        <tr>
            <th>Command</th>
            <th>Flags</th>
            <th>Alias</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2">Create</td> 
            <td>c</td>
        </tr>
        <tr>
            <td>path</td> 
            <td>-l, -lo, -ls</td>
            <td>p</td>
        </tr>
    </tbody>
</table>

### Create

Creates files, see below al the commands available and documentation.

#### Path path \<name\>

Creates a path with a **+page.svelte** and **+page.server.js|.ts** file inside, by default it creates the files in **src/routes** folder, you can provide a relative route to create the files, here are some examples:

- Alias: c p

```bash
$ ssc create path name
```

This comand will create the next path **./src/routes/name** with **+page.svelte** and **+page.server.js** files inside of it

You can create sub routes too:

```bash
$ ssc path name/test/ssc
```
Create a route with a slug:
```bash
$ ssc path name/[slug]/ssc
```


Grouping routes:

```bash
$ ssc path name/"("group")"/test
```
And it will create the path: **routes/name/(group)/test**
| :exclamation: Grouping routes                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The command line has some limitation for example you cannot create a group of route **routes/(group)/test** it will throw an error, at least in windows console you can scape the characters |



### Tools used by this library
- [commander.js](https://github.com/tj/commander.js)
- [inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [eta.js](https://github.com/eta-dev/eta)