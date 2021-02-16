function generateData() {
	var _data = configuration.data.split(',');
	return _data.map((curElement, index) => {	
		var now = new Date();
		now.setMonth(now.getMonth() + index);
		return [now.getTime(), curElement];
	});
}

var data = generateData();

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
      show: true,
      format: 'MMMM'
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
			format: 'MMMM'
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