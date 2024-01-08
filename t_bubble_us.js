// Fetch the CSV file
fetch('2023_worldwide_box_office_data.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data using PapaParse
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function (papaResults) {
        // papaResults.data contains the parsed data as an array of objects
        const worldwideData = papaResults.data;

        // Select the top 20 entries
        const top20Data = worldwideData.slice(0, 20);

        // Create a bubble chart using Plotly
        const trace = {
          x: top20Data.map(entry => entry.Rank),
          y: top20Data.map(entry => entry.Domestic),
          mode: 'markers',
          marker: {
            size: top20Data.map(entry => entry.Domestic * 0.000000001),
            sizemode: 'diameter',
            sizeref: 0.02,
            color: top20Data.map(entry => entry.Rank),
            colorscale: 'Picnic',
            cmin: 0,
            cmax: 20,
            colorbar: {
              title: 'Rank'
            }
          },
          text: top20Data.map(entry => entry['Release Group']),
        };

        const layout = {
          title: '2023 US Box Office',
          xaxis: { title: 'Rank' },
          yaxis: { title: 'Million USD' },
          plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent plot background
          paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent chart background
          width: 550,
          height: 370,
        };
        
        // Render the bubble chart
        Plotly.newPlot('myBubble_us', [trace], layout);
      }
    });
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

// Function to update the bubble chart based on the selected option
function updateBubbleChart(selectedValue) {
  // Add your existing code for creating the bubble chart here

  // Set the layout
  const layout = {
    title: '2023 US Box Office',
    xaxis: { title: 'Rank' },
    yaxis: { title: 'Million USD' },
    plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent plot background
    paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent chart background
    width: 550,
    height: 370,
  };

  // Render the bubble chart
  Plotly.newPlot('myBubble_us', [trace], layout);
}

// Event listener for the dropdown
document.getElementById('bc').addEventListener('change', function () {
  const selectedValue = this.value;
  updateBubbleChart(selectedValue);
});

// Initial call to update the chart based on the default selection
updateBubbleChart(document.getElementById('bc').value);
