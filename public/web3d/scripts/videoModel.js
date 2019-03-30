// LoadModel.js
var _viewer = null; // the viewer
var _modelId = null;
var _extdata = {}
var _videoList = [];
var _markers = []

function loadVideoModel() {

	$.ajax({
		type: "get",
		url: " /monitormanager/monitormodelfile/",
		cache: false,
		dataType: "json",
		data: {
			'funtype': '视频监控'
		},
		success: function(data) {
			if(data.results.length > 0) {
				var model = data.results[0];
				_modelId = model.id;
				_curUnitId = model.relatedunitproject;
				_curMajor = model.relatedmajor;
				_selectionmode = model.selectionmode;
				_homeview = eval(model.homeviewObj);
				_extdata = eval(model.extdataObj);

				var options = {};
				options.env = "Local"; // AutodeskProduction, AutodeskStaging, or AutodeskDevelopment (set in global var in this project)
				options.document = "http://" + window.location.host + model.modelfile;
				if(_extdata.saveInOss) {
					options.document = model.modelfile;
				}

				Autodesk.Viewing.Initializer(options, function() {
					loadDocument(options.document); // load first entry by default
				});
			} else {
				alert("没有模型！");
			}

			LoadAllCustomTrees();
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
		getVideoList();
		_viewer.loadExtension('Autodesk.ADN.Viewing.Extension.Marker3DTool');
	});

	_viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onSelectedCallback);

	_viewer.setGhosting(true);

	//注意，这里添加自定义模型的时候，必须加上场景光照，否则模型会看起黑黑的
	var light = new THREE.AmbientLight(0xffffff);
	_viewer.impl.scene.add(light);
}

function onSelectedCallback(event) {

	if(event.dbIdArray.length > 0) {
		console.log(event.dbIdArray);
		var video = getVideoNode(event.dbIdArray[0]);
		if(video) {
			playVideo(video);
		}

	} else {

	}

}

function getVideoList() {

	$.ajax({
		type: "get",
		url: "/monitormanager/videoarea/",
		cache: false,
		dataType: "json",
		data: {
			"belongmodel": _modelId,
		},
		success: function(data) {
			for(var each in data.results) {
				for(var video in data.results[each].areavideos) {
					_videoList.push(data.results[each].areavideos[video]);
					//AddMarker(data.results[each].areavideos[video].lmvdbid, "red", data.results[each].areavideos[video].address)
					AddMarker3D([data.results[each].areavideos[video].lmvdbid], _extdata.pianyi, _extdata.scale, data.results[each].areavideos[video]);
				}
			}
			_viewer.impl.sceneUpdated(true);
		}
	});

}

function isVideoNode(dbid) {
	var isVideo = false;
	for(var each in _videoList) {
		if(_videoList[each].lmvdbid == dbid) {
			isVideo = true;
			break;
		}
	}

	return isVideo;
}

function getVideoNode(dbid) {
	var node = null;
	for(var each in _videoList) {
		if(_videoList[each].lmvdbid == dbid) {
			node = _videoList[each];
			break;
		}
	}

	return node;
}

function transViewCustom(viewerpoint) {
	if(viewerpoint.length >= 3) {
		//var newCamPos = new THREE.Vector3(-149715.3552195181,-119243.66328031197,34681.408770079055);
		var newCamPos = new THREE.Vector3(viewerpoint[0], viewerpoint[1], viewerpoint[2]);

		var target = new THREE.Vector3(0, 0, 0);
		var cam = _viewer.navigation.getCamera();
		_viewer.navigation.setRequestTransition(true, newCamPos, target, cam.fov);
	}
}

var _modeindex = 0;

function customViewer() {

	if(_selectionmode == "FIRST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.FIRST_OBJECT);
	} else if(_selectionmode == "LAST_OBJECT") {
		_viewer.setSelectionMode(Autodesk.Viewing.SelectionMode.LAST_OBJECT);
	}

	//
	transViewCustom(_homeview);
	setTimeout(function() {
		_viewer.autocam.setCurrentViewAsHome();
	}, 1000);

	//custom background color-----[pgb]
	_viewer.setBackgroundColor(48, 153, 225, 255, 255, 255);
	//_viewer.setBackgroundColor(60, 141, 188, 255,255, 255);

}

var _curPlayVideo = null;
function playVideo(video) {

	if(_curPlayVideo == video) {
		return;
	}
	_curPlayVideo = video;

	$(".coverMask").remove();

	if(video.isptz) {
		var player = `
		<div class="coverMask">
			<video id="myPlayer" poster="/img/loading.gif" controls playsInline webkit-playsinline autoplay>
				<source src="` + video.address.split(',')[0] + `" type="" />
				<source src="` + video.address.split(',')[1] + `" type="application/x-mpegURL" />
			</video>
			<div class="coverClose" title="退出播放"></div>
			<div class="videoOperator">
				<canvas id="joystick" width="150" height="150" style="position: absolute;right: 5px;bottom: 35px;z-index: 200;"></canvas>
				<button id="videoZoomIn" type="button" class="btn btn-default" style="position: absolute;right: 15px;bottom: 185px;z-index: 200;">缩小</button>
				<button id="videoZoomOut" type="button" class="btn btn-default" style="position: absolute;right: 100px;bottom: 185px;z-index: 200;">放大</button>
			</div>
		</div>
		`;

	} else {
		var player = `
		<div class="coverMask">
			<video id="myPlayer" poster="/img/loading.gif" controls playsInline webkit-playsinline autoplay>
				<source src="` + video.address.split(',')[0] + `" type="" />
				<source src="` + video.address.split(',')[1] + `" type="application/x-mpegURL" />
			</video>
			<div class="coverClose" title="退出播放"></div>
		</div>
		`;

	}

	$(".content_section").append(player);

	$(".coverClose").on("click", function() {
		$(".coverMask").remove();
		_curPlayVideo = null;
	});

	var player = new EZUIPlayer('myPlayer');
	if(video.isptz) {
		yaogan(null, touchendCallBack,touchmoveCallBack );
	}

	$("#videoZoomOut").bind('mousedown', function() {
		console.log("mousedown");
		videoPtzCtrl(video.id, 8, 'start');
	});

	$("#videoZoomOut").bind('mouseup', function() {
		console.log("mouseup");
		videoPtzCtrl(video.id, 8, 'stop');
	});

	$("#videoZoomIn").bind('mousedown', function() {
		console.log("mousedown");
		videoPtzCtrl(video.id, 9, 'start');
	});

	$("#videoZoomIn").bind('mouseup', function() {
		console.log("mouseup");
		videoPtzCtrl(video.id, 9, 'stop');
	});

}

var _lastDirection = -1;
function touchendCallBack() {
	videoPtzCtrl(_curPlayVideo.id, _lastDirection, 'stop');
	_lastDirection = -1
}

function touchmoveCallBack(direction) {
	if(direction==''){
		return;
	}
	
	var direction2 = -1;
	switch(direction) {
		case "up":
			direction2 = 0;
			break;
		case "bottom":
			direction2 = 1;
			break;
		case "left":
			direction2 = 2;
			break;
		case "right":
			direction2 = 3;
			break;
	}
	
	if(_lastDirection==direction2){
		return;
	}
	_lastDirection = direction2;
	
	if(_lastDirection!=-1){
		videoPtzCtrl(_curPlayVideo.id, _lastDirection, 'start');
	}
	
}

//操作命令：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下，8-放大，9-缩小，10-近焦距，11-远焦距
function videoPtzCtrl(videoid, direction, oprType) {
	$.ajax({
		type: "post",
		url: "/monitormanager/video_ptzctrl/",
		cache: false,
		dataType: "json",
		data: {
			"videoid": videoid,
			"direction": direction,
			"oprType": oprType,
		},
		success: function(data) {
			if(data.res) {

			} else {
				alert(data.error);
			}

		},
		error: function(e) {
			if(e.status == 403) {
				alert("没有权限！");
			}
		}
	});
}

function AddMarker3D(dbIds, pianyi, scale, relateObj) {

	var jsonloader = new THREE.JSONLoader();
	jsonloader.load("/js/web3d/assets/models/an.svf", function(geometry, materials) {

		var marker3D = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
		marker3D.name = newGuid();
		marker3D.relate = relateObj;

		var FragmentIds = getFragmentIdByDbIds(dbIds);
		var nodeBoundingBox = getWorldBoundingBox(FragmentIds);
		var center = nodeBoundingBox.center();

		marker3D.position.x = center.x;
		marker3D.position.y = center.y + 4.7;
		marker3D.position.z = nodeBoundingBox.max.z + pianyi; //Z轴偏移，根据实际展示效果调整
		//marker3D.rotation.x = 0.5 * Math.PI; //3d标识旋转，根据实际展示效果调整

		marker3D.scale.set(scale, scale, scale); //3d标识缩放，根据实际展示效果调整

		_viewer.impl.scene.add(marker3D);

		_markers.push(marker3D);

	}, '/js/web3d/assets/models/');
}

function newGuid() {
	var d = new Date().getTime();
	var guid = 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return(c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return guid;
};

//获取节点fragIds，对应的包围盒
function getWorldBoundingBox(fragIds) {
	var fragbBox = new THREE.Box3();
	var nodebBox = new THREE.Box3();

	fragList = _viewer.model.getFragmentList();
	fragIds.forEach(function(fragId) {
		fragList.getWorldBounds(fragId, fragbBox);
		nodebBox.union(fragbBox);
	});

	return nodebBox;
}

//通过节点的dbids获取节点fragIds
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

//通过节点的dbids获取节点包围盒中心点（3d），映射的二维平面坐标
function getClientPosition(dbIds) {

	var FragmentIds = getFragmentIdByDbIds(dbIds);
	var nodeBoundingBox = getWorldBoundingBox(FragmentIds);

	var center = nodeBoundingBox.center();

	var clientPos = _viewer.worldToClient(center);

	return clientPos;
}