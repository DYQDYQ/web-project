/**
 * ThreeBSP类用于计算Mesh的布尔运算。
 * 该类的代码来自 https://github.com/chandlerprall/ThreeCSG 。
 * 未修改。
 */
const ThreeBSP = (function() {
    var ThreeBSP,
        EPSILON = 1e-5,
        COPLANAR = 0,
        FRONT = 1,
        BACK = 2,
        SPANNING = 3;

    ThreeBSP = function(geometry) {
        // Convert THREE.Geometry to ThreeBSP
        var i, _length_i,
            face, vertex, faceVertexUvs, uvs,
            polygon,
            polygons = [],
            tree;

        if (geometry instanceof THREE.Geometry) {
            this.matrix = new THREE.Matrix4;
        } else if (geometry instanceof THREE.Mesh) {
            // #todo: add hierarchy support
            geometry.updateMatrix();
            this.matrix = geometry.matrix.clone();
            geometry = geometry.geometry;
        } else if (geometry instanceof ThreeBSP.Node) {
            this.tree = geometry;
            this.matrix = new THREE.Matrix4;
            return this;
        } else {
            throw 'ThreeBSP: Given geometry is unsupported';
        }

        for (i = 0, _length_i = geometry.faces.length; i < _length_i; i++) {
            face = geometry.faces[i];
            faceVertexUvs = geometry.faceVertexUvs[0][i];
            polygon = new ThreeBSP.Polygon;

            if (face instanceof THREE.Face3) {
                vertex = geometry.vertices[face.a];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[0].x, faceVertexUvs[0].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[0], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);

                vertex = geometry.vertices[face.b];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[1].x, faceVertexUvs[1].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[1], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);

                vertex = geometry.vertices[face.c];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[2].x, faceVertexUvs[2].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[2], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);
            } else if (typeof THREE.Face4) {
                vertex = geometry.vertices[face.a];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[0].x, faceVertexUvs[0].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[0], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);

                vertex = geometry.vertices[face.b];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[1].x, faceVertexUvs[1].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[1], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);

                vertex = geometry.vertices[face.c];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[2].x, faceVertexUvs[2].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[2], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);

                vertex = geometry.vertices[face.d];
                uvs = faceVertexUvs ? new THREE.Vector2(faceVertexUvs[3].x, faceVertexUvs[3].y) : null;
                vertex = new ThreeBSP.Vertex(vertex.x, vertex.y, vertex.z, face.vertexNormals[3], uvs);
                vertex.applyMatrix4(this.matrix);
                polygon.vertices.push(vertex);
            } else {
                throw 'Invalid face type at index ' + i;
            }

            polygon.calculateProperties();
            polygons.push(polygon);
        };

        this.tree = new ThreeBSP.Node(polygons);
    };
    ThreeBSP.prototype.subtract = function(other_tree) {
        var a = this.tree.clone(),
            b = other_tree.tree.clone();

        a.invert();
        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        a.invert();
        a = new ThreeBSP(a);
        a.matrix = this.matrix;
        return a;
    };
    ThreeBSP.prototype.union = function(other_tree) {
        var a = this.tree.clone(),
            b = other_tree.tree.clone();

        a.clipTo(b);
        b.clipTo(a);
        b.invert();
        b.clipTo(a);
        b.invert();
        a.build(b.allPolygons());
        a = new ThreeBSP(a);
        a.matrix = this.matrix;
        return a;
    };
    ThreeBSP.prototype.intersect = function(other_tree) {
        var a = this.tree.clone(),
            b = other_tree.tree.clone();

        a.invert();
        b.clipTo(a);
        b.invert();
        a.clipTo(b);
        b.clipTo(a);
        a.build(b.allPolygons());
        a.invert();
        a = new ThreeBSP(a);
        a.matrix = this.matrix;
        return a;
    };
    ThreeBSP.prototype.toGeometry = function() {
        var i, j,
            matrix = new THREE.Matrix4().getInverse(this.matrix),
            geometry = new THREE.Geometry(),
            polygons = this.tree.allPolygons(),
            polygon_count = polygons.length,
            polygon, polygon_vertice_count,
            vertice_dict = {},
            vertex_idx_a, vertex_idx_b, vertex_idx_c,
            vertex, face,
            verticeUvs;

        for (i = 0; i < polygon_count; i++) {
            polygon = polygons[i];
            polygon_vertice_count = polygon.vertices.length;

            for (j = 2; j < polygon_vertice_count; j++) {
                verticeUvs = [];

                vertex = polygon.vertices[0];
                verticeUvs.push(new THREE.Vector2(vertex.uv.x, vertex.uv.y));
                vertex = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
                vertex.applyMatrix4(matrix);

                if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                    vertex_idx_a = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
                } else {
                    geometry.vertices.push(vertex);
                    vertex_idx_a = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
                }

                vertex = polygon.vertices[j - 1];
                verticeUvs.push(new THREE.Vector2(vertex.uv.x, vertex.uv.y));
                vertex = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
                vertex.applyMatrix4(matrix);
                if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                    vertex_idx_b = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
                } else {
                    geometry.vertices.push(vertex);
                    vertex_idx_b = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
                }

                vertex = polygon.vertices[j];
                verticeUvs.push(new THREE.Vector2(vertex.uv.x, vertex.uv.y));
                vertex = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
                vertex.applyMatrix4(matrix);
                if (typeof vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] !== 'undefined') {
                    vertex_idx_c = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z];
                } else {
                    geometry.vertices.push(vertex);
                    vertex_idx_c = vertice_dict[vertex.x + ',' + vertex.y + ',' + vertex.z] = geometry.vertices.length - 1;
                }

                face = new THREE.Face3(
                    vertex_idx_a,
                    vertex_idx_b,
                    vertex_idx_c,
                    new THREE.Vector3(polygon.normal.x, polygon.normal.y, polygon.normal.z)
                );

                geometry.faces.push(face);
                geometry.faceVertexUvs[0].push(verticeUvs);
            }

        }
        return geometry;
    };
    ThreeBSP.prototype.toMesh = function(material) {
        var geometry = this.toGeometry(),
            mesh = new THREE.Mesh(geometry, material);

        mesh.position.setFromMatrixPosition(this.matrix);
        mesh.rotation.setFromRotationMatrix(this.matrix);

        return mesh;
    };
    ThreeBSP.Polygon = function(vertices, normal, w) {
        if (!(vertices instanceof Array)) {
            vertices = [];
        }

        this.vertices = vertices;
        if (vertices.length > 0) {
            this.calculateProperties();
        } else {
            this.normal = this.w = undefined;
        }
    };
    ThreeBSP.Polygon.prototype.calculateProperties = function() {
        var a = this.vertices[0],
            b = this.vertices[1],
            c = this.vertices[2];

        this.normal = b.clone().subtract(a).cross(
            c.clone().subtract(a)
        ).normalize();

        this.w = this.normal.clone().dot(a);

        return this;
    };
    ThreeBSP.Polygon.prototype.clone = function() {
        var i, vertice_count,
            polygon = new ThreeBSP.Polygon;

        for (i = 0, vertice_count = this.vertices.length; i < vertice_count; i++) {
            polygon.vertices.push(this.vertices[i].clone());
        };
        polygon.calculateProperties();

        return polygon;
    };
    ThreeBSP.Polygon.prototype.flip = function() {
        var i, vertices = [];

        this.normal.multiplyScalar(-1);
        this.w *= -1;

        for (i = this.vertices.length - 1; i >= 0; i--) {
            vertices.push(this.vertices[i]);
        };
        this.vertices = vertices;

        return this;
    };
    ThreeBSP.Polygon.prototype.classifyVertex = function(vertex) {
        var side_value = this.normal.dot(vertex) - this.w;

        if (side_value < -EPSILON) {
            return BACK;
        } else if (side_value > EPSILON) {
            return FRONT;
        } else {
            return COPLANAR;
        }
    };
    ThreeBSP.Polygon.prototype.classifySide = function(polygon) {
        var i, vertex, classification,
            num_positive = 0,
            num_negative = 0,
            vertice_count = polygon.vertices.length;

        for (i = 0; i < vertice_count; i++) {
            vertex = polygon.vertices[i];
            classification = this.classifyVertex(vertex);
            if (classification === FRONT) {
                num_positive++;
            } else if (classification === BACK) {
                num_negative++;
            }
        }

        if (num_positive > 0 && num_negative === 0) {
            return FRONT;
        } else if (num_positive === 0 && num_negative > 0) {
            return BACK;
        } else if (num_positive === 0 && num_negative === 0) {
            return COPLANAR;
        } else {
            return SPANNING;
        }
    };
    ThreeBSP.Polygon.prototype.splitPolygon = function(polygon, coplanar_front, coplanar_back, front, back) {
        var classification = this.classifySide(polygon);

        if (classification === COPLANAR) {

            (this.normal.dot(polygon.normal) > 0 ? coplanar_front : coplanar_back).push(polygon);

        } else if (classification === FRONT) {

            front.push(polygon);

        } else if (classification === BACK) {

            back.push(polygon);

        } else {

            var vertice_count,
                i, j, ti, tj, vi, vj,
                t, v,
                f = [],
                b = [];

            for (i = 0, vertice_count = polygon.vertices.length; i < vertice_count; i++) {

                j = (i + 1) % vertice_count;
                vi = polygon.vertices[i];
                vj = polygon.vertices[j];
                ti = this.classifyVertex(vi);
                tj = this.classifyVertex(vj);

                if (ti != BACK) f.push(vi);
                if (ti != FRONT) b.push(vi);
                if ((ti | tj) === SPANNING) {
                    t = (this.w - this.normal.dot(vi)) / this.normal.dot(vj.clone().subtract(vi));
                    v = vi.interpolate(vj, t);
                    f.push(v);
                    b.push(v);
                }
            }


            if (f.length >= 3) front.push(new ThreeBSP.Polygon(f).calculateProperties());
            if (b.length >= 3) back.push(new ThreeBSP.Polygon(b).calculateProperties());
        }
    };

    ThreeBSP.Vertex = function(x, y, z, normal, uv) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.normal = normal || new THREE.Vector3;
        this.uv = uv || new THREE.Vector2;
    };
    ThreeBSP.Vertex.prototype.clone = function() {
        return new ThreeBSP.Vertex(this.x, this.y, this.z, this.normal.clone(), this.uv.clone());
    };
    ThreeBSP.Vertex.prototype.add = function(vertex) {
        this.x += vertex.x;
        this.y += vertex.y;
        this.z += vertex.z;
        return this;
    };
    ThreeBSP.Vertex.prototype.subtract = function(vertex) {
        this.x -= vertex.x;
        this.y -= vertex.y;
        this.z -= vertex.z;
        return this;
    };
    ThreeBSP.Vertex.prototype.multiplyScalar = function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    };
    ThreeBSP.Vertex.prototype.cross = function(vertex) {
        var x = this.x,
            y = this.y,
            z = this.z;

        this.x = y * vertex.z - z * vertex.y;
        this.y = z * vertex.x - x * vertex.z;
        this.z = x * vertex.y - y * vertex.x;

        return this;
    };
    ThreeBSP.Vertex.prototype.normalize = function() {
        var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

        this.x /= length;
        this.y /= length;
        this.z /= length;

        return this;
    };
    ThreeBSP.Vertex.prototype.dot = function(vertex) {
        return this.x * vertex.x + this.y * vertex.y + this.z * vertex.z;
    };
    ThreeBSP.Vertex.prototype.lerp = function(a, t) {
        this.add(
            a.clone().subtract(this).multiplyScalar(t)
        );

        this.normal.add(
            a.normal.clone().sub(this.normal).multiplyScalar(t)
        );

        this.uv.add(
            a.uv.clone().sub(this.uv).multiplyScalar(t)
        );

        return this;
    };
    ThreeBSP.Vertex.prototype.interpolate = function(other, t) {
        return this.clone().lerp(other, t);
    };
    ThreeBSP.Vertex.prototype.applyMatrix4 = function(m) {

        // input: THREE.Matrix4 affine matrix

        var x = this.x,
            y = this.y,
            z = this.z;

        var e = m.elements;

        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];

        return this;

    }
    ThreeBSP.Node = function(polygons) {
        var i, polygon_count,
            front = [],
            back = [];

        this.polygons = [];
        this.front = this.back = undefined;

        if (!(polygons instanceof Array) || polygons.length === 0) return;

        this.divider = polygons[0].clone();

        for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
            this.divider.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
        }

        if (front.length > 0) {
            this.front = new ThreeBSP.Node(front);
        }

        if (back.length > 0) {
            this.back = new ThreeBSP.Node(back);
        }
    };
    ThreeBSP.Node.isConvex = function(polygons) {
        var i, j;
        for (i = 0; i < polygons.length; i++) {
            for (j = 0; j < polygons.length; j++) {
                if (i !== j && polygons[i].classifySide(polygons[j]) !== BACK) {
                    return false;
                }
            }
        }
        return true;
    };
    ThreeBSP.Node.prototype.build = function(polygons) {
        var i, polygon_count,
            front = [],
            back = [];

        if (!this.divider) {
            this.divider = polygons[0].clone();
        }

        for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
            this.divider.splitPolygon(polygons[i], this.polygons, this.polygons, front, back);
        }

        if (front.length > 0) {
            if (!this.front) this.front = new ThreeBSP.Node();
            this.front.build(front);
        }

        if (back.length > 0) {
            if (!this.back) this.back = new ThreeBSP.Node();
            this.back.build(back);
        }
    };
    ThreeBSP.Node.prototype.allPolygons = function() {
        var polygons = this.polygons.slice();
        if (this.front) polygons = polygons.concat(this.front.allPolygons());
        if (this.back) polygons = polygons.concat(this.back.allPolygons());
        return polygons;
    };
    ThreeBSP.Node.prototype.clone = function() {
        var node = new ThreeBSP.Node();

        node.divider = this.divider.clone();
        node.polygons = this.polygons.map(function(polygon) { return polygon.clone(); });
        node.front = this.front && this.front.clone();
        node.back = this.back && this.back.clone();

        return node;
    };
    ThreeBSP.Node.prototype.invert = function() {
        var i, polygon_count, temp;

        for (i = 0, polygon_count = this.polygons.length; i < polygon_count; i++) {
            this.polygons[i].flip();
        }

        this.divider.flip();
        if (this.front) this.front.invert();
        if (this.back) this.back.invert();

        temp = this.front;
        this.front = this.back;
        this.back = temp;

        return this;
    };
    ThreeBSP.Node.prototype.clipPolygons = function(polygons) {
        var i, polygon_count,
            front, back;

        if (!this.divider) return polygons.slice();

        front = [], back = [];

        for (i = 0, polygon_count = polygons.length; i < polygon_count; i++) {
            this.divider.splitPolygon(polygons[i], front, back, front, back);
        }

        if (this.front) front = this.front.clipPolygons(front);
        if (this.back) back = this.back.clipPolygons(back);
        else back = [];

        return front.concat(back);
    };
    ThreeBSP.Node.prototype.clipTo = function(node) {
        this.polygons = node.clipPolygons(this.polygons);
        if (this.front) this.front.clipTo(node);
        if (this.back) this.back.clipTo(node);
    };
    return ThreeBSP;
})();


/**
 * 实现划线选择的所有操作的类
 */
class DrawlineSelector {
    /**
     * 构造函数
     * @param {*} viewer 当前的Viewer
     * @param {*} callback 所有操作执行完毕之后的回调函数
     */
    constructor(viewer, callback) {
        this.viewer = viewer;
        this.mc = this.viewer.getExtension("Autodesk.Viewing.MarkupsCore");
        this.adskns = Autodesk.Viewing.Extensions.Markups.Core;
        this.meshes = [];
        if (!this.mc) {
            console.error("没有加载MarkupsCore插件");
        }
        this.callback = callback;
    }

    /**
     * 进入画线选择模式
     */
    enterDrawlineMode() {
        let selection = this.viewer.getSelection();
        if (selection.length == 0) {
            alert("请先选择一个构件");
            return;
        }
        //隔离当前构件
        this.viewer.isolate(selection);
        //顶视图
        this.viewer.viewCubeUi.cube.cubeRotateTo("top");
        setTimeout(() => {
        	let cam = this.viewer.getCamera();
        	cam.up.x=0;
        	cam.up.y=1;
        	
            this.viewer.fitToView(selection);
            //正交模式
            this.viewer.navigation.toOrthographic();
            setTimeout(() => { this.initDrawlingMode(selection[0]) }, 500)
        }, 500);
    }

    /**
     * 初始化划线选择模式
     */
    initDrawlingMode(dbid) {
        this.mc.enterEditMode();
        let editMode = new this.adskns.EditModePolyline(this.mc);
        //强制打开捕捉功能
        editMode.useWithSnapping = () => {
            return true
        };
        //订阅绘制完成的事件
        editMode.addEventListener(
            this.adskns.EVENT_EDITMODE_CREATION_END,
            (e) => {
                this.exitDrawlineMode(dbid)
            });
        //开始绘制
        this.mc.changeEditMode(editMode);
    }

    /**
     * 离开划线选择模式
     */
    exitDrawlineMode(dbid) {
        let polyLine = this.mc.markups[0];
        if (polyLine) {
            this.mc.leaveEditMode();
            this.mc.hide();
            setTimeout(() => {
                this.viewer.navigation.setRequestHomeView(true);
                this.viewer.showAll();
            }, 500);
            this.viewer.clearSelection();
            let mesh = this.buildMeshFromPolyLine(polyLine);
            let meshes = this.getMesh(this.viewer, dbid, (meshes) => {
                this.generateResult(mesh, meshes, dbid);
            });
        } else {
            console.log("划线失败");
        }
    }


    /**
     * 将所有数据组合，生成服务器计算所需的数据结构
     * @param {*} boundaryMesh 源网格的顶点数据
     * @param {*} sourceMeshes 源网格的面数据
     */
    generateResult(boundaryMesh, sourceMeshes, dbid) {
        let totalSourceVol = 0;
        let totalTargetVol = 0;
        for (let i = 0; i < sourceMeshes.length; i++) {
            let intersectMesh = this.meshIntersect(boundaryMesh, sourceMeshes[i]);
            totalSourceVol += this.meshVolume(sourceMeshes[i]);
            totalTargetVol += this.meshVolume(intersectMesh);
            intersectMesh.position.z += 100;
            //取消注释该行将网格绘制到场景中
            //this.viewer.impl.scene.add(intersectMesh);
            this.meshes.push(intersectMesh);
        }
        this.callback(dbid, totalSourceVol, totalTargetVol);
    }

    /**
     * 将绘制的多段线转换为网格模型
     * @param {*} polyLine 
     */
    buildMeshFromPolyLine(polyLine) {
        //将多段线转换为THREE.Shape
        let shape = new THREE.Shape();
        shape.moveTo(polyLine.locations[0].x, polyLine.locations[0].y);
        for (let i = 1; i < polyLine.locations.length; i++) {
            shape.lineTo(polyLine.locations[i].x, polyLine.locations[i].y);
        }
        //判断需要拉伸的距离，并创建拉伸体网格模型
        let bbox = this.viewer.model.getBoundingBox();
        let extrudeSettings = {
            amount: bbox.max.z - bbox.min.z + 10000,
        }
        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        let mesh = new THREE.Mesh(geometry, material);
        //将项目原点坐标系坐标转换为Forge中的中心坐标。
        let offset = this.viewer.model.getData().globalOffset;
        mesh.position.x = polyLine.position.x - offset.x;
        mesh.position.y = polyLine.position.y - offset.y;
        mesh.position.z = bbox.min.z - 5000;
        //取消注释该行则生成的Mesh会绘制到场景中
        //this.viewer.impl.scene.add(mesh);
        return mesh;
    }

    /**
     * 清除绘制的所有几何体
     */
    clearMeshes() {
        console.log(this.meshes);
    }



    /**
     * 提取一个构件对应的网格数据，提取的结果可以直接用来调用服务器上的接口
     * @param {Autodesk.Viewing.Viewer3D} 当前的Viewer
     * @param {number} dbid 要获取网格的构件或分区的dbid
     * @param {function} callback 返回的Mesh列表
     */
    getMesh(viewer, dbid, callback) {
        //获取模型树
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        viewer.model.getObjectTree(
            objectTree => {
                let threeMeshes = [];
                //遍历dbid对应的所有frag
                objectTree.enumNodeFragments(dbid, (fragId, dbid) => {
                    //获取frag对应的mesh
                    let mesh = viewer.impl.getRenderProxy(viewer.model, fragId);
                    let matrix = mesh.matrixWorld;
                    //提取mesh的二进制数据，数据结构与SVF一致，与THREE.js不同
                    //顶点数据
                    let fragVData = mesh.geometry.vb;
                    //每个三角面的顶点索引
                    let fragFData = mesh.geometry.ib;
                    //创建THREE 的Geometry
                    //将二进制的mesh数据整理成普通的顶点和面表示的数据
                    let geometry = new THREE.Geometry();
                    //整理顶点的数据格式，Forge中每四个数值的前三个分别表示一个顶点的xyz坐标
                    //处理结果每个顶点用一个三项的数组表示，分别是x、y、z坐标。
                    for (let i = 0; i < fragVData.length / 4; i++) {
                        let v3 = new THREE.Vector3();
                        v3.fromArray(fragVData, i * 4);
                        geometry.vertices.push(v3);
                    }
                    //整理面的数据格式，原数据每三个数值标识一个面
                    //处理结果一个面用一个三项的数组表示，逆时针顺序
                    for (let i = 0; i < fragFData.length / 3; i++) {
                        let face = new THREE.Face3(fragFData[3 * i], fragFData[3 * i + 1], fragFData[3 * i + 2]);
                        geometry.faces.push(face);
                    }
                    let threeMesh = new THREE.Mesh(geometry, material);
                    threeMesh.applyMatrix(matrix);
                    threeMeshes.push(threeMesh);
                    //取消注释该行将网格绘制到场景中
                    //this.viewer.impl.scene.add(threeMesh);
                }, true);
                //调用回调函数，返回结果
                callback(threeMeshes);
            },
            //输出异常
            e => console.log(e)
        )
    }

    /**
     * 计算Mesh的体积
     * @param {THREE.Mesh} mesh 
     */
    meshVolume(mesh) {
        let vol = 0;
        for (let i = 0; i < mesh.geometry.faces.length; i++) {
            let face = mesh.geometry.faces[i];
            let triVol = this.signedVolumeOfTriangle(mesh.geometry.vertices[face.a], mesh.geometry.vertices[face.b], mesh.geometry.vertices[face.c]);
            vol += triVol;
        }
        return Math.abs(vol);
    }

    /**
     * 计算一个三角形对应的四面体的带符号面积
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} p3 
     */
    signedVolumeOfTriangle(p1, p2, p3) {
        let v321 = p3.x * p2.y * p1.z;
        let v231 = p2.x * p3.y * p1.z;
        let v312 = p3.x * p1.y * p2.z;
        let v132 = p1.x * p3.y * p2.z;
        let v213 = p2.x * p1.y * p3.z;
        let v123 = p1.x * p2.y * p3.z;
        return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);

    }

    /**
     * 计算两个Mesh的Boolean Intersect
     * @param {*} mesh1 
     * @param {*} mesh2 
     * @returns 相交之后的Mesh
     */
    meshIntersect(mesh1, mesh2) {
        let bsp1 = new ThreeBSP(mesh1);
        let bsp2 = new ThreeBSP(mesh2);
        let intersectBsp = bsp1.intersect(bsp2);
        let intersectMesh = intersectBsp.toMesh(new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            depthTest: false,
            depthWrite: false,
        }));
        return intersectMesh;
    }
}