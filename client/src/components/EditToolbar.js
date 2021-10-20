import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let enabledButtonClass = "top5-button";
    let redoButtonClass="top5-button";
    let undoButtonClass="top5-button"
    if(store.listMarkedForDeletion!=null){
        enabledButtonClass="top5-button-disabled";
    }
    if(store.currentList==null){
        enabledButtonClass="top5-button-disabled";
        redoButtonClass="top5-button-disabled";
        undoButtonClass="top5-button-disabled";
    }
    function handleUndo() {
        console.log(!store.itemActive,store.hastransactiontoundo)
        if(!store.itemActive){
            if(store.hastransactiontoundo){
            store.undo();
            }
        }
    }
    function handleRedo() {
        console.log(!store.itemActive,store.hastransactiontoredo)
        if(!store.itemActive){
            if(store.hastransactiontoredo){
            store.redo();
            }
        }
    }
    function handleClose() {
        console.log(!store.itemActive,store.hastransactiontoredo)
        if(!store.itemActive){
                history.push("/");
                store.closeCurrentList();
        }
    }
    let editStatus = false;
    if (store.itemActive) {
        editStatus = true;
        
        enabledButtonClass="top5-button-disabled";
        redoButtonClass="top5-button-disabled";
        undoButtonClass="top5-button-disabled";
    }
    if(!store.hastransactiontoredo){
        redoButtonClass="top5-button-disabled";
    }
    if(!store.hastransactiontoundo){
        undoButtonClass="top5-button-disabled";
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={enabledButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;