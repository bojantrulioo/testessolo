(this.webpackJsonpmitekScienceSDK=this.webpackJsonpmitekScienceSDK||[]).push([[5],{162:function(){},163:function(){},181:function(){},184:function(){},282:function(a){var b=Math.min,j=Math.max,q=Math.floor,z=Math.sqrt;!function(b){b.tracking=b.tracking||{},tracking.inherits=function(a,b){function c(){}c.prototype=b.prototype,a.superClass_=b.prototype,a.prototype=new c,a.prototype.constructor=a,a.base=function(a,c){var d=Array.prototype.slice.call(arguments,2);return b.prototype[c].apply(a,d)}},tracking.initUserMedia_=function(a,c){b.navigator.mediaDevices.getUserMedia({video:!0,audio:c&&c.audio}).then(function(b){a.srcObject=b})["catch"](function(){throw Error("Cannot capture user camera.")})},tracking.isNode=function(a){return a.nodeType||this.isWindow(a)},tracking.isWindow=function(a){return!!(a&&a.alert&&a.document)},tracking.one=function(a,b){return this.isNode(a)?a:(b||document).querySelector(a)},tracking.track=function(a,b,c){if(a=tracking.one(a),!a)throw new Error("Element not found, try a different element or selector.");if(!b)throw new Error("Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.");switch(a.nodeName.toLowerCase()){case"canvas":return this.trackCanvas_(a,b,c);case"img":return this.trackImg_(a,b,c);case"video":return c&&c.camera&&this.initUserMedia_(a,c),this.trackVideo_(a,b,c);default:throw new Error("Element not supported, try in a canvas, img, or video.");}},tracking.trackCanvas_=function(a,b){var c=this,d=new tracking.TrackerTask(b);return d.on("run",function(){c.trackCanvasInternal_(a,b)}),d.run()},tracking.trackCanvasInternal_=function(b,c){var d=b.width,f=b.height,e=b.getContext("2d"),a=e.getImageData(0,0,d,f);c.track(a.data,d,f)},tracking.trackImg_=function(b,c){var d=b.width,f=b.height,e=document.createElement("canvas");e.width=d,e.height=f;var a=new tracking.TrackerTask(c);return a.on("run",function(){tracking.Canvas.loadImage(e,b.src,0,0,d,f,function(){tracking.trackCanvasInternal_(e,c)})}),a.run()},tracking.trackVideo_=function(d,f){var j,e,a=document.createElement("canvas"),i=a.getContext("2d"),k=function(){j=d.offsetWidth,e=d.offsetHeight,a.width=j,a.height=e};k(),d.addEventListener("resize",k);var c,l=function h(){c=b.requestAnimationFrame(function(){if(d.readyState===d.HAVE_ENOUGH_DATA){try{i.drawImage(d,0,0,j,e)}catch(a){}tracking.trackCanvasInternal_(a,f)}h()})},g=new tracking.TrackerTask(f);return g.on("stop",function(){b.cancelAnimationFrame(c)}),g.on("run",function(){l()}),g.run()},b.URL||(b.URL=b.URL||b.webkitURL||b.msURL||b.oURL),navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)}(window),function(){tracking.EventEmitter=function(){},tracking.EventEmitter.prototype.events_=null,tracking.EventEmitter.prototype.addListener=function(a,b){if("function"!=typeof b)throw new TypeError("Listener must be a function");return this.events_||(this.events_={}),this.emit("newListener",a,b),this.events_[a]||(this.events_[a]=[]),this.events_[a].push(b),this},tracking.EventEmitter.prototype.listeners=function(a){return this.events_&&this.events_[a]},tracking.EventEmitter.prototype.emit=function(a){var b=this.listeners(a);if(b){for(var c=Array.prototype.slice.call(arguments,1),d=0;d<b.length;d++)b[d]&&b[d].apply(this,c);return!0}return!1},tracking.EventEmitter.prototype.on=tracking.EventEmitter.prototype.addListener,tracking.EventEmitter.prototype.once=function(a,b){var c=this;c.on(a,function d(){c.removeListener(a,d),b.apply(this,arguments)})},tracking.EventEmitter.prototype.removeAllListeners=function(a){return this.events_?(a?delete this.events_[a]:delete this.events_,this):this},tracking.EventEmitter.prototype.removeListener=function(a,b){if("function"!=typeof b)throw new TypeError("Listener must be a function");if(!this.events_)return this;var c=this.listeners(a);if(Array.isArray(c)){var d=c.indexOf(b);if(0>d)return this;c.splice(d,1)}return this},tracking.EventEmitter.prototype.setMaxListeners=function(){throw new Error("Not implemented")}}(),function(){tracking.Canvas={},tracking.Canvas.loadImage=function(b,d,f,g,e,a,h){var i=this,c=new window.Image;c.crossOrigin="*",c.onload=function(){var d=b.getContext("2d");b.width=e,b.height=a,d.drawImage(c,f,g,e,a),h&&h.call(i),c=null},c.src=d}}(),function(){tracking.DisjointSet=function(a){if(void 0===a)throw new Error("DisjointSet length not specified.");this.length=a,this.parent=new Uint32Array(a);for(var b=0;b<a;b++)this.parent[b]=b},tracking.DisjointSet.prototype.length=null,tracking.DisjointSet.prototype.parent=null,tracking.DisjointSet.prototype.find=function(a){return this.parent[a]===a?a:this.parent[a]=this.find(this.parent[a])},tracking.DisjointSet.prototype.union=function(a,b){var c=this.find(a),d=this.find(b);this.parent[c]=d}}(),function(){tracking.Image={},tracking.Image.blur=function(b,h,j,n){var e=Math.ceil;if(n=Math.abs(n),1>=n)throw new Error("Diameter should be greater than 1.");for(var p=n/2,a=e(n)+(1-e(n)%2),i=new Float32Array(a),o=(p+.5)/3,c=1/z(2*Math.PI*(o*o)),g=0,k=q(a/2),f=0;f<a;f++){var r=f-k,l=c*Math.exp(r*r*(-1/(2*o*o)));i[f]=l,g+=l}for(var m=0;m<i.length;m++)i[m]/=g;return this.separableConvolve(b,h,j,i,i,!1)},tracking.Image.computeIntegralImage=function(b,d,j,l,e,a,i){if(4>arguments.length)throw new Error("You should specify at least one output array in the order: sum, square, tilted, sobel.");var m;i&&(m=tracking.Image.sobel(b,d,j));for(var c=0;c<j;c++)for(var n=0;n<d;n++){var g=4*(c*d)+4*n,h=~~(.299*b[g]+.587*b[g+1]+.114*b[g+2]);if(l&&this.computePixelValueSAT_(l,d,c,n,h),e&&this.computePixelValueSAT_(e,d,c,n,h*h),a){var k=g-4*d,f=~~(.299*b[k]+.587*b[k+1]+.114*b[k+2]);this.computePixelValueRSAT_(a,d,c,n,h,f||0)}i&&this.computePixelValueSAT_(i,d,c,n,m[g])}},tracking.Image.computePixelValueRSAT_=function(b,c,d,f,e,a){var g=d*c+f;b[g]=(b[g-c-1]||0)+(b[g-c+1]||0)-(b[g-c-c]||0)+e+a},tracking.Image.computePixelValueSAT_=function(b,c,d,f,e){var a=d*c+f;b[a]=(b[a-c]||0)+(b[a-1]||0)+e-(b[a-c-1]||0)},tracking.Image.grayscale=function(b,d,f,h){for(var e=new Uint8ClampedArray(h?b.length:b.length>>2),a=0,i=0,j=0;j<f;j++)for(var c,g=0;g<d;g++)c=.299*b[i]+.587*b[i+1]+.114*b[i+2],e[a++]=c,h&&(e[a++]=c,e[a++]=c,e[a++]=b[i+3]),i+=4;return e},tracking.Image.horizontalConvolve=function(y,t,r,n,e){for(var a=n.length,i=q(a/2),o=new Float32Array(4*(t*r)),c=e?1:0,s=0;s<r;s++)for(var g=0;g<t;g++){for(var h=s,k=g,f=4*(s*t+g),u=0,l=0,m=0,d=0,v=0;v<a;v++){var p=b(t-1,j(0,k+v-i)),w=4*(h*t+p),z=n[v];u+=y[w]*z,l+=y[w+1]*z,m+=y[w+2]*z,d+=y[w+3]*z}o[f]=u,o[f+1]=l,o[f+2]=m,o[f+3]=d+c*(255-d)}return o},tracking.Image.verticalConvolve=function(w,t,r,n,e){for(var a=n.length,i=q(a/2),o=new Float32Array(4*(t*r)),c=e?1:0,s=0;s<r;s++)for(var g=0;g<t;g++){for(var h=s,k=g,f=4*(s*t+g),u=0,l=0,m=0,d=0,v=0;v<a;v++){var p=b(r-1,j(0,h+v-i)),y=4*(p*t+k),z=n[v];u+=w[y]*z,l+=w[y+1]*z,m+=w[y+2]*z,d+=w[y+3]*z}o[f]=u,o[f+1]=l,o[f+2]=m,o[f+3]=d+c*(255-d)}return o},tracking.Image.separableConvolve=function(b,c,d,f,e,a){var g=this.verticalConvolve(b,c,d,e,a);return this.horizontalConvolve(g,c,d,f,a)},tracking.Image.sobel=function(b,d,f){b=this.grayscale(b,d,f,!0);for(var j=new Float32Array(4*(d*f)),e=new Float32Array([-1,0,1]),a=new Float32Array([1,2,1]),i=this.separableConvolve(b,d,f,e,a),l=this.separableConvolve(b,d,f,a,e),c=0;c<j.length;c+=4){var m=i[c],g=l[c],h=z(g*g+m*m);j[c]=h,j[c+1]=h,j[c+2]=h,j[c+3]=255}return j},tracking.Image.equalizeHist=function(b){for(var d=new Uint8ClampedArray(b.length),e=Array(256),a=0;256>a;a++)e[a]=0;for(var a=0;a<b.length;a++)d[a]=b[a],e[b[a]]++;for(var f=e[0],a=0;256>a;a++)e[a]+=f,f=e[a];for(var g=255/b.length,a=0;a<b.length;a++)d[a]=0|e[b[a]]*g+.5;return d}}(),function(){tracking.ViolaJones={},tracking.ViolaJones.REGIONS_OVERLAP=.5,tracking.ViolaJones.classifiers={},tracking.ViolaJones.detect=function(b,j,q,n,e,a,i,o){var c,r=0,g=[],h=new Int32Array(j*q),k=new Int32Array(j*q),f=new Int32Array(j*q);0<i&&(c=new Int32Array(j*q)),tracking.Image.computeIntegralImage(b,j,q,h,k,f,c);for(var s=o[0],l=o[1],m=n*e,d=0|m*s,t=0|m*l;d<j&&t<q;){for(var u=0|m*a+.5,x=0;x<q-t;x+=u)for(var y=0;y<j-d;y+=u)0<i&&this.isTriviallyExcluded(i,c,x,y,j,d,t)||this.evalStages_(o,h,k,f,x,y,j,d,t,m)&&(g[r++]={width:d,height:t,x:y,y:x});m*=e,d=0|m*s,t=0|m*l}return this.mergeRectangles_(g)},tracking.ViolaJones.isTriviallyExcluded=function(b,d,f,h,e,a,i){var j=f*e+h,c=j+i*e,g=(d[j]-d[j+a]-d[c]+d[c+a])/(255*(a*i));return g<b},tracking.ViolaJones.evalStages_=function(q,t,r,n,e,a,i,o,c,s){var g=1/(o*c),h=e*i+a,k=h+o,f=h+c*i,u=f+o,l=(t[h]-t[k]-t[f]+t[u])*g,m=(r[h]-r[k]-r[f]+r[u])*g-l*l,d=1;0<m&&(d=z(m));for(var v=q.length,p=2;p<v;){for(var y=0,w=q[p++],G=q[p++];G--;){for(var x=0,H=q[p++],J=q[p++],C=0;C<J;C++){var E,F,B,K,L=0|a+q[p++]*s+.5,A=0|e+q[p++]*s+.5,I=0|q[p++]*s+.5,M=0|q[p++]*s+.5,b=q[p++];H?(E=L-M+I+(A+I+M-1)*i,F=L+(A-1)*i,B=L-M+(A+M-1)*i,K=L+I+(A+I-1)*i,x+=(n[E]+n[F]-n[B]-n[K])*b):(E=A*i+L,F=E+I,B=E+M*i,K=B+I,x+=(t[E]-t[F]-t[B]+t[K])*b)}var D=q[p++],O=q[p++],N=q[p++];y+=x*g<D*d?O:N}if(y<w)return!1}return!0},tracking.ViolaJones.mergeRectangles_=function(p){for(var q=new tracking.DisjointSet(p.length),r=0;r<p.length;r++)for(var n,i=p[r],e=0;e<p.length;e++)if(n=p[e],tracking.Math.intersectRect(i.x,i.y,i.x+i.width,i.y+i.height,n.x,n.y,n.x+n.width,n.y+n.height)){var a=j(i.x,n.x),o=j(i.y,n.y),c=b(i.x+i.width,n.x+n.width),s=b(i.y+i.height,n.y+n.height),g=(a-c)*(o-s),h=i.width*i.height,k=n.width*n.height;g/(h*(h/k))>=this.REGIONS_OVERLAP&&g/(k*(h/k))>=this.REGIONS_OVERLAP&&q.union(r,e)}for(var f,m={},t=0;t<q.length;t++)f=q.find(t),m[f]?(m[f].total++,m[f].width+=p[t].width,m[f].height+=p[t].height,m[f].x+=p[t].x,m[f].y+=p[t].y):m[f]={total:1,width:p[t].width,height:p[t].height,x:p[t].x,y:p[t].y};var l=[];return Object.keys(m).forEach(function(a){var b=m[a];l.push({total:b.total,width:0|b.width/b.total+.5,height:0|b.height/b.total+.5,x:0|b.x/b.total+.5,y:0|b.y/b.total+.5})}),l}}(),function(){tracking.Brief={},tracking.Brief.N=512,tracking.Brief.randomImageOffsets_={},tracking.Brief.randomWindowOffsets_=null,tracking.Brief.getDescriptors=function(b,d,f){for(var j=new Int32Array((f.length>>1)*(this.N>>5)),e=0,a=this.getRandomOffsets_(d),i=0,l=0;l<f.length;l+=2)for(var c=d*f[l+1]+f[l],m=0,g=0,h=this.N;g<h;g++)b[a[m++]+c]<b[a[m++]+c]&&(e|=1<<(31&g)),31&g+1||(j[i++]=e,e=0);return j},tracking.Brief.match=function(b,d,j,l){for(var e=b.length>>1,a=j.length>>1,i=Array(e),m=0;m<e;m++){for(var n=1/0,o=0,p=0;p<a;p++){for(var h=0,k=0,f=this.N>>5;k<f;k++)h+=tracking.Math.hammingWeight(d[m*f+k]^l[p*f+k]);h<n&&(n=h,o=p)}i[m]={index1:m,index2:o,keypoint1:[b[2*m],b[2*m+1]],keypoint2:[j[2*o],j[2*o+1]],confidence:1-n/this.N}}return i},tracking.Brief.reciprocalMatch=function(b,d,f,g){var e=[];if(0===b.length||0===f.length)return e;for(var a=tracking.Brief.match(b,d,f,g),h=tracking.Brief.match(f,g,b,d),i=0;i<a.length;i++)h[a[i].index2].index2===i&&e.push(a[i]);return e},tracking.Brief.getRandomOffsets_=function(b){var c=Math.round;if(!this.randomWindowOffsets_){for(var d=0,f=new Int32Array(4*this.N),g=0;g<this.N;g++)f[d++]=c(tracking.Math.uniformRandom(-15,16)),f[d++]=c(tracking.Math.uniformRandom(-15,16)),f[d++]=c(tracking.Math.uniformRandom(-15,16)),f[d++]=c(tracking.Math.uniformRandom(-15,16));this.randomWindowOffsets_=f}if(!this.randomImageOffsets_[b]){for(var e=0,a=new Int32Array(2*this.N),h=0;h<this.N;h++)a[e++]=this.randomWindowOffsets_[4*h]*b+this.randomWindowOffsets_[4*h+1],a[e++]=this.randomWindowOffsets_[4*h+2]*b+this.randomWindowOffsets_[4*h+3];this.randomImageOffsets_[b]=a}return this.randomImageOffsets_[b]}}(),function(){tracking.Fast={},tracking.Fast.THRESHOLD=40,tracking.Fast.circles_={},tracking.Fast.findCorners=function(b,d,f,j){var e=this.getCircleOffsets_(d),a=new Int32Array(16),i=[];void 0===j&&(j=this.THRESHOLD);for(var l=3;l<f-3;l++)for(var c=3;c<d-3;c++){for(var m=l*d+c,g=b[m],h=0;16>h;h++)a[h]=b[m+e[h]];this.isCorner(g,a,j)&&(i.push(c,l),c+=3)}return i},tracking.Fast.isBrighter=function(a,b,c){return a-b>c},tracking.Fast.isCorner=function(b,d,f){if(this.isTriviallyExcluded(d,b,f))return!1;for(var g=0;16>g;g++){for(var e,c=!0,a=!0,h=0;9>h&&(e=d[15&g+h],this.isBrighter(b,e,f)||(a=!1,!1!=c))&&!(!this.isDarker(b,e,f)&&(c=!1,!1==a));h++);if(a||c)return!0}return!1},tracking.Fast.isDarker=function(a,b,c){return b-a>c},tracking.Fast.isTriviallyExcluded=function(b,d,f){var g=0,e=b[8],a=b[12],h=b[4],i=b[0];return this.isBrighter(i,d,f)&&g++,this.isBrighter(h,d,f)&&g++,this.isBrighter(e,d,f)&&g++,this.isBrighter(a,d,f)&&g++,3>g&&(g=0,this.isDarker(i,d,f)&&g++,this.isDarker(h,d,f)&&g++,this.isDarker(e,d,f)&&g++,this.isDarker(a,d,f)&&g++,3>g)},tracking.Fast.getCircleOffsets_=function(a){if(this.circles_[a])return this.circles_[a];var b=new Int32Array(16);return b[0]=-a-a-a,b[1]=b[0]+1,b[2]=b[1]+a+1,b[3]=b[2]+a+1,b[4]=b[3]+a,b[5]=b[4]+a,b[6]=b[5]+a-1,b[7]=b[6]+a-1,b[8]=b[7]-1,b[9]=b[8]-1,b[10]=b[9]-a-1,b[11]=b[10]-a-1,b[12]=b[11]-a,b[13]=b[12]-a,b[14]=b[13]-a+1,b[15]=b[14]-a+1,this.circles_[a]=b,b}}(),function(){tracking.Math={},tracking.Math.distance=function(b,c,d,f){var e=d-b,a=f-c;return z(e*e+a*a)},tracking.Math.hammingWeight=function(a){return a-=1431655765&a>>1,a=(858993459&a)+(858993459&a>>2),16843009*(252645135&a+(a>>4))>>24},tracking.Math.uniformRandom=function(a,b){return a+Math.random()*(b-a)},tracking.Math.intersectRect=function(b,d,f,g,e,a,h,i){return!(e>f||h<b||a>g||i<d)}}(),function(){tracking.Matrix={},tracking.Matrix.forEach=function(b,d,f,g,e){e=e||1;for(var a=0;a<f;a+=e)for(var h,c=0;c<d;c+=e)h=4*(a*d)+4*c,g.call(this,b[h],b[h+1],b[h+2],b[h+3],h,a,c)},tracking.Matrix.sub=function(b,c){for(var d=tracking.Matrix.clone(b),f=0;f<d.length;f++)for(var e=0;e<d[f].length;e++)d[f][e]-=c[f][e];return d},tracking.Matrix.add=function(b,c){for(var d=tracking.Matrix.clone(b),f=0;f<d.length;f++)for(var e=0;e<d[f].length;e++)d[f][e]+=c[f][e];return d},tracking.Matrix.clone=function(b,c,d){c=c||b[0].length,d=d||b.length;for(var f=Array(d),e=d;e--;){f[e]=Array(c);for(var a=c;a--;)f[e][a]=b[e][a]}return f},tracking.Matrix.mulScalar=function(b,c){for(var d=tracking.Matrix.clone(c),f=0;f<c.length;f++)for(var e=0;e<c[f].length;e++)d[f][e]*=b;return d},tracking.Matrix.transpose=function(a){for(var b=Array(a[0].length),c=0;c<a[0].length;c++){b[c]=Array(a.length);for(var d=0;d<a.length;d++)b[c][d]=a[d][c]}return b},tracking.Matrix.mul=function(b,c){for(var d=Array(b.length),f=0;f<b.length;f++){d[f]=Array(c[0].length);for(var e=0;e<c[0].length;e++){d[f][e]=0;for(var a=0;a<b[0].length;a++)d[f][e]+=b[f][a]*c[a][e]}}return d},tracking.Matrix.norm=function(a){for(var b=0,c=0;c<a.length;c++)for(var d=0;d<a[c].length;d++)b+=a[c][d]*a[c][d];return z(b)},tracking.Matrix.calcCovarMatrix=function(b){for(var d=Array(b.length),f=0;f<b.length;f++){d[f]=[0];for(var g=0;g<b[f].length;g++)d[f][0]+=b[f][g]/b[f].length}for(var e=tracking.Matrix.clone(d),f=0;f<e.length;f++)for(var g=0;g<b[0].length-1;g++)e[f].push(e[f][0]);var a=tracking.Matrix.sub(b,e),h=tracking.Matrix.transpose(a),i=tracking.Matrix.mul(h,a);return[i,d]}}(),function(){tracking.EPnP={},tracking.EPnP.solve=function(){}}(),function(){tracking.Tracker=function(){tracking.Tracker.base(this,"constructor")},tracking.inherits(tracking.Tracker,tracking.EventEmitter),tracking.Tracker.prototype.track=function(){}}(),function(){tracking.TrackerTask=function(a){if(tracking.TrackerTask.base(this,"constructor"),!a)throw new Error("Tracker instance not specified.");this.setTracker(a)},tracking.inherits(tracking.TrackerTask,tracking.EventEmitter),tracking.TrackerTask.prototype.tracker_=null,tracking.TrackerTask.prototype.running_=!1,tracking.TrackerTask.prototype.getTracker=function(){return this.tracker_},tracking.TrackerTask.prototype.inRunning=function(){return this.running_},tracking.TrackerTask.prototype.setRunning=function(a){this.running_=a},tracking.TrackerTask.prototype.setTracker=function(a){this.tracker_=a},tracking.TrackerTask.prototype.run=function(){var a=this;if(!this.inRunning())return this.setRunning(!0),this.reemitTrackEvent_=function(b){a.emit("track",b)},this.tracker_.on("track",this.reemitTrackEvent_),this.emit("run"),this},tracking.TrackerTask.prototype.stop=function(){if(this.inRunning())return this.setRunning(!1),this.emit("stop"),this.tracker_.removeListener("track",this.reemitTrackEvent_),this}}(),function(){tracking.ColorTracker=function(a){tracking.ColorTracker.base(this,"constructor"),"string"==typeof a&&(a=[a]),a&&(a.forEach(function(a){if(!tracking.ColorTracker.getColor(a))throw new Error("Color not valid, try `new tracking.ColorTracker(\"magenta\")`.")}),this.setColors(a))},tracking.inherits(tracking.ColorTracker,tracking.Tracker),tracking.ColorTracker.knownColors_={},tracking.ColorTracker.neighbours_={},tracking.ColorTracker.registerColor=function(a,b){tracking.ColorTracker.knownColors_[a]=b},tracking.ColorTracker.getColor=function(a){return tracking.ColorTracker.knownColors_[a]},tracking.ColorTracker.prototype.colors=["magenta"],tracking.ColorTracker.prototype.minDimension=20,tracking.ColorTracker.prototype.maxDimension=1/0,tracking.ColorTracker.prototype.minGroupSize=30,tracking.ColorTracker.prototype.calculateDimensions_=function(b,d){for(var f=-1,g=-1,e=1/0,h=1/0,j=0;j<d;j+=2){var k=b[j],c=b[j+1];k<e&&(e=k),k>f&&(f=k),c<h&&(h=c),c>g&&(g=c)}return{width:f-e,height:g-h,x:e,y:h}},tracking.ColorTracker.prototype.getColors=function(){return this.colors},tracking.ColorTracker.prototype.getMinDimension=function(){return this.minDimension},tracking.ColorTracker.prototype.getMaxDimension=function(){return this.maxDimension},tracking.ColorTracker.prototype.getMinGroupSize=function(){return this.minGroupSize},tracking.ColorTracker.prototype.getNeighboursForWidth_=function(a){if(tracking.ColorTracker.neighbours_[a])return tracking.ColorTracker.neighbours_[a];var b=new Int32Array(8);return b[0]=4*-a,b[1]=4*-a+4,b[2]=4,b[3]=4*a+4,b[4]=4*a,b[5]=4*a-4,b[6]=-4,b[7]=4*-a-4,tracking.ColorTracker.neighbours_[a]=b,b},tracking.ColorTracker.prototype.mergeRectangles_=function(d){for(var l,m,o=[],n=this.getMinDimension(),e=this.getMaxDimension(),a=0;a<d.length;a++){m=d[a],l=!0;for(var i,p=a+1;p<d.length;p++)if(i=d[p],tracking.Math.intersectRect(m.x,m.y,m.x+m.width,m.y+m.height,i.x,i.y,i.x+i.width,i.y+i.height)){l=!1;var c=b(m.x,i.x),g=b(m.y,i.y),h=j(m.x+m.width,i.x+i.width),k=j(m.y+m.height,i.y+i.height);i.height=k-g,i.width=h-c,i.x=c,i.y=g;break}l&&m.width>=n&&m.height>=n&&m.width<=e&&m.height<=e&&o.push(m)}return o},tracking.ColorTracker.prototype.setColors=function(a){this.colors=a},tracking.ColorTracker.prototype.setMinDimension=function(a){this.minDimension=a},tracking.ColorTracker.prototype.setMaxDimension=function(a){this.maxDimension=a},tracking.ColorTracker.prototype.setMinGroupSize=function(a){this.minGroupSize=a},tracking.ColorTracker.prototype.track=function(b,c,d){var f=this,e=this.getColors();if(!e)throw new Error("Colors not specified, try `new tracking.ColorTracker(\"magenta\")`.");var g=[];e.forEach(function(e){g=g.concat(f.trackColor_(b,c,d,e))}),this.emit("track",{data:g})},tracking.ColorTracker.prototype.trackColor_=function(b,j,e,a){var n,o,c,q,g,h=tracking.ColorTracker.knownColors_[a],r=new Int32Array(b.length>>2),s=new Int8Array(b.length),t=this.getMinGroupSize(),l=this.getNeighboursForWidth_(j),m=new Int32Array(b.length),d=[],u=-4;if(!h)return d;for(var p=0;p<e;p++)for(var v=0;v<j;v++)if(u+=4,!s[u]){for(n=0,g=-1,m[++g]=u,m[++g]=p,m[++g]=v,s[u]=1;0<=g;)if(c=m[g--],o=m[g--],q=m[g--],h(b[q],b[q+1],b[q+2],b[q+3],q,o,c)){r[n++]=c,r[n++]=o;for(var w=0;w<l.length;w++){var y=q+l[w],x=o+f[w],z=c+i[w];!s[y]&&0<=x&&x<e&&0<=z&&z<j&&(m[++g]=y,m[++g]=x,m[++g]=z,s[y]=1)}}if(n>=t){var A=this.calculateDimensions_(r,n);A&&(A.color=a,d.push(A))}}return this.mergeRectangles_(d)},tracking.ColorTracker.registerColor("cyan",function(a,b,d){var e=a-0,f=b-255,g=d-255;return b-a>=50&&d-a>=70||6400>e*e+f*f+g*g}),tracking.ColorTracker.registerColor("magenta",function(b,c,d){var f=50,e=b-255,a=c-0,g=d-255;return b-c>=f&&d-c>=f||19600>e*e+a*a+g*g}),tracking.ColorTracker.registerColor("yellow",function(b,c,d){var f=50,e=b-255,a=c-255,g=d-0;return b-d>=f&&c-d>=f||1e4>e*e+a*a+g*g});var f=new Int32Array([-1,-1,0,1,1,1,0,-1]),i=new Int32Array([0,1,1,1,0,-1,-1,-1])}(),function(){tracking.ObjectTracker=function(a){tracking.ObjectTracker.base(this,"constructor"),a&&(Array.isArray(a)||(a=[a]),Array.isArray(a)&&a.forEach(function(b,c){if("string"==typeof b&&(a[c]=tracking.ViolaJones.classifiers[b]),!a[c])throw new Error("Object classifier not valid, try `new tracking.ObjectTracker(\"face\")`.")})),this.setClassifiers(a)},tracking.inherits(tracking.ObjectTracker,tracking.Tracker),tracking.ObjectTracker.prototype.edgesDensity=.2,tracking.ObjectTracker.prototype.initialScale=1,tracking.ObjectTracker.prototype.scaleFactor=1.25,tracking.ObjectTracker.prototype.stepSize=1.5,tracking.ObjectTracker.prototype.getClassifiers=function(){return this.classifiers},tracking.ObjectTracker.prototype.getEdgesDensity=function(){return this.edgesDensity},tracking.ObjectTracker.prototype.getInitialScale=function(){return this.initialScale},tracking.ObjectTracker.prototype.getScaleFactor=function(){return this.scaleFactor},tracking.ObjectTracker.prototype.getStepSize=function(){return this.stepSize},tracking.ObjectTracker.prototype.track=function(b,c,d){var f=this,e=this.getClassifiers();if(!e)throw new Error("Object classifier not specified, try `new tracking.ObjectTracker(\"face\")`.");var g=[];e.forEach(function(e){g=g.concat(tracking.ViolaJones.detect(b,c,d,f.getInitialScale(),f.getScaleFactor(),f.getStepSize(),f.getEdgesDensity(),e))}),this.emit("track",{data:g})},tracking.ObjectTracker.prototype.setClassifiers=function(a){this.classifiers=a},tracking.ObjectTracker.prototype.setEdgesDensity=function(a){this.edgesDensity=a},tracking.ObjectTracker.prototype.setInitialScale=function(a){this.initialScale=a},tracking.ObjectTracker.prototype.setScaleFactor=function(a){this.scaleFactor=a},tracking.ObjectTracker.prototype.setStepSize=function(a){this.stepSize=a}}(),function(){tracking.LandmarksTracker=function(){tracking.LandmarksTracker.base(this,"constructor")},tracking.inherits(tracking.LandmarksTracker,tracking.ObjectTracker),tracking.LandmarksTracker.prototype.track=function(b,c,d){var f=tracking.ViolaJones.classifiers.face,e=tracking.ViolaJones.detect(b,c,d,this.getInitialScale(),this.getScaleFactor(),this.getStepSize(),this.getEdgesDensity(),f),g=tracking.LBF.align(b,c,d,e);this.emit("track",{data:{faces:e,landmarks:g}})}}(),function(){tracking.LBF={},tracking.LBF.Regressor=function(a){this.maxNumStages=a,this.rfs=Array(a),this.models=Array(a);for(var b=0;b<a;b++)this.rfs[b]=new tracking.LBF.RandomForest(b),this.models[b]=tracking.LBF.RegressorData[b].models;this.meanShape=tracking.LBF.LandmarksData},tracking.LBF.Regressor.prototype.predict=function(b,d,f,h){var e=[],a=[],i=[],j=tracking.Matrix.clone(this.meanShape);e.push({data:b,width:d,height:f}),i.push(h),a.push(tracking.LBF.projectShapeToBoundingBox_(j,h));for(var c,g=0;g<this.maxNumStages;g++)c=tracking.LBF.Regressor.deriveBinaryFeat(this.rfs[g],e,a,i,j),this.applyGlobalPrediction(c,this.models[g],a,i);return a[0]},tracking.LBF.Regressor.prototype.applyGlobalPrediction=function(b,d,j,l){for(var e=2*j[0].length,a=Array(e/2),i=0;i<e/2;i++)a[i]=[0,0];for(var i=0;i<j.length;i++){for(var m=0;m<e;m++){for(var c=0,n=0,g=0;-1!=(g=b[i][n].index);n++)g<=d[m].nr_feature&&(c+=d[m].data[g-1]*b[i][n].value);m<e/2?a[m][0]=c:a[m-e/2][1]=c}var h=tracking.LBF.similarityTransform_(tracking.LBF.unprojectShapeToBoundingBox_(j[i],l[i]),this.meanShape),k=(tracking.Matrix.transpose(h[0]),tracking.LBF.unprojectShapeToBoundingBox_(j[i],l[i]));k=tracking.Matrix.add(k,a),j[i]=tracking.LBF.projectShapeToBoundingBox_(k,l[i])}},tracking.LBF.Regressor.deriveBinaryFeat=function(b,d,j,m,e){for(var a,c=Array(d.length),i=0;i<d.length;i++){a=b.maxNumTrees*b.landmarkNum+1,c[i]=Array(a);for(var n=0;n<a;n++)c[i][n]={}}for(var o=1<<b.maxDepth-1,i=0;i<d.length;i++){for(var g=tracking.LBF.unprojectShapeToBoundingBox_(j[i],m[i]),h=tracking.LBF.similarityTransform_(g,e),n=0;n<b.landmarkNum;n++)for(var k=0;k<b.maxNumTrees;k++){var f=tracking.LBF.Regressor.getCodeFromTree(b.rfs[n][k],d[i],j[i],m[i],h[0],h[1]),p=n*b.maxNumTrees+k;c[i][p].index=o*p+f,c[i][p].value=1}c[i][b.landmarkNum*b.maxNumTrees].index=-1,c[i][b.landmarkNum*b.maxNumTrees].value=-1}return c},tracking.LBF.Regressor.getCodeFromTree=function(i,t,r,n,e){for(var a=Math.sin,x=Math.cos,z=0,o=0;;){var c=x(i.nodes[z].feats[0])*i.nodes[z].feats[2]*i.maxRadioRadius*n.width,s=a(i.nodes[z].feats[0])*i.nodes[z].feats[2]*i.maxRadioRadius*n.height,g=x(i.nodes[z].feats[1])*i.nodes[z].feats[3]*i.maxRadioRadius*n.width,h=a(i.nodes[z].feats[1])*i.nodes[z].feats[3]*i.maxRadioRadius*n.height,k=e[0][0]*c+e[0][1]*s,f=e[1][0]*c+e[1][1]*s,u=q(k+r[i.landmarkID][0]),l=q(f+r[i.landmarkID][1]);u=j(0,b(u,t.height-1)),l=j(0,b(l,t.width-1));var m=e[0][0]*g+e[0][1]*h,d=e[1][0]*g+e[1][1]*h,v=q(m+r[i.landmarkID][0]),p=q(d+r[i.landmarkID][1]);v=j(0,b(v,t.height-1)),p=j(0,b(p,t.width-1));var y=q(t.data[l*t.width+u])-q(t.data[p*t.width+v]);if(z=y<i.nodes[z].thresh?i.nodes[z].cnodes[0]:i.nodes[z].cnodes[1],1==i.nodes[z].is_leafnode){o=1;for(var w=0;w<i.leafnodes.length;w++){if(i.leafnodes[w]==z)return o;o++}return o}}return o}}(),function(){tracking.LBF.maxNumStages=4,tracking.LBF.regressor_=null,tracking.LBF.align=function(b,c,d,f){null==tracking.LBF.regressor_&&(tracking.LBF.regressor_=new tracking.LBF.Regressor(tracking.LBF.maxNumStages)),b=tracking.Image.grayscale(b,c,d,!1),b=tracking.Image.equalizeHist(b,c,d);var e=Array(f.length);for(var a in f){f[a].height=f[a].width;var g={};g.startX=f[a].x,g.startY=f[a].y,g.width=f[a].width,g.height=f[a].height,e[a]=tracking.LBF.regressor_.predict(b,c,d,g)}return e},tracking.LBF.unprojectShapeToBoundingBox_=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=[(a[d][0]-b.startX)/b.width,(a[d][1]-b.startY)/b.height];return c},tracking.LBF.projectShapeToBoundingBox_=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=[a[d][0]*b.width+b.startX,a[d][1]*b.height+b.startY];return c},tracking.LBF.similarityTransform_=function(b,j){for(var l=[0,0],n=[0,0],e=0;e<b.length;e++)l[0]+=b[e][0],l[1]+=b[e][1],n[0]+=j[e][0],n[1]+=j[e][1];l[0]/=b.length,l[1]/=b.length,n[0]/=j.length,n[1]/=j.length;for(var a=tracking.Matrix.clone(b),i=tracking.Matrix.clone(j),e=0;e<b.length;e++)a[e][0]-=l[0],a[e][1]-=l[1],i[e][0]-=n[0],i[e][1]-=n[1];var o,c,q,g,h=tracking.Matrix.calcCovarMatrix(a);o=h[0],q=h[1],h=tracking.Matrix.calcCovarMatrix(i),c=h[0],g=h[1];var k=z(tracking.Matrix.norm(o)),f=z(tracking.Matrix.norm(c));a=tracking.Matrix.mulScalar(1/k,a),i=tracking.Matrix.mulScalar(1/f,i);for(var r=0,m=0,e=0;e<b.length;e++)r=r+a[e][1]*i[e][0]-a[e][0]*i[e][1],m=m+a[e][0]*i[e][0]+a[e][1]*i[e][1];var d=z(r*r+m*m),s=r/d,t=m/d;return[[[t,-s],[s,t]],k/f]},tracking.LBF.RandomForest=function(a){this.maxNumTrees=tracking.LBF.RegressorData[a].max_numtrees,this.landmarkNum=tracking.LBF.RegressorData[a].num_landmark,this.maxDepth=tracking.LBF.RegressorData[a].max_depth,this.stages=tracking.LBF.RegressorData[a].stages,this.rfs=Array(this.landmarkNum);for(var b=0;b<this.landmarkNum;b++){this.rfs[b]=Array(this.maxNumTrees);for(var c=0;c<this.maxNumTrees;c++)this.rfs[b][c]=new tracking.LBF.Tree(a,b,c)}},tracking.LBF.Tree=function(a,b,c){var d=tracking.LBF.RegressorData[a].landmarks[b][c];this.maxDepth=d.max_depth,this.maxNumNodes=d.max_numnodes,this.nodes=d.nodes,this.landmarkID=d.landmark_id,this.numLeafnodes=d.num_leafnodes,this.numNodes=d.num_nodes,this.maxNumFeats=d.max_numfeats,this.maxRadioRadius=d.max_radio_radius,this.leafnodes=d.id_leafnodes}}(),a.exports=tracking},286:function(a,b,c){"use strict";function d(){fa=new ImageData(10,10),ga=0,ha=0,ia=0,ja="",ka="",la=0,ma.MISNAP_HEAD_TOO_CLOSE=0,ma.MISNAP_HEAD_OUTSIDE=0,ma.MISNAP_STAY_STILL=0,ma.MISNAP_AXIS_ANGLE=0,ma.MISNAP_HEAD_SKEWED=0,ma.MISNAP_HEAD_TOO_FAR=0,ma.NO_FACE_FOUND=0}function e(a,b,c){return new Promise(function(d){setTimeout(function(){$.width=b,$.height=c,ca.save(),ca.clearRect(0,0,$.width/4,$.height),ca.translate($.width/2,$.height/2),ca.rotate(a*q/180),ca.drawImage(Z,-$.width/2,-$.height/2),ca.translate(-$.width/2,-$.height/2),ca.restore(),d($)},10)})}function f(){return g.apply(this,arguments)}function g(){return g=A()(u.a.mark(function a(b,c){var d,f;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(d=null,Z.width=b.imageData.width,Z.height=b.imageData.height,ba.putImageData(b.imageData,0,0),"MANUAL_CAPTURE"!==c){a.next=26;break}return G.f.setBackend("cpu"),f=b.imageData.width>b.imageData.height,a.next=9,G.b(Z,s).withFaceLandmarks(!0).withFaceExpressions();case 9:if(d=a.sent,!qa(d)){a.next=14;break}return a.abrupt("return",new Promise(function(a){setTimeout(function(){a(d)},50)}));case 14:if(!0!==f){a.next=19;break}return a.next=17,e(-90,b.imageData.width,b.imageData.height);case 17:a.next=20;break;case 19:$=Z;case 20:return a.next=22,G.b($,s).withFaceLandmarks(!0).withFaceExpressions();case 22:return d=a.sent,a.abrupt("return",new Promise(function(a){setTimeout(function(){a(d)},50)}));case 24:a.next=33;break;case 26:return G.f.setBackend("webgl"),wa()&&(console.log("IE Detected"),G.f.ENV.set("WEBGL_PACK",!1)),a.next=30,G.b(Z,s).withFaceLandmarks(!0).withFaceExpressions();case 30:return d=a.sent,window.document.querySelector("#mitekOuterContainer")&&(window.document.querySelector("#mitekOuterContainer").style.display="block"),a.abrupt("return",new Promise(function(a){setTimeout(function(){a(d)},50)}));case 33:case"end":return a.stop();}},a)})),g.apply(this,arguments)}function h(){return i.apply(this,arguments)}function i(){return i=A()(u.a.mark(function a(){return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,G.e.tinyFaceDetector.load(H.a.getPublicWP());case 2:return a.next=4,G.c(H.a.getPublicWP());case 4:return a.next=6,G.d(H.a.getPublicWP());case 6:return a.abrupt("return",!0);case 7:case"end":return a.stop();}},a)})),i.apply(this,arguments)}function j(a,b){return a._x+K>b.x&&a._x+a._width<b.x+b.width+K&&a._y>b.y&&a._y+a._height<b.y+b.height+L}function k(a,b){var c=a.width*a.height/(b.width*b.height);return c<M}function l(a,b){var c=a.width*a.height/(b.width*b.height);return c>N}function m(a){return Object(C.a)(a,R,S)}function n(a){if(!a||!a.getNose()||!a.getLeftEye()||!a.getRightEye())return!1;var b=a.getMouth()[0]._x-a.getJawOutline()[4]._x,c=a.getJawOutline()[12]._x-a.getMouth()[6]._x,d=a.getLeftEyeBrow()[0]._x-a.getJawOutline()[0]._x,e=a.getJawOutline()[16]._x-a.getRightEyeBrow()[4]._x;return d<P||e<P||b<O||c<O}function o(a,b){F.a.Fast.THRESHOLD=T;var c=document.createElement("canvas");c.width=a.width,c.height=a.height;var d=c.getContext("2d");d.putImageData(a,0,0);var e=d.getImageData(b._x,b._y,b.width,b.height),f=F.a.Image.grayscale(e.data,e.width,e.height),g=F.a.Fast.findCorners(f,e.width,e.height);return g.length}var p=Math.min,q=Math.PI,r=Math.abs;c.r(b),c.d(b,"processFrame",function(){return ta});var s,t=c(5),u=c.n(t),v=c(6),w=c.n(v),x=c(9),y=c.n(x),z=c(10),A=c.n(z),B=c(0),C=c(2),D=c(17),E=c(282),F=c.n(E),G=c(285),H=c(42),I=Object(D.a)(),J=.4,K=160,L=70,M=.33,N=1.6,O=10,P=5,Q=70,R=55,S=125,T=5,U="",V=!1,W=!1,X=!1,Y=1,Z=document.createElement("canvas"),$=document.createElement("canvas"),_={ranOnce:!1},aa=90;B.a.on("ORIENTATION_AXIS_CHANGE",function(a){aa=a});var ba=Z.getContext("2d"),ca=$.getContext("2d"),da={},ea=!1,fa=new ImageData(10,10),ga=0,ha=0,ia=0,ja="",ka="",la=0,ma={MISNAP_HEAD_TOO_CLOSE:0,MISNAP_HEAD_OUTSIDE:0,MISNAP_STAY_STILL:0,MISNAP_AXIS_ANGLE:0,MISNAP_HEAD_SKEWED:0,MISNAP_HEAD_TOO_FAR:0,NO_FACE_FOUND:0},na=function(){var a={x:0,y:0};return function(b){var c=0==a.x?b._x:a.x,d=b._x,e=0==a.y?b._y:a.y,f=b._y,g=r(d-c),h=r(f-e);return a.x=b._x,a.y=b._y,g>Q||h>Q}}(),oa=function(a){var b=a.faceDetectionWithBox,c=b.expressions,d=c.asSortedArray()[0].expression,e=y()(b.detection.box)?b.detection.box:b.detectionResult.box,f={type:"MISNAP_HEAD_OUTSIDE",storeFrame:!1,detectionBox:e},g=j(e,da);if(l(e,da))return ma.MISNAP_HEAD_TOO_CLOSE+=1,f.type="MISNAP_HEAD_TOO_CLOSE",f;if(!g)return ma.MISNAP_HEAD_OUTSIDE+=1,f.type="MISNAP_HEAD_OUTSIDE",f;if(Object(C.e)()&&!1===ea&&m(aa))return ma.MISNAP_AXIS_ANGLE+=1,f.type="MISNAP_AXIS_ANGLE",f;if(na(e))return ma.MISNAP_STAY_STILL+=1,f.type="MISNAP_STAY_STILL",f;if(n(b.landmarks))return ma.MISNAP_HEAD_SKEWED+=1,f.type="MISNAP_HEAD_SKEWED",f;if(k(e,da))return ma.MISNAP_HEAD_TOO_FAR+=1,f.type="MISNAP_HEAD_TOO_FAR",f;return(ga="happy"===d||"surprised"===d?ga+1:ga,f.storeFrame=!0===X||"neutral"===d||"sad"===d,ga>1&&""==ja&&(ja=!0),!0===X&&ka||""!=ka&&""!=ja)?(ga=0,ha=0,ja="",ka="",f.type="MISNAP_SUCCESS",f):!0===X?(f.type="MISNAP_READY_POSE",f):""==ka&&""!=ja?(f.type="MISNAP_STOP_SMILING",f):""==ja?(f.type="MISNAP_SMILE",f):(f.type="MISNAP_READY_POSE",f)},pa=function(a){var b=a.faceDetectionWithBox,c=b.expressions,d=c.asSortedArray()[0].expression,e=y()(b.detection.box)?b.detection.box:b.detectionResult.box,f={type:"MISNAP_SUCCESS",storeFrame:!1,detectionBox:e};return e.height/b.imageHeight>.7?(ma.MISNAP_HEAD_TOO_CLOSE+=1,f.type="MISNAP_HEAD_TOO_CLOSE",f):n(b.landmarks)?(ma.MISNAP_HEAD_SKEWED+=1,f.type="MISNAP_HEAD_SKEWED",f):e.height/b.imageHeight<.3?(ma.MISNAP_HEAD_TOO_FAR+=1,f.type="MISNAP_HEAD_TOO_FAR",f):f},qa=function(a){return a!==void 0&&a},ra=function(a){var b=!!(!1!==a&&a.hasOwnProperty("box")||a.hasOwnProperty("detection"))&&a;return b},sa=null,ta=function(a){da=a.top?{y:a.top||120,x:a.left||320,height:a.gh||450,width:a.gw||975}:{},U=a.captureMode,W=a.captureNextFrame,f(a,U).then(function(a){return qa(a)}).then(function(a){return ra(a)}).then(function(b){if(!1===b){if("MANUAL_CAPTURE"===U)return V=!0,_.resultCallback({warnings:{status:"failure",code:"NF",key:"NO_FACE_FOUND",score:0},imageData:a.imageData}),!1;ma.NO_FACE_FOUND+=1,la+=1,5<=la&&(sa="NO_FACE_FOUND",la=0)}else la=0;return!1!==b&&b}).then(function(b){if("MANUAL_CAPTURE"===U){if(!!Object(C.h)(b))return b.imageHeight=a.imageData.height,b.imageWidth=a.imageData.width,pa({faceDetectionWithBox:b});if(!1==V)return _.resultCallback({warnings:{status:"failure",code:"NF",key:"NO_FACE_FOUND",score:0},imageData:a.imageData}),!1}else return Object(C.h)(b)?(la=0,oa({faceDetectionWithBox:b})):(la+=1,5<=la&&(la=0),{type:"NO_FACE_FOUND"})}).then(function(b){if(("MANUAL_CAPTURE"===U||!0===W)&&(fa=a.imageData),!0===W&&(b.type="MISNAP_SUCCESS"),!0===b.storeFrame){++ha,ha>=3&&(ka=!0);var c=o(a.imageData,b.detectionBox);c>ia&&(ia=c,fa=a.imageData,B.a.emit("LOG_MIBI_EVENT",{eventName:I.MitekMibiAction.AUTOCAPTURE_FAST_SCORE,eventValues:c}))}"MISNAP_SUCCESS"===b.type?(B.a.emit("LOG_MIBI_EVENT",{eventName:I.MitekMibiAction.FACE_FAILURE_COUNT,eventValues:ma}),_.resultCallback({warnings:{status:"success"},imageData:fa}),fa=""):(B.a.emit("LOG_MIBI_EVENT",{eventName:I.MitekMibiAction.FACE_FAILURE_COUNT,eventValues:ma}),"AUTO"===U,_.resultCallback({imageData:fa,warnings:{code:sa,status:"failure",key:b.type,score:null}}))})["catch"](function(){})},ua=function(){ea=!("landscape"!==va())},va=function(){var a=p(document.documentElement.clientWidth,window.innerWidth||0),b=p(document.documentElement.clientHeight,window.innerHeight||0);return b>a?"portrait":"landscape"},wa=function(){var a=window.navigator.userAgent,b=a.indexOf("MSIE ");if(0<b)return parseInt(a.substring(b+5,a.indexOf(".",b)),10);var c=a.indexOf("Trident/");if(0<c){var d=a.indexOf("rv:");return parseInt(a.substring(d+3,a.indexOf(".",d)),10)}var e=a.indexOf("Edge/");return!!(0<e)&&parseInt(a.substring(e+5,a.indexOf(".",e)),10)},xa=function(){return B.a.removeListener("INNER_GUIDE_CHANGE",ua)};b["default"]=function(a){window.document.querySelector("#mitekOuterContainer")&&(window.document.querySelector("#mitekOuterContainer").style.display="none");var b=null;return _=w()({},a,{ranOnce:!0}),X=a.disableSmileDetection,Y=a.faceDetectionLevel,J=2==Y?.6:3==Y?.8:.4,s=new G.a({inputSize:160,scoreThreshold:J}),new Promise(function(a){d(),h().then(function(){b=setInterval(function(){!0===G.e.tinyFaceDetector.isLoaded&&!0===G.e.faceExpressionNet.isLoaded&&!0===G.e.faceLandmark68TinyNet.isLoaded&&(clearInterval(b),B.a.on("INNER_GUIDE_CHANGE",ua),B.a.on("SDK_STOP",xa),B.a.on("SDK_ERROR",xa),B.a.on("FRAME_CAPTURE_RESULT",xa),setTimeout(function(){B.a.emit("ORIENTATION_CHANGE",{})},10),a({msg:"ready"}))},50)})["catch"](function(){})})}}}]);