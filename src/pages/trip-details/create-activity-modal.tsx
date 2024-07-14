import { X, Tag, Calendar } from 'lucide-react';
import { Button } from '../../components/button';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { DateRange, DayPicker } from 'react-day-picker';
import { formatStartAndEndDates } from '../../utils/format-date';

interface CreateActivityModalProps {
  toggleCreateActivityModal: () => void;
}

export function CreateActivityModal({
  toggleCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [isDatePicker, setIsDatePicker] = useState(false);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  function toggleDatePicker() {
    setIsDatePicker(!isDatePicker);
  }

  return (
    <div className="text-zinc-100 fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className=" font-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={toggleCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <button
              onClick={toggleDatePicker}
              className="flex items-center  gap-2 flex-1"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-start text-zinc-400 w-50 flex-1">
                {formatStartAndEndDates(eventStartAndEndDates) ||
                  ' Data e horário da atividade'}
              </span>
            </button>

            {isDatePicker && (
              <>
                <Calendar className="text-zinc-400 size-5" />
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="font-lg font-semibold">
                          Selecione a data
                        </h2>
                        <button type="button" onClick={toggleDatePicker}>
                          <X className="size-5 text-zinc-400" />
                        </button>
                      </div>

                      <DayPicker
                        mode="range"
                        selected={eventStartAndEndDates}
                        onSelect={setEventStartAndEndDates}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  );
}
