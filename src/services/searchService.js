import axios from "axios";
import Constants from "config/constants";
import getParamString from "utils/getParamString";

class SearchService {
  constructor() {
    this.baseUrl = Constants.BASE_URL;
    this.apiKey = Constants.API_KEY;
    this.imgUrl = Constants.IMAGE_URL;
  }

  getSearchData = async (params) => {
    const { url } = params;
    let query = getParamString({
      api_key: this.apiKey,
      ...params,
      url: `search/${params.url}`,
    });

    return axios.get(`${this.baseUrl}${query}`).then((payload) => {
      return {
        page: payload.data.page,
        total_pages: payload.data.total_pages,
        total_results: payload.data.total_results,
        results: payload.data.results.map((item) => ({
          id: item.id,
          name: item.name || item.title,
          type: url !== "multi" ? url : item.media_type,
          imgUrl:
            item.profile_path || item.poster_path
              ? `${this.imgUrl}w185${
                  item.profile_path || item.poster_path
                }?api_key=${this.apiKey}`
              : "/images/Not-available4.png",
          overView:
            item.overview ||
            item.known_for?.reduce(
              (acc, el) =>
                acc !== "Known for:"
                  ? `${acc}, ${el.title || el.name}`
                  : `${acc} ${el.title || el.name}`,
              "Known for:"
            ),
          date:
            item.release_date || item.first_air_date
              ? new Date(item.release_date || item.first_air_date)
                  ?.toLocaleString()
                  ?.split(",")[0]
              : item.known_for_department,
        })),
      };
    });
  };

  getActorDetails = async (id) => {
    let query = getParamString({ api_key: this.apiKey, url: `person/${id}` });

    return axios.get(`${this.baseUrl}${query}`).then((payload) => {
      const { id, profile_path, name, biography } = payload.data;
      return {
        id,
        path: profile_path
          ? `${this.imgUrl}w500${profile_path}?api_key=${this.apiKey}`
          : "/images/Not-available4.png",
        name,
        biography,
      };
    });
  };

  getActorCredits = async (id) => {
    let query = getParamString({
      api_key: this.apiKey,
      url: `person/${id}/combined_credits`,
    });
    return axios.get(`${this.baseUrl}${query}`).then((payload) =>
      payload.data.cast.map((item) => ({
        character: item.character.split("/")[0],
        name: item.name || item.title,
        id: item.id,
        type: item.media_type,
        imgPath: item.poster_path
          ? `${this.imgUrl}w185${item.poster_path}?api_key=${this.apiKey}`
          : "/images/Not-available4.png",
      }))
    );
  };

  getShowDetails = async (type, id) => {
    let query = getParamString({
      api_key: this.apiKey,
      url: `${type}/${id}`,
    });

    return axios.get(`${this.baseUrl}${query}`).then((payload) => {
      const {
        id,
        poster_path,
        name,
        genres,
        title,
        runtime,
        episode_run_time,
        overview,
        first_air_date,
        release_date,
      } = payload.data;
      return {
        id,
        overview,
        path: poster_path
          ? `${this.imgUrl}w500${poster_path}?api_key=${this.apiKey}`
          : "/images/Not-available4.png",
        showTitle: name || title,
        showGenres: genres?.reduce(
          (acc, item) => (acc ? `${acc}, ${item.name}` : item.name),
          ""
        ),
        date: type === "movie" ? runtime : episode_run_time,
        releaseYear: new Date(first_air_date || release_date)?.getFullYear(),
      };
    });
  };

  getShowCasts = async (type, id) => {
    let query = getParamString({
      api_key: this.apiKey,
      url: `${type}/${id}/credits`,
    });

    return axios.get(`${this.baseUrl}${query}`).then((payload) =>
      payload.data.cast.map((item) => ({
        id: item.id,
        name: item.name,
        character: item.character.split("/")[0],
        media_type: type,
        imgPath: item.profile_path
          ? `${this.imgUrl}w185${item.profile_path}?api_key=${this.apiKey}`
          : "/images/Not-available4.png",
      }))
    );
  };
}

export default new SearchService();
