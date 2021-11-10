sap.ui.define([
	"gs/com/GSInnovation/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator"
], function (BaseController, JSONModel, BusyIndicator) {
	"use strict";

	return BaseController.extend("gs.com.GSInnovation.controller.FirstView", {
		onInit: function () {
			if (!this.FileUpload) {
				this.FileUpload = this.loadFragment({
					name: "gs.com.GSInnovation.Fragment.FileUpload"
				});
			}
			this.FileUpload.then(function (oDialog) {
				oDialog.open();
			});
			this.getView().setModel(new JSONModel({
				"Code": ""
			}), "CodeEditorModel");
		},

		readCodeFromAPI: function (sFile) {
			$.ajax({
				type: "GET",
				timeout: 50000,
				url: "./model/" + sFile + ".txt",
				data: null,
				success: function (data) {
					this.getView().getModel("CodeEditorModel").setProperty("/Code", data);
				}.bind(this)
			});
		},

		cancelFileUploadCreation: function () {
			this.FileUpload.then(function (oDialog) {
				this.readCodeFromAPI("I_TAXITEM");
				oDialog.close();
			}.bind(this));
		},

		onSelectTab: function (oEvent) {
			var sFilterId = oEvent.getParameter("selectedKey");
			BusyIndicator.show(0);
			this.readCodeFromAPI(sFilterId);
			setTimeout(function(){
				BusyIndicator.hide();
			}.bind(this), 700);
		},
	});
});