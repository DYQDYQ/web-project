function initJsTree() {
	$("#jstree_div").jstree({
		"core": {
			'data': {
				'url': '/monitormanager/video_tree/?modelId=' + _modelId,
				'data': function(node) {
					return {
						'id': node.id
					};
				}
			}
		},
		"plugins": ["contextmenu","themes", "json_data"],
		"contextmenu" : {
            "items" : customRightClickTreeMenu  // callback function to fill out the items in the menu
         }
	});

	$("#jstree_div").on("ready.jstree", function() {

	});

	// event for when a node in the tree is selected
	$("#jstree_div").on("select_node.jstree", function(evt, data) {
		//console.debug(data.node.data);
		if(data.node.id.split('_')[0] == "video") {
			if(data.node.data) {
				//			          _viewer.select(int(data.node.data.dbid));
				//			          _viewer.fitToView();
				if(data.node.data.viewerpoint) {
					_viewer.restoreState(JSON.parse(data.node.data.viewerpoint));
				}
				playVideo(data.node.data);
//				s = _viewer.select(parseInt(data.node.data.dbid))
//				b = _viewer.utilities.getBoundingBox(false)
//				_viewer.navigation.fitBounds(false, b, true)
//				playVideo(data.node.data.address);
			}
		}

	});

}

function customRightClickTreeMenu(node) {
	if(node.id.split('_')[0] != "video") 
		return;
	
	let viewerpoint = JSON.stringify(_viewer.getState());

    var items = {
        "saveViewer" : {
            "label" : "保存相机视点",
            "action" : function (obj) {
				console.log(node);
				$.ajax({
					type: "post",
					url: "/monitormanager/updatevideo_viewerpoint/",
					cache: false,
					dataType: "json",
					data: {
						"video": node.id.split('_')[1],
						"viewerpoint": viewerpoint,
					},
					success: function(data) {
						if(data.res){
							node.data.viewerpoint=viewerpoint;
							alert("保存成功！");
						}else{
							alert(data.error);
						}
						
					},error: function(e){
						if(e.status==403){
							alert("没有权限修改相机视点！");
						}
					}
				});
            }
        },
   };
   return items;
}

function LoadAllCustomTrees() {

	// initialize the tree
	initJsTree();

}