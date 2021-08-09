import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

// FUNCTIONAL PROGRAMMING
// USE PURE FUNCTIONS ALMOST EXCLUSIVELY
// IE functions that create and return values based on inputs
// and cause no side effects
// 
// IDEALLY NO SIDE EFFECTS AS MUCH AS POSSIBLE
// TRY AND CONTROL THEM WHERE NECCESSARY

const {div, button} = hh(h);

const initModel = 0;

// VIEW function creates a view 
// based on model parameter and passed in dispatch function
// which are called on click, function is pure 
function view(dispatch, model){
    return div([
        div({className: 'mv2'},`Count: ${model}`),
        button({className: 'pv1 ph2 mr2', onclick: () => dispatch(MSGS.ADD)},'+'),
        button({className: 'pv1 ph2 mr2', onclick: () => dispatch(MSGS.SUBTRACT)},'-'),
    ])
}
// MSGS object
const MSGS = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
  };

// pure function that takes message and model
// and returns an amended model value
function update(msg, model) {
    switch (msg) {
      case MSGS.ADD:
        return model + 1;
      case MSGS.SUBTRACT: 
        return model - 1;
      default:
        return model;
    }
  }

// impure code

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  // create a rootNode with createElement
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch (msg){
   
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    // determines what has changed using virtualDOM library
    const patches = diff(currentView, updatedView);
    // patch changes from patches variable to rootNode
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById('app')

app(initModel, update, view, rootNode)
// rootNode.appendChild(view(update(MSGS.ADD, initModel)))