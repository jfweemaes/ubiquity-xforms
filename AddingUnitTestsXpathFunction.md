# Introduction #

Any changes to the Ubiquity XForms library must be backed up with one or more unit-tests. This page shows how to add a unit-test for a core XForms XPath function. See AddingCoreXpathFunctions for a detailed description of the basic architecture of an XPath function.

In the following illustration we'll show how to add the [power()](http://www.w3.org/TR/xforms11/#fn-power) function.

# The `power()` function #

`power()` takes two numbers, and raises the first to the power of the second, returning the result as a number. If the calculation does not return a real number (for example, if one of the parameters is not itself a number, or is negative), then `NaN` is returned.

## Step 1: Creating the unit-test function ##

The first step is to create a test for your new function. The test will be located in [ut-xpath-core-functions.js](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3/_unit-tests/ut-xpath-core-functions.js).

Unit tests are added to the top level of the script, using calls like this:
```
suiteXPathCoreFunctions.add(
  new YAHOO.tool.TestCase({...})
);
```
The object literal passed to `TestCase` contains information about the test, and one or more tests that you would like to run.

Since our example is to test `power()`, we'll add a unit-test that has the Name 'Test power()', and a simple test to ensure that the function exists:
```
suiteXPathCoreFunctions.add(
  new YAHOO.tool.TestCase({
    name: "Test power()",

    testPowerExists : function () {
      var Assert = YAHOO.util.Assert;

      Assert.isFunction(FunctionCallExpr.prototype.xpathfunctions["power"], "power() is not defined.");
    }
  })//new TestCase
);
```

Save your code, and run the [unit-test driver](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3.x/_unit-tests/main.html). Click on `Run` and you should see the name of your new unit-test, followed by a green bar next to the name of your function, indicating that it has passed.

If you see script errors then check that you pasted your code correctly, and most importantly, that you placed you code at the top-level of the script.

If you don't get any script errors, but you get a red bar, then check that the function you are adding has a stub; in [xforms-core-function-library.js](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3/lib/xforms/xforms-core-function-library.js), functions that are not yet implemented should have an entry like this:
```
FunctionCallExpr.prototype.xpathfunctions["power"] = ThrowNotImpl;
```
If the function you want to implement doesn't have such an entry then add one.

Once you have the green bar, you can move on to the next step.

## Step 2: Adding a specific test ##

You can now add a test for your function. A good place to start when looking at tests are the examples given in the XForms specification itself; in the case of `power()` the spec says that `power(2, 3` should return `8`, so we'll use that.

Tests are just properties that begin with 'test', so to add another test we simply add another property. After the test that checks for your function's stub (in our example `testPowerExists`), add a comma, and then the following test:
```
    testPowerSuccess : function () {
      var Assert = YAHOO.util.Assert;

      Assert.areEqual(8, evalXPath('power(2, 3)').numberValue());
    }
```
Save the script and refresh the unit-test driver, and click `Run`; you should now get a _red_ bar, because the function hasn't yet been implemented.

## Step 3: Adding a first implementation of the function ##

In [xforms-core-function-library.js](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3/lib/xforms/xforms-core-function-library.js) find the function you want to add, and provide an implementation that is sufficient to pass the test you just created. In our example, to correctly return 2<sup>3</sup> we merely need to return the number `8`:
```
FunctionCallExpr.prototype.xpathfunctions["power"] = function(ctx) {
  return new NumberValue(8);
};
```
On running your unit-tests again, you should now have a green bar.

Of course you could have written the full function at this point, but this step-by-step approach is crucial to test-driven development (TDD), which is itself very important to the integrity of the Ubiquity XForms library. At this point you have a green bar, which means that nothing is broken, so you can now add more and more functionality to the function, knowing that you can always return to a stable point.

## Step 4: Adding another test ##

If this was all that the XForms specification required of `power()`, then we'd be finished. But of course the function is meant to be general-purpose, so we'll add another test. Let's try adding a test for 2<sup>20</sup> immediately after our previous assertion:
```
      Assert.areEqual(1048576, evalXPath('power(2, 20)').numberValue()); 
```
Hopefully you won't be surprised to see a red bar, with the following message:
```
FAIL testPowerSuccess: Values should be equal
Expected: 1048576 (number)
Actual:8 (number)
```
This is because our function is still hard-coded to return `8`.

## Step 5: Implementing the function ##

We're now at a point where the best way to fix the red bar is by implementing the `power()` function properly.

Returning to [xforms-core-function-library.js](http://code.google.com/p/ubiquity-xforms/source/browse/branches/0.3/lib/xforms/xforms-core-function-library.js) we first get the two parameters passed:
```
  var a = this.args[0].evaluate(ctx).numberValue();
  var b = this.args[1].evaluate(ctx).numberValue();
```
and then replace the hard-coded return value of `8` with the actual calculation of the power:
```
  return new NumberValue(Math.pow(a, b));
```
Our completed function now looks like this:
```
FunctionCallExpr.prototype.xpathfunctions["power"] = function(ctx) {
  var a = this.args[0].evaluate(ctx).numberValue();
  var b = this.args[1].evaluate(ctx).numberValue();

  return new NumberValue(Math.pow(a, b));
};
```
Run the test again and we should be back to a green bar.

## Step 6: Refactor ##

At this point in TDD we are in a strong position to refactor our code. Since we have a green bar in our test environment, and clearly defined interfaces to our function, we can make any changes we like _within_ our function; provided we maintain our green bar, we know that nothing we do will have affected what our function does, it will merely improve the design or performance.

Since many of our XPath functions are small, and such functions may be called multiple times within a form, we might as well make them as terse as possible, as long as we don't lose readability:
```
FunctionCallExpr.prototype.xpathfunctions["power"] = function(ctx) {
  return new NumberValue(
    Math.pow(
      this.args[0].evaluate(ctx).numberValue(),
      this.args[1].evaluate(ctx).numberValue()
    )
  );
};
```
This layout draws attention to all of the key pieces of information about the function:
  * it returns a number value;
  * it takes two parameters, each of which are also number values;
  * the 'inner workings' of the function is simply to call the `Math.pow` function.

## Step 7: Adding failing tests ##

The XForms specification says that if `power()` cannot return a correct result, it should return `NaN`. We can test this by adding another test, which is another example from the specification:
```
    testPowerFail : function () {
      var Assert = YAHOO.util.Assert;

      Assert.isNaN(evalXPath('power(-1, 0.5)').numberValue());
    }
```
Re-run the tests, and if you get a script error, check that you added a comma to the end of the `testPowerSuccess` property; you should still have a green bar.

We can now add more failing tests, such as checking that string values fail:
```
      Assert.isNaN(evalXPath('power("ubiquity", 2)').numberValue());
```
This should still give a green bar.

## Step 7: Checking parameters ##

Your new function should also check the number of parameters passed. In the case of `power()` an incorrect number of parameters should also return `NaN`.

The first step is to add such an assertion to the `testPowerFail` test:
```
      Assert.isNaN(evalXPath('power()').numberValue());
```
This will give a red bar because the function itself hasn't been written to defend against this. However, it's easy enough to add a check that there are two parameters:
```
FunctionCallExpr.prototype.xpathfunctions["power"] = function(ctx) {
  if (!this.args || this.args.length !== 2)
    return new NumberValue(NaN);

  return new NumberValue(
    Math.pow(
      this.args[0].evaluate(ctx).numberValue(),
      this.args[1].evaluate(ctx).numberValue()
    )
  );
};
```
Whether the XPath function you are implementing has a fixed number of parameters or not will depend on its definition. And of course, whether it should return `NaN` or some other value to indicate the error will also be determined by how it has been defined.

In the case of `power()` we know that the function takes two _and only two_ parameters, so we can add a few other assertions to check that `NaN` is returned for one and three parameters:
```
      Assert.isNaN(evalXPath('power(1)').numberValue());
      Assert.isNaN(evalXPath('power(1, 2, 3)').numberValue());
```

# Conclusion #

TDD is an efficient way to work when creating XPath functions. It advises that we first define the way our function will be called (in the tests), and only then look at how the function will actually work (in the implementation). The most basic implementation is sufficient, so that we can quickly get a green bar, since once we have that, we have a powerful environement in which to improve the way the function is designed and performs.