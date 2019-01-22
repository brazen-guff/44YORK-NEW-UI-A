(function(){
"use strict";
'use strict';


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log("::LOADING 44YORK CUSTOM::");

var moduleList = [];

// Please call this at the beginning of every new file, for documentation and possible future use
function registerModule(name) {
  console.log("Registering " + name);
  moduleList.push(name);
}

var app = angular.module('viewCustom', ['angularLoad','reportProblem'])

// Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/565",
    apiKey: "ba4a928c-2968-42f3-b9f8-11a8990b6914",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",
 
    acticleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",
 
    printRecordsIntegrationEnabled: true,
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration


/*libchat embded*/
var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'false'; 
lc.src =  'https://region-eu.libanswers.com/load_chat.php?hash=674e97e7f662af5aea4b66c464fb3b4c';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
/*end libchat embed*/

// Enhance No Results tile
app.controller('prmNoSearchResultAfterController', [function () {
  var vm = this;
  vm.getSearchTerm = getSearchTerm;
  vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';
  function getSearchTerm() {
    return vm.parentCtrl.term;
  }
}]);

/*change default no results page*/

app.controller('prmNoSearchResultAfterController', [function () {
  var vm = this;
  vm.getSearchTerm = getSearchTerm;
  function getSearchTerm() {
    return vm.parentCtrl.term;
  }
}]);

app.component('prmNoSearchResultAfter',{
  bindings: {parentCtrl: '<'},
  controller: 'prmNoSearchResultAfterController',
  template: '<md-card class="default-card zero-margin _md md-primoExplore-theme"><md-card-title><md-card-title-text><span translate="" class="md-headline ng-scope">No records found</span></md-card-title-text></md-card-title><md-card-content><p><span>There are no results matching your search:<blockquote><i>{{$ctrl.getSearchTerm()}}</i>.</blockquote><div ng-if="$ctrl.pciSetting !== \'true\'"><a href="https://yorsearch-test.york.ac.uk/primo-explore/search?query=any,contains,{{$ctrl.getSearchTerm()}}&tab=default_tab&search_scope=CS_EVERYTHING&vid=44YORK-NEW-UI-A&offset=0&sortby=rank&pcAvailability=true"><b>We can customize the content/links that appear here ... widen your search to search everything</b></a></div></span></p><p><span translate="" class="bold-text ng-scope">Suggestions:</span></p><ul><li translate="" class="ng-scope">Make sure that all words are spelled correctly.</li><li translate="" class="ng-scope">Try a different search scope.</li><li translate="" class="ng-scope">Try different search terms.</li><li translate="" class="ng-scope">Try more general search terms.</li><li translate="" class="ng-scope">Try fewer search terms.</li></ul></p><p><b><a href="http://subjectguides.york.ac.uk/">Your Academic Liaison Librarian can offer you subject specific help and support</a></b></p></md-card-content></md-card>'
});


/*end no results customisation */

/*Yewno box */
app.controller('prmFacetRangeAfterController', [function () {
  try {
    this.query = this.parentCtrl.facetService.$location.$$search.query.split(",")[2];
  } catch (e) {
    this.query = "";
  }
}]);

app.component('prmFacetRangeAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmFacetRangeAfterController',
  template: '<md-card class="default-card zero-margin _md md-primoExplore-theme"><md-card-content><p><strong>Want to try a different search method?</strong> Try a conceptual search in Yewno:</p><md-button class="md-raised md-button md-primoExplore-theme md-ink-ripple" href="https://discover.yewno.com?query={{$ctrl.query}}" target="_blank" type="button" aria-label="Search Yewno" style="margin-left:0;margin-right:0;"> <img src="custom/44YORK-NEW-UI-A/img/yewno-logo.png" width="22" height="22" alt="yewno-logo" style="vertical-align:middle;"> Search Yewno</md-button></md-card-content></md-card>'
});

/*End Yewno box */

/*report a problem link*/
angular.module('reportProblem', []);


/*capture parameters from querystring*/
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	
};


	var strID = getUrlParameter('docid');
	var strScope = getUrlParameter('search_scope');
	var strQuery = getUrlParameter('query');

angular.module('reportProblem').component('ocaReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@'
  },
  template: '\n      <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">\n          <span class="margin-right-small">{{$ctrl.messageText}}</span>\n          <a ng-href="{{$ctrl.targetUrl}}" target="_blank">\n              <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #5c92bd;">\n                  <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>\n                  <span style="text-transform: none;">{{$ctrl.buttonText}}</span>\n              </button>\n          </a>\n      </div>',
  controller: ['$location', '$httpParamSerializer', function ($location, $httpParamSerializer) {
    this.messageText = this.messageText || 'See something that doesn\'t look right?';
    this.buttonText = this.buttonText || 'Report a Problem';
    this.showLocations = ['/fulldisplay', '/openurl'];
    this.$onInit = function () {
	  this.targetUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdWTLtHSWjgIijK0ZQU0Rub5L_Mx9etXmvesW_hoSHCSfr3Dw/viewform?usp=pp_url&entry.982245342=' + strID + '&entry.863655331=' + strScope + '&entry.136857830=' + strQuery;
      this.show = this.showLocations.includes($location.path()); 
	  var strLink = $httpParamSerializer($location.search());  
    };
  }]
});


	/*open Google form passing in relevant params */
	/*app.component('prmActionListAfter', {template: '<oca-report-problem report-url="https://docs.google.com/forms/d/e/1FAIpQLSdWTLtHSWjgIijK0ZQU0Rub5L_Mx9etXmvesW_hoSHCSfr3Dw/viewform?usp=pp_url&entry.982245342=' + strID + '&entry.863655331=' + strScope + '&entry.136857830=' + strQuery +  '/>'})*/

app.component('prmActionListAfter', {template: '<oca-report-problem/>'});

/* end report problem */

/*footer*/
app.component('prm-explore-footer-after', {

             bindings: { parentCtrl: '<' },

             template: 'enter html here'

});
	



/*useful for writing object to console for examination*/
/*app.controller('prmSearchResultAvailabilityLineAfterController', [function(){
	console.log(this);
}]);*/

// example - only display link if call number present and item unavailable

//app.component('prmSearchResultAvailabilityLineAfter', {
//	bindings: { parentCtrl: '<' },
//	controller: 'prmSearchResultAvailabilityLineAfterController',
//	template: '<a ng-show="$ctrl.showTraceLink" href="https://library.college.edu/traceform.php">Not on Shelf?</a>'
	//note - {{$ctrl.callNumber}} - can include objects like this 
//});

//app.controller('prmSearchResultAvailabilityLineAfterController', [function(){
	// get the data from the current object
	// use "try" blocks in case the data isn't there
	//try {
    //	this.callNumber = this.parentCtrl.result.delivery.bestlocation.callNumber;
	//} catch(e) {
    //	this.callNumber = "";
	//}

	//try {
    //	this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
	//} catch(e) {
    //	this.availability = "";
	//}

	// make a Boolean variable for whether or not you want to show the trace link
	//this.showTraceLink = Boolean(this.availability === 'available' && this.callNumber);
})();









