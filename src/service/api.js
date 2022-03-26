var apiHost = process.env.REACT_APP_API_HOST

if (process.env.NODE_ENV === "production"){
    apiHost = process.env.REACT_APP_API_HOST_PROD
}

const routes = {
    pattern: `${apiHost}/api/pattern`,
    login: `${apiHost}/auth/login`,
    logout: `${apiHost}/auth/logout`
}

export default routes;