// Ubiquity provides a standards-based suite of browser enhancements for
// building a new generation of internet-related applications.
//
// The Ubiquity XForms module adds XForms support to the Ubiquity library.
//
// Copyright (c) 2008-2009 Backplane Ltd.
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

/* 
 * This file serves only to provide an endpoint for the ubiquity-backplane
 * module in xforms-loader.js as YUILoader's do not support the concept of a
 * "virtual" module -- a module that only serves as a place to hang common
 * dependencies off of.
 * 
 * This file along with the unrolled dependencies within xforms-loader.js can
 * be safely removed when the ubiquity-backplane project produces a rollup, 
 * or when the rollup builder for ubiquity-xforms is capable of traversing 
 * nested loaders.
 */