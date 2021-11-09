/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"gs/com/GSInnovation/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});