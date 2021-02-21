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
    buildCharts(sample);
});
}

function buildMetadata(sample){
  d3.json("static/js/samples.json").then(data => {
    var metadata = data.metadata;
    var filterDemo = metadata.filter(i => i.id == sample)[0];
    var table = d3.select("#sample-metadata");
    table.html("");
    Object.entries(filterDemo).forEach(([key,value]) => {
      table.append("tr").text(`${key}: ${value}`)
    })
  })
}

function buildCharts (sample) {
  d3.json("static/js/samples.json").then(data => {
    var samples = data.samples;
    // var sortedData = samples.sort((a, b) => b.sample_values - a.sample_values);
    var barData = samples.filter(i => i.id == sample)[0];
    var sampValues = Object.values(barData.sample_values);
    var otuIds = Object.values(barData.otu_ids);
    var otuLabels = Object.values(barData.otu_labels);
    console.log(barData);
    var data = [{
      x: sampValues.slice(0, 11).reverse(),
      y: otuIds.map(d => `ID: ${d}`).slice(0, 11).reverse(),
      type: "bar",
      text: otuLabels,
      orientation: 'h' 
    }];
  
    var layout = {
      title: 'Top 10 OTUs'
    };
  
    Plotly.newPlot("bar", data, layout);


    var data2 =[{
      x: otuIds,
      y: sampValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampValues,
        color: otuIds
      }
    }];

    var layout2 = {
      title: 'Bacterial Bubble Chart',
      showlegend: false,
      xaxis: { title: {text: "OTU IDs",}},
    };

    Plotly.newPlot("bubble", data2, layout2)

    // Plotyl.restyl
  })
}


function optionChanged(newSample){
  // d3.selectAll("#sample-metadata").selectAll("tr").remove()
  buildMetadata(newSample);
  buildCharts(newSample);
  // Plotly.restyle("bar", "data", [newSample])
}

init()