// LoadModel.js
var _viewer = null; // the viewer
var _savedGlobalCamera = null;
var _loadedDocument = null;


var _isWholeModel = false;
var _selElevations = "";
var _selZones = "";
var _selPbtypes = "";

var _lastSelectDbid = 0;

var mapIssueId2DbId = {};

//pgb 注释掉暂时不做本地缓存
var _needLoadStorage = false;

var _selectedId = 0;
var _pbDbidList = [];

var _alarmDbidList = [];
var _objIssueList = [];

var _extdata = {}

// add the two overlays to the system
function initOverlays() {


}

// initialize the viewer into the HTML placeholder
function initializeViewer() {

	if(_viewer !== null) {
		//_viewer.uninitialize();
		_viewer.finish();
		_viewer = null;
		_savedGlobalCamera = null;
		_savedViewerStates = [];
	} else {
		initOverlays(); // set up the Overlays one time
	}

	//var viewerElement = document.getElementById("viewer");  // placeholder in HTML to stick the viewer
	//_viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement, {});
	_viewer = new Autodesk.Viewing.Private.GuiViewer3D($("#viewer")[0], {}); // With toolbar

	var retCode = _viewer.initialize();
	if(retCode !== 0) {
		alert("ERROR: Couldn't initialize viewer!");
		console.log("ERROR Code: " + retCode); // TBD: do real error handling here
	}

}

// load a specific document into the intialized viewer
function loadDocument(urnStr) {

	_loadedDocument = null; // reset to null if reloading

	if(!urnStr || (0 === urnStr.length)) {
		alert("You must specify a URN!");
		return;
	}

	initializeViewer();

	var fullUrnStr = urnStr;

	_viewer.load(fullUrnStr);

	_viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(e) {
		if(_viewer.model) {
			customViewer();

			_viewer.getObjectTree(function(objTree) {
				getpbstatuslist();
			});

			setContextMenu();
		}
	});

	var light = new THREE.AmbientLight(0xffffff);
	_viewer.impl.scene.add(light);

	_viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback);

	_viewer.setGhosting(true);

	_viewer.unloadExtension('Autodesk.ADN.Viewing.Extension.SampleStatus');
	_viewer.loadExtension('Autodesk.ADN.Viewing.Extension.SampleStatus');
	_viewer.unloadExtension('Autodesk.ADN.Viewing.Extension.Color');
	_viewer.loadExtension('Autodesk.ADN.Viewing.Extension.Color');

	_alarmDbidList = [];
}


function onNodeSelectProc(dbid){
	FilterIssueByDbid(dbid);
}

function getpbstatuslist() {
	console.log('获取getpbstatuslist-----1');
	return ;
	$.ajax({
		type: "get",
		url: "/task/qualitycenter/getpbstatuslist/",
		cache: false,
		dataType: "json",
		data: {
			"_selElevations": _selElevations,
			"_selPbtypes": _selPbtypes,
			"_curUnitId": _curUnitId,
			"lastSelectDbid": _lastSelectDbid,
			"_selZones": _selZones,
			"_curMajor": _curMajor,
			"_isWholeModel": _isWholeModel,
		},
		success: function(data) {
			if(data.issuc == "true") {

				setPbStatus(data);

				if(_pbDbidList.length>0){
					_viewer.isolate(_pbDbidList);
				}

				updateObjIssue(data);

			}
		}
	});
}

function FilterIssueByDbid(dbid){
	var issueIds=[];
	for(var issue in mapIssueId2DbId) {
   		 for(var each in mapIssueId2DbId[issue]){
   		 		if(mapIssueId2DbId[issue][each]==dbid){
   		 			issueIds.push(issue);
   		 			break;
   		 		}
   		 }
	}

	$(".issuetable tr").each(function(){
		$(this).css("display","");
		if(issueIds.length>0){
			var issId = $(this).attr("id").split("_")[1];
			if($.inArray(issId, issueIds)==-1){
				$(this).css("display","none");
			}
		}

	});
}

function updateObjIssue(data) {
	for(var each in _objIssueList) {
		_viewer.impl.scene.remove(_objIssueList[each]);
	}
	_objIssueList = [];

	var jsonloader = new THREE.JSONLoader();
	jsonloader.load("/js/web3d/assets/models/zhi.svf", function(geometry, materials) {
		for(var each in data.issuepblist) {

			mapIssueId2DbId[data.issuepblist[each].issueId]=data.issuepblist[each].pblist;
			if(data.issuepblist[each].pblist.length > 0) {
				var ground = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				ground.name = "issueobj_" + data.issuepblist[each].issueId;

				var FragmentIds = getFragmentIdByDbIds(data.issuepblist[each].pblist);
				var nodeBoundingBox = getModifiedWorldBoundingBox(FragmentIds);

				console.log(nodeBoundingBox);
				var center = nodeBoundingBox.center();
				console.log(center)
				ground.position.x = center.x;
				ground.position.y = center.y;
				//ground.position.z = nodeBoundingBox.max.z + 3500;
				ground.position.z = nodeBoundingBox.max.z + _extdata.pianyi;
				//ground.rotation.x = 0.5 * Math.PI;
				//ground.scale.set(300, 300, 300);
				ground.scale.set(_extdata.scale, _extdata.scale, _extdata.scale);
				_viewer.impl.scene.add(ground);
				_objIssueList.push(ground);
			}

		}

		_viewer.impl.sceneUpdated(true);
	}, '/js/web3d/assets/models/');
}



function filterPblistByIssue(issuetype, issueId) {
	console.log('-------filterPblistByIssue',issuetype,issueId);
	return ;
	$.ajax({
		type: "get",
		url: "/task/qualitycenter/getpbstatuslist/",
		cache: false,
		dataType: "json",
		data: {
			"_selElevations": _selElevations,
			"_selPbtypes": _selPbtypes,
			"_curUnitId": _curUnitId,
			"lastSelectDbid": _lastSelectDbid,
			"_selZones": _selZones,
			"_curMajor": _curMajor,
			"_isWholeModel": _isWholeModel,
			"issuetype": issuetype,
			"issueId": issueId
		},
		success: function(data) {
			if(data.issuc == "true") {
				_viewer.clearThemingColors();

				setPbStatus(data);

				_viewer.isolateById(_pbDbidList);

				updateObjIssue(data);
			}
		}
	});

}

function changepage2Page(page){

}

