export default function ({ $axios, $cookies }) {
  const token = $cookies.get("token");

  if (token) {
    $axios.onRequest((config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    });
  }
}
