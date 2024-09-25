import { IPInfo } from "@/definitions";

interface IPInfoDisplayProps {
  ipInfo: IPInfo;
  loading: boolean;
}

const InfoSectionLoadingSkeleton = () => (
  <div className="h-6 bg-gray-200 rounded-md"></div>
);

const InfoSection = ({
  title,
  content,
  loading,
}: {
  title: string;
  content: string;
  loading: boolean;
}) => (
  <div className="flex-1 p-3 sm:p-6 space-y-2 h-full text-center w-full sm:text-left">
    <p className="text-[#969696] font-semibold text-[12px] uppercase tracking-wider">
      {title}
    </p>
    {loading ? (
      <InfoSectionLoadingSkeleton />
    ) : (
      <p className="text-2xl font-medium">{content}</p>
    )}
  </div>
);

const Divider = () => (
  <div className="hidden sm:block h-16 w-px bg-gray-200 self-center"></div>
);

export function IPInfoDisplay({ ipInfo, loading }: IPInfoDisplayProps) {
  return (
    <div className="flex flex-col w-[86vw] p-4 sm:p-0 justify-between mt-6 sm:flex-row sm:w-[58rem] sm:min-h-36 items-start mx-auto bg-white rounded-xl sm:mt-10">
      <InfoSection title="IP Address" content={ipInfo.ip} loading={loading} />
      <Divider />
      <InfoSection
        title="Location"
        content={`${ipInfo.location.city}, ${ipInfo.location.region}, ${ipInfo.location.country}`}
        loading={loading}
      />
      <Divider />
      <InfoSection
        title="Timezone"
        content={`UTC ${ipInfo.location.timezone}`}
        loading={loading}
      />
      <Divider />
      <InfoSection
        title="ISP"
        content={ipInfo.isp ? ipInfo.isp : "Unknown"}
        loading={loading}
      />
    </div>
  );
}
