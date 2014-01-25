
define(function() {

    /* Creates an array representing the binary state of the
     * number.  Each index is the 2^i component of the original 
     * number.  The array assumes a positive integer in the range
     * 0-255.  It will fail with other input
     */
    function defineBinaryArray(num) {
      var i=7,end =0,arr = []; 
      for(; i>=end; i--) {
        arr[i] = Math.floor(num/Math.pow(2,i));
        num -= arr[i]*Math.pow(2,i);
      }
      return arr;
    }
  
    return {

      translate: function(input,rule) {
        var expandedInput = [0].concat(input,0),
            outputMap= defineBinaryArray(rule);
        
        return expandedInput.map(function(block, index,original){
          var inputs = [
            (index > 0 ? original[index-1] : 0),
            original[index],
            (index === original.length -1 ? 0 : original[index+1])
          ]; 
        
          return outputMap[4*inputs[0]+2*inputs[1]+inputs[2]];

        });
      }

    }


});
