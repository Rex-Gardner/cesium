var viewer;
var measurementsPositions = new Array();
var measurementsLabel;

$(document).ready(function() {
	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzAyNmI0Ni05ZDVmLTQ0OTYtOTRhZi0zODdmMWI0NDM2OTQiLCJpZCI6NjMyMiwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NTk2MDE3M30.pHXUoqVflUOeFxzIwyyU6rwtk-1H8l96PHQI20Yfh7k';
	viewer = new Cesium.Viewer('cesiumContainer', {
		baseLayerPicker: false,
		navigationHelpButton: false,
		animation: false,
		timeline: false,
		fullscreenButton: false
	});

	viewer.terrainProvider = Cesium.createWorldTerrain({
		requestWaterMask : true,
		requestVertexNormals : true
	});
	
	var uniPos = Cesium.Cartesian3.fromDegrees(82.862639, 54.987112, 80);
    var hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(175), Cesium.Math.toRadians(90), Cesium.Math.toRadians(0));
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(uniPos, hpr);
	
	var university = viewer.entities.add({
        name : 'Университет',
        position : uniPos,
        orientation : orientation,
        model : {
            uri : 'sgugit.gltf',
			scale: 0.32
        },
		description: '<h3>СГУГиТ</h3><img src="img/sgugit.jpg" style="width: 400px; display: block; margin: 0 auto;">'
    });
	
	var boxes = viewer.entities.add(new Cesium.Entity());
	var lines = viewer.entities.add(new Cesium.Entity());
	var markers = viewer.entities.add(new Cesium.Entity());

	var firstHostel = viewer.entities.add({
		parent: boxes,
		name : 'Общежитие №1',
		corridor : {
			positions : Cesium.Cartesian3.fromDegreesArray([
															82.864670, 54.986884,
															82.864767, 54.986163
														]),
			height : 80.0,
			extrudedHeight : 110.0,
			width : 15.0,
			cornerType: Cesium.CornerType.BEVELED,
			material : Cesium.Color.BLUE.withAlpha(0.5),
			outline : true, // height or extrudedHeight must be set for outlines to display
			outlineColor : Cesium.Color.WHITE
		},
		description: '<h3>Здание общежития №1</h3><img src="img/hostel1.jpg" style="width: 400px; display: block; margin: 0 auto;">'
	});
	
	var secondHostel = viewer.entities.add({
		parent: boxes,
		name : 'Общежитие №2',
		corridor : {
			positions : Cesium.Cartesian3.fromDegreesArray([
															82.863876, 54.986462,
															82.863982, 54.985743
														]),
			height : 80.0,
			extrudedHeight : 110.0,
			width : 15.0,
			cornerType: Cesium.CornerType.BEVELED,
			material : Cesium.Color.BLUE.withAlpha(0.5),
			outline : true, // height or extrudedHeight must be set for outlines to display
			outlineColor : Cesium.Color.WHITE
		},
		description: '<h3>Здание общежития №2</h3><img src="img/hostel2.jpg" style="width: 400px; display: block; margin: 0 auto;">'
	});
	
	var secondCorp = viewer.entities.add({
		parent: boxes,
		name : 'Корпус №2',
		corridor : {
			positions : Cesium.Cartesian3.fromDegreesArray([
															82.865284, 54.987402,
															82.863726, 54.987327
														]),
			height : 80.0,
			extrudedHeight : 120.0,
			width : 20.0,
			cornerType: Cesium.CornerType.BEVELED,
			material : Cesium.Color.PURPLE.withAlpha(0.5),
			outline : true, // height or extrudedHeight must be set for outlines to display
			outlineColor : Cesium.Color.WHITE
		},
		description: '<h3>Здание общежития №2</h3><img src="img/labcorp.jpg" style="width: 400px; display: block; margin: 0 auto;">'
	});
	
	var plakhotnogoStreet = viewer.entities.add({
		parent: lines,
		name : 'Ул. Плахотного',
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights([82.884118, 54.986587, 105,
																   82.834623, 54.984217, 70]),
			width : 5,
			material : new Cesium.PolylineOutlineMaterialProperty({
				color : Cesium.Color.ORANGE,
				outlineWidth : 2,
				outlineColor : Cesium.Color.BLACK
			})
		}
	});
	
	var trollStreet = viewer.entities.add({
		parent: lines,
		name : 'Ул. Троллейная',
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights([82.843395, 54.960173, 70,
																   82.859681, 54.967738, 80,
																   82.860478, 54.968473, 80,
																   82.858856, 54.981721, 80,
																   82.858328, 54.985045, 80,
																   82.857135, 54.994233, 70]),
			width : 5,
			material : new Cesium.PolylineOutlineMaterialProperty({
				color : Cesium.Color.RED,
				outlineWidth : 2,
				outlineColor : Cesium.Color.BLACK
			})
		}
	});
	
	var titovaStreet = viewer.entities.add({
		parent: lines,
		name : 'Ул. Титова',
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights([82.817595, 54.979610, 65,
																   82.888882, 54.982829, 115]),
			width : 5,
			material : new Cesium.PolylineOutlineMaterialProperty({
				color : Cesium.Color.GREEN,
				outlineWidth : 2,
				outlineColor : Cesium.Color.BLACK
			})
		}
	});
	
	var pinBuilder = new Cesium.PinBuilder();
	
	var stanSquare = viewer.entities.add({
		parent: markers,
		name : 'Площадь Станиславского',
		position : Cesium.Cartesian3.fromDegrees(82.871759, 54.982065, 100),
		billboard : {
			image : pinBuilder.fromColor(Cesium.Color.SLATEBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
		}
	});
	
	var marksSquare = viewer.entities.add({
		parent: markers,
		name : 'Площадь Маркса',
		position : Cesium.Cartesian3.fromDegrees(82.895822, 54.982949, 115),
		billboard : {
			image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
		}
	});
	
	var trudSquare = viewer.entities.add({
		parent: markers,
		name : 'Площадь Труда',
		position : Cesium.Cartesian3.fromDegrees(82.869999, 54.994748, 85),
		billboard : {
			image : pinBuilder.fromColor(Cesium.Color.ROSYBROWN, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
		}
	});
	
	measurementsLabel = viewer.entities.add({
		position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
		label : {
			text: "",
			font : '20px sans-serif',
			pixelOffset : new Cesium.Cartesian2(0.0, 20)
		}
	});
	
	measurementsLine = viewer.entities.add({
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights(measurementsPositions),
			width : 3,
			material : new Cesium.PolylineDashMaterialProperty({
				color: Cesium.Color.YELLOW
			})
		}
	});
	
	viewer.canvas.addEventListener('click', function(e) {
		var radioValue = $("select option:selected").val();
		
		if(radioValue == "coordinate-picking") {
			determinePickedCoordinate(e);
			//determineCameraPosition();
		}
		else if(radioValue == "measurements") {
			calcMeasurements(e);
		}
		
		if(radioValue != "object-info") {
			viewer.selectedEntity = null;
		}
	}, false);
	
	[].forEach.call($("input[type=checkbox]"), function(el){
		el.addEventListener('click', function(e) {
			if ($(e.target).val() == "boxes")
			{
				boxes.show = !boxes.show;
			}
			else if ($(e.target).val() == "lines")
			{
				lines.show = !lines.show;
			}
			else if ($(e.target).val() == "markers")
			{
				markers.show = !markers.show;
			}
		}, false);
	});	
	
}); 

function toolsChanged() {
	clearMeasurements();
}

function determinePickedCoordinate(e) {
	var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);

	var ellipsoid = viewer.scene.globe.ellipsoid;
	var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
	
	if (cartesian) {
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
		var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);

		console.log(longitudeString + ', ' + latitudeString);
		alert('Long: ' + longitudeString + ', Lat: ' + latitudeString);
	} else {
		console.log('Globe was not picked');
	}
}

function determineCameraPosition() {
	var cartographic = viewer.scene.camera.positionCartographic;
	var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
	var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
	
	var positionStr = "position = new Cesium.Cartesian3.fromDegrees(" + longitudeString + ", " + latitudeString + ", 1000);";
	var orientationStr = "orientation = new Cesium.HeadingPitchRoll(" + viewer.scene.camera.heading + ", " + viewer.scene.camera.pitch + ", " + viewer.scene.camera.roll + ");";
	
	console.log(positionStr + '\n' + orientationStr);
}

function clearMeasurements() {
	measurementsPositions = new Array();
	measurementsLabel.position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
	measurementsLabel.label.text = "";
	measurementsLine.polyline.positions = Cesium.Cartesian3.fromDegreesArray(measurementsPositions);
}

function calcMeasurements(e) {
	var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);

	var ellipsoid = viewer.scene.globe.ellipsoid;
	var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
	
	if (cartesian) {
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
		var longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);

		measurementsPositions.push(longitude);
		measurementsPositions.push(latitude);
		var surfacePositions = Cesium.PolylinePipeline.generateArc({
			positions: Cesium.Cartesian3.fromDegreesArray(measurementsPositions)
		});
		
		var scratchCartesian3 = new Cesium.Cartesian3();
		var surfacePositionsLength = surfacePositions.length;
		var totalDistanceInMeters = 0;
		
		for (var i = 3; i < surfacePositionsLength; i += 3) {
			scratchCartesian3.x = surfacePositions[i] - surfacePositions[i - 3];
			scratchCartesian3.y = surfacePositions[i + 1] - surfacePositions[i - 2];
			scratchCartesian3.z = surfacePositions[i + 2] - surfacePositions[i - 1];
			totalDistanceInMeters += Cesium.Cartesian3.magnitude(scratchCartesian3);
		}
		
		console.log(totalDistanceInMeters);
		measurementsLabel.position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
		measurementsLabel.label.text = totalDistanceInMeters.toFixed(2) + " м";
		measurementsLine.polyline.positions = Cesium.Cartesian3.fromDegreesArray(measurementsPositions);
	} else {
		console.log('Globe was not picked');
	}
}

function setCameraPosition(positionIndex) {
	var position, orientation;
	
	switch (positionIndex) {
		case 0: {
			position = new Cesium.Cartesian3.fromDegrees(82.864774, 54.983982, 2500);
			orientation = new Cesium.HeadingPitchRoll(6.161093678140015, -1.4531743808448012, 6.279816148736945);
			break;
		}
		case 1: {
			position = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
			orientation = new Cesium.HeadingPitchRoll(0.12405363360777244, -0.5582823615183616, 0.0004517479565668836);
			break;
		}
		case 2: {
			position = new Cesium.Cartesian3.fromDegrees(-111.8138, 35.0864, 4000);
			orientation = new Cesium.HeadingPitchRoll(0.3175815143326677, -0.22758016389763047, 0.0010127112820255135);
			break;
		}
		default: {
			position = new Cesium.Cartesian3.fromDegrees(82.864774, 54.983982, 2500);
			orientation = new Cesium.HeadingPitchRoll(6.161093678140015, -1.4531743808448012, 6.279816148736945);
			break;
		}
	}
	
	var cameraView = {
		destination : position,
		orientation : {
			heading : orientation.heading,
			pitch : orientation.pitch,
			roll : orientation.roll
		}
	};

	viewer.scene.camera.setView(cameraView);
}

function measureDistance(e) {
	var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);

	var ellipsoid = viewer.scene.globe.ellipsoid;
	var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
	
	if (cartesian) {
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
		var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);

		console.log(longitudeString + ', ' + latitudeString);
	} else {
		console.log('Globe was not picked');
	}
}