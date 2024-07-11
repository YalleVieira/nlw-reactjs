import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsInputModal, setIsGuestsInputModal] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["anamaria@gmail.com"]);
  const [isConfirmTripModal, setIsconfirmModal] = useState(false);

  function toggleGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  }

  function toggleGuestsInputModal() {
    setIsGuestsInputModal(!isGuestsInputModal);
  }

  function toggleConfirmTripModal() {
    setIsconfirmModal(!isConfirmTripModal);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) return;

    if (!emailsToInvite.includes(email))
      setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  function createTrip() {
    navigate("/trip-details");
  }

  return (
    <div className="text-zinc-300 h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-full px-6 text-center space-y-10 ">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" />
          <p className="text-zinc-300 text-lg ">
            Convide seus amigos e planeje sua proxima viagem!
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            toggleGuestsInput={toggleGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              toggleGuestsInputModal={toggleGuestsInputModal}
              toggleConfirmTripModal={toggleConfirmTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>
          e
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
        </p>
      </div>

      {isGuestsInputModal && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          emailsToInvite={emailsToInvite}
          toggleGuestsInputModal={toggleGuestsInputModal}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModal && (
        <ConfirmTripModal
          createTrip={createTrip}
          toggleConfirmTripModal={toggleConfirmTripModal}
        />
      )}
    </div>
  );
}
