sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
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

            // Add the new form data to the model
            var aStudents = oModel.getProperty("/student") || [];
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
          if (!sStudentID || !sStudentName || !sStudentDOB || !sStreet  || !sPostCode || !sCity || !sCountry || !sEmail  || !sTelephone) {
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
            Street:sStreet,
            PostCode:sPostCode,
            City:sCity,
            Country:sCountry,
            Email:sEmail,
            Telephone:sTelephone      
        });


        // Update the table binding to reflect the changes and refresh the binding
      var oTable = this.byId("tab1");
      oTable.getModel("student").refresh();

      // Update the model
      oModel.refresh();
 // Clear the input fields after closing the dialog
 this.clearFormFields();

            var formData;
            aStudents.push(formData);
            oModel.setProperty("/student", aStudents);


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
onSubmitDialogbox: function () {
 //var oFragment = sap.ui.xmlfragment("saptask2.view.Activitybox", this);
   // var fragmentId = this.getView().createId("frActivity");
    var a1 = sap.ui.core.Fragment.byId("f1","a1");
    //var activityNameInput = this.byId("ActivityName");
    //var activityCostInput = this.byId("ActivityCost");
    
    if (!activityNoInput || !activityNameInput || !activityCostInput) {
        MessageBox.error("One or more input fields not found.");
        return;
    }
    
    var formData = {
        sActivityno: activityNoInput.getValue(),
        sActivityName: activityNameInput.getValue(),
        sActivityCost: activityCostInput.getValue()
    };

    // Get the existing array of students from the model
    var aStudents = oModel.getProperty("/student") || [];

    
    // Add the new form data to the students array
    aStudents.push(formData);

    // Set the updated students array back to the model
    oModel.setProperty("/student", aStudents);

    // Validate the input fields
    if (!formData.sActivityno || !formData.sActivityName || !formData.sActivityCost) {
        // If any field is empty, show an error message or handle it as per your requirement
        MessageBox.error("Please fill in all fields.");
        return;
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

