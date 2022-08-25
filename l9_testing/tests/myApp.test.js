describe('square', function () {
    it('should return square of 5', function () {
      chai.expect(square(5)).to.equal(25);
    });

    it('should return square of -5', function () {
      chai.expect(square(-5)).to.equal(25);
    });
  });

  describe('Async squares', function() {
    this.timeout(5000);

    it('should send the square of 5 into the callback after some time', function(done) {
      squareAsync(-5, function (param) {
        chai.expect(param).to.equal(25);
        done();
      });
    });
  });