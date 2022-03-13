var apiHost = "http://localhost:3000"

if (process.env.NODE_ENV === "production"){
    apiHost = "production API"
}

const routes = {
    upload: `${apiHost}/api/pattern`
}

export default routes;