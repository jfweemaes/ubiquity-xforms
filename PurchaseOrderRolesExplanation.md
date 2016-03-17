# Introduction #

This page describes the two separate roles in the Purchase Order Demo outlined in HowToSetUpExistAndPurchaseOrder. The system is designed to demonstrate a possible application of XForms with a database back end and minimal server scripting. To this end there are two roles in the forms system that will be demonstrated. First there is a client form, this single form acts as the main purchase order for a client. The possibility of further forms or redirection is possible but the main view is seen on the client form. The second role in the system is that of the administrator. The administrator view was created to simulate a business back-end with the idea that some process will be followed to complete the customer order. There are multiple forms on the administrator back-end to demonstrate the possibilities of using XForms with little to no server side scripting.

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure1-Main.JPG

# Client Role #

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure2-Client.JPG

Above in Figure 2 we can see the main client form. There are several elements on the page that will be covered in detail throughout this section. The process of filling out the form is as follows:
  1. Select an item from the drop down list. See Item selection below.
  1. Add appropriate quantity desired.
  1. Add another item by using the Add (+) button.
  1. Fill in the customer information including credit card information and expiry.
  1. Fill in the shipping information.
  1. Submit the order.


### Item Selection ###

Item selection is the process by which a user will select an item from a drop down list and will add it to their order. The quantity field will be auto-filled with a single item, as well as the price depicted within the cost output.

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure3-ClientDD.JPG

In Figure 3 we can see that the drop down list has been activated within the red box. This allows a client to select an item by using the mouse to click on the desired item to purchase.

### Item Removal ###

In Figure 3 within the red box we can see the existence of a delete button marked by the (X). This will effectively remove the item from the current order and update the underlying model.

### Item Addition ###

In Figure 3 we can again see a blue addition sign (+) which allows the user to add an item to the purchase order list and effectively update the underlying model.

### Customer Information ###

Below in Figure 4 the red box highlights the customer information section. This is the last to be completed by the client prior to submission to the work-flow.

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure3-ClientCust.JPG


There are several elements worth mentioning on this page. The first is the Calendar Picker on the page used for dates. Xfroms has a data bind option that allows an input to be seen as a date. Once a data is chose the model is update with the proper value.

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure4-InvalidCC.JPG

In the above image we can see a invalid credit card number message a result of the credit card input field validation. The XForms processor possess the power to validate a credit card number as the appropriate type. This is not ensuring that your account has the money :). This field is mandatory and if not correctly filled the user will be warned with the a warning message as seen in Figure 5.


### Submission ###

The final step in the process is submission. The client presses the submission button seen in Figure 6. The submission screen will send the underlying data to the work-flow for updating the database. At this point the client submission is finished. And the user is exited from the application.

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure5-Submission.JPG


# Administrator #

The second role that this demo was designed to demonstrate was that of the administrator on the back-end. For the scenario it is correct to imagine the administrator at a different location then the client. The goal being to provide Create,Update, and Delete privileges to the administrator.

### Orders ###

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure6-Orders.JPG

In Figure 7 above there are several red highlights. That depict the actions an administrator is able to perform.

### Create ###

By using the highlighted blue Add (+) button the admin can add items to an order. The save button allows the admin to save any changes to the database.

### Delete ###

By using the “Process Order” button in the upper portion of each order it is possible for the administrator to remove an order from the orders list. As it sits this will then insert and order into processed section. The processed section makes use of an order summary or a “report” style summary to allow metrics to be recorded

The (x) in red in the picture above allows the admin to remove products from an order. Currently removing the entire order is not supported just the individual order elements. The idea being if a user would like to change there order after submission or an administrator would like to alter it.

### Update ###

In Figure 7 above the largest red highlight shows a row of a purchase order. It is possible to change all fields except for the price which is accessible from the Inventory section. The user is then able to save the changes to the order and the back end is updated.

### Orders Summary ###

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure6-Processed.JPG

The orders summary above is meant to allow the administrator to see a summary of the orders that have been filled for accounting purposes. The functionality of printing a report is currently not supported.

### Inventory ###

http://ubiquity-xforms.googlecode.com/svn/wiki/wikiImages/Figure9-Inventory.JPG

The inventory form as seen in figure 9 shows a detailed view of the inventory database. The goal here is to allow the admin to add new items using the green Add (+) button as seen surrounded by red and to update and of the information regarding the inventory items. The items in the inventory will be updated and the updates will be seen by the client interface. When filling out a purchase order form the items for purchase are the ones that appear on this page.