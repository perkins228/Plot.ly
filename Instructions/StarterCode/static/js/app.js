function init(){
  d3.json("static/js/samples.json").then(data => {
    var id_names = data.names;
    var dropdown = d3.select("#selDataset");
    id_names.forEach(id => {
        var option = dropdown.append("option");
        option.text(id);
        option.property("value", id);
    });
    var sample = id_names[0];
    buildMetadata(sample);
    // buildCharts(sample);
});
}

function buildMetadata(sample){
  d3.json("static/js/samples.json").then(data => {
    var metadata = data.metadata;
    var filterDemo = metadata.filter(i => i.id == sample)[0];
    var table = d3.select("#sample-metadata");
    Object.entries(filterDemo).forEach(([key,value]) => {
      table.append("tr").text(`${key}: ${value}`)
    })
  })
}

// function buildCharts (sample) {
//   return
// }


function optionChanged(newSample){
  d3.selectAll("#sample-metadata").selectAll("tr").remove()
  buildMetadata(newSample);
}

init()