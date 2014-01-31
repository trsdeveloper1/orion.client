/*******************************************************************************
 * @license
 * Copyright (c) 2011, 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global URL define window console eclipse orion*/
define(['orion/widgets/browse/fileBrowser', 'orion/serviceregistry', 'orion/pluginregistry', 'orion/URL-shim'],
function(mFileBrowser, mServiceRegistry, mPluginRegistry) {
	var pluginURL = new URL("../../plugins/GitHubFilePlugin.html?repo=https://github.com/eclipse/orion.client.git&token=3bbaae0679391edd086b665627fbbe5b7168ff50", window.location.href);
	var serviceRegistry = new mServiceRegistry.ServiceRegistry();
	var plugins = {};
	plugins[pluginURL.href] = true;
	var pluginRegistry = new mPluginRegistry.PluginRegistry(serviceRegistry, {
		storage: {},
		plugins: plugins
	});
	pluginRegistry.start().then(function() {
		var fileBrowser = new mFileBrowser.FileBrowser({
			parent: "fileBrowser", 
			showBranch: true,
			//showComponent: true,
			//rootName: "RootName",
			maxEditorLines: 100,
			serviceRegistry: serviceRegistry
		});
	});
});


