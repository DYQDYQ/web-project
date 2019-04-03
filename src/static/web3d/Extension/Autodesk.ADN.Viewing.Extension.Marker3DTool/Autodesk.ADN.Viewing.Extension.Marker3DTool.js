///////////////////////////////////////////////////////////////////
// Simple Custom Tool viewer extension
// by Philippe Leefsma, March 2015
//
///////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.Marker3DTool =

    function (viewer, options) {

    Autodesk.Viewing.Extension.call(this, viewer, options);

    var _self = this;
    var _btnDownEvent = null;
	var _btnMoveEventLast = null;
	
    _self.tool = null;

    function AdnTool(viewer, toolName) {

        this.getNames = function() {

            return [toolName];
        };

        this.getName = function() {

            return toolName;
        };

        this.activate = function(name) {

            console.log('-------------------');
            console.log('Tool:activate(name)');
            console.log(name);
        };

        this.deactivate = function(name) {

            console.log('-------------------');
            console.log('Tool:deactivate(name)');
            console.log(name);
        };

        this.update = function(t) {

            //console.log('-------------------');
            //console.log('Tool:update(t)');
            //console.log(t);

            return false;
        };

        this.handleSingleClick = function(event, button) {

            console.log('-------------------');
            console.log('Tool:handleSingleClick(event, button)');
            console.log(event);
            console.log(button);

            return false;
        };

        this.handleDoubleClick = function(event, button) {

            console.log('-------------------');
            console.log('Tool:handleDoubleClick(event, button)');
            console.log(event);
            console.log(button);

            return false;
        };


        this.handleSingleTap = function(event) {

            console.log('-------------------');
            console.log('Tool:handleSingleTap(event)');
            console.log(event);

            return false;
        };


        this.handleDoubleTap = function(event) {

//          console.log('-------------------');
//          console.log('Tool:handleDoubleTap(event)');
//          console.log(event);

            return false;
        };


        this.handleKeyDown = function(event, keyCode) {

//          console.log('-------------------');
//          console.log('Tool:handleKeyDown(event, keyCode)');
//          console.log(event);
//          console.log(keyCode);

            return false;
        };

        this.handleKeyUp = function(event, keyCode) {

//          console.log('-------------------');
//          console.log('Tool:handleKeyUp(event, keyCode)');
//          console.log(event);
//          console.log(keyCode);

            return false;
        };


        this.handleWheelInput = function(delta) {

//          console.log('-------------------');
//          console.log('Tool:handleWheelInput(delta)');
//          console.log(delta);

            return false;
        };

        this.handleButtonDown = function(event, button) {

//          console.log('-------------------');
//          console.log('Tool:handleButtonDown(event, button)');
//          console.log(event);
//          console.log(button);
			console.log(_viewer.clientToWorld(event.clientX,event.clientY));
			_btnDownEvent = event;
			
			const intersectObjects = (function() {
            	const pointerVector = new THREE.Vector3();
            	const pointerDir = new THREE.Vector3();
            	const ray = new THREE.Raycaster();
            	const camera = _viewer.impl.camera;
            	
            	return function(pointer,objects,recursive){
            		const rect = _viewer.impl.canvas.getBoundingClientRect();
            		const x = ((pointer.clientX - rect.left) / rect.width)*2-1;
            		const y = -((pointer.clientY - rect.top) / rect.height )*2+1;
            		
            		if(camera.isPerspective){
            			pointerVector.set(x,y,0.5);
            			pointerVector.unproject(camera);
            			ray.set( camera.position, pointerVector.sub(camera.position).normalize());
            		}else{
            			pointerVector.set(x,y,-1);
            			pointerVector.unproject(camera);
            			pointerDir.set(0,0,-1);
            			ray.set( pointerVector, pointerDir.transformDirection(camera.matrixWorld));
            		}
            		
            		const intersections = ray.intersectObjects(objects,recursive);
            		return  intersections[0]?intersections[0]:null;
            	};
            	
            })();
            
            const pointer = event.pointers?event.pointers[0]:event;
            const result = intersectObjects(pointer,_viewer.impl.scene.children)
            
            if(result && result.object){
				
				playVideo(result.object.relate.address);
				
				return true;
            }
			
			
            return false;
        };

        this.handleButtonUp = function(event, button) {

//          console.log('-------------------');
//          console.log('Tool:handleButtonUp(event, button)');
//          console.log(event);
//          console.log(button);
			_btnDownEvent = null;
//			var cam  = _viewer.getCamera();
//			console.log(cam.matrix.elements[10]);
//			if(cam.matrix.elements[10]<=0||cam.matrix.elements[10]>=0.707){
//				return true;
//			}

            return false;
        };

        this.handleMouseMove = function(event) {

            //console.log('-------------------');
            //console.log('Tool:handleMouseMove(event)');
            //console.log(event);
           // const _viewer = this.viewer;
            const intersectObjects = (function() {
            	const pointerVector = new THREE.Vector3();
            	const pointerDir = new THREE.Vector3();
            	const ray = new THREE.Raycaster();
            	const camera = _viewer.impl.camera;
            	
            	return function(pointer,objects,recursive){
            		const rect = _viewer.impl.canvas.getBoundingClientRect();
            		const x = ((pointer.clientX - rect.left) / rect.width)*2-1;
            		const y = -((pointer.clientY - rect.top) / rect.height )*2+1;
            		
            		if(camera.isPerspective){
            			pointerVector.set(x,y,0.5);
            			pointerVector.unproject(camera);
            			ray.set( camera.position, pointerVector.sub(camera.position).normalize());
            		}else{
            			pointerVector.set(x,y,-1);
            			pointerVector.unproject(camera);
            			pointerDir.set(0,0,-1);
            			ray.set( pointerVector, pointerDir.transformDirection(camera.matrixWorld));
            		}
            		
            		const intersections = ray.intersectObjects(objects,recursive);
            		return  intersections[0]?intersections[0]:null;
            	};
            	
            })();
            
            const pointer = event.pointers?event.pointers[0]:event;
            const result = intersectObjects(pointer,_viewer.impl.scene.children)
            
            var bili = 0.4;
            var bililg = 0.43;
            if(result && result.object){
            	result.object.scale.set(bililg, bililg, bililg);
            	_viewer.impl.invalidate(false,true,true);
            	$("#toolTip").css("display","block");
            	$("#toolTip").css("left",event.clientX+20);
            	$("#toolTip").css("top",event.clientY-20);
            	$("#toolTip").html(result.object.relate.name);
            	
            }else{
            	for(var each in _markers) {
            		if(_markers[each].scale.x==bililg){
            			_markers[each].scale.set(bili, bili, bili);
            			//_viewer.impl.invalidate(true);
            			_viewer.impl.invalidate(true,false,false);
            		}
				}
            	$("#toolTip").css("display","none");
            }
			

            return false;
        };

        this.handleGesture = function(event) {

            console.log('-------------------');
            console.log('Tool:handleGesture(event)');
            console.log(event);

            return false;
        };

        this.handleBlur = function(event) {

            console.log('-------------------');
            console.log('Tool:handleBlur(event)');
            console.log(event);

            return false;
        };

        this.handleResize = function() {

            console.log('-------------------');
            console.log('Tool:handleResize()');
        };
    }

    var toolName = "Autodesk.ADN.Viewing.Tool.Marker3DTool";

    _self.load = function () {

        _self.tool = new AdnTool(viewer, toolName);

        viewer.toolController.registerTool(_self.tool);

        viewer.toolController.activateTool(toolName);

        console.log('Autodesk.ADN.Viewing.Extension.Marker3DTool loaded');
        return true;
    };

    _self.unload = function () {

        viewer.toolController.deactivateTool(toolName);

        console.log('Autodesk.ADN.Viewing.Extension.Marker3DTool unloaded');
        return true;
    };
};

Autodesk.ADN.Viewing.Extension.Marker3DTool.prototype =
    Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.Marker3DTool.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.Marker3DTool;

Autodesk.Viewing.theExtensionManager.registerExtension(
    'Autodesk.ADN.Viewing.Extension.Marker3DTool',
    Autodesk.ADN.Viewing.Extension.Marker3DTool);

