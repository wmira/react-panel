/** @jsx React.DOM */
/*globals require,module */
"use strict";


var React = require("react");
var ReactWrapper = require("react-render-wrapper");
var Delegate =  require("dom-delegate");


var createToolboxActions = function(props) {
    var toolboxDefs =props.toolbox || [];

    return toolboxDefs.map( (toolbox)  => {
        return (<a key={toolbox["data-action-name"]}><i {...toolbox}></i></a>)
    });
};

var Header = React.createClass({

    render : function() {
        var icon = null;
        if ( this.props.titleIcon ) {
            icon = (<i className={"rpanel-title-icon " + this.props.titleIcon} />);
        }
        
        var toolbox = null;
        if ( this.props.toolbox ) {
            toolbox = this.props.toolbox;
        }
        return (<div className="rpanel-header">
            <div className="rpanel-title-cont">
                {icon}
                <span className="rpanel-title">{this.props.title}</span>
            </div>
            <div className="rpanel-toolbox">
                {createToolboxActions(this.props)}
            </div>
        </div>)
    }
});


/**
 * 
 * Checks contentEl or Children or htmlStr props.
 *
 *  
 * @type {*|Function}
 */
var Body = React.createClass({
    
   
    
    render : function() {
        
        var reactEl = this.props.contentEl || this.props.children;
        var htmlStr = this.props.contentStr;

        var content = null;

        if ( reactEl && reactEl.length > 0  && (htmlStr !== undefined) ) {
            content =  (<span>{"You can't have children and htmlStr as body at the same time."}</span>);
        } else if ( htmlStr !== undefined  ) {
            content = <div ref="el" dangerouslySetInnerHTML={{__html: htmlStr}} />
        } else if (  reactEl  ) {
            content = reactEl;
        } else {
            content = <div ref={"el"}></div>
        }

        return (<div style={this.props.style} className="rpanel-body">
            {content}
        </div>)
    }
});


/**
 * 
 * 
 * 

 *  
 * @type {*|Function}
 */
var Panel = React.createClass({

    _clickListener : function(e) {
        if ( this.props.clickListener ) {
            this.props.clickListener(e);
        }
    },
    componentWillUnmount : function() {
        this.state.delegate.destroy();
        this.getDOMNode().removeEventListener("click",this._clickListener);
    },
    /**
     * Attach delegates
     *
     */
    componentDidMount : function() {
        this.setState({delegate :new  Delegate(this.getDOMNode())});
        this.getDOMNode().addEventListener("click",this._clickListener);
    },
    /**
     *
     * @returns {XML}
     */
    render : function() {

        return (
            <div className="rpanel-container">
                <Header {...this.props}  />
                <Body {...this.props} ref={"body"}>
                </Body>
            </div>
        )
    },

    bodyEl : function() {
        return this.refs['body'].refs['el'].getDOMNode();
    },

    /**
     * 
     *  
     * @param eventType
     * @param selector
     * @param handler
     * @param useCapture
     */
    on : function(eventType, selector, handler, useCapture) {
        this.state.delegate.on(eventType,selector,handler,useCapture);
    },

    /**
     *
     */
    off :  function(eventType, selector, handler, useCapture) {
        this.state.delegate.off(eventType,selector,handler,useCapture);
    },

    /**
     * Finds and returns the element at the given bodyEl.
     *
     *  
     * @param selector
     */
    el : function(selector) {
        
        var bodyEl = this.bodyEl();
        
        if ( bodyEl) {
            return bodyEl.querySelector(selector);
        }
        
    }
    
});

module.exports = ReactWrapper(React,Panel);


/*
var P = React.createClass({
    
    
    render: function() {
        
        
        return (
            <Panel >
                <Header title={} subTitle={} actionIcons={}></Header>
                <Body></Body>
                <Footer></Body>
            </Panel>
        );
        
    }
    
});*/