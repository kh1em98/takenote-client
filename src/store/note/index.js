import axios from 'axios';
import _ from 'lodash';


const state = {
    noteItems: []
};

const mutations = {
    UPDATE_NOTE_ITEMS(state, payload) {
        state.noteItems = payload
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
            content
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
    modifyNote({
        commit
    }, payload) {
        axios.put('http://localhost:8080/notes/', payload).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (error) {
            console.log(`Error : ${error}`);
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