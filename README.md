# Automaton

This project implements [Rule 30][rule30], one of the cellular automaton rules introduced by Stephen Wolfram. It uses [d3.js][d3] to show the pattern dynamically growing.

### Libraries used

- [d3.js][d3] - A visualization library for JavaScript that uses SVG to map data to the DOM
- [requireJS][require]: A module library for JavaScript used to organize the code.  It implements the AMD spec for modules.
- [jasmine][jasmine]: A BDD style testing library.

Otherwise I used native Browser APIs, and assumed support for ECMAScript5.  

### Browser Compatibility

I tested the code on the latest versions of Chrome, FF, Safari and Mobile Safari.  I did not test on IE or Android browsers.  Since my code does assume ES5 functions, it would fail on IE<9, and might fail on IE9 and older android browsers.  I would expect it to work fine on IE10/11 and modern Android browsers.

### Potential Improvements

I attempted to keep the design flexible.  It would be relatively easy to make the rule # flexible (IE choose rule 25 or rule 30), as well as other things like the iteration speed (iterate every # ms).  It also would be fairly simple to implement this as a CLI using Node, though the AMD format may be a pain in that case. 

### Concerns / Bugs

I cut off iterations at 200 because there were performance issues beyond that.  Even 200 might kill a smartphone.  Its more or less a consequence of writing a large number of nodes to the DOM though.  The current design is efficient, I'm not recalculating the nodes each time, but .  If scale is an issue, I can remove the resizing each time though (maybe resize every 10 iterations instead?), as that should be the main rendering cost (resize every node each render), but that will still be a huge cost each time at scale.

I also encountered a weird situation where my 2nd render redrew the first block each time instead of moving to the next row.  It doesn't completely make sense to me but I haven't been able to code around it.  For now I'm just doing the initial render twice so that the user doesnt' have to worry about it.

Technically at scale its possible that the render/calculate loop could take longer than the iteration rate, which might lead to duplicate renders.  I didn't actually observe this behavior though.


[rule30]:http://mathworld.wolfram.com/Rule30.html
[d3]:http://d3js.org/
[require]: http://requirejs.org/
[jasmine]: http://jasmine.github.io/2.0/introduction.html