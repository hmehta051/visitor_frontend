// config.js

let apiUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:5000"; // development API URL
} else {
  apiUrl = "https://calm-blue-panther-cuff.cyclic.app/"; // production API URL
}

export { apiUrl };
