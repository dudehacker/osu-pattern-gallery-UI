import axios from "axios";
import routes from "./api";

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

export { changeLike, changeDislike };
