"use client";

import { useEffect, useState } from "react";
import { getInitialIPInfo, fetchIPInfo } from "@/services/ipify-service";
import { isIPAddress } from "@/utils";

import { IPInfo } from "@/definitions";

import { LocationMap } from "@/components/location-map";
import { SearchBar } from "@/components/search-bar";
import { IPInfoDisplay } from "@/components/ip-info-display";

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user's IP and location data on page load
    const loadInitialIPInfo = async () => {
      try {
        const data = await getInitialIPInfo();
        setIpInfo(data);
      } catch (error) {
        console.error("Error fetching initial IP:", error);
      }
    };

    loadInitialIPInfo();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const searchParam = isIPAddress(query)
        ? `ipAddress=${query}`
        : `domain=${query}`;
      const data = await fetchIPInfo(searchParam);
      setIpInfo(data);
    } catch (error) {
      console.error("Error fetching search result:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen relative">
      <div
        className="h-80 sm:h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            window.innerWidth < 768
              ? "url(/images/pattern-bg-mobile.png)"
              : "url(/images/pattern-bg-desktop.png)",
        }}
      ></div>
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-medium text-white mb-2">
            IP Address Tracker
          </h1>
          <SearchBar onSearch={handleSearch} loading={loading} />
          {ipInfo && <IPInfoDisplay ipInfo={ipInfo} loading={loading} />}
        </div>
      </div>
      {ipInfo && <LocationMap location={ipInfo.location} />}
    </div>
  );
}
