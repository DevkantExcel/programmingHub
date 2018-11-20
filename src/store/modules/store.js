import Axios from 'axios'
export default {
    state: {
        data: '',
        email:'',
        checkbox:'',
        textarea:'',
        selected: '',
        message: '',
        reason: '',
        users: []
    },
    mutations: {
        setUserData(state, data) {
            state.users = data.data
        },  
        updateData(state, msg) {
            state.data = msg;
        },
        updateEmail(state, msg) {
            state.email = msg;
        },
        updateCheckbox(state, msg) {
            state.checkbox = msg;
        },
        updateTextarea(state, msg) {
            state.textarea = msg;
        },
        updateSelected(state, msg) {
            state.selected = msg;
        },
        updateMessage (state, msg){
            state.message = msg;
        },
        updateReason(state, msg) {
            state.reason = msg;
        },
        setResponse (state, msg) {
            state.message = msg.message;
            state.reason = msg.Reason;
        }
    },
    getters: {
        showData: state => state,
        showMessage: state => state.message,
        showReason: state => state.reason,
        showUsers: state =>  state.users
    },
    actions: {
        async getUserData ({commit}) {
            Axios.get("https://devapi.programminghub.io/v2/api/payment/failureList?page=&limit=")
      .then(response => {
        commit('setUserData', response.data)
        
      });
        },
        addUserData( {commit}, payload) {
            Axios.post(
                "https://devapi.programminghub.io/v2/api/payment/addFailurePayment",
                payload, {
                    body: {
                        email_id: payload.email,
                        type: payload.selected,
                        comments: payload.comments
                    }
                }
            ).then((response) => {
                if(response.data) {
                dispatch('getUserData');
                }
           });
        },
        viewComments({ commit }, payload ) {
            Axios.post(
                "https://devapi.programminghub.io/v2/api/payment/update/status",
                payload, {
                    body: {
                        _id: payload._id,
                        comment: payload.comment,
                        status: payload.status
                    }
                }
            ).then((response) => { 
                commit('setResponse', response.data)
            });
        },

    }
}