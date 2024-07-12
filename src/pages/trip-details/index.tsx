import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { DestinationAndDateHeadear } from "./destination-and-date-headear";
import { Activities } from "./activities";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function toggleCreateActivityModal() {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeadear />

      <main className="flex gap-16 px-4">
        <Activities toggleCreateActivityModal={toggleCreateActivityModal} />
        <div className="w-80 space-y-6  text-zinc-100">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          toggleCreateActivityModal={toggleCreateActivityModal}
        />
      )}
    </div>
  );
}
