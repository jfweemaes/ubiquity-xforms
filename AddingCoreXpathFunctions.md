# Introduction #

XForms uses XPath to indicate the data to be used in expressions. For example, when using a form control, XPath is used to indicate which node in the data model the control should interact with. Similarly, when creating rules such as readonly, or required, the expression itself will be indicated with XPath.

XPath itself comes with a set of core functions, which XForms extends. In this page we describe how to add XPath functions to the core.

# AJAXSLT #

The Ubiquity XForms processor uses Google's [AJAXSLT](http://code.google.com/p/ajaxslt/) to provide its XPath functionality. This library provides a mechanism for adding additional functions, which is what we'll describe here.

# Core XForms functions #

The file that contains the XForms function library is [xforms-core-function-library.js](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3/lib/xforms/xforms-core-function-library.js).

All entries should be in alphabetical order, to make them easier to find. An entry begins with some JSDoc comments that link to the documentation in the XForms specification:
```
/**@addon
  http://www.w3.org/TR/xforms11/#fn-boolean-from-string
*/
```
Next, an entry for the function is added as a property of the `xpathfunctions` object, which has been added by the Ubiquity library to the AJAXSLT `FunctionCallExpr` prototype:
```
FunctionCallExpr.prototype.xpathfunctions["boolean-from-string"] = ...
```
Note that the property is entered using the `["..."]` syntax, so as to avoid any problems that might arise with property naming, such as if the name of a function is the same as a JavaScript reserved word.

The value of the property is the XPath function itself. If the function has not yet been implemented then it should be set to the `ThrowNotImpl()` function:
```
FunctionCallExpr.prototype.xpathfunctions["random"] = ThrowNotImpl;
FunctionCallExpr.prototype.xpathfunctions["compare"] = ThrowNotImpl;
```
Otherwise a JavaScript function is created that provides the required functionality:
```
FunctionCallExpr.prototype.xpathfunctions["boolean-from-string"] = function(...) {
  ...
};
```

# Values provided to the function #

An XPath expression might be used like this:
```
<xf:bind nodeset="/a" readonly="boolean-from-string(b)" />
```
When evaluating XPath expressions, the function receives the parameters indicated by the author, as well as an evaluation context which is used within any functions.

In the example here, there is a parameter to the function of `/a/b`, and an evaluation context of `/a`.

## Parameters ##

The parameters that an author specifies for the XPath function are not passed as arguments to a JavaScript function; instead they are passed using the `args` object, which is a member of the `FunctionCallExpr` object.

## Evaluation Context ##
The evaluation context is provided by the AJAXSLT framework as an argument to the new XPath function. By convention this is called `ctx`:
```
FunctionCallExpr.prototype.xpathfunctions["boolean-from-string"] = function(ctx) {
  ...
};
```

## Values returned from evaluations ##

An argument has an `evaluate()` method which can be used to evaluate an expression relative to its context:
```
  var v = this.args[0].evaluate(ctx);
```
Note that the arguments array (`args`) is zero-based, and that any evaluation has to take place relative to `ctx`.

The returned value does not have a type, but instead contains methods that enable a typed version of the value to be obtained. For example, to obtain the returned value as a string, use the `stringValue()` method:
```
  var s = this.args[0].evaluate(ctx).stringValue();
```

# An example #

The XForms `boolean-from-string()` function takes a string value as a parameter, and if the value is "true" or "1", the function will return `true`. All other values will return `false`.

To implement this function, the first thing we need to do is get a string version of the first parameter passed. This is achieved as follows:
```
FunctionCallExpr.prototype.xpathfunctions["boolean-from-string"] = function(ctx) {
  var s = this.args[0].evaluate(ctx).stringValue();
```

The next step in the function is to remove any leading or trailing spaces:
```
  s = s.trim();
```
The last step is to return a new `BooleanValue` object (which is defined by AJAXSLT), and set its value based on whether the expression we evalutated was "true", "1", or something else:
```
  return new BooleanValue((s.toLowerCase() === "true") || (s === "1"));
};
```
The complete function looks like this:
```
/**@addon
  http://www.w3.org/TR/xforms11/#fn-boolean-from-string
*/
FunctionCallExpr.prototype.xpathfunctions["boolean-from-string"] = function(ctx) {
  var s = this.args[0].evaluate(ctx).stringValue();

  s = s.trim();
  return new BooleanValue((s.toLowerCase() === "true") || (s === "1"));
};
```

# Testing #

Every function that is added needs a unit-test. See AddingUnitTestsXpathFunction for a detailed description of how to create them.