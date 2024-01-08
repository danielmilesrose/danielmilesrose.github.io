// Function to split a string into multiple lines
function splitText(text, maxLength) {
  // Check if text is undefined, null, or empty
  if (!text || text.length <= maxLength) return text;
  
  const words = text.split(' ');
  let currentLine = '';
  let lines = [];

  for (const word of words) {
    if ((currentLine + word).length > maxLength) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
    currentLine += word + ' ';
  }

  lines.push(currentLine.trim());
  return lines.join('<br>');
}

// Function to parse CSV string into an array of objects
function parseCSV(csvString) {
  const rows = csvString.split('\n');
  const headers = rows[0].split(',');
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].split(',');
    const entry = {};

    for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = values[j];
    }

    data.push(entry);
  }

  return data;
}

// Read the CSV file
fetch('top_movies_2023.csv')
  .then(response => response.text())
  .then(csvString => {
    const csvData = parseCSV(csvString);

    // Create an array to store individual traces
    const traces = [];

    // Get values for color gradient
    const colors = csvData.map(entry => parseFloat(entry['Gross Earnings']));

    // Generate a gradient of shades from light purple to dark purple
    const colorScale = chroma.scale(['#D1D0EA', '#6A5ACD']).colors(colors.length);

    // Loop through the data to create traces for each movie
    csvData.forEach((entry, index) => {
      const xValue = parseFloat(entry['Number of Theaters']);
      const yValue = parseFloat(entry['Gross Earnings']);
      const size = Math.sqrt(yValue) * 0.005;

      const formattedGrossEarnings = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(yValue);

      // Split long movie titles into multiple lines
      const legendTitle = splitText(entry.Title, 15); // Adjust 15 to desired max length

      const trace = {
        x: [xValue],
        y: [yValue],
        mode: 'markers',
        type: 'scatter',
        text: [`${entry.Title}<br>Gross Earnings: ${formattedGrossEarnings.replace('.00', '')}<br>Number of Theaters: ${entry['Number of Theaters']}`],
        marker: {
          size: size,
          color: colorScale[index],
          line: {
            color: 'black',
            width: 1,
          },
        },
        name: legendTitle,
        legendgroup: entry.Title,
      };

      traces.push(trace);
    });

    const layout = {
      xaxis: {
        title: 'Number of Theaters',
        type: 'linear',
        range: [0, 5000],
      },
      yaxis: {
        title: {
          text: 'Gross Earnings',
          standoff: 15,
        },
        type: 'linear',
        tickmode: 'array',
        tickvals: [-25000000, 0, 100000000, 200000000, 300000000, 400000000, 500000000, 600000000, 700000000, 800000000, 900000000],
        tickformat: '$,s',
        ticktext: ['', '$0', '$100M', '$200M', '$300M', '$400M', '$500M', '$600M', '$700M', '$800M', '$900M'],
        showline: false,
        showticklabels: true,
        range: [-25000000, 900000000],
      },
      title: '2023 Gross Earnings vs. Number of Theaters',
      titlefont: {
        size: 20,
        family: 'Verdana',
      },
      legend: {
        x: 1,
        y: 1,
        traceorder: 'normal',
        orientation: 'v', 
        font: {
          size: 10,
        },
        itemwidth: 150,
      },
      margin: {
        l: 80,
        r: 200,
        b: 50,
        t: 50,
        pad: 4,
      },
      width: 1000,
      paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background for the chart area
      plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background for the plot area
    };
    
    Plotly.newPlot('myScatter', traces, layout);

    document.getElementById('myScatter').on('legendclick', function (event) {
      const clickedTraceName = event.data[0].name;

      const clickedTrace = traces.find(trace => trace.name === clickedTraceName);
      clickedTrace.visible = !clickedTrace.visible;

      Plotly.update('myScatter', { visible: traces.map(trace => trace.visible) });
    });
  })
  .catch(error => console.error('Error fetching CSV file:', error));
