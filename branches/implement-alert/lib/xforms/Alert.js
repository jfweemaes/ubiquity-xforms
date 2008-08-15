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

function Alert(elmnt)
{
	this.element = elmnt;

	if(this.element.localName.toLowerCase() == "xf:alert")
	{
		//  This allows the new alert element to be valid or invalid.
		var reference = "";
		if(this.element.parentNode.getAttribute("ref")) {
			reference = this.element.parentNode.getAttribute("ref");
		}
		else {
			reference = this.element.parentNode.getAttribute("value");
		}
		//  A new alert element is added after the control, because I couldn't move xf:alert
		//  to a good spot and I couldn't create another xf:alert in a good spot.
		//  In other words, making <alert> works and making <xf:alert> doesn't.
		//  Counterintuitively, insertAdjacentHTML works in Firefox, and createElement in IE.
		//	If createElement is used in firefox, the xbl does not bind.
		if(document.all)
		{
			var newAlert = document.createElement("alert");
			newAlert.setAttribute("ref", reference);
			var alert_content = document.createTextNode(this.element.textContent);
			newAlert.appendChild(alert_content);
			this.element.parentNode.insertBefore(newAlert, this.element.nextSibling);
		}
		else
		{
			var alert_html = "<alert ref='" + reference + "'>" + this.element.innerHTML + "</alert>";
			this.element.parentNode.insertAdjacentHTML("afterEnd",alert_html);
		}
	}
}
