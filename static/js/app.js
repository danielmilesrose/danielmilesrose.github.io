// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);


// Initial dashboard
function init() {

    //Name the selector
    let selector = d3.select("#selDataset");

    // Grab JSON data
    d3.json(url).then((data) => {
        console.log("data", data);

        // Add IDs to selector menu
        let sampleNames = data.names
        sampleNames.forEach((id) => {
        selector.append("option").text(id).property("value", id);
        });

        // Select first sample variable
        let sample = sampleNames[0];

        // Functions to build and populate charts
        barChart(sample);
        bubbleChart(sample);
        demographics(sample);
    });
};

// Create a horizontal bar chart
function barChart(selected) {

    // Grab JSON data
    d3.json(url).then((data) => {
        console.log("data", data);

        let samples = data.samples;

        // Filter for selected sample ID
        let filteredSamples = samples.filter((sample) => sample.id === selected);

        // Index of selected ID
        let filteredData = filteredSamples[0];

       // Create trace for chart with selected ID data -- top 10 only
       let barTrace = [{
            x: filteredData.sample_values.slice(0,10).reverse(),
            y: filteredData.otu_ids.slice(0,10).map((id => `OTU ${id}`)).reverse(),
            text: filteredData.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        Plotly.newPlot("bar", barTrace);

    });
};

// Create the bubble chart
function bubbleChart(selected) {

     // Grab JSON data
     d3.json(url).then((data) => {
        console.log("data", data);
    
        let samples = data.samples;

        // Filter for selected sample ID
        let filteredSamples = samples.filter((sample) => sample.id === selected);

        // Index of selected ID
        let filteredData = filteredSamples[0];

        // Create trace for chart with selected ID data
        let bubbleTrace = [{
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: "markers",
            marker: {
                size: filteredData.sample_values,
                color: filteredData.otu_ids,
                colorscale: "Jet"
            }
        }];

        let bubbleLayout = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
    });
}

// Demographics panel
function demographics(selected) {

    // Grab JSON data
    d3.json(url).then((data) => {
        console.log("data", data);

        let metadata = data.metadata;
        console.log("Metadata: ", metadata);

        // Filter for selected sample ID
        let filteredMetadata = metadata.filter(sample => sample.id == selected);
        console.log("Filtered Metadata: ", filteredMetadata);

        // Index of selected ID
        let filteredData = filteredMetadata[0];

        // Select and clear the panel
        d3.select("#sample-metadata").html("");

        // Separate keys and values into pairs
        let entries = Object.entries(filteredData);
        
        // Insert key/value pairs into the panel
        entries.forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });
    });
}

// Create optionChanged function for selector menu to swap data when new ID selected
function optionChanged(selected) {
    barChart(selected);
    bubbleChart(selected);
    demographics(selected);
}

init()