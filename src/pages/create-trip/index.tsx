import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';

import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsInputModal, setIsGuestsInputModal] = useState(false);
  const [isConfirmTripModal, setIsconfirmModal] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [emailsToInvite, setEmailsToInvite] = useState(['anamaria@gmail.com']);

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
    const email = data.get('email')?.toString();

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

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) return;
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;
    if (emailsToInvite.length === 0) return;
    if (!ownerName || !ownerEmail) return;

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
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
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
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
          nossos{' '}
          <a href="#" className="text-zinc-300 underline">
            termos de uso{' '}
          </a>
          e{' '}
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
          destination={destination}
          eventStartAndEndDates={eventStartAndEndDates}
          createTrip={createTrip}
          toggleConfirmTripModal={toggleConfirmTripModal}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}
    </div>
  );
}
