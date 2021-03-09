//BEGIN CONFIG PARAMETERS -------------------------------------------------------------------------
baseRestURL = configuration.hostUrl;
projectID = configuration.projectId;
dossierID = configuration.dossierId;
//END CONFIG PARAMETERS -------------------------------------------------------------------------

var projectUrl = baseRestURL + '/app/' + projectID;
var dossierUrl = projectUrl + '/' + dossierID;
console.log("DossierURL: " + dossierUrl);

//populate div with Dossier:
microstrategy.dossier.create({
	placeholder: document.getElementById("dossierContainer"),
	url: dossierUrl,
	enableResponsive: true,
	containerHeight: '1000px'
}).then(function(dossier) {
	//Do something after the code
});