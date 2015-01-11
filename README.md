react-panel
========================

A Panel component written in React.

Click here for the demo see index.html for usage.

## Development

1. npm install -g live-server
2. no

## How to use

```javascript
    var panel1 = Panel.render({ contentStr:document.getElementById("content1").innerHTML, title: "Panel Demo 1"},"panel1");
    var panel2 = Panel.render({ contentStr:document.getElementById("content2").innerHTML, title: "Enter Some Form Values"},"panel2");
    
    var toolboxActions =  [
        { title: "Reload", className: "fa fa-refresh", "data-action-name" : "reload" },
        { title: "Hide", className: "fa fa-chevron-down", "data-action-name" : "hide" }
    ];
    
    var actionListener = function(e) {
        alert("on click: " + e.target.getAttribute("data-action-name"));
    };
    
    var Panel3 = Panel.render({ titleIcon: "fa fa-bar-chart", clickListener:actionListener, toolbox: toolboxActions, 
        contentStr:document.getElementById("content1").innerHTML, title:
            "Panel Toolbox Demo"},"panel3");
```

