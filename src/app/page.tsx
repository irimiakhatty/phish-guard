import { currentUser } from "@clerk/nextjs/server";
import PhishGuardApp from "~/components/phishguard/PhishGuardApp";
import { LandingPage } from "~/components/phishguard/LandingPage";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return <LandingPage />;
  }

  return <PhishGuardApp />;
}
