// LoadModel.js
var _viewer = null; // the viewer
var _savedGlobalCamera = null;
var _loadedDocument = null;

var _isWholeModel = false;
var _curUnitId = "";
var _curMajor = "";
var _selElevations = "";
var _selZones = "";
var _selPbtypes = "";
var _selectedId = null;

var _selectDbids = {};
var colorSelected = null;
var _drawSelector = null;

var _selectPbtypes = new Set();

// initialize the viewer into the HTML placeholder
function initializeViewer() {

	if(_viewer !== null) {
		//_viewer.uninitialize();
		_viewer.finish();
		_viewer = null;
		_selectDbids = {};
	}

	if(!colorSelected) {
		colorSelected = new THREE.Vector4(255 / 255, 192 / 255, 203 / 255, 0.5);
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

	var fullUrnStr = urnStr;

	_viewer.load(fullUrnStr);

	_viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(e) {
		if(_viewer.model) {
			customViewerCfg();
		}
		setContextMenu();

        firstmodelcolor();
	});

	_viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, function(svf, mmodel) {

		_viewer.unloadExtension('Viewing.Extension.SelectionWindow');
		_viewer.loadExtension('Viewing.Extension.SelectionWindow');
		_viewer.selectionWindowSetModel(_viewer.model);
		// _viewer.selectionWindowSelCallBack(transPblist);

		_viewer.loadExtension("Autodesk.Viewing.MarkupsCore").then(extensionReady);

		// getpbstatuslist();

	});

	_viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback2);

	_viewer.unloadExtension('Autodesk.ADN.Viewing.Extension.SampleTaskStatus'); //显示属性页 !!!!!!
	_viewer.loadExtension('Autodesk.ADN.Viewing.Extension.SampleTaskStatus'); //显示属性页 !!!!!!
	_viewer.createSamplePanel(_curUnitId, _curMajor, _isWholeModel);
}


/**
 * Markup插件加载完成
 */
function extensionReady() {
	//创建DrawlineSelector对象，并配置回调方法
	_drawSelector = new DrawlineSelector(_viewer, (dbid, sourcevol, result) => {
		//		alert("构件完成百分比: " + result / sourcevol * 100 + "%");
		let percent = Math.round(result / sourcevol * 100);
		document.getElementById("nowpercent_" + dbid).value = percent;
		let index = getIndexByDbid(dbid);
		if(index != -1) {
			_app.tableData[index].nowpercent = percent;
		}

	});

}

function qieFengPb(dbid) {
	if(!_drawSelector) {
		alert("切分插件还未加载完成，请稍后！");
	}

	_viewer.select([dbid]);
	focusPb([dbid]);

	_drawSelector.enterDrawlineMode(_viewer)
}

function customViewerCfg() {

	if(_selectionmode == "FIRST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.FIRST_OBJECT);
	} else if(_selectionmode == "LAST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
	}

	//
	transViewCustom();
	setTimeout(function() {
		_viewer.autocam.setCurrentViewAsHome();
	}, 1000);

	//custom background color-----[pgb]
	_viewer.setBackgroundColor(48, 153, 225, 255, 255, 255);
	//_viewer.setBackgroundColor(60, 141, 188, 255,255, 255);

	// _viewer.registerContextMenuCallback('menuDeleteSelectItem', (menu, status) => {
	// 	let selectdbids = _viewer.getSelection();
	// 	if(status.hasSelected) {
	// 		console.log(status)
	// 		menu.push({
	// 			title: '移除选中构件',
	// 			target: () => {
	// 				selectdbids.forEach(dbid => {
	// 					if(_selectDbids[dbid]) {
	// 						let index = getIndexByDbid(dbid);
	// 						if(index != -1) {
	// 							deletepbfromList(index);
	// 						}

	// 					}
	// 				});

	// 			}
	// 		});
	// 	}
	// });
}

function getIndexByDbid(dbid) {

	let index = -1;
	for(var each in _app.tableData) {
		if(_app.tableData[each].dbid == dbid) {
			index = each;
			break;
		}
	}

	return index;
}



function deletepbfromList(index) {
	_viewer.setThemingColor(_app.tableData[index].dbid, null);
	setChildThemingColor(_app.tableData[index].dbid, null);
	delete _selectDbids[_app.tableData[index].dbid];

	if(_extdata.groups) {
		if(_beGroupMapDataLoad) {
			var groupdbids = _group2dbidmaps[_app.tableData[index].id];
			if(groupdbids) {
				groupdbids.forEach(dbid => {
					_viewer.setThemingColor(dbid, null);
					setChildThemingColor(dbid, null);
					delete _selectDbids[dbid];
				})

			}
		}
	}

	_app.tableData.splice(index, 1);
	getpbstatuslist();
	updatePbtypesSet();
}

function deleteAllpbfromList() {

	for(dbid in _selectDbids) {
		_viewer.setThemingColor(parseInt(dbid), null);
		setChildThemingColor(parseInt(dbid), null);
	}

	if(_extdata.groups) {
		if(_beGroupMapDataLoad) {
			_app.tableData.forEach(data=>{
				var groupdbids = _group2dbidmaps[data.id];
				if(groupdbids) {
					groupdbids.forEach(dbid => {
						_viewer.setThemingColor(dbid, null);
						setChildThemingColor(dbid, null);
					})

				}
			})
		}
	}

	_selectDbids = {};
	_app.tableData = [];
	getpbstatuslist();
	updatePbtypesSet();
}

function updatePbtypesSet() {
	if(_app.tableData.length == 0) {
		_selectPbtypes.clear();
	}

}

function focusPb(dbids) {
	_viewer.isolate(dbids);
	//	_viewer.fitToView(dbids);
}

function onSelectedCallback2(event) {
	// display a message if an element is selected
	var msg = "";
	if(event.dbIdArray.length > 0) {
		_selectedId = event.dbIdArray[0];
		console.log(_selectedId);
		_viewer.fitToView([_selectedId]);
		_app.nowdbid = _selectedId;
	} else {
		_selectedId = null;
		_viewer.fitToView();
	}
	


}


function getpbstatuslist() {
	console.log('获取getpbstatuslist-----2');
	return ;
	$.ajax({
		type: "get",
		url: "/task/modelview/getpbstatuslist/",
		cache: false,
		dataType: "json",
		data: {
			"_selElevations": _selElevations,
			"_selPbtypes": _selPbtypes,
			"_curUnitId": _curUnitId,
			"_selZones": _selZones,
			"_curMajor": _curMajor,
			"_isWholeModel": _isWholeModel,
		},
		success: function(data) {
			if(data.issuc = "true") {
				setPbStatus(data);
			}
		}
	});
}

function changepage2Page() {

}

function setContextMenu() {
	console.log(33333);
    Autodesk.ADN.Viewing.Extension.AdnContextMenu = function(viewer) {
        Autodesk.Viewing.Extensions.ViewerObjectContextMenu.call(this, viewer);
    };

    Autodesk.ADN.Viewing.Extension.AdnContextMenu.prototype =
        Object.create(Autodesk.Viewing.Extensions.ViewerObjectContextMenu.prototype);

    Autodesk.ADN.Viewing.Extension.AdnContextMenu.prototype.constructor =
        Autodesk.ADN.Viewing.Extension.AdnContextMenu;

    Autodesk.ADN.Viewing.Extension.AdnContextMenu.prototype.buildMenu =

        function(event, status) {

            var menu = Autodesk.Viewing.Extensions.ViewerObjectContextMenu.prototype.buildMenu.call(
                this, event, status);

            if(_selectedId) {
                menu.push({
                    title: "录入进度",
                    target: function() {
                    	_app.addjindu = true;
                    }
                });
                menu.push({
                    title: "设计变更",
                    target: function() {
                       _app.adddesign = true;
                    }
                });
                menu.push({
                    title: "专家处治",
                    target: function() {
                       _app.formAddPro = true;
                    }
                });
                menu.push({
                    title: "上传现场资料",
                    target: function() {
                       _app.addfile = true;
                    }
                });
            }
            return menu;
        };

    _viewer.setContextMenu(new Autodesk.ADN.Viewing.Extension.AdnContextMenu(_viewer));

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

function firstmodelcolor(){
    $.ajax({
        url:'/model/filterPbByCountType/',
        type:'get',
        dataType:'json',
        traditional: true,
        data:{
            project_id:localStorage.projectId,
            counttype:'erchenshendu',
        },
        success:function(res){
            let arr = [];
            res.pblist.forEach(val=>{
                arr.push(val.lvmdbid);
                _viewer.setThemingColor(val.lvmdbid, getColorByStr(val.color));
            });
             _app.colorlist = res.colorlist;
            _viewer.isolate(arr);
        }
    })
}

