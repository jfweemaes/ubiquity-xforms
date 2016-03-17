# Introduction #

Add support of the [streamlined syntax](StorySimplifiedSyntax.md) to the Ubiquity XForms's namespace

# Details #

For a quick implementation of the streamlined syntax, we purpose the followings:

## First Purposal ##
1.  Add the decorator, and implement for the new streamlined elements:
  * form

2. Add the decorator rules for the following elements with a **name** attribute, and
the first element with the name attribute will create an empty model for the streamlined form. (the name attribute is used as an identifier of streamlined element)
  * group
  * input
  * hidden/sercet (HTML tagname or XForms?)
  * output
  * submit
3. Design and implement a Streamlined Behavior Object which attached to all streamlined elements and performs the following:
  * Generate the referenced node in the instance or bind it to an existing referenced node.
  * Extract the bindings, calculations, constriants information from the element and add it to the generated model.
4. After the document is loaded.
  * Ensure that the generated streamlined model is rebuild, recalculate, revalidate and refresh.

5. When a streamlined element is created dynamiclly, the css selector should trigger #3 but we need to ensure RRRR actions after 3 is completed.

## Second Proposal (Sept 16) ##

After the Sept 16 meeting, Mark suggested the following approach should better integrate the streamlined syntax into the current ubiquity xforms architecture. Instead of processing the streamlined syntax as a new syntax/behaviour, the streamlined syntax should be treated as part of standard XForms functionality. The streamlined syntax will use existing decorator rules and behaviour objects to handle the additional functionaility introduced.

These are the workitems for this approach:

1. Introduce and implement the form element for the XForms namespace.

2. Implement the lazy authoring for XForms context.

3. Use lazy authoring to generate the model/instance for streamlined.

4. Handle these streamlined attributes (name, constraint, type) within the element's context and do the following:
  * Generate the referenced node within the model's instance (lazy authouring)
  * Extract the constraint and type; Generate the necessary binds for the element and insert it to the model.
  * Process the default attribute in the context (use DOM )or the control (setValue).

# Future Work Item #
The above design should provide the basic features of the streamlined syntax,
then we will look into how to  provide support for [Streamlined Syntax elements in HTML namespace](WorkItemSupportHtmlInput.md).

# Questions/Comments: #

**Charlie** 1. Do we want to **require** a form element in order to create the model, submission, and instance?  I believe some use cases for streamlined syntax, particularly when used in the xforms namespace, won't require a form.  Perhaps any use of @name would generate the appropriate model, instance, and binds...

**Thomas:** The document is updated to reflect the form is not necessary the root element for streamlined syntax.

**Charlie** 2. Can we find a way to do the instance and bind generation that doesn't require a global binding information stack?  This processing model seems a bit "batch oriented"...i.e. has both a centralized stack and defers instance/bind creation to a centralized object and point of time...can this be broken up and placed directly on the streamlined behavior object -- just executed at the appropriate time???  I'm thinking this would help in the case where we're doing dynamic control creation, e.g. for repeats or just under script control, during page execution.  The logic for cooking up a new instance and bind, and wiring things up would need to be incrementally executable in that case too...

**Thomas:**
After our discussion and putting more thought on the issue, I think this is more an issue on what do we want the streamlined xforms processing model to be. From my understand XForms preocessing is always done in a "batch oriented" way.

One example to illustrate the "batch oriented" nature of XForms is
if an user uses the getInstanceDocument to retrieve an instance of XForms model, and use DOM method to update the instance document, all the changes from the instance is not applied to the views until the developer explicit make a call on the model to rebuild, recalculate, revalidate, refresh.

Another example is if user uses script to dynamic create one or more bind elements and insert it to the model. The bind element won't be applied to the model until the user explicit make a call on the model to rebuild, recalculate, revalidate, refresh.

There is no automatic update in the original XForms processing model, and I would assume that there's reasons why the spec is written this way.
So, the question is do we want to introduce this new feature to the streamlined syntax.

Drawing a parallel from the streamlined syntax, dynamicly create a streamlined input element is equivanlent to the following actions in the xforms:
  1. Create an XForms input
  1. Modify the instance document using the DOM
  1. Add a bind/calculate/constriant to the model
Action 2 and 3 effectively modify the XForms model, and the model requires rebuild, recalculate, revalidate, refresh. So now the questions are the following:
  * Does the streamlined syntax automaticlly perform the rebuild, recalculate, revalidate, refresh actions?
  * Should it behaves the same in HTML namespace and XForms namespace?

**Charlie's comments:** The XForms spec has the notion of "deferred updates" to allow for multiple actions to fire without triggering a rebuild etc cycle between each one.  So perhaps we can think of a similar feature here:

1. The streamlined behavior still has encapsulated knowledge of how to extend the instance with its implied element (in the right nesting order), and actually carries out this action by fetching the instance and doing the DOM manipulation required to insert its new element.  Likewise it adds the appropriate bind expression(s).

2. However, there's some deferred update switch available so that the streamlined behavior will defer doing the rebuild etc work until the entire set of elements have been added.  How this deferred period is bounded is an interesting question.  When we're not doing deferred updates, i.e. when a streamlined control is created dynamically during runtime, then it seems that the behavior should go on and call RRRR on its own.

Thus we still avoid the need for a global name stack and global control of the streamlined processing except for knowing when to trigger model rebuild etc.  At document load time there may well be other logic in UX that will do this anyway so we can punt on the question simply by telling the stremlined behavior not to do a rebuild when in doc load time.

**Thomas:** The document is updated to reflect the changes.
  * Remove the binding stack
  * Add the requirement to ensure the RRRR actions at the appropriate time.