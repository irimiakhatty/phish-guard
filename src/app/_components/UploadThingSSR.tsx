import UploadThingSSRClient from "./UploadThingSSRClient";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

// Server component: computes the router config (server-only) and passes it
// to the client-side UploadThing SSR plugin wrapper.
export default function UploadThingSSR() {
  const routerConfig = extractRouterConfig(ourFileRouter);
  return <UploadThingSSRClient routerConfig={routerConfig} />;
}
