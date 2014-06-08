<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> 
    <script src="http://cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.5/dat.gui.min.js"></script>
    <script src="/Users/Sirian/Desktop/threejs-crumbs-master/examples/assets/libs/TrackballControls.js"></script>
    <script type="text/javascript" src="/Users/Sirian/Desktop/threejs-crumbs-master/examples/assets/fonts/wendy_one_regular.typeface.js"></script> 
    <script src="/Users/Sirian/Desktop/threejs-crumbs-master/examples/assets/libs/tween.min.js"></script>
    <script src="/Users/Sirian/Desktop/threejs-crumbs-master/examples/assets/libs/keyframe.js"></script>
    
    <!-- Utility Function -->
    <script>

      function createArm(radius,r_cylinder,height,definitionSegment) {
        
        var pivot = new THREE.Object3D();
        var sphereGeometry = new THREE.SphereGeometry(radius,definitionSegment,definitionSegment);
        var sphereMaterial = new THREE.MeshLambertMaterial({color:0xFF6088});
        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.set(0,0,0);
        pivot.add(sphere);

        var cylinder = new THREE.Object3D();
        var cylinderGeometrysx = new THREE.CylinderGeometry(r_cylinder, r_cylinder, height, definitionSegment, 1, false);
        var cylinderMaterialsx = new THREE.MeshLambertMaterial({color:0xD2D2D2});
        var cylindersx = new THREE.Mesh(cylinderGeometrysx,cylinderMaterialsx);
        cylindersx.position.set(-0.5,height/2,0);
        cylinder.add(cylindersx);
        var cylinderGeometrydx = new THREE.CylinderGeometry(r_cylinder, r_cylinder, height, definitionSegment, 1, false);
        var cylinderMaterialdx = new THREE.MeshLambertMaterial({color:0xD2D2D2});
        var cylinderdx = new THREE.Mesh(cylinderGeometrydx,cylinderMaterialdx);
        cylinderdx.position.set(0.5,height/2,0);
        cylinder.add(cylinderdx);
        sphere.add(cylinder);

        var hook = new THREE.Object3D();
        hook.position.set(0,height,0);
        cylinder.add(hook);

        pivot.sphere = sphere;
        pivot.cylinder = cylinder;
        pivot.hook = hook;
        return pivot;
      }

      function createLampshade(radiusSphera,radiusLampshade,radiusBulb,height,definitionSegment) {

        var pivot = new THREE.Object3D(radiusSphera,height,definitionSegment);
        var sphereGeometry = new THREE.SphereGeometry(radiusSphera,definitionSegment,definitionSegment);
        var sphereMaterial = new THREE.MeshLambertMaterial({color:0xFF6088});
        var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        sphere.position.set(0,0,0);
        pivot.add(sphere);

        var lampshadeGeometry = new THREE.SphereGeometry(radiusLampshade,definitionSegment,definitionSegment,Math.PI/2,2*Math.PI,Math.PI/2,Math.PI/2);
        var lampshadeMaterial = new THREE.MeshLambertMaterial({color:0xD2D2D2, side:THREE.DoubleSide});
        var lampshade = new THREE.Mesh(lampshadeGeometry,lampshadeMaterial);
        lampshade.position.set(0,radiusSphera+radiusLampshade,0);
        sphere.add(lampshade);

        var bulbGeometry = new THREE.SphereGeometry(radiusBulb,definitionSegment,definitionSegment);
        var bulbMaterial = new THREE.MeshPhongMaterial({color:0xFFE4E1, trasparent: true, opacity: 0.5, side: THREE.BackSide});
        var bulb = new THREE.Mesh(bulbGeometry,bulbMaterial);
        bulb.position.set(0,2*radiusBulb,0);
        lampshade.add(bulb);
        pivot.add(bulb);

        var hook = new THREE.Object3D();
        hook.position.set(0,radiusBulb,0);
        bulb.add(hook);

        pivot.sphere = sphere;
        pivot.lampshade = lampshade;
        pivot.bulb = bulb;
        pivot.hook = hook;
        return pivot;
      }

      function createPlane(w_plane,h_plane,w_defPlane,h_defPlane,radius,h_base){

        var planeGeometry = new THREE.PlaneGeometry(w_plane,h_plane,w_defPlane,h_defPlane);
        var planeMaterial = new THREE.MeshLambertMaterial({color:0xFAEBD7, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.rotation.x = -Math.PI/2
        plane.position.set(130,-radius-h_base,0);
        plane.receiveShadow = true;
        return plane;
      }

      function createTop(top_radius,top_verDef,top_horDef,radius,h_base) {
        var topGeometry = new THREE.SphereGeometry(top_radius,top_verDef,top_horDef);
        var topMaterial = new THREE.MeshPhongMaterial({color:0xFC0FC0});
        var top = new THREE.Mesh(topGeometry,topMaterial);
        top.position.set(-40,radius+h_base,0);
        top.castShadow = true;
        return top;
      }

      function createBase(r_base, r_base, h_base, definitionSegment,radius,r_button,h_button){
        var b = new THREE.Object3D();
        var baseGeometry = new THREE.CylinderGeometry(r_base, r_base, h_base, definitionSegment, 1, false);
        var baseMaterial = new THREE.MeshLambertMaterial({color:0xD2D2D2});
        var base = new THREE.Mesh(baseGeometry,baseMaterial);
        base.position.set(0,-radius-(h_base/2),0);
        b.add(base);
        var buttonGeometry = new THREE.CylinderGeometry(r_button, r_button, h_button, definitionSegment, 1, false);
        var buttonMaterial = new THREE.MeshLambertMaterial({color:0xFF6088});
        var button = new THREE.Mesh(buttonGeometry,buttonMaterial);
        //button.position.set(0,-radius-(h_base/2)+h_button/2,r_base-0.8);
        b.add(button);
        b.base = base;
        b.button = button;
        return b;
      }

      function createText(text,size,height,position) {
          var options = {
            size : size,
            height : height,
            bevelThickness : 2,
            bevelSize : 0.5,
            bevelEnabled : true,
            bevelSegments : 3,
            bevelEnabled : true,
            curveSegments : 12,
            steps : 1,
            font : "wendy one",
            weight : "normal"
          };
          var textGeometry = new THREE.TextGeometry(text, options);
          var textMaterial = new THREE.MeshLambertMaterial({color:0x0000FF});
          var text = new THREE.Mesh(textGeometry,textMaterial);
          text.position.z = position[0];
          text.position.x = position[1];
          text.position.y = position[2];
          text.castShadow = true;
          return text;
        }

        $(function () {
          var stats = initStats();
          var scene = new THREE.Scene();
          var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
          camera.position.set(-200,0,100);
          camera.up = new THREE.Vector3(0,1,0);
          camera.lookAt(scene.position);
          var renderer = new THREE.WebGLRenderer();
          renderer.setClearColor(new THREE.Color(0xEEEEEE));
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.shadowMapEnabled = true;
          var trackballControls = new THREE.TrackballControls(camera);
          var axisHelper = new THREE.AxisHelper(3);
          scene.add(axisHelper);
          var directionalLight = new THREE.DirectionalLight( 0xffffff );
          directionalLight.position.set(0,500,0);
          scene.add(directionalLight);
          $('body').append(renderer.domElement);

        //Var Statement 
        var w_plane = 400;
        var h_plane = 100;
        var w_defPlane = 450;
        var h_defPlane = 300
        var top_radius = 4;
        var top_verDef = 25;
        var top_horDef = 25;
        var r_base = 5;
        var h_base = 1;
        var definitionSegment = 20;
        var radius = 1;
        var height = 10;
        var r_cylinder = 0.25;
        var radiusLampshade = 5;
        var radiusBulb = 1.5;
        var r_target = 0.1;
        var h_target = 400;
        var spot_intesity = -100;
        var spot_distance = 70;
        var spot_angle = 0.1;
        var point_intensity = 10;
        var r_button = 0.5;
        var h_button = 1;

        //Scene Creation
        var lamp = new THREE.Object3D();
        scene.add(lamp);
        var plane = createPlane(w_plane,h_plane,w_defPlane,h_defPlane,radius,h_base); 
        scene.add(plane);

        var top = createTop(top_radius,top_verDef,top_horDef,radius,h_base);
        scene.add(top);

        var base = createBase(r_base, r_base, h_base, definitionSegment,radius,r_button,h_button);
        lamp.add(base);

        var hook = new THREE.Object3D();
        lamp.add(hook);
        lamp.hook = hook;

        var arm1 = createArm(radius,r_cylinder,height,definitionSegment);
        lamp.hook.add(arm1);
        var arm2 = createArm(radius,r_cylinder,height,definitionSegment);
        arm1.hook.add(arm2);
        var lampshade = createLampshade(radius,radiusLampshade,radiusBulb,height,definitionSegment,false);
        arm2.hook.add(lampshade);

        //Light Creation
        var sphereLight = new THREE.SphereGeometry(r_target);
        var sphereLightMaterial = new THREE.MeshLambertMaterial({transparent: true, opacity:0});
        var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
        sphereLightMesh.position = new THREE.Vector3(0,h_target,0);
        lampshade.bulb.add(sphereLightMesh);


        var bulbLight = new THREE.SpotLight(0xFFFFFF);
        bulbLight.castShadow = true;
        bulbLight.target = sphereLightMesh;
        bulbLight.distance = -spot_distance;
        bulbLight.intensity = spot_intesity;
        bulbLight.angle = spot_angle;
        lampshade.hook.add(bulbLight);        


        var pointLight = new THREE.PointLight(0xFFFF00);
        pointLight.intensity = point_intensity;
        pointLight.distance = radiusBulb+0.5;
        lampshade.bulb.add(pointLight);

        //Text Creation
        var text;
        var size_text = 50;
        var height_text = 10;
        var position_text = new Array();

        text = "C"
        position_text[0] = -r_base;
        position_text[1] = 60;
        position_text[2] = -h_base-radius+1;
        var c_text = createText(text,size_text,height_text,position_text);
        scene.add(c_text);

        text = "V"
        position_text[0] = -r_base;
        position_text[1] = 103;
        position_text[2] = -h_base-radius+1;
        var v_text = createText(text,size_text,height_text,position_text);
        scene.add(v_text);

        text = "D"
        position_text[0] = -r_base;
        position_text[1] = 152;
        position_text[2] = -h_base-radius+1;
        var d_text = createText(text,size_text,height_text,position_text);
        scene.add(d_text);

        text = "L"
        position_text[0] = -r_base;
        position_text[1] = 200;
        position_text[2] = -h_base-radius;
        var l_text = createText(text,size_text,height_text,position_text);
        scene.add(l_text);

        text = "ab"
        position_text[0] = -r_base;
        position_text[1] = 235;
        position_text[2] = -h_base-radius+1;
        var ab_text = createText(text,size_text,height_text,position_text);
        scene.add(ab_text);

        //define animations lamp
              var a = new TWEEN.Tween(lamp.position)
              .to({ x:10,y:50,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var b = new TWEEN.Tween(lamp.position)
              .to({ x:20,y:0,z:0}, 1000)
              .easing(TWEEN.Easing.Linear.None)
              var a3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 2000)
              .easing(TWEEN.Easing.Linear.None)
              var b3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 2000)
              .easing(TWEEN.Easing.Linear.None)

              var c = new TWEEN.Tween(lamp.position)
              .to({x:30,y:50,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var d = new TWEEN.Tween(lamp.position)
              .to({x:40,y:0,z:0}, 1000)
              .easing(TWEEN.Easing.Linear.None)
              var c3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 2000)
              .easing(TWEEN.Easing.Linear.None)
              var d3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 2000)
              .easing(TWEEN.Easing.Linear.None)

              var e = new TWEEN.Tween(lamp.position)
              .to({x:65,y:100,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var f = new TWEEN.Tween(lamp.position)
              .to({x:82,y:45,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var e3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var f3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var g = new TWEEN.Tween(lamp.position)
              .to({x:82,y:30,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var h = new TWEEN.Tween(c_text.scale)
              .to({x:1,y:0.7,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var g3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var h3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var i = new TWEEN.Tween(lamp.position)
              .to({x:90,y:130,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var l = new TWEEN.Tween(c_text.scale)
              .to({x:1,y:1,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var m = new TWEEN.Tween(lamp.position)
              .to({x:120,y:43,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var m3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var n3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var n = new TWEEN.Tween(lamp.position)
              .to({x:120,y:30.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var o = new TWEEN.Tween(v_text.scale)
              .to({x:1,y:0.7,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var o3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var p3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var p = new TWEEN.Tween(lamp.position)
              .to({x:140,y:130,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var q = new TWEEN.Tween(v_text.scale)
              .to({x:1,y:1,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var r = new TWEEN.Tween(lamp.position)
              .to({x:170,y:44,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var q3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var r3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var s = new TWEEN.Tween(lamp.position)
              .to({x:170,y:30.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var t = new TWEEN.Tween(d_text.scale)
              .to({x:1,y:0.7,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var s3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var t3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var u = new TWEEN.Tween(lamp.position)
              .to({x:180,y:130,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var v = new TWEEN.Tween(d_text.scale)
              .to({x:1,y:1,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var z = new TWEEN.Tween(lamp.position)
              .to({x:215,y:44,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var u3 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var v3 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var a1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:31.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var a4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var b4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var b1 = new TWEEN.Tween(l_text.scale)
              .to({x:1,y:0.75,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var c1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:120,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var d1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:31.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
               var c4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var d4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var e1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:21.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var f1 = new TWEEN.Tween(l_text.scale)
              .to({x:1,y:0.5,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var e4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var f4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var g1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:110,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var h1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:21.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var g4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var h4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var i1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:10.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var l1 = new TWEEN.Tween(l_text.scale)
              .to({x:1,y:0.25,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var i4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var l4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var m1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:50,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var n1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:10.5,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var m4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var n4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              var o1 = new TWEEN.Tween(lamp.position)
              .to({x:215,y:0,z:0}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var p1 = new TWEEN.Tween(l_text.scale)
              .to({x:1,y:0,z:1}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var o4 = new TWEEN.Tween(lamp.hook.rotation)
              .to({ x:0,y:0,z:-Math.PI/4}, 500)
              .easing(TWEEN.Easing.Linear.None)
              var p4 = new TWEEN.Tween(arm1.hook.rotation)
              .to({ x:0,y:0,z:Math.PI/2}, 500)
              .easing(TWEEN.Easing.Linear.None)

              a.chain(b,a3,b3);  
              b,a3,b3.chain(c);     
              c.chain(d,c3,d3);  
              d,c3,d3.chain(e);
              e.chain(f,e3,f3);
              f,e3,f3.chain(g,h,g3,h3);
              g,h,g3,h3.chain(i,l);
              i,l.chain(m,m3,n3);
              m,m3,n3.chain(n,o,o3,p3);
              n,o,o3,p3.chain(p,q);
              p,q.chain(r,q3,r3);
              r,q3,r3.chain(s,t,s3,t3);
              s,t,s3,t3.chain(u,v);
              u,v.chain(z,u3,v3);
              z,u3,v3.chain(a1,a4,b4,b1);
              a1,b1,a4,b4.chain(c1);
              c1.chain(d1,c4,d4);
              d1,c4,d4.chain(e1,f1,e4,f4);
              e1,f1,e4,f4.chain(g1);
              g1.chain(h1,g4,h4);
              h1,g4,h4.chain(i1,i4,l4,l1);
              i1,l1,i4,l4.chain(m1);
              m1.chain(n1,m4,n4);
              n1,m4,n4.chain(o1,p1,o4,p4); 
   
              //Controls Statement
              var controls = new function () {
                this.showAxisHelper = true;
                this.onoff = true;
                this.tweekAnimation = false;
                this.rotation = 0;
                this.tilt = 0;
                this.rotation2 = 0;
                this.tilt2 = 0;
                this.rotation3 = 0;
                this.tilt3 = 0;
              };

              //Add Gui
              var gui = new dat.GUI();
              var axis_control = gui.add(controls, 'showAxisHelper');
              var onoff = gui.add(controls, 'onoff');
              var rotation = gui.add(controls, 'rotation',0,2*Math.PI);
              var tilt = gui.add(controls, 'tilt',-Math.PI/4,Math.PI/4);
              var rotation2 = gui.add(controls, 'rotation2',0,2*Math.PI);
              var tilt2 = gui.add(controls, 'tilt2',-Math.PI/4,Math.PI/4);
              var rotation3 = gui.add(controls, 'rotation3',0,2*Math.PI);
              var tilt3 = gui.add(controls, 'tilt3',-Math.PI/2,Math.PI/2);
              var tweekAnimation = gui.add(controls, 'tweekAnimation');
              rotation.onChange(function (e) {
                rotation = e;
              });
              tilt.onChange(function (e) {
                tilt = e;
              });
              rotation2.onChange(function (e) {
                rotation2 = e;
              });
              tilt2.onChange(function (e) {
                tilt2 = e;
              });
              rotation3.onChange(function (e) {
                rotation3 = e;
              });
              tilt3.onChange(function (e) {
                tilt3 = e;
              });
              axis_control.onChange(function (value) {
               axisHelper.visible = value;
              });
              onoff.onChange(function (value) {
                if(!value) {
                  bulbLight.intensity = 0;
                  pointLight.intensity = 0;
                  renderer.shadowMapEnabled = false;
                  renderer.clearTarget(bulbLight.shadowMap);
                } else {
                  renderer.shadowMapEnabled = true;
                  bulbLight.intensity = spot_intesity;
                  pointLight.intensity = point_intensity;
                }
              });
              tweekAnimation.onChange(function (value) {
                if(value) {
                  a.start();
                } 
              });

              render();
              //Render
              function render() {
                stats.update();
                trackballControls.update();
                lamp.hook.rotation.y = controls.rotation;
                lamp.hook.rotation.z = controls.tilt;
                arm1.hook.rotation.y = controls.rotation2;
                arm1.hook.rotation.z = controls.tilt2;
                arm2.cylinder.rotation.y = controls.rotation3;
                arm2.hook.rotation.z = controls.tilt3
                if(controls.onoff) {
                  base.button.position.set(0,-radius,r_base-0.8);
                } else {
                  base.button.position.set(0,-radius+h_button/2,r_base-0.8);
                }
                TWEEN.update();
                KF.update();          
                requestAnimationFrame(render);
                renderer.render(scene, camera);
              }

              //Stats
              function initStats() {
                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms
                $('body').append(stats.domElement);
                return stats;
              }
      });
    </script>  