import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react';
import { Button } from '../../components/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams<{ tripId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`trips/${tripId}/participants`)
      .then((response) => {
        setLoading(true);
        setParticipants(response.data.participants || []);
      })
      .catch((error) => {
        console.error('Error fetching participants:', error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {loading ? (
        <span className="block text-sm text-zinc-400 truncate">
          Carregando...
        </span>
      ) : (
        <div className="space-y-5">
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {participant.name ?? `Convidado ${index}`}
                  </span>
                  <span className="block text-sm text-zinc-400 truncate">
                    {participant.email}
                  </span>
                </div>

                {participant.is_confirmed ? (
                  <CheckCircle2 className="text-green-400 size-5 shrink-0" />
                ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )}
              </div>
            ))
          ) : (
            <div>
              <span className="block text-sm text-zinc-400 truncate">
                Adicione seu primeiro convidado!
              </span>
            </div>
          )}
        </div>
      )}
      <Button variant="secondary" size="full">
        <UserCog className="size-5 " />
        Gerenciar convidados
      </Button>
    </div>
  );
}
