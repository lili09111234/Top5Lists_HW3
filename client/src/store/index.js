import { createContext, useState } from 'react'
import api from '../api'
import jsTPS from '../common/jsTPS'
import MoveItem_Transaction from '../transactions/MoveItem_Transaction'
import EditItem_Transaction from '../transactions/EditItem_Transaction.js'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CREATING_NEW_LIST: "CREATING_NEW_LIST",
    SET_ITEM_NAME_EDIT_ACTIVE: "SET_ITEM_NAME_EDIT_ACTIVE",
    SET_LIST_MARKED_FOR_DELETION: "SET_LIST_MARKED_FOR_DELETION",
    HIDE_DELETE_LIST_MODAL: "HIDE_DELETE_LIST_MODAL",
    FORCE_UPDATE: "FORCE_UPDATE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        hastransactiontoredo: tps.hasTransactionToRedo(),
        hastransactiontoundo: tps.hasTransactionToUndo(),
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                    
                });
            }
            
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.CREATING_NEW_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: store.itemActive,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.SET_LIST_MARKED_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: store.listMarkedForDeletion
                });
            }

            case GlobalStoreActionType.HIDE_DELETE_LIST_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    itemActive: false,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.FORCE_UPDATE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: store.isListNameEditActive,
                    itemActive: true,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: store.listMarkedForDeletion
                })
            }

            case GlobalStoreActionType.SET_ITEM_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    itemActive: true,
                    hastransactiontoredo: tps.hasTransactionToRedo(),
                    hastransactiontoundo: tps.hasTransactionToUndo(),
                    listMarkedForDeletion: null
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;
                top5List.name = newName;
                async function updateList(top5List) {
                    response = await api.updateTop5ListById(top5List._id, top5List);
                    if (response.data.success) {
                        async function getListPairs(top5List) {
                            response = await api.getTop5ListPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        top5List: top5List
                                    }
                                });
                            }
                        }
                        getListPairs(top5List);
                    }
                }
                updateList(top5List);
            }
        }
        asyncChangeListName(id);
    }

    store.createNewList = function(){
        async function asyncCreateNewList(){
            let raw='{\"name\":\"\",\"items\":[\"\",\"\",\"\",\"\",\"\"]}';
            let payload=JSON.parse(raw);
            payload.name="new List"+store.newListCounter;
            let response = await api.createTop5List(payload);
            store.newListCounter= store.newListCounter+1;
            if(response.data.success){
                async function asyncSetCurrentList(id) {
                    let response = await api.getTop5ListById(id);
                    if (response.data.success) {
                        let top5List = response.data.top5List;
        
                        response = await api.updateTop5ListById(top5List._id, top5List);
                        if (response.data.success) {
                            storeReducer({
                                type: GlobalStoreActionType.SET_CURRENT_LIST,
                                payload: top5List
                            });
                            store.history.push("/top5list/" + top5List._id);
                        }
                    }
                }
                let data=response.data;
                let top5list=data.top5List;
                asyncSetCurrentList(top5list._id);
            }
        }
        asyncCreateNewList();
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getTop5ListPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                store.newListCounter=response.data.idNamePairs.length;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
                let pairsArray=[];
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;

                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: top5List
                    });
                    store.history.push("/top5list/" + top5List._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.setlistMarkedForDeletion = function (_id){
        
        store.listMarkedForDeletion=_id;
        async function asyncSetCurrentList(id) {
            let response = await api.getTop5ListById(id);
            if (response.data.success) {
                let top5List = response.data.top5List;

                response = await api.updateTop5ListById(top5List._id, top5List);
                
                if (response.data.success) {
                    store.currentList=top5List;
                    storeReducer({
                        type: GlobalStoreActionType.SET_LIST_MARKED_FOR_DELETION,
                    });
                }
            }
        }
        asyncSetCurrentList(_id);
        
    }

    store.WTF = function(){
        store.itemActive=true;
        storeReducer({
            type: GlobalStoreActionType.FORCE_UPDATE,
        })
    }

    store.deleteMarkedList = function(){
        async function asyncdeletmarkelist(){
            let response = api.deleteTop5ListById(store.listMarkedForDeletion);
            setTimeout(() => {console.log("WAIT")}, 1000);
            if((await response).data.success){
                storeReducer({
                    type: GlobalStoreActionType.HIDE_DELETE_LIST_MODAL,
                });
                store.loadIdNamePairs();
            }
        }
        asyncdeletmarkelist()
    }

    store.hideDeleteListModal = function (){
        store.currentList=null;
        storeReducer({
            type: GlobalStoreActionType.HIDE_DELETE_LIST_MODAL,
        });
    }


    store.addEditItemTransaction = function (id,oldtext,newtext) {
        let transaction = new EditItem_Transaction(store, id, oldtext,newtext);
        tps.addTransaction(transaction);
    }
    store.editItem= function (id, text){
        store.currentList.items[id]=text;
        store.updateCurrentList();
    }


    store.addMoveItemTransaction = function (start, end) {
        let transaction = new MoveItem_Transaction(store, start, end);
        console.log(store.currentList._id);
        tps.addTransaction(transaction);
    }
    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        console.log(store.hastransactiontoundo);
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
        console.log(store.hastransactiontoundo);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }
    
    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}