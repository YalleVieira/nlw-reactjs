import { UserRoundPlus, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/button';

interface InviteGuestsStepProps {
  toggleGuestsInputModal: () => void;
  emailsToInvite: string[];
  toggleConfirmTripModal: () => void;
}

export function InviteGuestsStep({
  emailsToInvite,
  toggleConfirmTripModal,
  toggleGuestsInputModal,
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-between gap-3 shadow-shape">
      <button
        type="button"
        onClick={toggleGuestsInputModal}
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="w-fill h-px bg-zinc-800" />

      <Button onClick={toggleConfirmTripModal} variant="primary">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
