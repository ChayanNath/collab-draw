import { BACKEND_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";
import axios from "axios";

export async function getExistingShapes(slug: string) {
  try {
    const token = await getVerifiedToken();
    const res = await axios.get(`${BACKEND_URL}/chat/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const messsages = res.data.chats || [];

    return messsages.map(
      (messages: {
        message: string;
        id: number;
        roomId: number;
        userId: string;
      }) => {
        const parsedMessage = JSON.parse(messages?.message);
        return parsedMessage;
      }
    );
  } catch (error) {
    console.log(error);
  }
}
