# Introduction #

Different browsers interpret mixed HTML and XML markup in different ways, and do not always faithfully represent the input XML in the DOM, or reserialised markup.  This presents challenges to Ubiquity.


# Details #
  * FirefoxEmptyElements
> > Firefox erroneously represents empty elements as opening tags.
  * FirefoxKnownElements
> > Firefox moves elements that it thinks are HTML.