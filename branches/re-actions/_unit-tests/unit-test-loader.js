// Ubiquity provides a standards-based suite of browser enhancements for
// building a new generation of internet-related applications.
//
// The Ubiquity XForms module adds XForms 1.1 support to the Ubiquity
// library.
//
// Copyright (C) 2008 Backplane Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function runTheTests() {
  var moduleBase = pathToModule("unit-test-loader");
  var loader = new YAHOO.util.YUILoader();

  // There is no 'short name' for these two CSS files, so we need to reference them directly.
  //
  loader.addModule({ name: "logger-css",      type: "css",  fullpath: "http://yui.yahooapis.com/2.5.2/build/logger/assets/logger.css" });
  loader.addModule({ name: "test-logger-css", type: "css",  fullpath: "http://yui.yahooapis.com/2.5.2/build/yuitest/assets/testlogger.css" });

  // Add references to unit test scripts here.
  //
  loader.addModule({ name: "ux-ut-xforms-library-loaded", type: "js",  fullpath: moduleBase + "ut-xforms-library-loaded.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });
  loader.addModule({ name: "ux-ut-xpath-core-functions", type: "js",  fullpath: moduleBase + "ut-xpath-core-functions.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });
  loader.addModule({ name: "ux-ut-NamespaceManager", type: "js",  fullpath: moduleBase + "ut-NamespaceManager.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });

  loader.addModule({ name: "ux-ut-path-to-module", type: "js",  fullpath: moduleBase + "ut-path-to-module.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });

  loader.addModule({ name: "ux-ut-instance-standalone", type: "js",  fullpath: moduleBase + "ut-instance-standalone.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });

  loader.addModule({ name: "ux-ut-model-standalone", type: "js",  fullpath: moduleBase + "ut-model-standalone.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });

  loader.addModule({ name: "ux-ut-reset", type: "js",  fullpath: moduleBase + "ut-reset.js",
    requires: [ "yuitest", "logger-css", "test-logger-css" ] });

  
  
  loader.require( "ux-ut-xforms-library-loaded", "ux-ut-xpath-core-functions", "ux-ut-NamespaceManager", "ux-ut-path-to-module", "ux-ut-reset",
     "ux-ut-model-standalone","ux-ut-instance-standalone");


  loader.onSuccess = function(o) {
    //create the logger
    var logger = new YAHOO.tool.TestLogger();

    //add the test suite to the runner's queue
    YAHOO.tool.TestRunner.add(oSuitePathToModule);
    YAHOO.tool.TestRunner.add(suiteXFormsLibraryLoaded);
    YAHOO.tool.TestRunner.add(suiteXPathCoreFunctions);
    YAHOO.tool.TestRunner.add(suiteNamespaceManager);
    YAHOO.tool.TestRunner.add(suiteInstanceStandalone);
    YAHOO.tool.TestRunner.add(suiteModelStandalone);
    YAHOO.tool.TestRunner.add(suiteReset);

    //run the tests
    YAHOO.tool.TestRunner.run();
  };
  
  loader.insert();
  return;
}