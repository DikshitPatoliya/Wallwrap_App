import axios from "axios";
import { BASE_URL } from "./Url";

export const postRequestApi = (url, data) => {
	return axios.post(BASE_URL + url, data, {
		"Content-type": "Application/json"
	})
};

export const getRequestApi = (url) => {
	return axios.get(BASE_URL + url)
};