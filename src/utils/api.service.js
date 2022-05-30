import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

/**
 * Service to call HTTP request via Axios
 */

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "http://localhost";
  },

  /**
   * Set the default HTTP request headers
   */
  //setHeader() {
  //  Vue.axios.defaults.headers.common[
  //    "Authorization"
  //    ] = `Token ${JwtService.getToken()}`;
  //},

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  query(resource) {
    return Vue.axios.get(`${resource}`).catch(error => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  },

};

export default ApiService;
