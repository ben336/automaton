require(["src/Automaton"],function(Automaton) {

  describe("Automaton", function() {

    it("should be loadable with RequireJS", function() {

      expect(Automaton).toBeDefined();
    });
    it("should have a translate method that takes an array of length n and a number as arguments and return an array of n+2", function() {
      //not testing this too strenuously here, just a basic example
      var input = [1 , 0 , 1];
      var output = Automaton.translate(input , 30);
      
      expect(output instanceof Array).toBe(true);
      expect(output.length).toBe(input.length + 2);
    });

    it("should be able to translate according to the elementary cellular automaton rules",function(){
      var input = [1,0,1];
      var output = Automaton.translate(input,30);

      expect(output).toEqual([1,1,0,1,1]);

      input = [1,1];
      output = Automaton.translate(input,30);

      expect(output).toEqual([1,1,0,1]);
    });
  });

  window.onload();


});
