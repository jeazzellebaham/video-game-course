### Releasing

To release your library to `bower` initially:

1. Save your changes to the `index.js` file.
2. `git add -A`
3. `git commit -m"* add makeBody method"`
4. `git tag -a v0.0.1 -m "init"`
5. `git push origin master --tags`.  **DON'T FORGET --tags**
6. Run the command:

    ```bower register yourPackageName git://github.com/yourGitHubUsername/yourPackageName.git```

To ensure your release was successful:

1. Run the command:

    ```bower info yourPackageName```

You should see a print-out with data about your package, which should mirror what's in your `bower.json` file.
<hr>

### Updating 

To re-release your library to `bower`:

1. Save your changes to the `index.js` file.
2. Open up the `bower.json` file, and increment the version number, from `0.0.1` to `0.1.0` (this is a minor update). Save the file.
3. `git add -A`
4. `git commit -m"* add makeBody method"`
5. `git tag -a v0.1.0 -m "add makeBody() API"`
6. `git push origin master --tags`.  **DON'T FORGET --tags

References:

* <a href="http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/" target="_blank">Creating & Maintaining Your Own Bower Package</a>
* <a href="https://git-scm.com/book/en/v2/Git-Basics-Tagging" target="_blank">Git Tagging</a>