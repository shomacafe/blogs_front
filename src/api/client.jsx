import applyCaseMiddleware from "axios-case-converter";
import axios from 'axios';

const options = {
  ignoreHeaders: true
}

const baseURL = process.env.REACT_APP_API_BASE_URL

const clientApi = applyCaseMiddleware(axios.create({
  baseURL,
}), options)

export default clientApi
