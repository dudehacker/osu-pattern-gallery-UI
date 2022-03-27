import {routes,axios} from "./api";

const getPattern = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(routes.pattern + `/${id}`)
      .then((res) => resolve(res.data))
      .catch(() => reject(false));
  });
}

const getPatterns = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(routes.pattern)
      .then((res) => resolve(res.data))
      .catch(() => reject(false));
  });
}

const changeLike = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(routes.pattern + `/${id}/like`)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};

const changeDislike = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(routes.pattern + `/${id}/dislike`)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};

export { changeLike, changeDislike, getPattern, getPatterns };
