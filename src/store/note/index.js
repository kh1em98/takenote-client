import axios from 'axios';

const state = {
    noteItems: []
};

const mutations = {
    UPDATE_NOTE_ITEMS(state, payload) {
        state.noteItems = payload
    }
};

const actions = {
    getNoteItems({
        commit
    }) {
        axios.get('http://localhost:8080/notes/').then((response) => {
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
        console.log('Chuan bi post note');
        axios.post('http://localhost:8080/notes/', {
            title,
            content,
            lastModified: new Date().toLocaleString()
        }).then(function (response) {
            console.log('Post note thanh cong');
            commit('UPDATE_NOTE_ITEMS', response.data)
        }).catch(function (error) {
            console.log('Error : ', error);
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