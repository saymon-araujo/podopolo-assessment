import axios from "axios";

const api = axios.create({
  baseURL: "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
