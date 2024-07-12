import { MapPin, Calendar, ArrowRight, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

interface DestinationAndDateStepProps {
  toggleGuestsInput: () => void;
  isGuestsInputOpen: boolean;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  toggleGuestsInput,
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
        />
      </div>
      <div className="flex items-center gap-2 flex-1">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Quando?"
          className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
        />
      </div>

      {isGuestsInputOpen ? (
        <Button
          onClick={toggleGuestsInput}
          variant="secondary"
          
        >
          Alterar local e data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button
          onClick={toggleGuestsInput}
          variant="primary"
        >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
