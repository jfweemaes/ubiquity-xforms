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

//[ISSUE 52] IE6 does not allow CSS attribute selectors. This means those
//  selectors that require attribute selection must conditionally leave
//  those out when the user agent is IE6 and use the mechanism specified in
//  ie6-css-selectors-fixer.js instead.

// UX.selectors below (initial value) must not contain any attribute selectors
UX.selectors = {
    input : {
        color : {
            value : "xf|input.yui-widget-color > pe-value",
            labelvalue : "xf|input.yui-widget-color > xf|label > pe-value"
        },
        date : {
            value : "xf|input.yui-widget-calendar > pe-value",
            labelvalue : "xf|input.yui-widget-calendar > xf|label > pe-value"
        },
        dateminimal : {
            value : "xf|input.minimal-date > pe-value",
            labelvalue : "xf|input.minimal-date > xf|label > pe-value"
        }
    }
};

// Attribute selectors are added if the user agent supports them
if (!UX.isIE6) {
    UX.selectors.input.color.value += ", xf|input[datatype='xhd:color'] > pe-value";
    UX.selectors.input.color.labelvalue += ", xf|input[datatype='xhd:color'] > xf| label > pe-value";
    UX.selectors.input.date.value += ", xf|input[datatype='xsd:date'] > pe-value, xf|input[datatype='xf:date'] > pe-value";
    UX.selectors.input.date.labelvalue += ", xf|input[datatype='xsd:date'] > xf|label > pe-value, xf|input[datatype='xf:date'] > xf|label > pe-value";
    UX.selectors.input.dateminimal.value += ", xf|input[datatype='xsd:date'][appearance='minimal'] > pe-value, xf|input[datatype='xf:date'][appearance='minimal'] > pe-value";
    UX.selectors.input.dateminimal.labelvalue += ", xf|input[datatype='xsd:date'][appearance='minimal'] > xf|label > pe-value, xf|input[datatype='xf:date'][appearance='minimal'] > xf|label > pe-value";
}
// else, we delegate selection to ie6-css-selectors-fixer.js

//[ISSUE 8] IE does not natively support child selectors, but will ignore ">"
//	if found in css, making a selector such as "x > y", behave as a descendent
//	selector "x y".  This means that the order of occurrence of some of these
//	definitions is critical.  Specifically, the "common child" elements *must*
//	come after any controls that might use them, as (at present, anyway) label
//	is implemented as a control.

NamespaceManager.addSelectionNamespace("xf","http://www.w3.org/2002/xforms");	

DECORATOR.setupDecorator(
	[
	  
	//Switch off bindings within repeat, during load-time (FF )
		{
			selector:"xf|repeat > * ",
			cssText:"-moz-binding:url();"
		},
		
	//Switch bindings repeat back on within repeat.  (FF )

		{
			selector:"xf|repeat.repeat-ready > xf|group",
			objects:["EventTarget", "Context", "Group"]
		},

  /* Model */

		{
			selector:"xf|instance",
			objects:["EventTarget", "Instance"]
		},

		{
			selector:"xf|model",
			objects:["EventTarget", "Model"]
		},


		{
			selector:"xf|submission",
			objects:["EventTarget", "Context", "Submission"]
		},

    /* Controls */
        {
			selector:"xf|submit",
			objects:["EventTarget", "Context", "Control", "Submit"]
		},

        {
			selector:"xf|trigger",
			objects:["EventTarget", "Context", "Control"]
		},
		
		{
			selector:"xf|output >  pe-value",
			objects:["EventTarget", "XFormsOutputValue"]
		},
/*
		{
			selector:"pe-value",
			objects:["EventTarget"]
		},
    */
		{
			selector:"xf|input",
			objects:["EventTarget", "Context", "Control"]
		},

		{
			selector:"xf|range",
			objects:["EventTarget", "Context", "Control"]
		},

    	{
			selector:"xf|output",
			objects:["EventTarget", "Context", "Control"]
		},

		{
			selector:"xf|textarea",
			objects:["EventTarget", "Context", "Control"]
		},
		
		{
			selector:"xf|secret",
			objects:["EventTarget", "Context", "Control"]
		},
		{
			selector:"xf|label",
			objects:["EventTarget", "Context", "Control"]
		},
		{
			selector:"xf|alert",
			objects:["EventTarget", "Context", "Control"]
		},
		{
			selector:"xf|value",
			objects:["EventTarget", "Context", "Control","Value"]
		},

		{
			selector:"xf|input > pe-value",
			objects:["EventTarget", "XFormsInputValue"]
		},
		{
			selector:"xf|secret  > pe-value",
			objects:["EventTarget", "XFormsInputValue"]
		},
		{
			selector:"xf|textarea  > pe-value",
			objects:["EventTarget", "XFormsInputValue"]
		},
	
		{
			selector:"xf|select > pe-value",
			objects:["EventTarget", "XFormsSelectValue"]
		},
		{
			selector:"xf|select1 >  pe-value ",
			objects:["EventTarget", "XFormsSelect1Value"]
		},
		{
			selector:"xf|range > pe-value",
			objects:["EventTarget", "RangeValue"]
		},
		{
			selector:" xf|alert > pe-value",
			objects:["EventTarget", "XFormsOutputValue"]
		},

		{
			selector:"xf|label",
			objects:["EventTarget", "Context", "Control"]
		},
		{
			selector:"xf|value",
			objects:["EventTarget", "Context", "Value", "Control"]
		},
		{
			selector:"xf|value > pe-value",
			objects:["EventTarget"]
		},
		{
			selector:"xf|item",
			objects:["EventTarget", "Context", "Item"]
		},
		{
			selector:"xf|range.geolocation > pe-value",
			objects:["EventTarget", "RangeValueGMAP"]
		},
		//HACK: re-override the value binding for rangemap/label, because IE does not support child selectors.
		{
			selector:"xf|range.geolocation > xf|label > pe-value",
			objects:["EventTarget", "XFormsOutputValue"]
		},

        // YUI ColorPicker as <xf:input>
        {
            selector: UX.selectors.input.color.value,
            objects:["EventTarget", "InputValueColor"]
        },
        //HACK: IE does not support child selectors.
        {
            selector: UX.selectors.input.color.labelvalue,
            objects:["EventTarget", "XFormsOutputValue"]
        },

		// YUI Calendar as <xf:input>
		{
			selector: UX.selectors.input.date.value,
			objects:["EventTarget", "InputValueCalendar"]
		},
		//HACK: IE does not support child selectors.
		{
			selector: UX.selectors.input.date.labelvalue,
			objects:["EventTarget", "XFormsOutputValue"]
		},
		// Calendar with "minimal" appearance resorts to regular xf:input appearance
		{
			selector: UX.selectors.input.dateminimal.value,
			objects:["EventTarget", "XFormsInputValue"]
		},
		//HACK: IE does not support child selectors.
		{
			selector: UX.selectors.input.dateminimal.labelvalue,
			objects:["EventTarget", "XFormsOutputValue"]
		},

		{
			selector:"xf|select",
			objects:["EventTarget", "Context", "Control", "Select"]
		},				
		
		{
			selector:"xf|select1",
			objects:["EventTarget", "Context", "Control", "XFormsSelect1", "FiniteControl"]
		},

    		{
			selector:"xf|repeat",
			objects:["EventTarget", "Context", "Repeat"]
		},

		{
			selector:"xf|group",
			objects:["EventTarget", "Context", "Group"]
		},

    		{
			selector:"xf|case",
			objects:["EventTarget", "XFormsCase"]
		},

		{
			selector:"xf|switch",
			objects:["EventTarget", "Switch"]
		},

    /* Actions */

		{
			selector:"xf|action",
			objects:["Listener", "XFAction"]
		},
		
		{
    		selector:"xf|message",
    		objects:["Listener", "Message"]
		},

		{
			selector:"xf|setvalue",
			objects:["Listener", "Context", "SetValue"]
		},

		{
			selector:"xf|send",
			objects:["Listener", "Send"]
		},

		{
			selector:"xf|toggle",
			objects:["Listener", "Toggle"]
		},

		{
			selector:"xf|rebuild",
			objects:["Listener", "Rebuild"]
		},
		{
			selector:"xf|recalculate",
			objects:["Listener", "Recalculate"]
		},
		{
			selector:"xf|revalidate",
			objects:["Listener", "Revalidate"]
		},
		{
			selector:"xf|refresh",
			objects:["Listener", "Refresh"]
		},
		{
			selector:"xf|reset",
			objects:["Listener", "Reset"]
		},
	//Common child elements
		{
			selector:"xf|label >  pe-value",
			objects:["EventTarget", "XFormsOutputValue"],
			important:true
		},
	//Switch off bindings within repeat, during load-time (IE )
		{
			selector:"xf|repeat *",
			cssText:"-binding-ignore:true;"
		},
	//Switch bindings repeat back on within repeat.  (IE )
		{
			selector:"xf|repeat.repeat-ready *",
			cssText:"-binding-ignore:false;"
		}

	],
	"http://www.w3.org/2002/xforms"); //to tell the decorator so that it doesn't need to write these definitions again
