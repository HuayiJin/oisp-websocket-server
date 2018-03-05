copyright (c) 2018, Intel Corporation

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var assert = require('chai').assert,
	sinon = require('sinon'),
	rewire = require('rewire');

var sinonTestFactory = require('sinon-test');
var sinonTest = sinonTestFactory(sinon);

var fileToTest = "../server.js";

var fakelogger = {
	error: function(err) {
		return err;
	}
};
var fakecert = "";
var fakedecode = {
	sub: "deviceId"
};



describe(fileToTest, function() {
	var toTest = rewire(fileToTest);

	it('Shall get callback once when authorize device', sinonTest(function(done) {
		toTest.__set__("cert", fakecert);
		toTest.__set__("logger", fakelogger);

		var callbackSpy = this.spy();
		var authorizeDevice = toTest.__get__("authorizeDevice");
		authorizeDevice("Token", "deviceId", callbackSpy)
		assert(callbackSpy.calledOnce);
		done();
	}));

	it('Shall parse Message', sinonTest(function(done) {
		var callbackSpy = this.spy();
		var parseMessage = toTest.__get__("parseMessage");
		var msg = '{"hello":"world"}';
		parseMessage(msg, callbackSpy);
		assert(callbackSpy.calledOnce);
		done();
	}));

	it('Shall build actuation', sinonTest(function(done) {
		var content = {hello:'world'};
		var buildActuation = toTest.__get__("buildActuation");
		assert.equal(buildActuation(content), '{"code":1024,"content":{"hello":"world"}}', "get build");
		done();
	}));
});
