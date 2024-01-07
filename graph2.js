// Fetch the CSV file
fetch('movie_trailer_data.csv')
  .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true, 
          dynamicTyping: true, 
          complete: function(papaResults) {
            // papaResults.data contains the parsed data as an array of objects
            const movie_trailer_data = papaResults.data;
    
    //viewcount vs box office sale plot
            var trace1 = {
                x: movie_trailer_data.slice(0, 20).map(entry => entry.Rank),
                y: movie_trailer_data.slice(0, 20).map(entry => entry.viewcount),
                mode: 'lines+markers',
                name: 'Views',
                line: {
                    shape: 'spline',
                    dash: 'solid',
                    width: 2
                },
                marker: {
                    color: 'rgb(100 180 200)',
                    size: 8
                  },
            };
            
            var trace2 = {
                x: movie_trailer_data.slice(0, 20).map(entry => entry.Rank),
                y: movie_trailer_data.slice(0, 20).map(entry => entry.Worldwide),
                mode: 'lines+markers',
                name: 'Box Office Sales',
                line: {
                    shape: 'spline',
                    dash: 'dash',
                    width: 2
                },
                marker: {
                  color: 'rgb(175 120 225)',
                  size: 8
                },
            };
            
            var data = [trace1, trace2];
            
            var layout = {
                title: "Worldwide Top 20 Movies' Trailer Views and Box Office Sales (as of 12/27/23)",
                xaxis: {
                    title: 'Rank',
                    range: [0.75, 20.25],
                    autorange: false
                },
                yaxis: {
                    range: [1000000, 1500000000],
                    autorange: false
                },
                legend: {
                y: 0.5,
                traceorder: 'reversed',
                font: {
                    size: 16
                }
                }
            };
            
            Plotly.newPlot('graph2', data, layout);

            }
          });
        })
      