const convertRGBtoHex = (rgbValue) => {
	let colorToHex = rgbValue.substr(4).slice(0, -1).split(',');
  return "#" + colorToHex[0] + colorToHex[1] + colorToHex[2];
}

var currentURL = currentURL || new URL(Liferay.ThemeDisplay.getPortalURL() + Liferay.currentURL);
const paramValues = paramValues || currentURL.searchParams.getAll(configuration.facetType);

var options = options || {};

options = {
	series: facetSeries,
	chart: {
		id: `chart-${configuration.uniqueIdentifier}`,
		type: configuration.chartType,
		toolbar: {
			autoSelected: "pan",
			show: false
		},
		events: {	
			mounted: (chartContext) => {
				if (paramValues.length > 0 ) {
					// Create clear button
					let clearButtonContent = document.createElement('span');
					clearButtonContent.classList.add('lfr-btn-label');
					clearButtonContent.innerHTML = '[@liferay_ui["message"] key="clear"/]';
					let clearButton = document.createElement('button');
					clearButton.classList.add('btn', 'btn-link', 'btn-unstyled', 'facet-clear-btn', 'btn-secondary');
					clearButton.addEventListener('click', () => {
						let linkURL = currentURL;
						linkURL.searchParams.delete(configuration.facetType);
						window.location.href = linkURL;
					})
					clearButton.appendChild(clearButtonContent);
					document.getElementById(`INSTANCE_${configuration.uniqueIdentifier}_facetCategoryPanelBody`).appendChild(clearButton);

					// Preselect values in URL
					paramValues.forEach((param) => {
						if (ids.includes(parseInt(param))) {
							chartContext.toggleDataPointSelection(categoryIds.indexOf(parseInt(param)));
						}
					}); 
				} 
			},
			dataPointSelection: (event, chartContext, config) => {
                        
				let eleId = facetIds[config.dataPointIndex];
				let linkURL = cCurrentURL;

				if (! paramValues.includes(eleId.toString())) {
					linkURL.searchParams.append(configuration.facetType, eleId);
					window.location.href = linkURL;
				} else {
					if (event && event.type === "mousedown") {
						let paramsIncluded = linkURL.searchParams.getAll(configuration.facetType);
						paramsIncluded.forEach((value, index, object) => {
							if (value === eleId.toString()) {
								object.splice(index, 1);
							}
						});
						linkURL.searchParams.delete(configuration.facetType);

						if (typeof paramsIncluded !== "undefined" && paramsIncluded.length > 0) {
							paramsIncluded.forEach((pValue) => {
								linkURL.searchParams.append(configuration.facetType, pValue);
							})
						}

						window.location.href = linkURL;
					}
				}
			}
		}
	},
	labels: facetLabels,
	legend: {
		show: false
	},
	dataLabels: {
		enabled: true,
			formatter(val, opts) {
			const name = opts.w.globals.labels[opts.seriesIndex]
			return [name, val.toFixed(1) + '%']
		}
	},	
	theme: {
     monochrome: {
			enabled: configuration.monochrome,
			color: convertRGBtoHex(configuration.monoColor.rgbValue),
			shadeTo: configuration.paletteMode,
			shadeIntensity: 0.65
		},
		mode: configuration.paletteMode, 
		palette: configuration.palette
	},
	states: {
		active: {
			allowMultipleDataPointsSelection: true
		}
	}
}

window[`chart-${configuration.uniqueIdentifier}`] = new ApexCharts(document.querySelector(`#chart-${configuration.uniqueIdentifier}`), options);
window[`chart-${configuration.uniqueIdentifier}`].render();