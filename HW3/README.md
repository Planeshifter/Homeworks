# Running the code

To run the code, you need to have [node.js](http://nodejs.org/) installed.
Afterwards, you should be able to run the tests via the command `npm test`.
To use the code from the node REPL, first open it by typing `node` in the terminal.
Provided you are in the HW_3 directory, you can require the main function via
`var find_links_in = require("./lib/main.js").find_links_in`. Afterwards, you are
ready to make your own calls: The function has three parameters, url, regex
and callback. All three have to be supplied; if you do not want to use a regular expression to weed
out unwated URLs, pass `null` as its argument.

The function is non-blocking, but calls upon completion the supplied callback function
which has two parameters, `error` and `result`. The first one is `null` unless
there was an error while scraping the supplied `url`. If everything went well,
`result` will hold the array of retrieved links.

# Questions

### How did you decide what cases to test?

For `find_links_in`, I only check that the appropriate arguments are supplied as
the function itself calls an external module, `request`, to fetch the data and no
code logic is implemented by me. After the result is retrieved, it gets passed to
the `find_links_in_html` function. Here I check both actions which are carried out by me:
Passing the identified urls into an array and filtering out those which do not match the
supplied regular expression.

### What strategy makes sense for storing the data for the test cases?
I just downloaded a webpage to the hard disk. I think it is important to have reproducible
results, and therefore it is not a good idea to supply real URLs, except if one wishes
to always retrieve data from the same page - in that case one would want one's tests to fail
to alert oneself that the scraping does not work anymore.

### What makes it hard to test find_links_in?
The nature of the problem is dynamic in the sense that subsequent calls to the function might
return different results even when all inputs stay the same: For example, the server of the requested
site might be down. This makes it harder to test as it introduces uncertainty; I dealt with this
challenge by simply not making any calls to actual websites and just using static data. Here,
the splitting of the function into two parts provided very beneficial.
