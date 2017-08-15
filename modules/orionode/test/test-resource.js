/*******************************************************************************
 * Copyright (c) 2017 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*eslint-env mocha */
var assert = require("assert"),
	express = require("express"),
	supertest = require("supertest"),
	path = require("path"),
	testdata = require("./support/test_data"),
	middleware = require("../index.js");

var WORKSPACE = path.join(__dirname, ".test_workspace");

var orion = function(options) {
	// Ensure tests run in 'single user' mode
	var opts = options || {};
	opts.workspaceDir = WORKSPACE;
	opts.configParams = { "orion.single.user": true };
	return middleware(opts);
};

describe("Orion resources", function() {
	/**
	 * From: org.eclipse.orion.server.tests.resources.JSONSerializerTest.java
	 */
	describe("JSON serializer tests", function() {
		it("testSerializeAllProperties");
		it("testSerializeSingleProperty");
		it("testSerializeInvalidProperty");
		it("testSerializeExtendedTestResource");
	});
	/**
	 * From: org.eclipse.orion.server.tests.resources.ResourceShapeTest.java
	 */
	describe("JSON serializer tests", function() {
		it("testDefaultResourceShape");
		it("testInvalidRepositoryShapeType");
		it("testDefaultResourceShapeForNestedResource");
	});
});