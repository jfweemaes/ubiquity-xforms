# Introduction #

The ubiquity-xforms engine supports the ability for users to call Javascript functions from any xpath expression.  This functionality allows you to add your own formatting and calculation routines with the full power of the Javascript language.  This document describes how to use this functionality in your forms.

# Defining and Calling Functions #

The XPath specification permits the use of user defined functions within expressions, however the specification does not define how to register a function with an XPath evaluator.  As such, each implementation is left on its own to determine the best way to attach functions.  For ubiquity-xforms, all Javascript functions in the global namespace (the window object) are available to XPath expressions, however when calling, the function name must be prefixed with an XML namespace prefix that whose URI maps to `http://www.w3.org/2002/xforms#inline`.

Although all functions are accessible, there is a much more limited set of data types available to the XPath engine.  These types are essentially only: strings, numbers, booleans, and node-sets.  Of these types, all but node-sets can be passed freely betweeen Javascript and XPath.  If any other type attempts to cross the function call with fail with a result of `false`.  An exception to this rule has been made for single-valued node-sets to ease the authoring of XPath expressions that call into Javascript.

Single-valued node-sets may be passed from XPath to Javascript, however as the Javascript function is being invoked, the node will be converted into a string containing the text content of the node.  This syntax sugar simplifies expressions allowing  you to write an expression as `prefix:capitalize(.)` instead of `prefix:capitalize(string(.))`.

When the XPath engine attempts to evaluate a function call it looks for internal functions first, this coupled with the fact that Javascript functions must be prefixed ensures that user defined functions cannot override internal functions.  If the XPath engine cannot find an internal function with the name specified, and there is a function with the same local-name in the global Javascript namespace it is invoked.  In the event that the named function cannot be found internally or by consulting the global Javascript namespace, a `false` is returned.

## Sample ##

```
<html xmlns:xf="http://www.w3.org/2002/xforms" xmlns:js="http://www.w3.org/2002/xforms#inline">
<head>
   <script>
      function currency(value) {
         return '$' + parseFloat(value, 10).toFixed(2);
      }
   </script>
</head>
<body>
   <xf:model>
      ...
   </xf:model>

   <xf:output ref="total" value="js:currency(.)">
      <xf:label>Total:</xf:label>
   </xf:output>
</body>
</html>
```

# Implementation Status #

A full implementation of this feature has too much scope for a single phase.  As such, this feature has been broken down into a series of smaller phases permitting the feature to grow and change as its requirements are shaped through real world use.  The current implementation status of the feature is outlined below:

| Complete? | Use Case |
|:----------|:---------|
| Yes       | Calling Javascript functions from XPath |
| Yes       | Passing simple types between XPath and Javascript |
| No        | Allowing for user defined function libraries, or scoped functions |
| No        | Passing node-sets between Javascript and XPath |