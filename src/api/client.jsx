import applyCaseMiddleware from "axios-case-converter";
import axios from 'axios';

const options = {
  ignoreHeaders: true
}

const baseURL = 'http://localhost:3001/api';

const clientApi = applyCaseMiddleware(axios.create({
  baseURL,
}), options)

export default clientApi
