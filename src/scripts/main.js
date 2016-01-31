// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  progress = require('bespoke-progress'),
  vcr = require('bespoke-vcr'),
  simpleSlide = require('bespoke-theme-simple-slide');

// Bespoke.js
bespoke.from('article', [
  keys(),
  touch(),
  vcr({
    recording: [
      { "command": "next", "timeout": 100 },
      { "command": "next", "timeout": 15000 },  // 15s  Me
      { "command": "next", "timeout": 95000 },  // 95s  What is Comma Dangle?
      { "command": "next", "timeout": 145000 }, // 145s Slippery Slope
      { "command": "next", "timeout": 175000 }, // 175s So many errors
      { "command": "next", "timeout": 195000 }, // 195s Regex
      { "command": "next", "timeout": 205000 }, // 205s Nope
      { "command": "next", "timeout": 280000 }, // 280s More Code
      { "command": "next", "timeout": 295000 }, // 295s Further Reading
    ]
  }),
  simpleSlide(),
  progress()
]);

var commaTimeout

setInterval(function(){
  var slide = document.querySelector('section.bespoke-active')
  if(slide.classList.contains('slippery')) {
    commaTimeout = commaTimeout || setTimeout(addCommas, 7000)
  } else {
    var commas = document.querySelectorAll('.addedComma')
    Array.prototype.forEach.call(commas, function(c){c.remove()})
    clearTimeout(commaTimeout)
    commaTimeout = null
  }

  if(slide.classList.contains('nope')) {
    document.querySelectorAll('.nope .string.token')[1].classList.add('nope')
  } else {
    document.querySelectorAll('.nope .string.token')[1].classList.remove('nope')
  }
}, 500)

function addCommas(){
  var added = document.querySelectorAll('.addedComma')
  if(added.length < 7) {
    var commas = document.querySelectorAll('.slippery .punctuation')
    var lastComma = commas[commas.length -2]
    lastComma.insertAdjacentHTML('afterend', '<span class="token punctuation addedComma">,</span>')
    commaTimeout = setTimeout(addCommas, 2000)
  } else {
    var codes = document.querySelectorAll('.slippery code > *:not(.addedComma)')
    var selection = codes[Math.random() * codes.length |0]
    selection.insertAdjacentHTML('afterend', '<span class="token punctuation addedComma">,</span>')
    commaTimeout = setTimeout(addCommas, Math.random() * 1000 |0)
  }
}

// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify
  require('prism');
