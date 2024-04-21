import { createStore } from 'vuex';
import NxbService from '@/services/nxb.service';
import SachService from '@/services/sach.service';

export default createStore({
    // State là trạng thái toàn cục
    state: {
        sharedNxbs: [],
        sharedSachs: [],
        docGia: null,
    },
    // là các hàm được sử dụng để thay đổi trạng thái (state) của ứng dụng
    mutations: {
        // Mutation này nhận vào state hiện tại và một mảng nxbs, sau đó gán mảng nxbs này cho state sharedNxbs
        setSharedNxbs(state, nxbs) {
            state.sharedNxbs = nxbs;
        },
        setSharedSachs(state, sachs) {
            state.sharedSachs = sachs;
        },
        setDocGia(state, docGia) {
            state.docGia = docGia;
        },
    },
    // Actions 
    actions: {
        // Action này gọi API để 
        async fetchNxbs({ commit }) {
            try {
                const response = await NxbService.getAllNXB();
                commit('setSharedNxbs', response.nxb);
            } catch (error) {
                console.error(error);
            }
        },
        //sách
        async fetchSachs({ commit }) {
            try {
                const response = await SachService.getAllSach();
                commit('setSharedSachs', response.sach);
            } catch (error) {
                console.error(error);
            }
        },
    },
});