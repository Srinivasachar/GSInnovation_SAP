sap.ui.define([
	"gs/com/GSInnovation/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator"
], function (BaseController, JSONModel, BusyIndicator) {
	"use strict";

	return BaseController.extend("gs.com.GSInnovation.controller.GuidedAssistant", {
		onInit: function () {
             this.loadInitialData(); 
        },

        loadInitialData: function(){
                $.ajax({
                    type: "GET",
                    timeout: 50000,
                    url: "./model/GuidedAssistant.json",
                    data: null,
                    success: function (data) {
                        this.getView().setModel(new JSONModel(data), "Suggesstion");
                    }.bind(this)
                });
            }
	});
});