//TODO: this needs to be pulled from env.
var url = 'localhost:3000';

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