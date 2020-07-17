import axios from 'axios';
import _ from 'lodash';


const state = {
    noteItems: [],
    notesMatch: []
};

const mutations = {
    UPDATE_NOTE_ITEMS(state, payload) {
        state.noteItems = payload
    },
    DELETE_NOTE_TEMP(state, payload) {
        _.remove(state.noteItems, function (noteItem) {
            return noteItem._id === payload.id;
        })
    },
    UPDATE_NOTES_MATCH(state, payload) {
        state.notesMatch = payload;
    }
};

function getContentFromHtml(content) {
    content = content.replace(/<.*?>/g, '');
    return content;
}

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
    },

    searching({
        commit
    }, payload) {
        let notesMatch = state.noteItems;

        notesMatch = notesMatch.filter((item) => {
            let contentRemoveTag = getContentFromHtml(item.content);
            if (contentRemoveTag.includes(payload.searchValue) || item.title.includes(payload.searchValue)) {
                console.log(`Content : ${contentRemoveTag}`);
                console.log(`Title : ${item.title}`);
                return true;
            } else {
                return false;
            }
        });
        commit('UPDATE_NOTES_MATCH', notesMatch);
    }
};

const getters = {
    noteItems: state => state.noteItems,
    notesMatch: state => state.notesMatch
};

const noteModule = {
    state,
    mutations,
    actions,
    getters
}

export default noteModule;