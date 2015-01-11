(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Panel"] = factory(require("react"));
	else
		root["Panel"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/*globals require,module */
	"use strict";


	var React = __webpack_require__(1);
	var ReactWrapper = __webpack_require__(2);

	var createToolboxActions = function(props) {
	    var toolboxDefs =props.toolbox || [];

	    return toolboxDefs.map( function(toolbox)   {

	        return (React.createElement("a", {key: toolbox["data-action-name"]}, React.createElement("i", React.__spread({},  toolbox))))
	    });
	}
	var Header = React.createClass({displayName: "Header",

	    render : function() {
	        var icon = null;
	        if ( this.props.titleIcon ) {
	            icon = (React.createElement("i", {className: "rpanel-title-icon " + this.props.titleIcon}));
	        }
	        
	        var toolbox = null;
	        if ( this.props.toolbox ) {
	            toolbox = this.props.toolbox;
	        }
	        return (React.createElement("div", {className: "rpanel-header"}, 
	            React.createElement("div", {className: "rpanel-title-cont"}, 
	                icon, 
	                React.createElement("span", {className: "rpanel-title"}, this.props.title)
	            ), 
	            React.createElement("div", {className: "rpanel-toolbox"}, 
	                createToolboxActions(this.props)
	            )
	        ))
	    }
	});

	/*
	var ToolBox = React.createClass({
	    
	    
	});
	*/
	var Body = React.createClass({displayName: "Body",
	    
	   
	    
	    render : function() {
	        
	        var reactEl = this.props.contentEl;
	        var htmlStr = this.props.contentStr;
	        
	        var content = null;
	        
	        if ( reactEl && (htmlStr !== undefined) ) {
	            return (React.createElement("span", null, "reactEl or htmlStr, only one should be set not both."));
	        } else if ( reactEl ) {
	            content = reactEl;
	        } else if ( htmlStr !== undefined ) {
	            content = React.createElement("div", {dangerouslySetInnerHTML: {__html: htmlStr}}) 
	        } else {
	            content =
	            (React.createElement("div", {ref: "el"}
	            ))
	            
	        }
	        
	        return (React.createElement("div", {style: this.props.style, className: "rpanel-body"}, 
	            content
	        ))
	    }
	});

	var Panel = React.createClass({displayName: "Panel",

	    _clickListener : function(e) {
	        if ( this.props.clickListener ) {
	            this.props.clickListener(e);
	        }
	    },
	    componentDidMount : function() {

	        this.getDOMNode().addEventListener("click", this._clickListener);
	    },
	    /**
	     *
	     * @returns {XML}
	     */
	    render : function() {

	        return (
	            React.createElement("div", {className: "rpanel-container"}, 
	                React.createElement(Header, React.__spread({},  this.props)), 
	                React.createElement(Body, {style: this.props.style, contentEl: this.props.contentEl, contentStr: this.props.contentStr, ref: "body"})
	            )
	        )
	    },

	    bodyEl : function() {
	        return this.refs['body'].refs['el'].getDOMNode();
	    }
	});

	module.exports = ReactWrapper(React,Panel);

	/*<a href=""><i className={"fa fa-refresh"}></i></a>
	 <a href=""><i className={"fa fa-chevron-down"}></i></a> */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*globals require,module,React */
	"use strict";

	/**
	 * React instance creation is a bit noisy. Use this on react a library such
	 * that its more direct to the point when creating new instance. E.g.
	 *
	   React.render(React.createElement(ViewPager,{ views : ["page11","page22","page33"], visible:"page11"}),
	            document.getElementById("viewpager-container2"));
	 * 
	 * to something like
	 *
	 * ViewPager.render({ views : ["page1","page2","page3"], visible:"page1"},"viewpager-container");
	 * or
	 * ViewPager.render("viewpager-container");
	 * 
	 * If your are exposing a library then :
	 * 
	 * var renderWrapper = require("react-render");
	 * var MyReactComponent = React.createClass... 
	 * 
	 * module.exports = renderWrapper(React,MyReactComponent)
	 *
	 */

	/**
	 * 
	 * Shortcut to React.createElement(cls,option) 
	 *
	 */
	var elWrapper = function(React,ReactClass,option) {
	    return React.createElement(ReactClass,option);
	};
	    
	var renderWrapper = function(React,ReactClass,options,el) {
	    
	    var ouroption = {};
	    //if he passed an html element or a string on the first argument
	    //then we assume he wants no options
	    var ourEl = null;
	    
	    //check if its actually an element
	    if ( ( options.tagName && options.nodeName && (typeof options.nodeType === 'number') ) 
	        || ( typeof options === 'string' ) ) {
	        ourEl = options;
	    } else {
	        ouroption = options;
	        ourEl = ( typeof el === 'string') ? document.getElementById(el) : el;
	    }

	    return React.render(elWrapper(React,ReactClass,ouroption), ourEl);
	};

	var RenderWrapper = function(React,ReactClass) {

	    return {
	        cls : ReactClass,
	        el : function(options) {
	            return elWrapper(React,ReactClass,options);
	        },
	        render : function(options,el) {
	            return renderWrapper(React,ReactClass,options,el)
	        }
	    }

	};

	module.exports = RenderWrapper;


/***/ }
/******/ ])
});
