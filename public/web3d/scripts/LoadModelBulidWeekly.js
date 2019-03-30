// LoadModel.js
$(function() {


	loadInitialModel(_shiijindu);

});

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

function setChildThemingColor(viewer, root, color) {
	var it = viewer.model.getData().instanceTree;

	if(it != undefined) {
		it.enumNodeChildren(root, function(dbId) {
			viewer.setThemingColor(dbId, color);
		}, true);
	}
}

function transViewCustom(modelObj) {
	if(modelObj._homeview.length >= 3) {
		//var newCamPos = new THREE.Vector3(-149715.3552195181,-119243.66328031197,34681.408770079055);
		var newCamPos = new THREE.Vector3(modelObj._homeview[0], modelObj._homeview[1], modelObj._homeview[2]);

		var target = new THREE.Vector3(0, 0, 0);
		var cam = modelObj._viewer.navigation.getCamera();
		modelObj._viewer.navigation.setRequestTransition(true, newCamPos, target, cam.fov);

		setTimeout(function() {
			modelObj._viewer.autocam.setCurrentViewAsHome();
		}, 1000);
	}
}

function customViewer(modelObj) {

	if(modelObj._selectionmode == "FIRST_OBJECT") {
		modelObj._viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.FIRST_OBJECT);
	} else if(modelObj._selectionmode == "LAST_OBJECT") {
		modelObj._viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
	}

	//
	transViewCustom(modelObj);

	//custom background color-----[pgb]
	modelObj._viewer.setBackgroundColor(48, 153, 225, 255, 255, 255);
	//_viewer.setBackgroundColor(60, 141, 188, 255,255, 255);

	//toolbar custom -------------[pgb]
	var viewerToolbar = modelObj._viewer.getToolbar(true);
	var settingsTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.SETTINGSTOOLSID);
	//viewerToolbar.removeControl(settingsTools);
	var navTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.NAVTOOLSID);
	//navTools.removeControl("toolbar-cameraSubmenuTool");
	navTools.removeControl("toolbar-zoomTool");

	var modelTools = viewerToolbar.getControl(Autodesk.Viewing.TOOLBAR.MODELTOOLSID);
	modelTools.removeControl("toolbar-explodeTool");

}

function getgroupmaps(modelObj) {

	$.ajax({
		type: "get",
		url: "/task/modelview/getgroupmaps/",
		cache: false,
		dataType: "json",
		data: {
			"_curMajor": modelObj._curMajor,
			"_curUnitId": modelObj._curUnitId,
		},
		success: function(data) {
			if(data.res) {
				modelObj._dbid2groupmaps = data.dbid2groupmaps;
				modelObj._group2dbidmaps = data.group2dbidmaps;
				modelObj._beGroupMapDataLoad = true;
			} else {
				alert("加载构件组-构件关系失败！");
			}
		}
	});
}

function loadInitialModel(modelObj) {
	$.ajax({
		type: "get",
		url: "/task/modelview/getinitialmodel/",
		cache: false,
		dataType: "json",
		data: {},
		success: function(data) {
			if(data.issuc == "true") {

				modelObj._modelId = data.modelid;
				modelObj._curUnitId = data.unitid;
				modelObj._curMajor = data.majorid;
				modelObj._isWholeModel = data.iswhole
				modelObj._selectionmode = data.selectionmode
				modelObj._homeview = eval(data.homeview)
				modelObj._extdata = eval(data.extdata)

				var options = {};
				options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
				options.document = "http://" + window.location.host + data.modelfile;
				if(modelObj._extdata.saveInOss) {
					options.document = data.modelfile;
				}

				if(modelObj._extdata.groups) {
					modelObj._beGroupMapDataLoad = false;
					getgroupmaps(modelObj);
				}

				Autodesk.Viewing.Initializer(options, function() {
					modelObj.loadDocument(options.document); // load first entry by default
				});

			}

		}
	});
}

function getModelFile(modelObj) {
	var that = this;
	$.ajax({
		type: "get",
		url: "/task/modelview/getmodelfile/",
		cache: false,
		dataType: "json",
		data: {
			"_modelfile": modelObj._modelId,
		},
		success: function(data) {
			if(data.issuc == "true") {
				modelObj._modelId = data.modelid;
				modelObj._curUnitId = data.unitid;
				modelObj._curMajor = data.majorid;
				modelObj._isWholeModel = data.iswhole
				modelObj._selectionmode = data.selectionmode
				modelObj._homeview = eval(data.homeview)
				modelObj._extdata = eval(data.extdata)

				var options = {};
				options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
				options.document = "http://" + window.location.host + data.modelfile;
				if(modelObj._extdata.saveInOss) {
					options.document = data.modelfile;
				}

				if(modelObj._extdata.groups) {
					modelObj._beGroupMapDataLoad = false;
					getgroupmaps(modelObj);
				}

				modelObj.loadDocument(options.document); // load first entry by default

			} else {
				alert("没有对应单位工程专业模型！");
			}
		}
	});
}

function setFliterPb(modelObj, data) {
	var dbids = [];
	for(var each in data.pblist) {
		if(modelObj._extdata.groups && data.pblist[each].lvmdbid == null) {
			if(modelObj._beGroupMapDataLoad) {
				var groupdbids = modelObj._group2dbidmaps[data.pblist[each].id];
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
	modelObj._viewer.isolateById(dbids);

	modelObj._viewer.clearThemingColors();
	modelObj.getpbstatuslist();

}

function filterPblist(modelObj) {
	$.ajax({
		type: "get",
		url: "/task/modelview/filterPblist/",
		cache: false,
		dataType: "json",
		data: {
			"_selElevations": modelObj._selElevations,
			"_selPbtypes": modelObj._selPbtypes,
			"_curUnitId": modelObj._curUnitId,
			"_selZones": modelObj._selZones,
			"_curMajor": modelObj._curMajor,
		},
		success: function(data) {

			setFliterPb(modelObj, data);
		}
	});
}

var _shiijindu = {
	_viewer: null, // the viewer

	_isWholeModel: false,
	_curUnitId: "",
	_curMajor: "",
	_selElevations: "",
	_selZones: "",
	_selPbtypes: "",
	_modelId: null,

	_selectionmode: "",
	_homeview: [],
	_extdata: null,
	_group2dbidmaps: {},
	_dbid2groupmaps: {},
	_beGroupMapDataLoad: false,

	// initialize the viewer into the HTML placeholder
	initializeViewer: function() {
		var that = this;
		if(that._viewer !== null) {
			//_viewer.uninitialize();
			that._viewer.finish();
			that._viewer = null;
		} else {
			//initOverlays(); // set up the Overlays one time
		}

		that._viewer = new Autodesk.Viewing.Private.GuiViewer3D($(".viewer")[0], {}); // With toolbar

		var retCode = that._viewer.initialize();
		if(retCode !== 0) {
			alert("ERROR: Couldn't initialize viewer!");
			console.log("ERROR Code: " + retCode); // TBD: do real error handling here
		}

	},

	// load a specific document into the intialized viewer
	loadDocument: function(urnStr) {
		var that = this;
		that._loadedDocument = null; // reset to null if reloading

		if(!urnStr || (0 === urnStr.length)) {
			alert("You must specify a URN!");
			return;
		}

		that.initializeViewer();

		var fullUrnStr = urnStr;

		that._viewer.load(fullUrnStr);

		that._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(e) {
			if(that._viewer.model) {

				customViewer(that);

				that._viewer.getObjectTree(function(objTree) {
					that.getpbstatuslist();
				});

			}
			that._viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, that.onSelectedCallback);
			loadInitialModel(_jihuajindu);
		});

		that._viewer.setGhosting(false);

		that._viewer.unloadExtension('Autodesk.ADN.Viewing.Extension.SampleTaskStatus');
		that._viewer.loadExtension('Autodesk.ADN.Viewing.Extension.SampleTaskStatus');
		that._viewer.createSamplePanel(that._curUnitId, that._curMajor, that._isWholeModel);

	},
	onSelectedCallback: function(event) {
		var that = this;

		if(event.dbIdArray.length > 0) {
			var _selectedId = event.dbIdArray[0];
			console.log(_selectedId);

			if(_shiijindu._extdata.groups) {
				if(1 == event.dbIdArray.length) {
					if(_shiijindu._beGroupMapDataLoad) {
						group = _shiijindu._dbid2groupmaps[_selectedId];
						groupdbids = _shiijindu._group2dbidmaps[group];
						console.log(groupdbids);
						if(groupdbids) {
							_shiijindu._viewer.select(groupdbids);
							_shiijindu.getpbproperty(group, "pbid");
						} else {
							//alert("没有找到构件，对应构件组！");
							_shiijindu.getpbproperty(_selectedId, "dbid");
						}
					} else {
						alert("正在加载构件组-构件关系，请稍后选择构件！");
					}
				}

			} else {
				_shiijindu.getpbproperty(_selectedId, "dbid");
			}

		}

	},

	getpbproperty: function(id, type) {
		var that = this;

		var dbId = null;
		var pbId = null;
		if(type == "dbid") {
			dbId = id;
		} else if(type == "pbid") {
			pbId = id;
		}

		$.ajax({
			type: "get",
			url: "/task/modelview/getpbproperty/",
			cache: false,
			dataType: "json",
			data: {
				"dbId": dbId,
				"pbId": pbId,
				"_curUnitId": that._curUnitId,
				"_curMajor": that._curMajor,
			},
			success: function(data) {
				if(data.issuc == "true") {
					$("#pbnumber").text(data.pbnumber);
					$("#pbstatusinfo").text(data.pbstatus + "    " + data.curstatuspercent + "%");

					var traceurl = "/task/goujian/trace_front/?pbid=" + data.pbid;
					$("#pbtraceframe").attr("src", traceurl);

				} else {
					$("#pbnumber").text("无构件信息");
					$("#pbstatusinfo").text("");
					$("#pbtraceframe").attr("src", "");
				}

			}
		});

	},

	getpbstatuslist: function() {
		var that = this;
		$.ajax({
			type: "get",
			url: "/task/modelview/getpbstatuslist/",
			cache: false,
			dataType: "json",
			data: {
				"_selElevations": that._selElevations,
				"_selPbtypes": that._selPbtypes,
				"_curUnitId": that._curUnitId,
				"_selZones": that._selZones,
				"_curMajor": that._curMajor,
				"_isWholeModel": that._isWholeModel,
			},
			success: function(data) {
				if(data.issuc = "true") {
					for(var each in data.pbstatuslist) {
						var color = getColorByStr(data.pbstatuslist[each].color);
						for(var eachpb in data.pbstatuslist[each].pblist) {

							if(that._extdata.groups && data.pbstatuslist[each].pblist[eachpb].lvmdbid == null) {
								if(that._beGroupMapDataLoad) {
									var groupdbids = that._group2dbidmaps[data.pbstatuslist[each].pblist[eachpb].id];
									console.log(groupdbids);
									if(groupdbids) {
										groupdbids.forEach(dbid => {
											that._viewer.setThemingColor(dbid, color);
											setChildThemingColor(that._viewer, dbid, color);
										})

									}
								}
							} else {
								that._viewer.setThemingColor(parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
								setChildThemingColor(that._viewer, parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
							}

						}
					}

				}
			}
		});
	},

}

var _jihuajindu = {
	_viewer: null, // the viewer

	_isWholeModel: false,
	_curUnitId: "",
	_curMajor: "",
	_selElevations: "",
	_selZones: "",
	_selPbtypes: "",
	_modelId: null,

	_selectionmode: "",
	_homeview: [],
	_extdata: null,
	_group2dbidmaps: {},
	_dbid2groupmaps: {},
	_beGroupMapDataLoad: false,

	// initialize the viewer into the HTML placeholder
	initializeViewer: function() {
		var that = this;
		if(that._viewer !== null) {
			//_viewer.uninitialize();
			that._viewer.finish();
			that._viewer = null;
		} else {
			//initOverlays(); // set up the Overlays one time
		}

		that._viewer = new Autodesk.Viewing.Private.GuiViewer3D($(".viewer")[1], {}); // With toolbar

		var retCode = that._viewer.initialize();
		if(retCode !== 0) {
			alert("ERROR: Couldn't initialize viewer!");
			console.log("ERROR Code: " + retCode); // TBD: do real error handling here
		}

	},

	// load a specific document into the intialized viewer
	loadDocument: function(urnStr) {
		var that = this;
		that._loadedDocument = null; // reset to null if reloading

		if(!urnStr || (0 === urnStr.length)) {
			alert("You must specify a URN!");
			return;
		}

		that.initializeViewer();

		var fullUrnStr = urnStr;

		that._viewer.load(fullUrnStr);

		that._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(e) {
			if(that._viewer.model) {
				customViewer(that);
				that._viewer.getObjectTree(function(objTree) {
					that.getpbstatuslist();
				});

			}
		});

		that._viewer.setGhosting(false);

		that._viewer.loadExtension('Autodesk.ADN.Viewing.Extension.SampleTaskGoal');
	},

	getpbstatuslist: function() {
		var that = this;
		var goal = $("#build-goal").val();

		if(!goal) {
			return;
		}

		var mapStatus = {
			"weiwancheng": "#3A84C3",
			"wancheng": "#50C13A",
		}
		$.ajax({
			type: "get",
			url: "/task/projecttask/getgoalstatus/",
			cache: false,
			dataType: "json",
			data: {
				"curUnitId": that._curUnitId,
				"curMajor": that._curMajor,
				"goal": goal
			},
			success: function(data) {
				if(data.issuc == "true") {
					that._viewer.clearThemingColors();

					for(var each in data.pbstatuslist) {
						for(var eachpb in data.pbstatuslist[each].pblist) {

							var color = that.getColorByStr(mapStatus[data.pbstatuslist[each].name]);

							if(that._extdata.groups && data.pbstatuslist[each].pblist[eachpb].lvmdbid == null) {
								if(that._beGroupMapDataLoad) {
									var groupdbids = that._group2dbidmaps[data.pbstatuslist[each].pblist[eachpb].id];
									console.log(groupdbids);
									if(groupdbids) {
										groupdbids.forEach(dbid => {
											that._viewer.setThemingColor(dbid, color);
											setChildThemingColor(that._viewer, dbid, color);
										})

									}
								}
							} else {
								that._viewer.setThemingColor(parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
								setChildThemingColor(that._viewer, parseInt(data.pbstatuslist[each].pblist[eachpb].lvmdbid), color);
							}
						}
					}
				} else {
					alert(data.error);
				}
			}
		});
	},

}