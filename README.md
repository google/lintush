# Lintush - Commit made easy 🦄

Lintush uses [commitlint](https://github.com/conventional-changelog/commitlint) to help you write standard commit messages


## Quick start

``` shell
npm i -g lintush
-- OR --
npm i -D lintush
```

1. Run ```lintush --init``` in your project root to create a ```lintush-config.js``` file.
1. Edit ```lintush-config.js``` to fit your lint demands.
1. Make sure your project has a ```commitlint.config.js``` file with a ```scope-enum``` [required]
    * You can take a look at [this example](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) if you're not sure.


## Writing commit messages

Run ```lintush``` in your project directory to write your amazing commit message 🦄🦄🦄

You can run ```lintush && git commit -F .git/COMMIT_EDITMSG``` to automatically commit,
or run ```lintush && git commit -F .git/COMMIT_EDITMSG -e``` to edit your commit message after ```Lintush``` is done.


