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
                text: movie_trailer_data.slice(0, 20).map(entry => `${entry.Rank} - ${entry.VideoName}`),
                textposition: ['right','right','right','right','bottom','right','bottom','bottom right','bottom','top','top right','bottom','right','bottom','top','top','right','top','top right','top'],
                textfont: {
                  family:  'Raleway, sans-serif'
                },
                marker: { size: 16, color: 'rgb(208, 161, 247)'},
                name: movie_trailer_data.slice(0, 20).map(entry => entry.VideoName),
            };

            var data = [ trace1 ];

            var layout = {
                xaxis: {
                    title: 'Worldwide Rank',
                    range: [ 0.75, 22 ],
                },
                yaxis: {
                    title: 'Views',
                    range: [0, 120000000]
                },
                title: "Worldwide Top 20 Movies' Trailer Views on Youtube (as of 12/27/23)",
              
                // annotations: [
                //   {
                //     x: 5, 
                //     y: 14e6, 
                //     xref: 'x',
                //     yref: 'y',
                //     text: [
                //       "1-Barbie",
                //       "2-The Super Mario Bros. Movie",
                //       "3-Oppenheimer",
                //       "4-Guardians of the Galaxy Vol. 3",
                //       "5-Fast X",
                //       "6-Spider-Man: Across the Spider-Verse",
                //       "7-The Little Mermaid",
                //       "8-Mission: Impossible - Dead Reckoning Part One",
                //       "9-Elemental",
                //       "10-Ant-Man and the Wasp: Quantumania",
                //       "11-John Wick: Chapter 4",
                //       "12-Transformers: Rise of the Beasts",
                //       "13-Meg 2: The Trench",
                //       "14-Indiana Jones and the Dial of Destiny",
                //       "15-The Hunger Games: The Ballad of Songbirds & Snakes",
                //       "16-Five Nights at Freddy's",
                //       "17-Creed III",
                //       "18-Wonka",
                //       "19-The Flash",
                //       "20-The Nun II"
                //     ],
                //     showarrow: false,
                //     // arrowhead: 4,
                //     ax: 0,
                //     ay: -40,
                //   },
                // ]
            };

            Plotly.newPlot( "view_vs_rank", data, layout);
          }
        });
      })
      .catch(error => console.error('Error fetching the CSV file:', error));
