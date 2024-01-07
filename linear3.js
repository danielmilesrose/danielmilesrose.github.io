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
            
                     // linear regression graph
                     const xval = movie_trailer_data.slice(0, 20).map(entry =>entry.Rank)
                     const regression = [];
                    for (i=0; i<= xval.length; i++) {
                        yval = 76042998.40 -2090421.71*i;
                        regression.push({x: i, y: yval})
                    }
                    const ctx = document.getElementById('linear3').getContext('2d');
                        const scatterChart = new Chart(ctx, {
                            type:'scatter',
                            data:{
                                datasets: [
                                    {
                                        label: 'Trailer Views',
                                        data: movie_trailer_data.slice(0, 20).map(entry => ({
                                            x: entry.Rank,
                                            y: entry.viewcount})), 
                                        borderColor: 'rgb(225 150 200)',
                                        backgroundColor: 'rgb(225 150 200)',
                                        pointRadius: 4
                                    }, 
                                    {
                                        label: 'Linear Fit',
                                        data: regression,
                                        borderColor: 'rgb(119 221 119)',
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
                                                labelString: 'Rank',
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
                                                labelString: 'viewcount',
                                                fontSize: 14
                                            },
                                            ticks: {
                                                min: 1000000, 
                                                max: 130000000,
                                            }
                                        }]
                                }
                            }
                        });
                    }
                });
            });




          
