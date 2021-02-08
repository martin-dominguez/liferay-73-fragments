var interval = parseInt(configuration.interval);

function dataToList(data, tics) {
	var _data = data.split(',');
	for (var i=0; i < tics%_data.length; i++) {
		_data.unshift(_data.pop());
	}
	return _data.map(e => parseInt(e.trim()));
}

function generateData(tics) {
	var _data = dataToList(configuration.data, tics);
	return _data.map((curElement, index) => {	
		var now = new Date(); 
		now.setSeconds(now.getSeconds() + (index * interval));
		return [now.getTime(), curElement];
	});
}

var tic = 0;
var data = generateData(tic);

var options = {
  chart: {
		id: "dyanmic-area-" + configuration.fragmentId,
    type: 'area',
    toolbar: {
      autoSelected: "pan",
      show: false
    }
  },
	colors: [configuration.strokeColor.rgbValue],
	stroke: {
  	curve: 'smooth',
		width: 3
	},
  series: [{
		name: 'Value',
    data: data
  }],
  xaxis: {
    type: "datetime",
		labels: {
      show: false,
      format: 'HH:mm:ss'
    },
		axisTicks: {
			show: false,
		}
  },
  dataLabels: {
    enabled: false
  },
	tooltip: {
		x: {
			show: true,
			format: 'HH:mm:ss'
		}
	},
  markers: {
    size: 5,
    colors: ["white"],
    strokeColor: configuration.strokeColor.rgbValue,
    strokeWidth: 3
  }
}

var chart = new ApexCharts(document.querySelector("#area-chart-" + configuration.fragmentId), options);
chart.render();

window.setInterval(function() {
	tic ++;
	var newData = generateData(tic);
	chart.updateSeries([{
          data: newData
        }])
}, interval * 1000)