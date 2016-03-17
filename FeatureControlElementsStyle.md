# Introduction #

It is possible to style various bits in the anatomy of a control separately -- be it:
  * the `xf:label`,
  * the `xf:hint`,
  * the `xf:alert`,
  * `xf:item`s and `xf:choice`s in a selection list,
  * the control itself,
  * the container element of the control, e.g., the `xf:input` element itself, which can be used to influence the local layout of label relative to the body of the control for example.

# Details #

Architecturally, this is enabled by the child pseudo-element (`pe-value`) to hold the control itself, as described in [anatomy of a control](http://www.formsplayer.com/node/121) on the formsPlayer site.

We need to document this as part of the broader documentation on how controls work.