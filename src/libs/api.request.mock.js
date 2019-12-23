import HttpRequest from "@/libs/axios";
import config from "@/config";
const baseUrl = config.mockUrl.dev;

const axios = new HttpRequest(baseUrl);
export default axios;
