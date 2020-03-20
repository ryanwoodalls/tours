// Garden Gnome Software - Skin
// Pano2VR 6.0.6/17336
// Filename: Xandr.ggsk
// Generated 2020-03-19T08:54:01

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_forward_hs(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._forward_hs=document.createElement('div');
		el.ggId="forward hs";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 350px;';
		hs+='position : absolute;';
		hs+='top : 20px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._forward_hs.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._forward_hs.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._forward_hs.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._forward_hs.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._forward_hs.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._forward_hs.ggUpdatePosition=function (useTransition) {
		}
		el=me._forward=document.createElement('div');
		els=me._forward__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMwMEFFRUY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTUiLz4NCgk8cG9seWxpbmUgY2xhc3M9InN0MCIgcG9pbnRzPSI5LDE5IDE2LDEyIDIzLDE5IAkiLz4NCjwvZz4NCjwvc3ZnPg0K';
		me._forward__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;forward;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		ela=me._forward__imga=document.createElement('img');
		ela.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJDQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDEgLTEuNzI0MDU2ZS0wMyAxLjcyNDA1NmUtMDMgMSAtMi43NTYxMTFlLTAyIDIuNzYwODY3ZS0wMikiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjksMTkgMTYsMTIg'+
			'MjMsMTkgCSIvPg0KPC9nPg0KPC9zdmc+DQo=';
		me._forward__imga.setAttribute('src',hs);
		ela.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;forward;');
		ela['ondragstart']=function() { return false; };
		el.appendChild(ela);
		el.ggId="forward";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: 2;';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -28px;';
		hs+='position : absolute;';
		hs+='top : -25px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._forward.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._forward.onmouseout=function (e) {
			me._forward__imga.style.visibility='hidden';
		}
		me._forward.onmousedown=function (e) {
			me._forward__imga.style.visibility='inherit';
		}
		me._forward.onmouseup=function (e) {
			me._forward__imga.style.visibility='hidden';
		}
		me._forward.ggUpdatePosition=function (useTransition) {
		}
		me._forward_hs.appendChild(me._forward);
		me.__div = me._forward_hs;
	};
	function SkinHotspotClass_left_hs(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._left_hs=document.createElement('div');
		el.ggId="left hs";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 253px;';
		hs+='position : absolute;';
		hs+='top : 114px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._left_hs.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._left_hs.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._left_hs.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._left_hs.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._left_hs.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._left_hs.ggUpdatePosition=function (useTransition) {
		}
		el=me._left_=document.createElement('div');
		els=me._left___img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMwMEFFRUY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMi45NzAxMTVlLTAzIC0xIDEgMi45NzAxMTVlLTAzIC00Ljc0NTEyN2UtMDIgMzEuOTUyNCkiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjE5LDIzIDEyLDE2IDE5LDkgCSIv'+
			'Pg0KPC9nPg0KPC9zdmc+DQo=';
		me._left___img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;left_;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		ela=me._left___imga=document.createElement('img');
		ela.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJDQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDEgLTEuNTUzNTUyZS0wMyAxLjU1MzU1MmUtMDMgMSAtMi40ODM3NTJlLTAyIDIuNDg3NjE0ZS0wMikiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjE5LDIzIDEyLDE2'+
			'IDE5LDkgCSIvPg0KPC9nPg0KPC9zdmc+DQo=';
		me._left___imga.setAttribute('src',hs);
		ela.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;left_;');
		ela['ondragstart']=function() { return false; };
		el.appendChild(ela);
		el.ggId="left ";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: 2;';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -27px;';
		hs+='position : absolute;';
		hs+='top : -30px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._left_.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._left_.onmouseout=function (e) {
			me._left___imga.style.visibility='hidden';
		}
		me._left_.onmousedown=function (e) {
			me._left___imga.style.visibility='inherit';
		}
		me._left_.onmouseup=function (e) {
			me._left___imga.style.visibility='hidden';
		}
		me._left_.ggUpdatePosition=function (useTransition) {
		}
		me._left_hs.appendChild(me._left_);
		me.__div = me._left_hs;
	};
	function SkinHotspotClass_right_hs(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._right_hs=document.createElement('div');
		el.ggId="right hs";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 441px;';
		hs+='position : absolute;';
		hs+='top : 47px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._right_hs.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._right_hs.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._right_hs.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._right_hs.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._right_hs.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._right_hs.ggUpdatePosition=function (useTransition) {
		}
		el=me._right=document.createElement('div');
		els=me._right__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMwMEFFRUY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMy4wMDMwMDFlLTAzIC0xIDEgMy4wMDMwMDFlLTAzIC00Ljc5NzU4OGUtMDIgMzEuOTUxOSkiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjEzLDkgMjAsMTYgMTMsMjMgCSIv'+
			'Pg0KPC9nPg0KPC9zdmc+DQo=';
		me._right__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;right;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		ela=me._right__imga=document.createElement('img');
		ela.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJPGVsbGlwc2UgdHJhbnNmb3JtPSJtYXRyaXgoMi42MjYyMjBlLTAzIC0xIDEgMi42MjYyMjBlLTAzIC00LjE5NjQzNGUtMDIgMzEuOTU3OSkiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjEzLDkgMjAsMTYgMTMsMjMgCSIv'+
			'Pg0KPC9nPg0KPC9zdmc+DQo=';
		me._right__imga.setAttribute('src',hs);
		ela.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;right;');
		ela['ondragstart']=function() { return false; };
		el.appendChild(ela);
		el.ggId="right";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: 2;';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -29px;';
		hs+='position : absolute;';
		hs+='top : -29px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._right.onmouseout=function (e) {
			me._right__imga.style.visibility='hidden';
		}
		me._right.onmousedown=function (e) {
			me._right__imga.style.visibility='inherit';
		}
		me._right.onmouseup=function (e) {
			me._right__imga.style.visibility='hidden';
		}
		me._right.ggUpdatePosition=function (useTransition) {
		}
		me._right_hs.appendChild(me._right);
		me.__div = me._right_hs;
	};
	function SkinHotspotClass_down_hs(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._down_hs=document.createElement('div');
		el.ggId="down hs";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 239px;';
		hs+='position : absolute;';
		hs+='top : 39px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._down_hs.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._down_hs.onclick=function (e) {
			player.openUrl(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._down_hs.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._down_hs.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._down_hs.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._down_hs.ggUpdatePosition=function (useTransition) {
		}
		el=me._down=document.createElement('div');
		els=me._down__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiMwMEFFRUY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJDQoJCTxlbGxpcHNlIHRyYW5zZm9ybT0ibWF0cml4KDEgLTEuNDk3NTkzZS0wMyAxLjQ5NzU5M2UtMDMgMSAtMi4zOTQzNTRlLTAyIDIuMzk3OTQyZS0wMikiIGNsYXNzPSJzdDAiIGN4PSIxNiIgY3k9IjE2IiByeD0iMTUiIHJ5PSIxNSIvPg0KCTxwb2x5bGluZSBjbGFzcz0ic3QwIiBwb2ludHM9IjIzLDEzIDE2LDIw'+
			'IDksMTMgCSIvPg0KPC9nPg0KPC9zdmc+DQo=';
		me._down__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;down;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		ela=me._down__imga=document.createElement('img');
		ela.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9In'+
			'ByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO30NCjwvc3R5bGU+DQo8dGl0bGU+PC90aXRsZT4NCjxnIGlkPSJfMi1BcnJvd191cCI+DQoJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iMTYiIGN5PSIxNiIgcj0iMTUiLz4NCgk8cG9seWxpbmUgY2xhc3M9InN0MCIgcG9pbnRzPSIyMywxMyAxNiwyMCA5LDEzIAkiLz4NCjwvZz4NCjwvc3ZnPg0K';
		me._down__imga.setAttribute('src',hs);
		ela.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;down;');
		ela['ondragstart']=function() { return false; };
		el.appendChild(ela);
		el.ggId="down";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='z-index: 2;';
		hs+='cursor : pointer;';
		hs+='height : 60px;';
		hs+='left : -29px;';
		hs+='position : absolute;';
		hs+='top : -29px;';
		hs+='visibility : inherit;';
		hs+='width : 60px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._down.onmouseout=function (e) {
			me._down__imga.style.visibility='hidden';
		}
		me._down.onmousedown=function (e) {
			me._down__imga.style.visibility='inherit';
		}
		me._down.onmouseup=function (e) {
			me._down__imga.style.visibility='hidden';
		}
		me._down.ggUpdatePosition=function (useTransition) {
		}
		me._down_hs.appendChild(me._down);
		me.__div = me._down_hs;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='forward hs') {
			hotspot.skinid = 'forward hs';
			hsinst = new SkinHotspotClass_forward_hs(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='left hs') {
			hotspot.skinid = 'left hs';
			hsinst = new SkinHotspotClass_left_hs(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='right hs') {
			hotspot.skinid = 'right hs';
			hsinst = new SkinHotspotClass_right_hs(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		{
			hotspot.skinid = 'down hs';
			hsinst = new SkinHotspotClass_down_hs(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['forward hs']) {
			var i;
			for(i = 0; i < hotspotTemplates['forward hs'].length; i++) {
				hotspotTemplates['forward hs'][i] = null;
			}
		}
		if(hotspotTemplates['left hs']) {
			var i;
			for(i = 0; i < hotspotTemplates['left hs'].length; i++) {
				hotspotTemplates['left hs'][i] = null;
			}
		}
		if(hotspotTemplates['right hs']) {
			var i;
			for(i = 0; i < hotspotTemplates['right hs'].length; i++) {
				hotspotTemplates['right hs'][i] = null;
			}
		}
		if(hotspotTemplates['down hs']) {
			var i;
			for(i = 0; i < hotspotTemplates['down hs'].length; i++) {
				hotspotTemplates['down hs'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	me.skinTimerEvent();
};