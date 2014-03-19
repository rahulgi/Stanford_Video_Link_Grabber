/* README
 * This script takes in an input file which is the source for a course page on
 * Stanford's MyVideoSU and a coursename which must be formatted as they are in
 * the url (ex 'cs246'). It outputs a newline-delimited list of all the raw
 * 720p video urls such that they can be downloaded with a tool like
 * JDownloader.
 *
 * Argument: input file
 * Argument: course string (ex 'cs246')
 *
 * Returns: newline-delimited list of 720p video urls
 */

var fs = require('fs')

if (!process.argv[2] || !process.argv[3]) {
  console.log("Missing required arguments!");
  return;
}

var input = fs.readFileSync(process.argv[2]).toString();
var urls = [], seen = {};

var outer_regex = new RegExp('(\&quot;720.*720.mp4)', 'gi');
var inner_regex = new RegExp('(http://html5b(.)*720.mp4)');

urls = input.match(outer_regex);

urls = urls.map(function(str) {
  return str.match(inner_regex)[0];
});

/*
 * credit:
 * http://stackoverflow.com/questions/1960473/unique-values-in-an-array#answer-14438954
 */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

urls = urls.filter(onlyUnique);

console.log(urls.join('\n'));
