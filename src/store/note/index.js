import axios from 'axios';
import {
    v4 as uuidv4
} from 'uuid';
import _ from 'lodash';


const state = {
    noteItems: []
};

const mutations = {
    UPDATE_NOTE_ITEMS(state, payload) {
        state.noteItems = payload
    },
    ADD_NOTE_TEMP(state) {
        state.noteItems.unshift({
            _id: 'temp' + uuidv4(),
            lastModified: new Date()
        });
    },
    DELETE_NOTE_TEMP(state, payload) {
        _.remove(state.noteItems, function (noteItem) {
            return noteItem._id === payload.id;
        })
    }
};

const actions = {
    getNoteItems({
        commit
    }) {
        return axios.get('http://localhost:8080/notes/').then((response) => {
            commit('UPDATE_NOTE_ITEMS', response.data)
        })
    },
    addNote({
        commit
    }, payload) {
        const {
            title,
            content
        } = payload;
        return axios.post('http://localhost:8080/notes/', {
            title,
            content,
            lastModified: new Date().toLocaleString()
        }).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (error) {
            console.log('Error : ', error);
        })
    },
    deleteNote({
        commit
    }, id) {
        return axios.delete('http://localhost:8080/notes/', {
            data: {
                id
            }
        }).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data);
        }).catch(function (error) {
            console.log('Error : ', error);
        })
    },
    deleteNoteTemp({
        commit
    }, id) {
        commit('DELETE_NOTE_TEMP', {
            id
        });
    },
    AddNoteTemp({
        commit
    }) {
        commit('ADD_NOTE_TEMP');
    },
    modifyNote({
        commit
    }, payload) {
        axios.put('http://localhost:8080/notes/', payload).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (error) {
            console.log(`Error : ${error}`);
        })
    },
    async moveNoteTempToPermanent({
        commit
    }, payload) {
        await axios.delete('http://localhost:8080/notes/', {
            id: payload.id
        });
        axios.post('http://localhost:8080/notes/', {
            id: payload.id.substr(4),
            title: payload.title,
            content: payload.content
        }).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (err) {
            console.log(`Error : ${err}`);
        })
    }
};

const getters = {
    noteItems: state => state.noteItems
};

const noteModule = {
    state,
    mutations,
    actions,
    getters
}

export default noteModule;