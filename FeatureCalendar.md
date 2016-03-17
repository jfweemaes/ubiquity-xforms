The YUI library contains a calendar control, as illustrated [here](http://developer.yahoo.com/yui/examples/button/btn_example09.html) and [here](http://developer.yahoo.com/yui/examples/button/btn_example10.html). This could be invoked in XForms using the an `xf:input` control, bound to a node of type `xsd:date`:
```
<xf:model>
  <xf:instance>
    <inst xmlns="">
      <d />
    </inst>
  </xf:instance>

  <xf:bind nodeset="d" type="xsd:date" />
</xf:model>

<xf:input ref="d">
  ...
</xf:input>
```
However, we should also allow an `xf:select1` that is bound to a date to render the same thing.

The YUI calendar control allows for multiple values to be selected, as illustrated [here](http://developer.yahoo.com/yui/examples/calendar/multi.html); we should make this feature available by using `xf:select`.

The YUI calendar control also allows a start and end date to be specified, which limits the user's choice, as illustrated [here](http://developer.yahoo.com/yui/examples/calendar/minmax.html); we should make this feature available by using `xf:range`. The example on the YUI site could be marked up like this:
```
<xf:range ref="d" start="2008-01-05" end="2008-01-15">
  ...
</xf:range>
```

Finally, all of the above options should be available to the author without having to use `@type`, simply by setting `@datatype` or `@appearance` on the control itself:
```
<xf:input ref="d" appearance="ux:calendar">
  ...
</xf:input>
```
```
<xf:input ref="d" datatype="xsd:date">
  ...
</xf:input>
```