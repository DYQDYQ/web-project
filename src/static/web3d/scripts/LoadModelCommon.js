// LoadModel.js
var _viewer = null; // the viewer
var _beInitializer=false;
var _isWholeModel = false;
var _modelId = null;
var _curUnitId = "";
var _curMajor = "";
var _selectionmode = "";
var _homeview = [];
var _extdata = {}

function loadModelFile(modelid) {
	_modelId = modelid;
	$.ajax({
		type: "get",
		url: "/task/modelview/getmodelfile/",
		cache: false,
		dataType: "json",
		data: {
			"_modelfile": modelid,
		},
		success: function(data) {
			if(data.issuc == "true") {
				_isWholeModel = data.iswhole
				_curUnitId = data.unitid;
				_curMajor = data.majorid;

				_selectionmode = data.selectionmode
				_homeview = eval(data.homeview)
				_extdata = eval(data.extdata)

				if(_beInitializer){
					let modelfile = "http://" + window.location.host + data.modelfile;
					if(_extdata.saveInOss) {
						modelfile = data.modelfile;
					}
					loadDocument(modelfile); // load first entry by default
					
				}else{
					var options = {};
					options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
					options.document = "http://" + window.location.host + data.modelfile;
					if(_extdata.saveInOss) {
						options.document = data.modelfile;
					}
	
					Autodesk.Viewing.Initializer(options, function() {
						loadDocument(options.document); // load first entry by default
					});
					
				}

			} else {
				alert("没有对应单位工程专业模型！");
			}
		}
	});
}

// initialize the viewer into the HTML placeholder
function initializeViewer() {

	if(_viewer !== null) {
		//_viewer.uninitialize();
		_viewer.finish();
		_viewer = null;
	}

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

	_viewer.load(urnStr);

	_viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(e) {
		customViewer();
	});

	_viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback);

	_viewer.setGhosting(true);


}

function onSelectedCallback(event) {

	if(event.dbIdArray.length > 0) {
		console.log(event.dbIdArray);
		
	} else {

	}

}

function transViewCustom(viewerpoint) {
	if(viewerpoint.length >= 3) {
		//var newCamPos = new THREE.Vector3(-149715.3552195181,-119243.66328031197,34681.408770079055);
		var newCamPos = new THREE.Vector3(viewerpoint[0], viewerpoint[1], viewerpoint[2]);

		var target = new THREE.Vector3(0, 0, 0);
		var cam = _viewer.navigation.getCamera();
		_viewer.navigation.setRequestTransition(true, newCamPos, target, cam.fov);
		
		setTimeout(function() {
			_viewer.autocam.setCurrentViewAsHome();
		}, 1000);
	}
}

function customViewer() {

	if(_selectionmode == "FIRST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.FIRST_OBJECT);
	} else if(_selectionmode == "LAST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
	}

	//
	transViewCustom(_homeview);

	//custom background color-----[pgb]
	_viewer.setBackgroundColor(48, 153, 225, 255, 255, 255);
	//_viewer.setBackgroundColor(60, 141, 188, 255,255, 255);

}
