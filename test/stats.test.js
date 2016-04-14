/* jshint node: true, mocha: true, expr: true */

var expect = require('chai').expect;
var stats = require('../lib/stats.js');

describe('[stats]', function() {
    it('has all expected keys', function() {
        expect(stats).to.have.all.keys(['mean', 'median', 'percentile']);
    });
    
    function validationTests(func) {
        [
            null,
            1,
            {},
            function() {}
        ].forEach(function(val) {
            it('throws if given invalid data value "' + (JSON.stringify(val) || val.toString()) + '"', function() {
                function guilty() {
                    func(val);
                }
                
                expect(guilty).to.throw('data is not an array');
            });
        });
        
        it('throws if given an array with non-number values', function() {
            function guilty() {
                func([1, 'r', 3]);
            }

            expect(guilty).to.throw('data[1] is not a number');
        });
    }
    
    describe('#mean', function() {
        it('calculated averages', function() {
            expect(stats.mean([1, 2, 3])).to.equal(2);
        });
        
        validationTests(stats.mean);
    });
    
    describe('#median', function() {});
    
    describe('#percentile', function() {
        var data = [1,3,4,5,7,9,11,13,14,15,17,22,25,26,27,29,30];
        
        it('returns a number', function() {
            expect(stats.percentile([2], 50)).to.be.a('number');
        });
        
        [
            // ground-truthed data
            [0,1],
            [1,1],
            [10,3],
            [50,14],
            [90,29],
            [99,30],
            [100,30]
        ].forEach(function(n) {
            it('calculates the nth percentile, where n is ' + n[0], function() {
                expect(stats.percentile(data, n[0])).to.be.a('number').and.to.equal(n[1]);
            });
        });
        
        validationTests(function(val) {
            stats.percentile(val, 50);
        });
        
        [-1, 101].forEach(function(n) {
            it('throws for invalid n value ' + n, function() {
                function guilty() {
                    stats.percentile(data, n);
                }

                expect(guilty).to.throw('n must be between 0 and 100');
            });
        });
    });
});
