function rgb2hex(value) {
	var a = value.split("(")[1].split(")")[0];
	a = a.split(',').map(e => parseInt(e));
	
	var r = '#';
	
	a.forEach((c) => {
		var hex = c.toString(16);
		r = r + (hex.length == 1 ? "0" + hex : hex);
		console.log(c);
		console.log(r);
	});
	
	return r;
}

var pieOptions = {
	chart: {
		id: "pie-chart-" + configuration.fragmentId,
		type: 'pie',
    toolbar: {
      autoSelected: "pan",
      show: false
    }
	},
	theme: {
		monochrome: {
			enabled: true,
			color: rgb2hex(configuration.color.rgbValue),
			shadeTo: 'light',
			shadeIntensity: 0.65
		}
	},
	series: configuration.data.split(",").map(e => parseInt(e.trim())),
	labels: configuration.labels.split(","),
	dataLabels: {
		formatter(val, opts) {
			const name = opts.w.globals.labels[opts.seriesIndex]
			return [name, val.toFixed(1) + '%']
		}
	},
	legend: {
		show: false
	}
}
var chart = new ApexCharts(document.querySelector("#pie-chart-" + configuration.fragmentId), pieOptions);
chart.render();