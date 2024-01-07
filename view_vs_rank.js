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
            
            //Scatter plot for rank vs. viewcount
            var trace1 = {
                x: movie_trailer_data.slice(0, 20).map(entry => entry.Rank),
                y: movie_trailer_data.slice(0, 20).map(entry => entry.viewcount),
                mode: 'markers+text',
                type: 'scatter',
                name: movie_trailer_data.slice(0, 20).map(entry =>entry.Video_Name),
                text: ['1st', '2nd', '3rd', '4th', '5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th'],
                textposition: 'top center',
                textfont: {
                  family:  'Raleway, sans-serif'
                },
                marker: { size: 12, color: 'rgb(255 135 170)'},
              };
            var data = [ trace1 ];

            var layout = {
                xaxis: {
                    title: 'Rank',
                    range: [ 0.75, 23 ],
                },
                yaxis: {
                    title: 'Views',
                    range: [0, 150000000]
                },
                title: "Worldwide Top 20 Movies' Trailer Views on Youtube (as of 12/27/23)"
            };

            Plotly.newPlot( "view_vs_rank", data, layout);
          }
        });
      })
      .catch(error => console.error('Error fetching the CSV file:', error));