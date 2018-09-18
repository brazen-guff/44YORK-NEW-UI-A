(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

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

/*useful for writing object to console for examination*/
/*app.controller('prmSearchResultAvailabilityLineAfterController', [function(){
	console.log(this);
}]);*/

// example - only display link if call number present and item unavailable

app.component('prmSearchResultAvailabilityLineAfter', {
	bindings: { parentCtrl: '<' },
	controller: 'prmSearchResultAvailabilityLineAfterController',
	template: '<a ng-show="$ctrl.showTraceLink" href="https://library.college.edu/traceform.php">Not on Shelf?</a>'
	//note - {{$ctrl.callNumber}} - can include objects like this 
});

app.controller('prmSearchResultAvailabilityLineAfterController', [function(){
	// get the data from the current object
	// use "try" blocks in case the data isn't there
	try {
    	this.callNumber = this.parentCtrl.result.delivery.bestlocation.callNumber;
	} catch(e) {
    	this.callNumber = "";
	}

	try {
    	this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
	} catch(e) {
    	this.availability = "";
	}

	// make a Boolean variable for whether or not you want to show the trace link
	this.showTraceLink = Boolean(this.availability === 'available' && this.callNumber);
}]);


})();






