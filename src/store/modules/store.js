import Axios from 'axios'
export default {
    state: {
        data: '',
        email: '',
        checkbox: '',
        textarea: '',
        selected: '',
        message: '',
        reason: '',
        users: [],
        dev: "https://devapi.programminghub.io/v2/api/payment",
        prod: "https://api.programminghub.io/v2/api/payment",
        loader: false,
        addQuerySel: 'Monthly',
        ListData:[]
    },
    mutations: {
        setUserData(state, data) {
            state.users = data
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
        updateMessage(state, msg) {
            state.message = msg;
        },
        updateReason(state, msg) {
            state.reason = msg;
        },
        setResponse(state, msg) {
            state.message = msg.message;
            state.reason = msg.Reason;
        },
        updateLoader(state, msg) {
            state.loader = msg;
        },
        updateAddQuerySel(state, msg) {
            state.addQuerySel = msg;
        },
        creatingListData(state, msg) {
            state.ListData = msg;
        }
    },
    getters: {
        showData: state => state,
        showMessage: state => state.message,
        showReason: state => state.reason,
        showUsers: state => state.users,
        showLoader: state => state.loader
    },
    actions: {
        async getUserData({
            commit
        }, payload) {
            commit('updateLoader', true)
            Axios.get(`${payload.mode}/failureList?page=&limit=`)
                .then(response => {
                    commit('setUserData', response.data)
                    commit('updateLoader', false)
                });
        },
        async addUserData({
            commit
        }, payload) {
            return await Axios.post(
                `${payload.mode}/addFailurePayment`, {
                    email: payload.email,
                    type: payload.type,
                    comments: payload.comments
                }
            )
        },
        async viewComments({
            commit
        }, payload) {
            return await Axios.post(
                "https://devapi.programminghub.io/v2/api/payment/update/status",
                payload, {
                    _id: payload._id,
                    comment: payload.comment,
                    status: payload.status
                }
            )
        },
        async addPromoData({
            commit
        }, payload) {
            return await Axios.post(
                "https://devapi.programminghub.io/v2/api/auth/addProUser",
                payload
            )
        },
        async creatingList({commit
        }, payload) {
            // commit('updateLoader', true)
            Axios.get('https://devapi.programminghub.io/v2/api/auth/getProUserList?page=1&limit=100')
                .then(response => {
                    console.log(response.data.data,'==================')
                    commit('creatingListData', response.data.data)
                    // commit('updateLoader', false)
                });
        },

    }
}