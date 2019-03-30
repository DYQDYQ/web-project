///////////////////////////////////////////////////////////////////
// Simple Custom Tool viewer extension
// by Philippe Leefsma, March 2015
//
///////////////////////////////////////////////////////////////////



var _CROSS_MAX_WIDTH = 20;
class SelectionWindowTool{

	constructor(viewer) {

		this.onResize = this.onResize.bind(this)

		this.selectSet = new SelectSet(viewer)

		this.partialSelect = true
		this.materialLine = null
		this.isDragging = false
		this.crossGeomX = null
		this.crossGeomY = null
		this.isActive = false
		this.rectGroup = null
		this.lineGeom = null
		this.viewer = viewer
		this.selectDbCallBack=null
	}

	getNames() {

		return ["SelectionWindowTool"];
	};

	getName() {

		return "SelectionWindowTool";
	};

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	onResize() {

		const overlay =
			this.viewer.impl.overlayScenes[
				'selectionWindowOverlay']

		if(overlay) {

			const canvas = this.viewer.canvas

			const camera = new THREE.OrthographicCamera(
				0, canvas.clientWidth,
				0, canvas.clientHeight,
				1, 1000)

			overlay.camera = camera
		}

		this.rectGroup = null
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	setModel(model) {

		if(this.isActive) {

			this.model = model

			this.selectSet.setModel(model)
		}
	}
	
	setSelCallBack(selCallBack) {
		this.selectDbCallBack = selCallBack
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	setPartialSelect(partialSelect) {

		this.partialSelect = partialSelect
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	activate() {

		//if(!this.isActive)
		{

			this.viewer.clearSelection()

			this.model =
				this.viewer.activeModel ||
				this.viewer.model

			this.selectSet.setModel(this.model)

			this.materialLine = new THREE.LineBasicMaterial({
				color: new THREE.Color(0x0000FF),
				linewidth: 0.5,
				opacity: .6
			})

			this.mouseStart = new THREE.Vector3(0, 0, -10)

			this.mouseEnd = new THREE.Vector3(0, 0, -10)

			const canvas = this.viewer.canvas

			const camera = new THREE.OrthographicCamera(
				0, canvas.clientWidth,
				0, canvas.clientHeight,
				1, 1000)

			this.viewer.impl.createOverlayScene(
				'selectionWindowOverlay',
				this.materialLine,
				this.materialLine,
				camera)

			this.viewer.impl.api.addEventListener(
				Autodesk.Viewing.VIEWER_RESIZE_EVENT,
				this.onResize)

			//this.isActive = true

	
		}
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	deactivate() {

		//if(this.isActive) 
		{

			this.viewer.impl.removeOverlayScene(
				'selectionWindowOverlay')

			this.mouseStart.set(0, 0, -10)
			this.mouseEnd.set(0, 0, -10)

			this.isDragging = false
			this.isActive = false
			this.rectGroup = null

			this.viewer.impl.api.removeEventListener(
				Autodesk.Viewing.VIEWER_RESIZE_EVENT,
				this.onResize)

			this.viewer.toolController.deactivateTool(
				this.getName())

			//this.emit('deactivate')
		}
	}

	clearData(){
		
			this.viewer.impl.removeOverlay(
				"selectionWindowOverlay",
				this.rectGroup)
					
			this.mouseStart.set(0, 0, -10)
			this.mouseEnd.set(0, 0, -10)

			this.isDragging = false
			this.isActive = false
			this.rectGroup = null
			

	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
//	handleGesture(event) {
//
//		return true
//	}
//
//	handleSingleClick(event, button) {
//
//		return true
//	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	handleButtonDown(event, button) {

		//left button down
		if(button === 0&&this.isActive) {

			this.startDrag(event)
			return true
		}
		
//		if(button === 0){
//			var result = this.viewer.impl.hitTest(event.canvasX, event.canvasY, false);
//			console.log(result)
//			if(result){
//				var dbids=[];
//				dbids.push(result.dbId);
//				this.selectDbids(dbids);
//			}
//		}

		return false
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	handleMouseMove(event) {

		if(this.lineGeom && this.isDragging&&this.isActive) {

			this.pointerEnd = event.pointers ?
				event.pointers[0] :
				event

			this.mouseEnd.x = event.canvasX
			this.mouseEnd.y = event.canvasY

			return true
		}

		return false
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	handleButtonUp(event, button) {

		if(button === 0&&this.isActive) {

			this.endDrag()
			return true
		}

		return false
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	handleKeyDown(event, keyCode) {
		console.log(keyCode)
		if(keyCode === 27) {

			this.deactivate()
		}

		if(keyCode === 16) {
			//console.log("handleKeyDown")
			this.isActive=true;
			return true
		}

		return false
	}


	handleKeyUp(event, keyCode) {

		if(keyCode === 16) {
			//console.log("handleKeyUp")
			this.clearData();
			return true
		}

		return false
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	startDrag(event) {

		if(this.isDragging === false) {

			this.pointerStart = event.pointers ?
				event.pointers[0] :
				event

			// begin dragging
			this.isDragging = true

			this.mouseStart.x = event.canvasX
			this.mouseStart.y = event.canvasY

			this.mouseEnd.x = event.canvasX
			this.mouseEnd.y = event.canvasY

			if(this.rectGroup === null) {

				this.lineGeom = new THREE.Geometry()

				// rectangle of zoom window
				this.lineGeom.vertices.push(
					this.mouseStart.clone(),
					this.mouseStart.clone(),
					this.mouseStart.clone(),
					this.mouseStart.clone(),
					this.mouseStart.clone())

				// cross for identify zoom window center.
				this.crossGeomX = new THREE.Geometry()

				this.crossGeomX.vertices.push(
					this.mouseStart.clone(),
					this.mouseStart.clone())

				this.crossGeomY = new THREE.Geometry()

				this.crossGeomY.vertices.push(
					this.mouseStart.clone(),
					this.mouseStart.clone())

				// add geom to group
				const line_mesh = new THREE.Line(
					this.lineGeom,
					this.materialLine,
					THREE.LineStrip)

				const line_cross_x = new THREE.Line(
					this.crossGeomX,
					this.materialLine,
					THREE.LineStrip)

				const line_cross_y = new THREE.Line(
					this.crossGeomY,
					this.materialLine,
					THREE.LineStrip)

				this.rectGroup = new THREE.Group()

				this.rectGroup.add(line_mesh)
				this.rectGroup.add(line_cross_x)
				this.rectGroup.add(line_cross_y)

			} else {

				this.lineGeom.vertices[0] = this.mouseStart.clone()
				this.lineGeom.vertices[1] = this.mouseStart.clone()
				this.lineGeom.vertices[2] = this.mouseStart.clone()
				this.lineGeom.vertices[3] = this.mouseStart.clone()
				this.lineGeom.vertices[4] = this.mouseStart.clone()

				this.crossGeomX.vertices[0] = this.mouseStart.clone()
				this.crossGeomX.vertices[1] = this.mouseStart.clone()
				this.crossGeomY.vertices[0] = this.mouseStart.clone()
				this.crossGeomY.vertices[1] = this.mouseStart.clone()

				this.crossGeomX.verticesNeedUpdate = true
				this.crossGeomY.verticesNeedUpdate = true
				this.lineGeom.verticesNeedUpdate = true
			}

			this.viewer.impl.addOverlay(
				"selectionWindowOverlay",
				this.rectGroup)
		}
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	endDrag() {

		if(this.isDragging === true) {
			this.select();
			this.viewer.impl.removeOverlay(
				"selectionWindowOverlay",
				this.rectGroup)

			this.isDragging = false;
			
			
		}
	}

	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	update() {

		if(!this.isActive)
			return;

		if(this.lineGeom && this.isDragging) {

			// draw rectangle
			this.lineGeom.vertices[1].x = this.mouseStart.x
			this.lineGeom.vertices[1].y = this.mouseEnd.y
			this.lineGeom.vertices[2] = this.mouseEnd.clone()
			this.lineGeom.vertices[3].x = this.mouseEnd.x
			this.lineGeom.vertices[3].y = this.mouseStart.y
			this.lineGeom.vertices[4] = this.lineGeom.vertices[0]

			// draw cross
			var width = Math.abs(this.mouseEnd.x - this.mouseStart.x);
			var height = Math.abs(this.mouseEnd.y - this.mouseStart.y);
			var length = width > height ? height : width;

			if(length > _CROSS_MAX_WIDTH) {
				length = _CROSS_MAX_WIDTH;
			}

			var half_length = length * 0.5;

			var cross_center = [
				(this.mouseEnd.x + this.mouseStart.x) * 0.5,
				(this.mouseEnd.y + this.mouseStart.y) * 0.5
			]

			this.crossGeomX.vertices[0].x = cross_center[0] - half_length
			this.crossGeomX.vertices[0].y = cross_center[1]
			this.crossGeomX.vertices[1].x = cross_center[0] + half_length
			this.crossGeomX.vertices[1].y = cross_center[1]

			this.crossGeomY.vertices[0].x = cross_center[0]
			this.crossGeomY.vertices[0].y = cross_center[1] - half_length
			this.crossGeomY.vertices[1].x = cross_center[0]
			this.crossGeomY.vertices[1].y = cross_center[1] + half_length

			this.crossGeomX.verticesNeedUpdate = true
			this.crossGeomY.verticesNeedUpdate = true
			this.lineGeom.verticesNeedUpdate = true

			// only redraw overlay
			this.viewer.impl.invalidate(false, false, true)

		} else {

			//return this.select()
		}

		return false
	}

	selectDbids(dbids){
		
//     if(this.selectDbCallBack){
//     		this.selectDbCallBack(Dbids);
//     }
       
      this.viewer.select(dbids)
	}
	/////////////////////////////////////////////////////////
	//
	//
	/////////////////////////////////////////////////////////
	select() {

		const rectMinX = this.mouseStart.x
		const rectMinY = this.mouseStart.y

		const rectMaxX = this.mouseEnd.x
		const rectMaxY = this.mouseEnd.y

		const rectHeight = Math.abs(rectMaxY - rectMinY)
		const rectWidth = Math.abs(rectMaxX - rectMinX)

		if(rectWidth === 0 || rectHeight === 0) {

			return false
		}

		const dbIds = this.selectSet.compute(
			this.pointerStart,
			this.pointerEnd,
			this.partialSelect)

//		this.emit('selection', {
//			model: this.model,
//			guid: this.guid(),
//			dbIds
//		})


		this.selectDbids(dbIds)

		//this.deactivate()

		return true
	}
}






AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.SelectionWindowExtension = function(viewer, options) {

	Autodesk.Viewing.Extension.call(this, viewer, options);
	
	var selectionWindowTool=null;
	
	/////////////////////////////////////////////////////////////////
	// Extension load callback
	//
	/////////////////////////////////////////////////////////////////
	this.load = function() {

		selectionWindowTool = new SelectionWindowTool(viewer)

		viewer.toolController.registerTool(selectionWindowTool);

		viewer.toolController.activateTool(selectionWindowTool.getName());

		console.log('Autodesk.ADN.Viewing.Extension.SelectionWindow loaded');
		return true;
	}

	Autodesk.Viewing.Viewer3D.prototype.selectionWindowSetModel = function (model) {

		selectionWindowTool.setModel(model)
	}

	Autodesk.Viewing.Viewer3D.prototype.selectionWindowSetPartialSelect = function (partialSelect) {

		selectionWindowTool.setPartialSelect(partialSelect)
	}

	Autodesk.Viewing.Viewer3D.prototype.selectionWindowStartSelection = function () {
		viewer.toolController.activateTool(selectionWindowTool.getName())
	}
	
	Autodesk.Viewing.Viewer3D.prototype.selectionWindowSelCallBack = function (selCallBack) {
		selectionWindowTool.setSelCallBack(selCallBack);
	}
	/////////////////////////////////////////////////////////////////
	//  Extension unload callback
	//
	/////////////////////////////////////////////////////////////////
	this.unload = function() {

		//selectionWindowTool.off();
		viewer.toolController.deactivateTool(selectionWindowTool.getName());

		console.log('Autodesk.ADN.Viewing.Extension.SampleTaskStatus unloaded');

		return true;
	}



};

Autodesk.ADN.Viewing.Extension.SelectionWindowExtension.prototype =
	Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.SelectionWindowExtension.prototype.constructor =
	Autodesk.ADN.Viewing.Extension.SelectionWindowExtension;

Autodesk.Viewing.theExtensionManager.registerExtension(
	'Viewing.Extension.SelectionWindow',
	Autodesk.ADN.Viewing.Extension.SelectionWindowExtension);

