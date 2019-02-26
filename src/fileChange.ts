import { XmlRpcRequest } from "./mimic";

// import $ = require("jquery");
import {
    ActionFunctionRegistry,
    ProvenanceGraph,
    ProvenanceTracker,
    ProvenanceGraphTraverser,
    ReversibleAction,
    IrreversibleAction,
    StateNode,
    Action,
    isReversibleAction,
  } from '@visualstorytelling/provenance-core';


class FileChangeApp {
    public method: string = "Starting...";

    // this.registry.register('funcName', this.app.funcName, this.app);
    // this.registry.register('funcType', this.app.funcType, this.app);
    
    // this.registry.register('comment', this.app.comment, this.app);

    // this.registry.register('varNameType', this.app.varNameType, this.app);

    // this.registry.register('dataWritten', this.app.dataWritten, this.app);

    // this.registry.register('highlight', this.app.highlight, this.app);

    // this.registry.register('defineFunc', this.app.defineFunc, this.app);
    // this.registry.register('undefineFunc', this.app.undefineFunc, this.app);

    // this.registry.register('addType', this.app.addType, this.app);
    // this.registry.register('removeType', this.app.removeType, this.app);

    public async FuncNameUpdated(address: string, funcName: string){
        this.method = "FuncNameUpdate";
        console.log("FileChangeApp " + this.method);
        const call = "FuncName";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(funcName);
        let response = await request.send();
        console.log(response);
    }
    public async funcType(address: string, var_type: string){
        this.method = "FuncTypeUpdate";
        console.log("FileChangeApp " + this.method);
        const call = "FuncType";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(var_type);
        let response = await request.send();
        console.log(response);
    }
    public async funcNameType(address: string, funcName: string, var_type: string){
        this.method = "FuncNameTypeUpdate";
        console.log("FileChangeApp " + this.method);
        const call = "FuncNameType";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(funcName);
        request.addParam(var_type);
        let response = await request.send();
        console.log(response);
        
        
    }
    
    public async LocalVarUpdate(funcAddress: string, var_type: string, var_name:string, index:string){
        this.method = "LocVarUpdate";
        const call = "FuncVar";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(funcAddress);
        request.addParam(var_type);
        request.addParam(var_name);
        request.addParam(index);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async CommentUpdated(address: string, message: string, functionAddr: string) {
        this.method = "CommentUpdated";
        const call = "MakeComm";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(message);
        request.addParam(functionAddr)
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async highlight(address: string, color: string) {
        this.method = "highlight";
        const call = "SetColor";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(color);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async defineFunc(address: string) {
        this.method = "defineFunc";
        const call = "DefineFunc";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async undefineFunc(address: string) {
        this.method = "undefineFunc";
        const call = "UndefineFunc";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async dataWritten(address: string, data: string) {
        this.method = "dataWritten";
        const call = "WriteData";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(data);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async addType(typeName: string, typeDefined: string) {
        this.method = "addType";
        const call = "AddType";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(typeName);
        request.addParam(typeDefined);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async removeType(typeName: string) {
        this.method = "removeType";
        const call = "RemoveType";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(typeName);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    public async view(address: string, viewMode: string) {        //Jump action for Revert
        this.method = "view";
        const call = "Jump";
        let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
        request.addParam(address);
        request.addParam(viewMode);
        let response = await request.send();
        console.log(response);
        console.log("FileChangeApp " + this.method);
    }
    
    // public async undo() {
    //     this.method = "undo";
    //     console.log("FileChangeApp " + this.method);
    //     const call = "Undo";
    //     let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
    //     let response = await request.send();
    //     console.log(response);
    // }
    // public async redo() {
    //     this.method = "redo";
    //     console.log("FileChangeApp " + this.method);
    //     const call = "Redo";
    //     let request = new (XmlRpcRequest as any)("http://localhost:1337/RPC2", call);
    //     let response = await request.send();
    //     console.log(response);
    // }
}

export class DataTypes {
    //JSON Types:  func_name_updated
    public datablock: string;
    public type: string;
    public view: string;

    //JSON Types:  func_name_updated
    public oldFuncName: string;   
    public newFuncName: string;
    public address: string;
    public oldFuncType: string;
    public newFuncType: string;

    // newcomment
    public newComment: string;   
    public oldComment: string;
    public functionAddr: string;

    // Var_type updates
    public functionName: string;
    public index: string;
    public newVarName: string;
    public oldVarName: string;
    public newVarType: string;
    public oldVarType: string;

    // data_written
    public dataNew: string;    
    public dataOld: string;
    public length: string;
    
    // highlight
    public colorNew: string;
    public colorOld: string;

    // Types
    public typeName: string;          
    public typeDefined: string;           

    // View
    public oldview: string;
    public oldaddress: string;

    constructor(datablock: string) {
        this.datablock = datablock;
        this.parseJSON(this.datablock);     //Split up data block
    }
    
    private parseJSON(data: string) {
        let obj:JSON = JSON.parse(data);
        // func_name_updated
        if ((Object.values(obj)[5] == 'func_name_updated') || 
            (Object.values(obj)[5] == 'func_type_updated') || 
            (Object.values(obj)[5] == 'func_name_type_updated')) {
            this.oldFuncName = Object.values(obj)[2];
            this.type = Object.values(obj)[5];
            this.newFuncName = Object.values(obj)[1];
            this.address = Object.values(obj)[0];
            this.oldFuncType = Object.values(obj)[2];
            this.newFuncType = Object.values(obj)[3];
            this.view = Object.values(obj)[6];
            console.log(this.type + ' ' + this.newFuncName + ' ' + this.newFuncType);
        }
        // comment_changed || comment_removed
        else if ((Object.values(obj)[4] == 'comment_changed') || 
                 (Object.values(obj)[4] =='comment_remove')) {
            this.address = Object.values(obj)[0]
            this.newComment = Object.values(obj)[1];
            this.oldComment = Object.values(obj)[2];
            this.functionAddr = Object.values(obj)[3];
            this.type = Object.values(obj)[4];
            this.view = Object.values(obj)[5];
            console.log(this.type + ' ' + this.newComment + ' ' + this.oldComment + ' ' + this.address);
        }
        // 'var_type_updated' || 'var_updated' || 'var_name_updated'
        else if ((Object.values(obj)[3] == 'var_type_updated') || 
                 (Object.values(obj)[3] == 'var_updated') ||
                 (Object.values(obj)[3] == 'var_name_updated')) {
            this.functionAddr = Object.values(obj)[0];
            this.functionName = Object.values(obj)[1];
            this.index = Object.values(obj)[2];
            this.type =  Object.values(obj)[3];
            this.newVarName = Object.values(obj)[4];
            this.oldVarName = Object.values(obj)[5];
            this.newVarType = Object.values(obj)[6];
            this.oldVarType = Object.values(obj)[7];
            this.view = Object.values(obj)[8];
            console.log(this.type + ' ' + this.functionAddr + ' ' + this.newVarName + ' ' + this.newVarType);
        }
        // data_written
        else if (Object.values(obj)[4] == 'data_written') {
            this.type = Object.values(obj)[4];
            this.address = Object.values(obj)[0];
            this.dataNew = Object.values(obj)[1];
            this.dataOld = Object.values(obj)[2];
            this.length = Object.values(obj)[3];
            this.view = Object.values(obj)[5];
            console.log(this.type + ' ' + this.address + ' ' + this.dataNew);
        }
        // highlight
        else if (Object.values(obj)[4] == 'highlight') {
            this.address = Object.values(obj)[0];
            this.colorNew = Object.values(obj)[1];
            this.colorOld = Object.values(obj)[2];
            this.functionAddr = Object.values(obj)[3];
            this.type = Object.values(obj)[4];
            this.view = Object.values(obj)[5];
            console.log(this.type + ' ' + this.address + ' ' + this.colorNew);
        }
        // func_removed || func_added
        else if (Object.values(obj)[2] == 'func_removed' || 
                 Object.values(obj)[2] =='func_added') {
            this.functionAddr = Object.values(obj)[0];
            this.functionName = Object.values(obj)[1];
            this.type = Object.values(obj)[2];
            this.view = Object.values(obj)[3];
            console.log(this.type + ' ' + this.functionAddr + ' ' + this.functionName);
        }
        // type_defined || type_undefined
        else if (Object.values(obj)[1] == 'type_defined' || 
                 Object.values(obj)[1] == 'type_undefined') {
            this.typeName = Object.values(obj)[0];
            this.type = Object.values(obj)[1];
            this.typeDefined = Object.values(obj)[2];
            this.view = Object.values(obj)[3];
            console.log(this.type + ' ' + this.typeName + ' ' + this.typeDefined);
        }
        // func_type_updated - REDO VIEW ONLY
        else if (Object.values(obj)[0] == 'bv.file.view') {
            this.view = Object.values(obj)[0];
            this.oldview = Object.values(obj)[1];
            this.oldaddress = Object.values(obj)[2];
            this.type = Object.values(obj)[3];
            this.address = Object.values(obj)[4];
            console.log(this.view + ' ' + this.oldview + ' ' +
                        this.address + ' ' + this.oldaddress);
        }

    } 
}


export class FileChange {
    private graph: ProvenanceGraph;
    private registry: ActionFunctionRegistry;
    private tracker: ProvenanceTracker;
    private traverser: ProvenanceGraphTraverser;
    private readonly app: FileChangeApp;

    constructor(
        graph: ProvenanceGraph,
        registry: ActionFunctionRegistry,
        tracker: ProvenanceTracker,
        traverser: ProvenanceGraphTraverser,
    ) {
        this.graph = graph;
        this.registry = registry;
        this.tracker = tracker;
        this.traverser = traverser;
        
        this.app = new FileChangeApp();
        
        this.registry.register('FuncNameUpdate', this.app.FuncNameUpdated, this.app);
        this.registry.register('FuncTypeUpdate', this.app.funcType, this.app);
        this.registry.register('FuncNameTypeUpdate', this.app.funcNameType, this.app);
        
        this.registry.register('CommentUpdated', this.app.CommentUpdated, this.app);

        this.registry.register('LocVarUpdate', this.app.LocalVarUpdate, this.app);
        
        this.registry.register('dataWritten', this.app.dataWritten, this.app);

        this.registry.register('highlight', this.app.highlight, this.app);

        this.registry.register('defineFunc', this.app.defineFunc, this.app);
        this.registry.register('undefineFunc', this.app.undefineFunc, this.app);

        this.registry.register('addType', this.app.addType, this.app);
        this.registry.register('removeType', this.app.removeType, this.app);
        
        this.registry.register('view', this.app.view, this.app);
        
        // this.registry.register('undo', this.app.undo, this.app);
        // this.registry.register('redo', this.app.redo, this.app);
    }

    public async makeActionAndApply(
        reversible: boolean,
        label: string,
        doAction: string,
        doArguments: any[],
        undoAction?: string,
        undoArguments?: any[],
      ): Promise<StateNode> {
        let method: Action;
        const intermediate: Action = {
          do: doAction,
          doArguments,
          metadata: {
            createdBy: 'me',
            createdOn: 'now',
            tags: [],
            userIntent: doAction,
          },
        };
        if (reversible) {
            method = {
            ...intermediate,
            undo: undoAction,
            undoArguments,
          } as ReversibleAction;
        } else {
            method = {
            ...intermediate,
          } as IrreversibleAction;
        }
    
        const node = await this.tracker.applyAction(method);
        node.label = label;
        return node;
    }

    public currentState(): string { 
        return this.app.method;
    }

    public async setupBasicGraph() {
        const intermediateNode = await this.makeActionAndApply(
            true,
            'view Graph:PE',
            'view',
            ['0x401000', 'Graph:PE'],
            'view',
            ['0x401000', 'Graph:PE'],
          ); 
    }
    
}

// const visDiv: HTMLDivElement = document.getElementById('vis') as HTMLDivElement;
// const stateDiv: HTMLDivElement = document.getElementById(
//   'state',
// ) as HTMLDivElement;


// const graph = new ProvenanceGraph({ name: 'FileChange', version: '1.0.0' });
// const registry = new ActionFunctionRegistry();
// const tracker = new ProvenanceTracker(registry, graph);
// const traverser = new ProvenanceGraphTraverser(registry, graph);
// // const calculator = new Calculator(graph, registry, tracker, traverser);
// const fileChange = new FileChange(graph, registry, tracker, traverser);



// function makeComment() {
//     const method = "MakeComm";
//     let request = new XmlRpcRequest("http://localhost:1337/RPC2", method);
//     request.addParam(document.getElementById("n1")).value;
//     request.addParam(document.getElementById("n2")).value;
//     let response = request.send();
//     console.log(response);
// }
// function makeJump() {
//     const method = "Jump";
//     let request:any = new XmlRpcRequest("http://localhost:1337/RPC2", method);
//     request.addParam(<HTMLElement>document.getElementById("n3")).value;
//     let response = request.send();
//     // alert(response.parseXML());
// }
// function setColor() {
//     const method = "SetColor";
//     let request:any = new XmlRpcRequest("http://localhost:1337/RPC2", method);
//     request.addParam(<HTMLElement>document.getElementById("n4")).value;
//     request.addParam(<HTMLElement>document.getElementById("n5")).value;
//     let response = request.send();
//     // alert(response.parseXML());
// }
// function undo() {
//     const method = "Undo";
//     let request:any = new XmlRpcRequest("http://localhost:1337/RPC2", method);
//     let response = request.send();
//     // alert(response.parseXML());
// }

