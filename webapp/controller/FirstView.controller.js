sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("gs.com.GSInnovation.controller.FirstView", {
		onInit: function () {
			if (!this.FileUpload) {
				this.FileUpload = this.loadFragment({
					name: "gs.com.GSInnovation.Fragment.FileUpload"
				});
			}
			this.FileUpload.then(function (oDialog) {
				oDialog.open();
			});
			var oEditorModel = new JSONModel({
				"Code": ""
			});
			this.getView().setModel(oEditorModel, "CodeEditorModel");
			this.readCodeFromAPI("I_TAXITEM");
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
				oDialog.close();
			});
		},

		onSelectTab: function (oEvent) {
			var sFilterId = oEvent.getParameter("selectedKey");
			this.readCodeFromAPI(sFilterId);
			this.getView().getModel("CodeEditorModel").checkUpdate(true);
		},

	});
});