"use client";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export default function UploadThingSSRClient({ routerConfig }: { routerConfig: any }) {
  return <NextSSRPlugin routerConfig={routerConfig} />;
}
