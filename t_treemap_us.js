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

        // Extract unique release groups
        const releaseGroups = Array.from(new Set(top20Data.map(entry => entry['Release Group'])));

        // Create the path for the treemap
        const path = 'Domestic Box Office';

        // Define a custom color scale
        const customBlueScale = [
          [0, '#FFFFFF'],
          [0.2, '#DFF2FF'],
          [0.4, '#A3D5FF'],
          [0.6, '#75BFEC'],
          [0.8, '#6F9CDE'],
          [1, '#F8C8DC']
        ];

        // Create the treemap trace
        const trace = {
          type: 'treemap',
          path: path,
          labels: top20Data.map(entry => entry['Release Group']),
          parents: Array(top20Data.length).fill(path),
          values: top20Data.map(entry => entry['Domestic']),
          hovertemplate: '<b>%{label}</b><br>Domestic: %{value}',
          marker: {
            colorscale: customBlueScale,
            cmin: Math.min(...top20Data.map(entry => entry['Domestic'])),
            cmax: Math.max(...top20Data.map(entry => entry['Domestic'])),
            line: { color: 'white', width: 3 },
            colorbar: {
              tickvals: [Math.max(...top20Data.map(entry => entry['Domestic'])), Math.min(...top20Data.map(entry => entry['Domestic']))],
              ticktext: ['0', '20'],
              ticks: 'outside',
              title: 'Rank'
            }
          }
        };

        // Set the layout
        const layout = {
          margin: { t: 50, l: 25, r: 25, b: 25 },
          title: '2023 US Box Office - Top 20',
          width: 550,
          height: 370,
        };

        // Render the treemap
        Plotly.newPlot('myTreemap_us', [trace], layout);
      }
    });
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

// Function to update the treemap chart based on the selected option
function updateTreemapChart(selectedValue) {
  // Add your existing code for creating the treemap chart here

  // Set the layout
  const layout = {
    margin: { t: 50, l: 25, r: 25, b: 25 },
    title: '2023 US Box Office - Top 20',
    width: 550,
    height: 370,
  };

  // Render the treemap chart
  Plotly.newPlot('myTreemap_us', [trace], layout);
}

// Event listener for the dropdown
document.getElementById('tm').addEventListener('change', function () {
  const selectedValue = this.value;
  updateTreemapChart(selectedValue);
});

// Initial call to update the chart based on the default selection
updateTreemapChart(document.getElementById('tm').value);
