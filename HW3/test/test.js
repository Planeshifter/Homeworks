var fs      = require('fs');
var isUrl   = require('is-url');
var chai    = require('chai');
var expect  = chai.expect;

find_links_in = require('../lib/main.js').find_links_in;
find_links_in_html = require('../lib/main.js').find_links_in_html;

describe("find_links_in", function(){
  it("throws when no url is passed", function(){
    expect(function(){
      find_links_in();
    }).to.throw(TypeError);
  });
  it("throws when a no regex object is passed as second argument", function(){
    expect( find_links_in.bind(this, "http://www.nytimes.com/", {}, function(){} ) ).to.throw(TypeError);
  });
  it("does not throw when only URL is supplied", function(){
    expect( find_links_in.bind(this, "http://www.nytimes.com/", null, function(){}) ).to.not.throw(TypeError);
  });
});

describe("find_links_in_html", function(){
  var html = fs.readFileSync("./test/The R Project for Statistical Computing.shtml");
  it("pushes links on scraped page into array", function(){
    find_links_in_html(html, null, null, function(err, res){
      expect(res).to.have.length(9);
      res.forEach(function(url){
        var check = isUrl(url);
        expect(check).to.be.true();
      });
    });
  });
  it("correctly uses RegEx to remove unwanted URLs", function(){
    var usedRegEx = /\.R/;
    find_links_in_html(html, usedRegEx, null, function(err, res){
      expect(res).to.have.length(1);
      expect(res[0]).to.be.equal('http://www.r-project.org/misc/acpclust.R');
    });
  });
});
