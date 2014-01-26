define(function() {

  var Renderer = {
    
    render: function(rows,target) {
      target.innerHTML = toStr(rows);
    },

    clear: function(target) {
      target.innerHTML = "";
    }

  }
 
  // temp function to translate rows to an html string
  function toStr(rows) {
    var spans = rows.map(function(row) {
      return "<span> [" + row.join(" , ") + " ] </span>";
    });
    return spans.join("<br>");
  }

  return Renderer;

});
