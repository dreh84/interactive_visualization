// create a panel

function createPanel(sample) {
    d3.json("samples.json").then(function (data) {

        // filter through the data

        var selectedData = data.metadata.filter(m => m.id.toString() === sample)[0];

        var demo = d3.select("#sample-metadata");

        demo.html("");

        Object.entries(selectedData).forEach(([key, value]) => {

            demo.append("h5").text(`${key}:${value}`);

        });
    });
}
// create a plot function

function createPlot(input_sample) {
    d3.json("samples.json").then(function (data) {

        // filter though the data

        var selectedData = data.samples.filter(m => m.id.toString() === input_sample)[0];

        var top10_sample_values = selectedData.sample_values.slice(0, 10).reverse();
        var top10_OTU_IDS = selectedData.otu_ids.slice(0, 10).reverse();

        top10_OTU_IDS = top10_OTU_IDS.map(d => `OTU ${d}`);

        // create a trace

        var trace1 = {
            x: top10_sample_values,
            y: top10_OTU_IDS,
            type: "bar",
            orientation: "h",
            size: 500
        }
        // build a bar chart

        var bardata = [trace1];

        Plotly.newPlot("bar", bardata);
        console.log(top10_OTU_IDS, top10_sample_values);

        // create the second trace

        var trace2 = {

            // Create a bubble chart

            x: selectedData.otu_ids,
            y: selectedData.otu_ids,
            mode: "markers",
            marker: {
                size: selectedData.sample_values,
                color: selectedData.otu_labels,
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)']

            }
        };

        console.log(selectedData.otu_ids);
        console.log(selectedData.sample_values);

        var bubbledata = [trace2];

        Plotly.newPlot("bubble", bubbledata);
        console.log(trace2);

        // create the third trace

        // var trace3 = {

        // create a gauge chart

        var gaugedata = [{

                y: selectedData.sample_values,
                x: selectedData.otu_ids,
                title: { text: "Speed" },
                type: "indicator",
                mode: "gauge+number"

            }];

        // };

        Plotly.newPlot("gauge", gaugedata);
        console.log(gaugedata);
        }
    )}

        function optionChanged(newSample) {

            createPanel(newSample);
            createPlot(newSample);

        }

        function init() {

            var dropdown = d3.select("#selDataset")

            d3.json("samples.json").then(function (data) {

                console.log(data.samples);
                data.names.forEach((name) => {
                    dropdown
                        .append("option")
                        .text(name)
                        .property('value', name);

                });

            });

        };


init()







