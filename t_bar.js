// Fetch the CSV file
fetch('2023_worldwide_box_office_data.csv')
  .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true, 
          dynamicTyping: true, 
          complete: function(papaResults) {
            // papaResults.data contains the parsed data as an array of objects
            const worldwideData = papaResults.data;

            // Create a stacked bar chart using Plotly
            const trace1 = {
              x: worldwideData.slice(0, 20).map(entry => entry.Rank),
              y: worldwideData.slice(0, 20).map(entry => entry.Foreign),
              type: 'bar',
              name: 'Foreign',
              marker: { color: '#a59ce1' }                           
            };

            const trace2 = {
              x: worldwideData.slice(0, 20).map(entry => entry.Rank),
              y: worldwideData.slice(0, 20).map(entry => entry.Domestic),
              type: 'bar',
              name: 'Domestic',
              marker: { color: '#D1D0EA' }   
            };

            const data = [trace1, trace2];

            // Set the layout
            const layout = {
              xaxis: { 
                dtick: 1,
                tickmode: 'array',
                tickvals: worldwideData.slice(0, 20).map(entry => entry.Rank),
                ticktext: worldwideData.slice(0, 20).map(entry => `${entry.Rank}.${entry['Release Group']}`),
                tickfont: { size: 8 },
                tickangle: 15, 
              },              
              yaxis: { title: 'Billion USD' },
              legend: { title: '' },
              title: '2023 Worldwide Box Office',
              hovermode: 'closest',
              template: 'plotly_white',
              barmode: 'stack',
              width: 1150,
              height: 400,
              paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background for the chart area
              plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background for the plot area
            };
            
            Plotly.newPlot('myBar', data, layout);
          }
        });
      })
      .catch(error => console.error('Error fetching the CSV file:', error));