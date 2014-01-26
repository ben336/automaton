define(["src/Renderer"],function(Renderer) {

  describe("A Renderer", function() {

    it("should be loadable with RequireJS", function() {

      expect(Renderer).toBeDefined();
    });

    it("should have an init function that sets up an SVG area for the automaton", function() {
      //not testing this too strenuously here, just a basic example
      var testarea = document.getElementById("testarea");

      testarea.innerHTML = "";
      Renderer.init(testarea);
      
      //is it adding something?  could add specific tests on the child properties
      //later      
      expect(testarea.innerHTML.length).toBeGreaterThan(0);
    });

    it("should have a clear function that empties the content area",function(){
      //not testing this too strenuously here, just a basic example
      var testarea = document.getElementById("testarea");

      testarea.innerHTML = "";
      Renderer.init(testarea);
      
      //is it adding something?  could add specific tests on the child properties
      //later      
      expect(testarea.innerHTML.length).toBeGreaterThan(0);
      Renderer.clear(testarea);
      expect(testarea.innerHTML.length).toBe(0);
    });
    
  });

});
