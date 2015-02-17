var env = require('system').env;
var url = env.ROOT_URL;

describe("Example Tests", function() {
    before(function() {
        casper.start(url);
        casper.on('remote.message', function(message) {
            this.echo(message);
        });
    });
    it("should equal true", function() {
        casper.then(function () {
            var evalResult = casper.evaluate(function() {
                return {
                    "testResults": true,
                }
            });

            evalResult.testResults.should.equal(true);
        });
    });
});