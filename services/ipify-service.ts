import axios from "axios";
import { IPInfo } from "@/definitions";

const API_KEY = process.env.NEXT_PUBLIC_IPIFY_API_KEY;
const BASE_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

export const fetchIPInfo = async (query: string): Promise<IPInfo> => {
  const url = `${BASE_URL}&${query}`;
  const { data } = await axios.get<IPInfo>(url);
  return data;
};

export const getInitialIPInfo = async (): Promise<IPInfo> => {
  const { data } = await axios.get<IPInfo>(BASE_URL);
  return data;
};
