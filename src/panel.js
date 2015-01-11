/** @jsx React.DOM */
/*globals require,module */
"use strict";


var React = require("react");
var ReactWrapper = require("react-render-wrapper");

var createToolboxActions = function(props) {
    var toolboxDefs =props.toolbox || [];

    return toolboxDefs.map( (toolbox)  => {

        return (<a key={toolbox["data-action-name"]}><i {...toolbox}></i></a>)
    });
}
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

/*
var ToolBox = React.createClass({
    
    
});
*/
var Body = React.createClass({
    
   
    
    render : function() {
        
        var reactEl = this.props.contentEl;
        var htmlStr = this.props.contentStr;
        
        var content = null;
        
        if ( reactEl && (htmlStr !== undefined) ) {
            return (<span>{"reactEl or htmlStr, only one should be set not both."}</span>);
        } else if ( reactEl ) {
            content = reactEl;
        } else if ( htmlStr !== undefined ) {
            content = <div dangerouslySetInnerHTML={{__html: htmlStr}} /> 
        } else {
            content =
            (<div ref={"el"}>
            </div>)
            
        }
        
        return (<div style={this.props.style} className="rpanel-body">
            {content}
        </div>)
    }
});

var Panel = React.createClass({

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
            <div className="rpanel-container">
                <Header {...this.props}  />
                <Body style={this.props.style} contentEl={this.props.contentEl} contentStr={this.props.contentStr} ref={"body"} />
            </div>
        )
    },

    bodyEl : function() {
        return this.refs['body'].refs['el'].getDOMNode();
    }
});

module.exports = ReactWrapper(React,Panel);

/*<a href=""><i className={"fa fa-refresh"}></i></a>
 <a href=""><i className={"fa fa-chevron-down"}></i></a> */