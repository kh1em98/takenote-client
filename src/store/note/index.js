import axios from 'axios';
import _ from 'lodash';

const url = "notes/"

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
        return axios.get(url).then((response) => {
            commit('UPDATE_NOTE_ITEMS', response.data)
        })
    },
    addNote({
        commit
    }, payload) {
        const {
            id,
            title,
            content
        } = payload;

        return axios.post(url, {
            _id: id,
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
        return axios.delete(url, {
            data: {
                id
            }
        }).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data);
        }).catch(function (error) {
            console.log('Error : ', error);
        })
    },
    searching({
        commit
    }, payload) {
        let notesMatch = _.clone(state.noteItems);
        notesMatch = notesMatch.filter((item) => {
            let contentRemoveTag = getContentFromHtml(item.content);
            if (contentRemoveTag.includes(payload.searchValue) || item.title.includes(payload.searchValue)) {
                return true;
            } else {
                return false;
            }
        });
        commit('UPDATE_NOTES_MATCH', notesMatch);
    },
    changeFavorite({
        commit
    }, payload) {
        axios.put(url, payload).then(function (response) {
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (error) {
            console.log(`Error : ${error}`);
        })
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