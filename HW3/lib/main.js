/*jslint node: true */
'use strict';

var request = require('request');
var cheerio  = require('cheerio');

function find_links_in(url, regex, callback){
  if (typeof url != "string"){
    throw new TypeError("URL has to be supplied");
  } else if (regex && arguments.length == 3 && !(regex instanceof RegExp)){
    throw new TypeError("Second argument is not a valid regular expression.");
  } else {

    request(url, function(error, response, html){
      if (!error && response.statusCode == 200) {
        find_links_in_html(html, regex, error, callback);
      }
    });

  }
}

function find_links_in_html(html, regex, error, callback){

  var $ = cheerio.load(html);
  var links = [];

  $("a").map(function(index, obj){
    links.push( obj.attribs.href );
  });

  if(regex){
    links = links.filter(function(url){
      return regex.test(url) === true;
    });
  }

  callback(error, links);
}

module.exports = exports = {
  find_links_in: find_links_in,
  find_links_in_html: find_links_in_html
};
