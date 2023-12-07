sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("saptask2.controller.View1", {
            onInit: function () {
                // Initialize the JSON model
                var oModel = new JSONModel({
                    "student": []
                });
                this.getView().setModel(oModel, "student");
            },

            onSave: function () {
                // Assuming you have access to the form data
                // Get the JSON model
                var oModel = this.getView().getModel("student");
                console.log(oModel);
                // Add the new form data to the model
                var aStudents = oModel.getProperty("/student");
                // Assuming formData is an object representing your form data
                // Get values from the input fields
                var sStudentID = this.byId("stu-id1").getValue();
                var sStudentName = this.byId("stu-name1").getValue();
                var sStudentDOB = this.byId("stu-dob1").getValue();
                var sStreet = this.byId("stu-str1").getValue();
                var sPostCode = this.byId("stu-code1").getValue();
                var sCity = this.byId("city1").getValue();
                var sCountry = this.byId("con1").getValue();
                var sEmail = this.byId("email1").getValue();
                var sTelephone = this.byId("tel1").getValue();

                // Validate the input fields
                if (!sStudentID || !sStudentName || !sStudentDOB || !sStreet || !sPostCode || !sCity || !sCountry || !sEmail || !sTelephone) {
                    // If any field is empty, show an error message or handle it as per your requirement
                    MessageBox.error("Please fill in all fields.");
                    return;
                }

                // Assuming you have a JSON model named "student" for simplicity
                var oModel = this.getView().getModel("student");

                // Add new entry to the model
                oModel.getData().student.push({
                    StudentID: sStudentID,
                    StudentName: sStudentName,
                    StudentDOB: sStudentDOB,
                    Telephone: sTelephone,
                    Street: sStreet,
                    PostCode: sPostCode,
                    City: sCity,
                    Country: sCountry,
                    Email: sEmail,
                    Telephone: sTelephone
                });


                // Update the table binding to reflect the changes and refresh the binding
                var oTable = this.byId("tab1");
                oTable.getModel("student").refresh();

                // Update the model
                oModel.refresh();
                // Clear the input fields after closing the dialog
                this.clearFormFields();




                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "saptask2.view.Dialog"
                    }).then(function (oDialog) {
                        // Handle content density
                        if (sap.ui.Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        } else {
                            oDialog.addStyleClass("sapUiSizeCozy");
                        }

                        return oDialog;
                    }.bind(this));
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });

            },
            clearFormFields: function () {
                // Replace these IDs with the actual IDs of your form fields
                this.byId("stu-id1").setValue("");
                this.byId("stu-name1").setValue("");
                this.byId("stu-dob1").setValue("");
                this.byId("stu-str1").setValue("");
                this.byId("stu-code1").setValue("");
                this.byId("city1").setValue("");
                this.byId("con1").setValue("");
                this.byId("email1").setValue("");
                this.byId("tel1").setValue("");
            },

            onCloseDialog: function () {
                // note: You don't need to chain to the pDialog promise, since this event handler
                // is only called from within the loaded dialog itself.
                this.byId("dialog").close();
            },

            onCustomerChange: function (oEvent) {
                var oBindingContext = oEvent.getParameter("listItem").getBindingContext("student");
                debugger;
                this.byId("StudentActivityTable").setBindingContext(oBindingContext,"student");
                /*// Get the JSON model
                var oModel = this.getView().getModel("st
                udent");
                console.log(oModel);
                var oListItem = oEvent.getParameter("listItem");

                if (oListItem) {
                    var oBindingContext = oListItem.getBindingContext();
                    console.log(oBindingContext);

                    if (oBindingContext) {
                        this.byId("StudentActivityTable").setBindingContext(oBindingContext);
                    } else {
                        console.error("Binding context is undefined.");
                    }
                } else {
                    console.error("List item is undefined.");
                }*/
            },

            showactivity: function () {
                // Load the fragment
                if (!this.yourDialog) {
                    this.yourDialog = sap.ui.xmlfragment("saptask2.view.Activitybox", this);
                    this.getView().addDependent(this.yourDialog);
                }

                // Open the fragment
                this.yourDialog.open();
            },

            onCloseDialogbox: function () {
                // Close the fragment when the "Close" button is pressed
                this.yourDialog.close();
            },
            onSubmitDialogbox: function (oEvent) {
                var selectedItem = this.getView().byId("tab1").getSelectedItem().getBindingContext("student").getObject();
                console.log(selectedItem);
                if (!selectedItem._Activity1)
                    selectedItem._Activity1 = [];
                selectedItem._Activity1.push({
                    "Activityno1": sap.ui.getCore().byId("a1").getValue(),
                    "ActivityName1": sap.ui.getCore().byId("a2").getValue(),
                    "ActivityCost1": sap.ui.getCore().byId("a3").getValue()
                });
                this.getView().getModel("student").refresh();
                var activity = this.getView().byId("StudentActivityTable");
                console.log(activity);
                //sap.ui.getCore().byId("a1").getValue()
                // Instantiate the fragment ???
                /*  if (!this._oAddDataDialog) {
                      this._oAddDataDialog = sap.ui.xmlfragment("saptask2.view.Activitybox", this);
                      this.getView().addDependent(this._oAddDataDialog);
                  }
  
                  // Get values from the input fields
                  console.log(sap.ui.getCore().byId("a1").getValue());
                  var oActivityNoInput = byId("f1","a1");
                  var oActivityNameInput = byId("f1","a2");
                  var oActivityCostInput = byId("f1","a3");
  
                  // Check if controls are found
                  if (!oActivityNoInput || !oActivityNameInput || !oActivityCostInput) {
                      MessageBox.error("Input controls not found.");
                      return;
                  }
                  console.log(oActivityNoInput);
                  var sActivityNo = oActivityNoInput.getValue();
                  var sActivityName = oActivityNameInput.getValue();
                  var sActivityCost = oActivityCostInput.getValue();
  
                  // Validate the input fields
                  if (!sActivityNo || !sActivityName || !sActivityCost) {
                      MessageBox.error("Please fill in all fields.");
                      return;
                  }
  
                  // Assuming you have a JSON model named "student" for simplicity
                  var oModel = this.getView().getModel("student");
  
                  // Add new entry to the model
                  oModel.getData().student.push({
                      ActivityNo: sActivityNo,
                      ActivityName: sActivityName,
                      ActivityCost: sActivityCost,
                  });
  
                  // Update the table binding to reflect the changes
                  var oTable = this.byId("StudentActivityTable");
                  oTable.getModel("student").refresh();
  
                  // Update the model
                  oModel.refresh();
  */
                // Close the dialog
                this.onCloseDialogbox();

                // Clear the input fields after closing the dialog
                this.clearInputFields();
            },

            clearInputFields: function () {
                // Clear the input fields based on your control IDs
                var oActivityNoInput = this.byId("a1");
                var oActivityNameInput = this.byId("a2");
                var oActivityCostInput = this.byId("a3");

                if (oActivityNoInput && oActivityNameInput && oActivityCostInput) {
                    oActivityNoInput.setValue("");
                    oActivityNameInput.setValue("");
                    oActivityCostInput.setValue("");
                }
            },


            onCancelDialog: function () {
                // Close the dialog without saving
                this._oAddDataDialog.close();

                // Clear the input fields after closing the dialog
                this.clearInputFields();
            },
        });
    });

