import axios from "axios";
import Constants from "config/constants";

import getParamString from "utils/getParamString";

class SearchService {
  constructor() {
    this.baseUrl = Constants.BASE_URL;
    this.apiKey = Constants.API_KEY;
  }

  getSearchData = async (params) => {
    let query = getParamString({ api_key: this.apiKey, ...params });

    return axios
      .get(`${this.baseUrl}${query}`)
      .then((payload) => payload.data);
  };

}

export default new SearchService();
