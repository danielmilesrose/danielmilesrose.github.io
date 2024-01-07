// Fetch the CSV file
fetch('movie_trailer_data_reduced.csv')
    .then(response => response.text())
        .then(csvData => {
            // Parse the CSV data using PapaParse
            Papa.parse(csvData, {
                header: true, 
                dynamicTyping: true, 
                complete: function(papaResults) {
                    // papaResults.data contains the parsed data as an array of objects
                    const movie_trailer_data_reduced = papaResults.data;
            
                     // linear regression graph
                     const xval = movie_trailer_data_reduced.slice(0, 20).map(entry =>entry.Rank)
                     const regression = [];
                    for (i=0; i<= xval.length; i++) {
                        yval = 0.7381 -0.0195*i;
                        regression.push({x: i, y: yval})
                    }
                    const ctx = document.getElementById('linear3').getContext('2d');
                        const scatterChart = new Chart(ctx, {
                            type:'scatter',
                            data:{
                                datasets: [
                                    {
                                        label: 'Trailer Views',
                                        data: movie_trailer_data_reduced.slice(0, 20).map(entry => ({
                                            x: entry.Rank,
                                            y: entry.ve8})), 
                                        borderColor: 'rgb(95 179 104)',
                                        backgroundColor: 'rgb(95 179 104)',
                                        pointRadius: 4
                                    }, 
                                    {
                                        label: 'Linear Fit',
                                        data: regression,
                                        borderColor: 'rgb(208, 161, 247)',
                                        backgroundColor: 'transparent',
                                        type: 'line',
                                        pointRadius: 0.5
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: true,
                                    text: 
                                    "Worldwide Top 20 Movies' Trailer Views and Ranking Correlation (as of 12/27/23)",
                                    fontSize: 20
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            type: 'linear', 
                                            position: 'bottom',
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Worldwide Rank',
                                                fontSize: 14
                                            },
                                            ticks: {
                                                min: 0,
                                                max: 20,
                                            },
                                        }
                                    ], 
                                    yAxes: [
                                        {
                                            type: 'linear', 
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Views (1e8)',
                                                fontSize: 14
                                            },
                                            ticks: {
                                                min: 0.01, 
                                                max: 1.3,
                                            }
                                        }]
                                }
                            }
                        });
                    }
                });
            });




          
