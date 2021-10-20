import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(false);
    const [ text, setText ] = useState(props.text);

    function handleDragStart(event) {
        if(!store.itemActive){
        event.dataTransfer.setData("item", event.target.id);
        }
    }

    function handleDragOver(event) {
        if(!store.itemActive){
        event.preventDefault();
        }
    }

    function handleDragEnter(event) {
        if(!store.itemActive){
        event.preventDefault();
        setDraggedTo(true);
        }
    }

    function handleDragLeave(event) {
        if(!store.itemActive){
        event.preventDefault();
        setDraggedTo(false);
    }
    }

    function handleDrop(event) {
        if(!store.itemActive){
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {  
            store.WTF();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.itemActive=false;
            let target = event.target;
            let targetId = target.id;
            targetId = targetId.substring(target.id.indexOf("-")+1);
            store.addEditItemTransaction(targetId-1, store.currentList.items[targetId-1],text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }
    let itemcard=
        (<div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
            {props.text}
        </div>);
    if(editActive){
        itemcard=(<input
            id={"list-"+(index + 1)}
            className='list-card'
            type='text'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
        />);
    }
    return itemcard;
}

export default Top5Item;