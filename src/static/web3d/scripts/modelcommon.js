var _isWholeModel = false;
var _modelId = null;
var _curUnitId = "";
var _curMajor = "";
var _selectionmode = "";
var _homeview = [];
var _extdata = null;
var _group2dbidmaps = {}
var _dbid2groupmaps = {}
var _beGroupMapDataLoad = false;

// called when HTML page is finished loading, trigger loading of default model into viewer
function loadInitialModel(modelurl) {
	var options = {};
	// modelurl = 'http://127.0.0.1:8000/media/根目录/技术资料/福建省泉州市隧道/模型文件/3D.svf'
	options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
	options.document = modelurl//"http://modelbucket.oss-cn-shanghai.aliyuncs.com/scc4pm/csfjyg/LMV/0/0.svf";
	// options.document = 'http://modelbucket.oss-cn-shanghai.aliyuncs.com/dixiagongcheng/test/3d.svf';
	// options.document = "/static/js/web3d/test.rvt";
	Autodesk.Viewing.Initializer(options, function() {
		loadDocument(options.document); // load first entry by default
	});
	return ;
	$.ajax({
		type: "get",
		url: "/task/modelview/getinitialmodel/",
		cache: false,
		dataType: "json",
		data: {},
		success: function(data) {
			if(data.issuc == "true") {
				_modelId = data.modelid;
				_curUnitId = data.unitid;
				_curMajor = data.majorid;
				_isWholeModel = data.iswhole
				_selectionmode = data.selectionmode
				_homeview = eval(data.homeview)
				_extdata = eval(data.extdata)

				var options = {};
				options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
				options.document = "http://" + window.location.host + data.modelfile;
				if(_extdata.saveInOss) {
					options.document = data.modelfile;
				}

				if(_extdata.groups) {
					_beGroupMapDataLoad = false;
					getgroupmaps();
				}

				Autodesk.Viewing.Initializer(options, function() {
					loadDocument(options.document); // load first entry by default
				});
			}

			LoadAllCustomTrees();
		}
	});
}

function getModelFile() {
	if(_curUnitId == "" || _curMajor == "") {
		return;
	}
	let modelfile = 'http://modelbucket.oss-cn-shanghai.aliyuncs.com/scc4pm/csfjyg/LMV/0/0.svf';
	getgroupmaps();
	loadDocument(modelfile); // load first entry by default
	return ;
	$.ajax({
		type: "get",
		url: "/task/modelview/getmodelfile/",
		cache: false,
		dataType: "json",
		data: {
			"_curMajor": _curMajor,
			"_curUnitId": _curUnitId,
		},
		success: function(data) {
			if(data.issuc == "true") {
				_modelId = data.modelid;
				_isWholeModel = data.iswhole
				_selectionmode = data.selectionmode
				_homeview = eval(data.homeview)
				_extdata = eval(data.extdata)

				let modelfile = "http://" + window.location.host + data.modelfile;
				if(_extdata.saveInOss) {
					modelfile = data.modelfile;
				}

				if(_extdata.groups) {
					_beGroupMapDataLoad = false;
					getgroupmaps();
				}

				loadDocument(modelfile); // load first entry by default
			} else {
				alert("没有对应单位工程专业模型！");
			}
		}
	});
}

function getModelFile2() {
	var defaultunitId = $("#selUnitproject option:selected").val();
	_modelId = defaultunitId;
	$.ajax({
		type: "get",
		url: "/task/modelview/getmodelfile/",
		cache: false,
		dataType: "json",
		data: {
			"_modelfile": defaultunitId,
		},
		success: function(data) {
			if(data.issuc == "true") {
				_isWholeModel = data.iswhole
				_curUnitId = data.unitid;
				_curMajor = data.majorid;

				_selectionmode = data.selectionmode
				_homeview = eval(data.homeview)
				_extdata = eval(data.extdata)

				let modelfile = "http://" + window.location.host + data.modelfile;
				if(_extdata.saveInOss) {
					modelfile = data.modelfile;
				}

				if(_extdata.groups) {
					_beGroupMapDataLoad = false;
					getgroupmaps();
				}

				loadDocument(modelfile); // load first entry by default
			} else {
				alert("没有对应单位工程专业模型！");
			}
		}
	});
}

function getgroupmaps() {

	$.ajax({
		type: "get",
		url: "/task/modelview/getgroupmaps/",
		cache: false,
		dataType: "json",
		data: {
			"_curMajor": _curMajor,
			"_curUnitId": _curUnitId,
		},
		success: function(data) {
			if(data.res) {
				_dbid2groupmaps = data.dbid2groupmaps;
				_group2dbidmaps = data.group2dbidmaps;
				_beGroupMapDataLoad = true;
			} else {
				alert("加载构件组-构件关系失败！");
			}
		}
	});
}

function onSelectedCallback(event) {

	if(event.dbIdArray.length > 0) {
		_selectedId = event.dbIdArray[0];
		console.log(_selectedId);

		if(_extdata.groups) {
			if(1 == event.dbIdArray.length) {
				if(_beGroupMapDataLoad) {
					group = _dbid2groupmaps[_selectedId];
					groupdbids = _group2dbidmaps[group];
					console.log(groupdbids);
					if(groupdbids && groupdbids.length>1) {
						_viewer.select(groupdbids);
						onNodeSelectProc(group, "pbid")
					} else {
						//alert("没有找到构件，对应构件组！");
						onNodeSelectProc(_selectedId);
					}
				} else {
					alert("正在加载构件组-构件关系，请稍后选择构件！");
				}
			}

		} else {
			onNodeSelectProc(_selectedId);
		}

	} else {
		_selectedId = null;
	}
}

function setPbStatus(data) {
	_pbDbidList = [];
	for(var each in data.pbstatuslist) {
		var color = getColorByStr(data.pbstatuslist[each].color);
		for(var eachpb in data.pbstatuslist[each].pblist) {

			if(_extdata.groups && data.pbstatuslist[each].pblist[eachpb].lvmdbid == null) {
				if(_beGroupMapDataLoad) {
					var groupdbids = _group2dbidmaps[data.pbstatuslist[each].pblist[eachpb].id];
					console.log(groupdbids);
					if(groupdbids) {
						groupdbids.forEach(dbid => {
							_pbDbidList.push(dbid);
							_viewer.setThemingColor(dbid, color);
							setChildThemingColor(dbid, color);
						})

					}
				}
			} else {
				_viewer.setThemingColor(parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
				setChildThemingColor(parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
				_pbDbidList.push(parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid));
			}

		}
	}


}

function setFliterPb(data) {
	var dbids = [];
	for(var each in data.pblist) {
		if(_extdata.groups && data.pblist[each].lvmdbid == null) {
			if(_beGroupMapDataLoad) {
				var groupdbids = _group2dbidmaps[data.pblist[each].id];
				console.log(groupdbids);
				if(groupdbids) {
					groupdbids.forEach(dbid => {
						dbids.push(dbid);
					})

				}
			}
		} else {
			dbids.push(parseInt(data.pblist[each].lvmdbid));
		}

	}
	_viewer.isolateById(dbids);

	if(0 == _modeindex) {
		_viewer.clearThemingColors();
		getpbstatuslist();
	}
}

function transViewCustom() {
	if(_homeview.length >= 3) {
		//var newCamPos = new THREE.Vector3(-149715.3552195181,-119243.66328031197,34681.408770079055);
		var newCamPos = new THREE.Vector3(_homeview[0], _homeview[1], _homeview[2]);

		var target = new THREE.Vector3(0, 0, 0);
		var cam = _viewer.navigation.getCamera();
		_viewer.navigation.setRequestTransition(true, newCamPos, target, cam.fov);

		setTimeout(function() {
			_viewer.autocam.setCurrentViewAsHome();
		}, 1000);
	}
}

var _modeindex = 0;

function customViewer() {
	console.log(11111);
	if(_selectionmode == "FIRST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.FIRST_OBJECT);
	} else if(_selectionmode == "LAST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
	}

	//
	transViewCustom();

	//custom background color-----[pgb]
	_viewer.setBackgroundColor(48, 153, 225, 255, 255, 255);
	//_viewer.setBackgroundColor(60, 141, 188, 255,255, 255);

	//toolbar custom -------------[pgb]
	var viewerToolbar = _viewer.getToolbar(true);
	var settingsTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.SETTINGSTOOLSID);
	//viewerToolbar.removeControl(settingsTools);
	var navTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.NAVTOOLSID);
	//navTools.removeControl("toolbar-cameraSubmenuTool");
	navTools.removeControl("toolbar-zoomTool");

	var modelTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.MODELTOOLSID);
	modelTools.removeControl("toolbar-explodeTool");

	var changmodelBtn = new Autodesk.Viewing.UI.Button("changmodelBtn");
	changmodelBtn.icon.style.backgroundImage = 'url(img/swapmodel3.png)';
	changmodelBtn.setToolTip("切换模型显示");
	changmodelBtn.onClick = function(e) {
		_modeindex = (_modeindex + 1) % 2;

		switch(_modeindex) {
			case 0:
				getpbstatuslist();
				break;
			case 1:
				_viewer.clearThemingColors();
				_viewer.showAll();
				break;
		}
	};
	modelTools.addControl(changmodelBtn, {
		index: 3
	});

}

function getMeshPosition(fragId) {

	var mesh = _viewer.impl.getRenderProxy(_viewer.model, fragId);

	var pos = new THREE.Vector3();

	pos.setFromMatrixPosition(mesh.matrixWorld);

	return pos;
}

function getColorByStr(strColor) {
	var color = null;
	if(strColor != undefined && strColor.length == 7) {
		var r = (parseFloat(parseInt(strColor.substr(1, 2), 16) / 255).toFixed(2));
		var g = (parseFloat(parseInt(strColor.substr(3, 2), 16) / 255).toFixed(2));
		var b = (parseFloat(parseInt(strColor.substr(5, 2), 16) / 255).toFixed(2));

		color = new THREE.Vector4(r, g, b, 0.5); // r, g, b, intensity
	}
	return color;
}

function setChildThemingColor(root, color) {

	var it = _viewer.model.getData().instanceTree;

	it.enumNodeChildren(root, function(dbId) {
		_viewer.setThemingColor(dbId, color);
	}, true);

}

function getOriginalWorldBoundingBox(fragIds) {

	var fragBoundingBox = new THREE.Box3();
	var nodeBoundingBox = new THREE.Box3();

	var fragmentBoxes = _viewer.model.getFragmentList().boxes;

	fragIds.forEach(function(fragId) {

		var boffset = fragId * 6;

		fragBoundingBox.min.x = fragmentBoxes[boffset];
		fragBoundingBox.min.y = fragmentBoxes[boffset + 1];
		fragBoundingBox.min.z = fragmentBoxes[boffset + 2];
		fragBoundingBox.max.x = fragmentBoxes[boffset + 3];
		fragBoundingBox.max.y = fragmentBoxes[boffset + 4];
		fragBoundingBox.max.z = fragmentBoxes[boffset + 5];

		nodeBoundingBox.union(fragBoundingBox);
	});

	return nodeBoundingBox;
}

function getModifiedWorldBoundingBox(fragIds) {

	var fragbBox = new THREE.Box3();
	var nodebBox = new THREE.Box3();

	fragList = _viewer.model.getFragmentList();
	fragIds.forEach(function(fragId) {

		fragList.getWorldBounds(fragId, fragbBox);
		nodebBox.union(fragbBox);
	});

	return nodebBox;
}

function getFragmentIdByDbIds(objectIds) {
	var FragmentIds = [];

	var it = _viewer.model.getData().instanceTree;
	for(var i = 0; i < objectIds.length; i++) {

		var dbid = objectIds[i];

		it.enumNodeFragments(dbid, function(fragId) {

			FragmentIds.push(fragId);

		}, true);
	}

	return FragmentIds;
}
