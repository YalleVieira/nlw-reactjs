import { useState } from 'react';
import { CreateActivityModal } from './create-activity-modal';
import { ImportantLinks } from './important-links';
import { Guests } from './guests';
import { DestinationAndDateHeadear } from './destination-and-date-headear';
import { Activities } from './activities';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';

export function TripDetailsPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [isCreateNewLinkModal, setIsCreateNewLinkModal] = useState(false);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  function toggleCreateActivityModal() {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  }

  function toggleCreateNewLinkModal() {
    setIsCreateNewLinkModal(!isCreateNewLinkModal);
  }

  async function createNewLink(url: string, title: string) {
    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeadear />

      <main className="flex gap-16 px-4">
        <Activities toggleCreateActivityModal={toggleCreateActivityModal} />
        <div className="w-80 space-y-6  text-zinc-100">
          <ImportantLinks toggleCreateNewLinkModal={toggleCreateNewLinkModal} />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>
      {isCreateActivityModalOpen && (
        <CreateActivityModal
          toggleCreateActivityModal={toggleCreateActivityModal}
        />
      )}
      {isCreateNewLinkModal && (
        <Modal
          content={{
            title: 'Cadastrar link',
            subtitle: 'Todos convidados podem visualizar os links importantes.',
          }}
          closeModal={toggleCreateNewLinkModal}
        >
          <Button
            variant="primary"
            size="full"
            onClick={() => createNewLink('link', 'text')}
          >
            Salvar link
          </Button>
        </Modal>
      )}
    </div>
  );
}
