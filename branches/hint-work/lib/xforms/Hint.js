/*
 * Copyright (C) 2008 Backplane Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function Hint(elmnt)
{
	this.element = elmnt;

    this.context = this.element.parentNode;
	var forAttr = this.element.getAttribute("for");
	if (forAttr) {
	  //find the element with id === forAttr
	  var findForElement = this.element.ownerDocument.getElementById(forAttr);
	  if (findForElement) {
	     this.context = findForElement;
	  }
	}
	
	this.element.addEventListener(
		"xforms-hint",
		this, 
		true
	);
}

Hint.prototype.handleEvent = DeferToConditionalInvocationProcessor;

Hint.prototype.performAction = function(oEvt)
{
    if (oEvt.type === "xforms-hint") {
        var hintSTR = this.element.textContent;
    	if(this.element.getAttribute("ref") || this.element.getAttribute("nodeset")) {
    		hintSTR = this.element.m_value.textContent;
    	}
    	
		YAHOO.myToolTip = new YAHOO.widget.Tooltip(
			"myToolTip",
			{
	    		context:this.context,
	    		text:hintSTR,
	    		autodismissdelay:2000
	    	}
	    );
    }
};
