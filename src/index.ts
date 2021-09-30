import { Calculator } from './Calculator';
import { XmlRpcRequest } from "./mimic";
import { FileChange,
         DataTypes 
} from './fileChange';

import {
  ProvenanceGraph,
  ProvenanceTracker,
  ProvenanceGraphTraverser,
  ActionFunctionRegistry,
  ProvenanceSlide,
  ProvenanceSlidedeck,
  ProvenanceSlidedeckPlayer,
  serializeProvenanceGraph,
  restoreProvenanceGraph,
  SerializedProvenanceGraph
} from '@visualstorytelling/provenance-core';

import { ProvenanceTreeVisualization } from '@visualstorytelling/provenance-tree-visualization';

import { SlideDeckVisualization } from '@visualstorytelling/slide-deck-visualization';

import 'normalize.css';
import './style.scss';
import '@visualstorytelling/slide-deck-visualization/dist/bundle.css';
import * as io from "socket.io-client";
// import { restoreProvenanceGraph } from '../@visualstorytelling_old/provenance-core/dist/types/ProvenanceGraph';
// import { SerializedProvenanceGraph } from '../@visualstorytelling_old/provenance-core/dist/types/api';
// import './fileChange.ts';


const visDiv: HTMLDivElement = document.getElementById('vis') as HTMLDivElement;

// const stateDiv: HTMLDivElement = document.getElementById(
//   'state',
// ) as HTMLDivElement;

// var actionsDiv: HTMLDivElement = document.getElementById('actionsDiv') as HTMLDivElement;

const saveDivBtn: HTMLButtonElement = document.getElementById(
     'Save',) as HTMLButtonElement;

// const loadDivBtn: HTMLButtonElement = document.getElementById(
//       'file-input',) as HTMLButtonElement;     

// const updateCommentBtn: HTMLButtonElement = document.getElementById(
//   'makeComment',) as HTMLButtonElement;
// const updateJumpBtn: HTMLButtonElement = document.getElementById(
//   'makeJump',) as HTMLButtonElement;
// const updateColorBtn: HTMLButtonElement = document.getElementById(
//   'makeColor',) as HTMLButtonElement;
// const updateUndoBtn: HTMLButtonElement = document.getElementById(
//   'makeUndo',) as HTMLButtonElement;

  
// const graph = new ProvenanceGraph({ name: 'calculator', version: '1.0.0' });
// const calculator = new Calculator(graph, registry, tracker, traverser);
let graph = new ProvenanceGraph({ name: 'FileChange', version: '1.0.0' });
const registry = new ActionFunctionRegistry();
const tracker = new ProvenanceTracker(registry, graph);
const traverser = new ProvenanceGraphTraverser(registry, graph);


let player: ProvenanceSlidedeckPlayer<ProvenanceSlide>;
const playBtn: HTMLButtonElement = document.getElementById(
  'play',
) as HTMLButtonElement;


// Setup named pipe with server
console.log("Try to logon...");
var socket = io.connect('http://localhost:8082');

socket.on("connected", function(data: any) {
    console.log("Connected User?", data.accept);
});
// var viewlock = true;


var requestFile = socket.on("fileChanged", async (data: string) => {
    //$("#dataFile").html(data + "<br/>");
	console.log("Data: " + data);
    console.log("typeof data: " + typeof data);
    if (data && data.length !== 0 ) {
        console.log(data);     
        let newNode = new DataTypes(data);
        // Node operations:
        if (newNode.type == 'comment_changed' || newNode.type == 'comment_remove' ) {
            const node = await tracker.applyAction({      
                do: 'CommentUpdated',
                doArguments: [newNode.address, newNode.newComment, newNode.functionAddr],
                undo: 'CommentUpdated',           
                undoArguments: [newNode.address, newNode.oldComment, newNode.functionAddr],      
                metadata: {
                  createdBy: 'me',
                  createdOn: 'now',
                  tags: [],
                  userIntent: 'comment',
                },
            }, true);
            node.label = "Comment: "+ newNode.address;
        } 
        else if (newNode.type == 'view') {
            const node = await tracker.applyAction({       
                do: 'view',
                doArguments: [newNode.address, newNode.view],
                undo: 'view',
                undoArguments: [newNode.oldaddress, newNode.oldview],
                metadata: {
                  createdBy: 'me',
                  createdOn: 'now',
                  tags: [],
                  userIntent: 'view',
                },
            }, true);
            node.label = "view " + newNode.view + " " + newNode.address;
        }
        else if (newNode.type == 'func_name_updated') {
          console.log("Func_name_updated");
            const node = await tracker.applyAction({      
                do: 'FuncNameUpdate',
                doArguments: [newNode.address, newNode.newFuncName],
                undo: 'FuncNameUpdate',           
                undoArguments: [newNode.address, newNode.oldFuncName],      
                metadata: {
                  createdBy: 'me',
                  createdOn: 'now',
                  tags: [],
                  userIntent: 'func_name_updated',
                }, 
            }, true);
            node.label = "FuncName: " + newNode.newFuncName;
        }
        else if (newNode.type == 'func_name_type_updated') {
          console.log("Func_name_type_updated");
            const node = await tracker.applyAction({      
                do: 'FuncNameTypeUpdate',
                doArguments: [newNode.address, newNode.newFuncName, newNode.newFuncType],
                undo: 'FuncNameTypeUpdate',           
                undoArguments: [newNode.address, newNode.oldFuncName, newNode.oldFuncType],      
                metadata: {
                  createdBy: 'me',
                  createdOn: 'now',
                  tags: [],
                  userIntent: 'func_name_type_updated',
                }, 
            }, true);
            node.label = "FuncNameType: " + newNode.newFuncName + " " + newNode.newFuncType;
        }
        else if (newNode.type == 'func_type_updated') {
          console.log("Func_type_updated");
            const node = await tracker.applyAction({      
                do: 'FuncTypeUpdate',
                doArguments: [newNode.address, newNode.newFuncType],
                undo: 'FuncTypeUpdate',           
                undoArguments: [newNode.address, newNode.oldFuncType],      
                metadata: {
                  createdBy: 'me',
                  createdOn: 'now',
                  tags: [],
                  userIntent: 'func_type_updated',
                }, 
            }, true);
            node.label = "FuncType: " + newNode.newFuncType;
        }
        else if (newNode.type == 'func_removed') {
          const node = await tracker.applyAction({      
              do: 'undefineFunc',
              doArguments: [newNode.functionAddr],
              undo: 'defineFunc',           
              undoArguments: [newNode.functionName, newNode.functionAddr],      
              metadata: {
                createdBy: 'me',
                createdOn: 'now',
                tags: [],
                userIntent: 'func_removed',
              }, 
          }, true);
          node.label = "UndefineFunc: "+newNode.functionAddr;
        }
        else if (newNode.type == 'func_added') {
          const node = await tracker.applyAction({      
              do: 'defineFunc',
              doArguments: [newNode.functionName, newNode.functionAddr],
              undo: 'undefineFunc',           
              undoArguments: [newNode.functionAddr],      
              metadata: {
                createdBy: 'me',
                createdOn: 'now',
                tags: [],
                userIntent: 'func_added',
              }, 
          }, true);
          node.label = "DefineFunc: "+newNode.functionName;
        }
        else if (newNode.type == 'type_defined'){
          const node = await tracker.applyAction({      
            do: 'addType',
            doArguments: [newNode.typeName, newNode.typeDefined],
            undo: 'removeType',           
            undoArguments: [newNode.typeName],      
            metadata: {
              createdBy: 'me',
              createdOn: 'now',
              tags: [],
              userIntent: 'type_defined',
            }, 
        }, true);
        node.label = "type_defined "+newNode.typeName;
        }
        else if (newNode.type == 'type_undefined'){
          const node = await tracker.applyAction({      
            do: 'removeType',
            doArguments: [newNode.typeName],
            undo: 'addType',           
            undoArguments: [newNode.typeName, newNode.typeDefined],      
            metadata: {
              createdBy: 'me',
              createdOn: 'now',
              tags: [],
              userIntent: 'type_undefined',
            }, 
        }, true);
        node.label = "type_undefined "+newNode.typeName;
        }
        else if (newNode.type == 'data_written'){
          const node = await tracker.applyAction({      
            do: 'dataWritten',
            doArguments: [newNode.address, newNode.dataNew],
            undo: 'dataWritten',           
            undoArguments: [newNode.address, newNode.dataOld],      
            metadata: {
              createdBy: 'me',
              createdOn: 'now',
              tags: [],
              userIntent: 'data_written',
            }, 
        }, true);
        node.label = "DataWritten: "+newNode.dataNew;
        }
        else if (newNode.type == 'highlight'){
          const node = await tracker.applyAction({      
            do: 'Highlight',
            doArguments: [newNode.address, newNode.colorNew],
            undo: 'Highlight',           
            undoArguments: [newNode.address, newNode.colorOld],      
            metadata: {
              createdBy: 'me',
              createdOn: 'now',
              tags: [],
              userIntent: 'Highlight',
            }, 
          }, true);
          node.label = "Highlight: "+newNode.address;
        }
        else if ((newNode.type == 'var_type_updated') || (newNode.type == 'var_updated') || (newNode.type == 'var_name_updated')){
          const node = await tracker.applyAction({      
            do: 'LocVarUpdate',
            doArguments: [newNode.functionAddr, newNode.newVarType, newNode.newVarName, newNode.index],
            undo: 'LocVarUpdate',           
            undoArguments: [newNode.functionAddr, newNode.oldVarType, newNode.oldVarName, newNode.index],      
            metadata: {
              createdBy: 'me',
              createdOn: 'now',
              tags: [],
              userIntent: 'varNameType_updated',
            }, 
          }, true);
          node.label = "LocVarUpdate: " + newNode.newVarName + " " + newNode.newVarType;
        }

    }
    
});

// /* Display State Type on top */
// graph.on('currentChanged', (event) => {
//   stateDiv.innerHTML = fileChange.currentState();
// });


// graph.on('nodeAdded', () => {
//   // stateDiv.innerHTML = fileChange.currentState();
//   const serializableGraph = serializeProvenanceGraph(graph);
//   actionsDiv.innerHTML = JSON.stringify(serializableGraph);
// });

function download(content:any, fileName:any, contentType:any) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

// const serializableGraph = serializeProvenanceGraph(graph);
saveDivBtn.addEventListener('click', async () => {
  const serializableGraph = serializeProvenanceGraph(graph);
  const actionsDiv = JSON.stringify(serializableGraph);
  download(actionsDiv, 'json.txt', 'application/json');
});

document.getElementById("file-input").addEventListener("change", async (e) => {
  var file = (<HTMLInputElement>e.target).files[0];
  var reader = new FileReader();
  reader.onload = file => {
      var contents: any = file.target;
      this.text = contents.result; 
      console.log(this.text.toString()); 

      var graphLoad:SerializedProvenanceGraph = JSON.parse(this.text);
      // graph = new ProvenanceGraph({ name: 'FileChange', version: '1.0.0' });
      graph = restoreProvenanceGraph(graphLoad);
      // fileChange.currentState(); 
  };
    reader.readAsText(file);
}, false);  

const fileChange = new FileChange(graph, registry, tracker, traverser);

let provenanceTreeVisualization: ProvenanceTreeVisualization;

fileChange.setupBasicGraph().then(() => {
  provenanceTreeVisualization = new ProvenanceTreeVisualization(
    traverser,
    visDiv,
  );

  const slideDeck = new ProvenanceSlidedeck(
    { name: 'fileChange', version: '1.0.0' },
    traverser,
  );

  const provenanceSlidedeckVis = new SlideDeckVisualization(
    slideDeck,
    document.getElementById('slidedeck_root') as HTMLDivElement,
  );

  player = new ProvenanceSlidedeckPlayer(
    slideDeck.slides as ProvenanceSlide[],
    (slide) => (slideDeck.selectedSlide = slide),
  );

  if (playBtn){
    playBtn.addEventListener('click', () => {
      player.setSlideIndex(slideDeck.slides.indexOf(slideDeck.selectedSlide));
      player.play();
    });
  }
});


// function readSingleFile(e:any) {
//   var fileName = e.target.files[0];
//   if (!fileName) {
//       return;
//   }
//   var reader = new FileReader();
//   var self = this;
//   reader.onload = file => {
//       var contents: any = file.target;
//       self.text = contents.result; 
//   };
//   reader.readAsText(fileName);
// }

// interface HTMLInputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }

// loadDivBtn.addEventListener('click', async (e) => {
//   var input = e.target as HTMLElement;
//   var reader = new FileReader();
//   reader.onload = function(){
//     var text = reader.result;
//     console.log(reader.result.toString());
//   };
//   // reader.readAsText(input);  
// });

// function displayContents(contents:any) {
//   var element = document.getElementById('file-content');
//   element.innerHTML = contents;
// }

// function readSingleFile(e:any) { 
//   var file = e.target.files[0];
//   if (!file) {
//     return;
//   }
//   var reader = new FileReader();
//   reader.onload = function(e) {
//     var contents = e.target.dispatchEvent;
//     // Display file content
//     const graph = JSON.parse(contents);
//     restoreProvenanceGraph(graph);
//     // displayContents(contents);
//   };
//   // reader.readAsText(file);
// }    
 
// document.getElementById('file-input').addEventListener('change', readSingleFile, false);

// let graph2 = new ProvenanceGraph({ name: 'FileChange', version: '1.0.0' });
// loadDivBtn.addEventListener('click', async () => {
//   actionsDiv.innerHTML = JSON.stringify(serializableGraph);
//   graph2 = restoreProvenanceGraph(serialGraph);
// });
