define(function() {

    /*
     * The Automaton has a single method, translate, which 
     * takes the existing array of values and transforms it into a new array
     * based on the rule parameter
     */
    var Automaton = {

      translate: function(input,rule) {
        var expandedInput = [0].concat(input,0),
            ruleMap= defineBinaryArray(rule);

        return expandedInput.map(function(block, index,original){
          //we take the values from the original value and its neighbors
          var key,inputs = [
            (index > 0 ? original[index-1] : 0),
            original[index],
            (index === original.length -1 ? 0 : original[index+1])
          ]; 
          //and build a key out of them
          key = 4 * inputs[0] + 2 * inputs[1] + inputs[2];
          //then put that into the output map based on the rule # given
          return ruleMap[key];
        });
      }

    };

    /* Creates an array representing the binary state of the
     * number.  Each index is the 2^i component of the original 
     * number.  The array assumes a positive integer in the range
     * 0-255.  It will fail with other input.
     */
    function defineBinaryArray(num) {
      var i=7,end =0,arr = []; 

      for(; i>=end; i--) {
        arr[i] = Math.floor(num/Math.pow(2,i));
        num -= arr[i]*Math.pow(2,i);
      }
      return arr;
    }

    return Automaton;
});
