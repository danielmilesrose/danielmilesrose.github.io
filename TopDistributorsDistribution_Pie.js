document.addEventListener('DOMContentLoaded', function () {
    fetch('top_movies_2023.csv')
        .then(response => response.text())
        .then(data => {
            var movieData = Papa.parse(data, { header: true }).data;

            var top20Movies = movieData.slice(0, 20);
            var top20MoviesCopy = top20Movies.map(movie => ({ ...movie }));
            top20MoviesCopy.forEach(movie => {
                if (movie['Distributor'] === '-') {
                    movie['Distributor'] = 'Miscellaneous';
                }
            });

            var distributorCounts = {};
            top20MoviesCopy.forEach(movie => {
                var distributor = movie['Distributor'];
                distributorCounts[distributor] = (distributorCounts[distributor] || 0) + 1;
            });

            var sortedData = Object.entries(distributorCounts).sort((a, b) => b[1] - a[1]);
            var labels = sortedData.map(entry => entry[0]);
            var data = sortedData.map(entry => entry[1]);

            var colorScale = chroma.scale(['#D1D0EA', '#6A5ACD']);
            var backgroundColors = colorScale.colors(data.length);

            var ctx = document.getElementById('myPie').getContext('2d');
            var distributorChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Top 20 Movie Distributors for 2023',
                            font: {
                                size: 18, // Adjusted for visibility
                                family: 'Verdana',
                                weight: 'normal',
                            },
                            padding: {
                                bottom: 30,
                            },
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            align: 'center',
                            labels: {
                                boxWidth: 10, // Adjusted size
                                padding: 20, // Adjusted padding
                                font: {
                                    family: 'Verdana',
                                    size: 10, // Reduced font size
                                },
                            },
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1,
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
