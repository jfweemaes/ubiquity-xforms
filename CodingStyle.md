# Style #

## Tabs and spaces ##

Unfortunately, much of the existing code has been written with a combination of tabs and spaces. However, moving forward, all code should use tabs.

By using tabs, each developer is able to choose how they would like to see the code when they view it. This does mean however, that tabs are generally best for _indentation_ from the left, and then spaces used for any further alignment that is needed.

For example, say a developer who favours a tab-stop of two spaces creates the following function, using tabs for the indentation from the left:
```
function myFunc() {
  var someVariable;

  ...
  return;
}
```

A developer who chooses a tab setting of four spaces will still see the function correctly aligned, but it will look as follows:

```
function myFunc() {
    var someVariable;

    ...
    return;
}
```

Now, let's say that the first developer adds another variable to the list; if they use two tabs to line up the variable names then everything looks fine to them:

```
function myFunc() {
  var someVariable,
      anotherVariable;

  ...
  return;
}
```

however, for the second developer things won't be so regular:

```
function myFunc() {
    var someVariable,
            anotherVariable;

    ...
    return;
}
```

Tabs don't work so well for this kind of alignment.

One solution is to use four spaces to line up the variables, since after all, we are trying to align with something that has the four characters `var ` in front of it.

Another is to push things that need aligning onto subsequent lines:

```
function myFunc() {
  var
    someVariable,
    anotherVariable;

  ...
  return;
}
```

This has the advantage that variables can be added and removed from the list without having to worry about the fact that the first variable has `var` at the front.

## Variable and Class Naming ##

We don't have any hard and fast rules, at the moment, but [Ottinger's Rules for Variable and Class Naming](http://www.objectmentor.com/resources/articles/naming.htm) is a very useful read.

# JavaScript #

The code in Ubiquity XForms is written almost entirely in JavaScript. There are many ways to write JavaScript code, and there are many features in the language that are easily misused. For this reason our bible is Douglas Crockford's [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=pd_bbs_sr_1?ie=UTF8&s=books&qid=1213873532&sr=8-1). Anyone wishing to contribute to the code-base should get themselves a copy, give it a good read, and have it by their side whilst coding.

We also make use of Crockford's [JSLint](http://www.jslint.com/lint.html), which tests that code does not include any of the practices that his book advises against. Any code submitted needs to have been checked with JSLint, and to make it slightly easier to check whole directories, we've created JsLintFso.

# SVN #

See CodingUsingSvn.

# Books #

[![](http://ecx.images-amazon.com/images/I/51Mb1xCr7CL._SL500_AA240_.jpg)](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=pd_bbs_sr_1?ie=UTF8&s=books&qid=1213873532&sr=8-1)