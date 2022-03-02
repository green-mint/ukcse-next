import axios from "axios";

export const registerLogs = async (userId, event, eventUrl) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logs`;
  console.log(url);
  axios.post(url, {
    userId: userId,
    event: event,
    url: eventUrl,
  });
};
