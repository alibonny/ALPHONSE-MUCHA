
/* jquery.scrollex v0.2.1 | (c) @ajlkn | github.com/ajlkn/jquery.scrollex | MIT licensed */
!function(t){function e(t,e,n){return"string"==typeof t&&("%"==t.slice(-1)?t=parseInt(t.substring(0,t.length-1))/100*e:"vh"==t.slice(-2)?t=parseInt(t.substring(0,t.length-2))/100*n:"px"==t.slice(-2)&&(t=parseInt(t.substring(0,t.length-2)))),t}var n=t(window),i=1,o={};n.on("scroll",function(){var e=n.scrollTop();t.map(o,function(t){window.clearTimeout(t.timeoutId),t.timeoutId=window.setTimeout(function(){t.handler(e)},t.options.delay)})}).on("load",function(){n.trigger("scroll")}),jQuery.fn.scrollex=function(l){var s=t(this);if(0==this.length)return s;if(this.length>1){for(var r=0;r<this.length;r++)t(this[r]).scrollex(l);return s}if(s.data("_scrollexId"))return s;var a,u,h,c,p;switch(a=i++,u=jQuery.extend({top:0,bottom:0,delay:0,mode:"default",enter:null,leave:null,initialize:null,terminate:null,scroll:null},l),u.mode){case"top":h=function(t,e,n,i,o){return t>=i&&o>=t};break;case"bottom":h=function(t,e,n,i,o){return n>=i&&o>=n};break;case"middle":h=function(t,e,n,i,o){return e>=i&&o>=e};break;case"top-only":h=function(t,e,n,i,o){return i>=t&&n>=i};break;case"bottom-only":h=function(t,e,n,i,o){return n>=o&&o>=t};break;default:case"default":h=function(t,e,n,i,o){return n>=i&&o>=t}}return c=function(t){var i,o,l,s,r,a,u=this.state,h=!1,c=this.$element.offset();i=n.height(),o=t+i/2,l=t+i,s=this.$element.outerHeight(),r=c.top+e(this.options.top,s,i),a=c.top+s-e(this.options.bottom,s,i),h=this.test(t,o,l,r,a),h!=u&&(this.state=h,h?this.options.enter&&this.options.enter.apply(this.element):this.options.leave&&this.options.leave.apply(this.element)),this.options.scroll&&this.options.scroll.apply(this.element,[(o-r)/(a-r)])},p={id:a,options:u,test:h,handler:c,state:null,element:this,$element:s,timeoutId:null},o[a]=p,s.data("_scrollexId",p.id),p.options.initialize&&p.options.initialize.apply(this),s},jQuery.fn.unscrollex=function(){var e=t(this);if(0==this.length)return e;if(this.length>1){for(var n=0;n<this.length;n++)t(this[n]).unscrollex();return e}var i,l;return(i=e.data("_scrollexId"))?(l=o[i],window.clearTimeout(l.timeoutId),delete o[i],e.removeData("_scrollexId"),l.options.terminate&&l.options.terminate.apply(this),e):e}}(jQuery);

/* skel.js v3.0.2-dev | (c) skel.io | MIT licensed */
var skel=function(){"use strict";var t={breakpointIds:null,events:{},isInit:!1,obj:{attachments:{},breakpoints:{},head:null,states:{}},sd:"/",state:null,stateHandlers:{},stateId:"",vars:{},DOMReady:null,indexOf:null,isArray:null,iterate:null,matchesMedia:null,extend:function(e,n){t.iterate(n,function(i){t.isArray(n[i])?(t.isArray(e[i])||(e[i]=[]),t.extend(e[i],n[i])):"object"==typeof n[i]?("object"!=typeof e[i]&&(e[i]={}),t.extend(e[i],n[i])):e[i]=n[i]})},newStyle:function(t){var e=document.createElement("style");return e.type="text/css",e.innerHTML=t,e},_canUse:null,canUse:function(e){t._canUse||(t._canUse=document.createElement("div"));var n=t._canUse.style,i=e.charAt(0).toUpperCase()+e.slice(1);return e in n||"Moz"+i in n||"Webkit"+i in n||"O"+i in n||"ms"+i in n},on:function(e,n){var i=e.split(/[\s]+/);return t.iterate(i,function(e){var a=i[e];if(t.isInit){if("init"==a)return void n();if("change"==a)n();else{var r=a.charAt(0);if("+"==r||"!"==r){var o=a.substring(1);if(o in t.obj.breakpoints)if("+"==r&&t.obj.breakpoints[o].active)n();else if("!"==r&&!t.obj.breakpoints[o].active)return void n()}}}t.events[a]||(t.events[a]=[]),t.events[a].push(n)}),t},trigger:function(e){if(t.events[e]&&0!=t.events[e].length)return t.iterate(t.events[e],function(n){t.events[e][n]()}),t},breakpoint:function(e){return t.obj.breakpoints[e]},breakpoints:function(e){function n(t,e){this.name=this.id=t,this.media=e,this.active=!1,this.wasActive=!1}return n.prototype.matches=function(){return t.matchesMedia(this.media)},n.prototype.sync=function(){this.wasActive=this.active,this.active=this.matches()},t.iterate(e,function(i){t.obj.breakpoints[i]=new n(i,e[i])}),window.setTimeout(function(){t.poll()},0),t},addStateHandler:function(e,n){t.stateHandlers[e]=n},callStateHandler:function(e){var n=t.stateHandlers[e]();t.iterate(n,function(e){t.state.attachments.push(n[e])})},changeState:function(e){t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].sync()}),t.vars.lastStateId=t.stateId,t.stateId=e,t.breakpointIds=t.stateId===t.sd?[]:t.stateId.substring(1).split(t.sd),t.obj.states[t.stateId]?t.state=t.obj.states[t.stateId]:(t.obj.states[t.stateId]={attachments:[]},t.state=t.obj.states[t.stateId],t.iterate(t.stateHandlers,t.callStateHandler)),t.detachAll(t.state.attachments),t.attachAll(t.state.attachments),t.vars.stateId=t.stateId,t.vars.state=t.state,t.trigger("change"),t.iterate(t.obj.breakpoints,function(e){t.obj.breakpoints[e].active?t.obj.breakpoints[e].wasActive||t.trigger("+"+e):t.obj.breakpoints[e].wasActive&&t.trigger("-"+e)})},generateStateConfig:function(e,n){var i={};return t.extend(i,e),t.iterate(t.breakpointIds,function(e){t.extend(i,n[t.breakpointIds[e]])}),i},getStateId:function(){var e="";return t.iterate(t.obj.breakpoints,function(n){var i=t.obj.breakpoints[n];i.matches()&&(e+=t.sd+i.id)}),e},poll:function(){var e="";e=t.getStateId(),""===e&&(e=t.sd),e!==t.stateId&&t.changeState(e)},_attach:null,attach:function(e){var n=t.obj.head,i=e.element;return(!i.parentNode||!i.parentNode.tagName)&&(t._attach||(t._attach=n.firstChild),n.insertBefore(i,t._attach.nextSibling),e.permanent&&(t._attach=i),!0)},attachAll:function(e){var n=[];t.iterate(e,function(t){n[e[t].priority]||(n[e[t].priority]=[]),n[e[t].priority].push(e[t])}),n.reverse(),t.iterate(n,function(e){t.iterate(n[e],function(i){t.attach(n[e][i])})})},detach:function(t){var e=t.element;return!(t.permanent||!e.parentNode||e.parentNode&&!e.parentNode.tagName)&&(e.parentNode.removeChild(e),!0)},detachAll:function(e){var n={};t.iterate(e,function(t){n[e[t].id]=!0}),t.iterate(t.obj.attachments,function(e){e in n||t.detach(t.obj.attachments[e])})},attachment:function(e){return e in t.obj.attachments?t.obj.attachments[e]:null},newAttachment:function(e,n,i,a){return t.obj.attachments[e]={id:e,element:n,priority:i,permanent:a}},init:function(){t.initMethods(),t.initVars(),t.initEvents(),t.obj.head=document.getElementsByTagName("head")[0],t.isInit=!0,t.trigger("init")},initEvents:function(){t.on("resize",function(){t.poll()}),t.on("orientationChange",function(){t.poll()}),t.DOMReady(function(){t.trigger("ready")}),window.onload&&t.on("load",window.onload),window.onload=function(){t.trigger("load")},window.onresize&&t.on("resize",window.onresize),window.onresize=function(){t.trigger("resize")},window.onorientationchange&&t.on("orientationChange",window.onorientationchange),window.onorientationchange=function(){t.trigger("orientationChange")}},initMethods:function(){document.addEventListener?!function(e,n){t.DOMReady=n()}("domready",function(){function t(t){for(r=1;t=n.shift();)t()}var e,n=[],i=document,a="DOMContentLoaded",r=/^loaded|^c/.test(i.readyState);return i.addEventListener(a,e=function(){i.removeEventListener(a,e),t()}),function(t){r?t():n.push(t)}}):!function(e,n){t.DOMReady=n()}("domready",function(t){function e(t){for(h=1;t=i.shift();)t()}var n,i=[],a=!1,r=document,o=r.documentElement,s=o.doScroll,c="DOMContentLoaded",d="addEventListener",u="onreadystatechange",l="readyState",f=s?/^loaded|^c/:/^loaded|c/,h=f.test(r[l]);return r[d]&&r[d](c,n=function(){r.removeEventListener(c,n,a),e()},a),s&&r.attachEvent(u,n=function(){/^c/.test(r[l])&&(r.detachEvent(u,n),e())}),t=s?function(e){self!=top?h?e():i.push(e):function(){try{o.doScroll("left")}catch(n){return setTimeout(function(){t(e)},50)}e()}()}:function(t){h?t():i.push(t)}}),Array.prototype.indexOf?t.indexOf=function(t,e){return t.indexOf(e)}:t.indexOf=function(t,e){if("string"==typeof t)return t.indexOf(e);var n,i,a=e?e:0;if(!this)throw new TypeError;if(i=this.length,0===i||a>=i)return-1;for(a<0&&(a=i-Math.abs(a)),n=a;n<i;n++)if(this[n]===t)return n;return-1},Array.isArray?t.isArray=function(t){return Array.isArray(t)}:t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},Object.keys?t.iterate=function(t,e){if(!t)return[];var n,i=Object.keys(t);for(n=0;i[n]&&e(i[n],t[i[n]])!==!1;n++);}:t.iterate=function(t,e){if(!t)return[];var n;for(n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])===!1)break},window.matchMedia?t.matchesMedia=function(t){return""==t||window.matchMedia(t).matches}:window.styleMedia||window.media?t.matchesMedia=function(t){if(""==t)return!0;var e=window.styleMedia||window.media;return e.matchMedium(t||"all")}:window.getComputedStyle?t.matchesMedia=function(t){if(""==t)return!0;var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],i=null;e.type="text/css",e.id="matchmediajs-test",n.parentNode.insertBefore(e,n),i="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle;var a="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=a:e.textContent=a,"1px"===i.width}:t.matchesMedia=function(t){if(""==t)return!0;var e,n,i,a,r={"min-width":null,"max-width":null},o=!1;for(i=t.split(/\s+and\s+/),e=0;e<i.length;e++)n=i[e],"("==n.charAt(0)&&(n=n.substring(1,n.length-1),a=n.split(/:\s+/),2==a.length&&(r[a[0].replace(/^\s+|\s+$/g,"")]=parseInt(a[1]),o=!0));if(!o)return!1;var s=document.documentElement.clientWidth,c=document.documentElement.clientHeight;return!(null!==r["min-width"]&&s<r["min-width"]||null!==r["max-width"]&&s>r["max-width"]||null!==r["min-height"]&&c<r["min-height"]||null!==r["max-height"]&&c>r["max-height"])},navigator.userAgent.match(/MSIE ([0-9]+)/)&&RegExp.$1<9&&(t.newStyle=function(t){var e=document.createElement("span");return e.innerHTML='&nbsp;<style type="text/css">'+t+"</style>",e})},initVars:function(){var e,n,i,a=navigator.userAgent;e="other",n=0,i=[["firefox",/Firefox\/([0-9\.]+)/],["bb",/BlackBerry.+Version\/([0-9\.]+)/],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/],["opera",/OPR\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)/],["edge",/Edge\/([0-9\.]+)/],["safari",/Version\/([0-9\.]+).+Safari/],["chrome",/Chrome\/([0-9\.]+)/],["ie",/MSIE ([0-9]+)/],["ie",/Trident\/.+rv:([0-9]+)/]],t.iterate(i,function(t,i){if(a.match(i[1]))return e=i[0],n=parseFloat(RegExp.$1),!1}),t.vars.browser=e,t.vars.browserVersion=n,e="other",n=0,i=[["ios",/([0-9_]+) like Mac OS X/,function(t){return t.replace("_",".").replace("_","")}],["ios",/CPU like Mac OS X/,function(t){return 0}],["wp",/Windows Phone ([0-9\.]+)/,null],["android",/Android ([0-9\.]+)/,null],["mac",/Macintosh.+Mac OS X ([0-9_]+)/,function(t){return t.replace("_",".").replace("_","")}],["windows",/Windows NT ([0-9\.]+)/,null],["bb",/BlackBerry.+Version\/([0-9\.]+)/,null],["bb",/BB[0-9]+.+Version\/([0-9\.]+)/,null]],t.iterate(i,function(t,i){if(a.match(i[1]))return e=i[0],n=parseFloat(i[2]?i[2](RegExp.$1):RegExp.$1),!1}),t.vars.os=e,t.vars.osVersion=n,t.vars.IEVersion="ie"==t.vars.browser?t.vars.browserVersion:99,t.vars.touch="wp"==t.vars.os?navigator.msMaxTouchPoints>0:!!("ontouchstart"in window),t.vars.mobile="wp"==t.vars.os||"android"==t.vars.os||"ios"==t.vars.os||"bb"==t.vars.os}};return t.init(),t}();!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.skel=e()}(this,function(){return skel});

/*TIMELINE*/
(function ($) {
	$.fn.timeline = function () {
		var selectors = {
			id: $(this),
			item: $(this).find(".timeline-item"),
			activeClass: "timeline-item--active",
			img: ".timeline__img"
		};
  
		// Imposta il primo elemento come attivo
		selectors.item.eq(0).addClass(selectors.activeClass);
		selectors.id.css("background-image", "url(" + selectors.item.first().find(selectors.img).attr("src") + ")");
  
		var itemLength = selectors.item.length;
  
		$(window).scroll(function () {
			var pos = $(this).scrollTop(); // Ottieni la posizione dello scroll
  
			selectors.item.each(function (i) {
				var min = $(this).offset().top - $(window).height() / 2;
				var max = min + $(this).height();
				
				console.log(`Elemento ${i}: min=${min}, max=${max}, pos=${pos}`);
  
				if (pos >= min && pos <= max) {
					console.log(`Attivazione elemento ${i}`);
					selectors.id.css("background-image", "url(" + $(this).find(selectors.img).attr('src') + ")");
					selectors.item.removeClass(selectors.activeClass);
					$(this).addClass(selectors.activeClass);
				}
			});
		});
	};
  })(jQuery);
  
  // Inizializza la funzione sulla timeline
  $(document).ready(function () {
	$("#timeline-1").timeline();
  });
  

/*Hielo by TEMPLATED*/
var settings = {

	banner: {

		// Indicators (= the clickable dots at the bottom).
			indicators: true,

		// Transition speed (in ms)
		// For timing purposes only. It *must* match the transition speed of "#banner > article".
			speed: 1500,

		// Transition delay (in ms)
			delay: 5000,

		// Parallax intensity (between 0 and 1; higher = more intense, lower = less intense; 0 = off)
			parallax: 0.25

	}

};

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			skel.on('change', function() {

				if (skel.breakpoint('medium').active)
					(off)();
				else
					(on)();

			});

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	/**
	 * Custom banner slider for Slate.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._slider = function(options) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._slider(options);

			return $this;

		}

		// Vars.
			var	current = 0, pos = 0, lastPos = 0,
				slides = [], indicators = [],
				$indicators,
				$slides = $this.children('article'),
				intervalId,
				isLocked = false,
				i = 0;

		// Turn off indicators if we only have one slide.
			if ($slides.length == 1)
				options.indicators = false;

		// Functions.
			$this._switchTo = function(x, stop) {

				if (isLocked || pos == x)
					return;

				isLocked = true;

				if (stop)
					window.clearInterval(intervalId);

				// Update positions.
					lastPos = pos;
					pos = x;

				// Hide last slide.
					slides[lastPos].removeClass('top');

					if (options.indicators)
						indicators[lastPos].removeClass('visible');

				// Show new slide.
					slides[pos].addClass('visible').addClass('top');

					if (options.indicators)
						indicators[pos].addClass('visible');

				// Finish hiding last slide after a short delay.
					window.setTimeout(function() {

						slides[lastPos].addClass('instant').removeClass('visible');

						window.setTimeout(function() {

							slides[lastPos].removeClass('instant');
							isLocked = false;

						}, 100);

					}, options.speed);

			};

		// Indicators.
			if (options.indicators)
				$indicators = $('<ul class="indicators"></ul>').appendTo($this);

		// Slides.
			$slides
				.each(function() {

					var $slide = $(this),
						$img = $slide.find('img');

					// Slide.
						$slide
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', ($slide.data('position') ? $slide.data('position') : 'center'));

					// Add to slides.
						slides.push($slide);

					// Indicators.
						if (options.indicators) {

							var $indicator_li = $('<li>' + i + '</li>').appendTo($indicators);

							// Indicator.
								$indicator_li
									.data('index', i)
									.on('click', function() {
										$this._switchTo($(this).data('index'), true);
									});

							// Add to indicators.
								indicators.push($indicator_li);

						}

					i++;

				})
				._parallax(options.parallax);

		// Initial slide.
			slides[pos].addClass('visible').addClass('top');

			if (options.indicators)
				indicators[pos].addClass('visible');

		// Bail if we only have a single slide.
			if (slides.length == 1)
				return;

		// Main loop.
			intervalId = window.setInterval(function() {

				current++;

				if (current >= slides.length)
					current = 0;

				$this._switchTo(current);

			}, options.delay);

	};

	$(function() {

		var	$window 	= $(window),
			$body 		= $('body'),
			$header 	= $('#header'),
			$banner 	= $('.banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Banner.
			$banner._slider(settings.banner);

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

			}

	});

})(jQuery);