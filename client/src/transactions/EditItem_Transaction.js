import  jsTPS_Transaction  from "../common/jsTPS.js";

export default class EditItem_Transaction extends jsTPS_Transaction {
    constructor(initstore, initid, initoldtext,initnewtext) {
        super();
        this.store = initstore;
        this.id = initid;
        this.oldtext = initoldtext;
        this.newtext = initnewtext;
    }

    doTransaction() {
        this.store.editItem(this.id, this.newtext);
    }
    
    undoTransaction() {
        this.store.editItem(this.id, this.oldtext);
    }
}