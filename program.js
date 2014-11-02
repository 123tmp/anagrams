var _ = require('lodash');
var fs = require('fs');

var wordsStr = fs.readFileSync('./words.txt', 'utf8');

function sortLetters(word) {
  return word.split('').sort().join('');
}

var groups = _(wordsStr.split('\n'))
  // .slice(0, 100)
  .map(function(word) {
    word = word.trim();
    return {
      word: word,
      key: sortLetters(word)
    };
  })
  .groupBy('key')
  .sortBy(function(group) {
    return -group.length;
  })
  .filter(function (group) {
    return group.length > 1;
  })
  .map(function(group) {
    return _(group).pluck('word').join(',');
  })
  .value();

groups
  .forEach(function(group) {
    console.log(group);
  });

// console.log(groups.slice(0, 20));
// console.log(sortLetters());