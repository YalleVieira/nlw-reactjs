import { MapPin, Calendar, ArrowRight, Settings2, X } from 'lucide-react';
import { Button } from '../../../components/button';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { formatStartAndEndDates } from '../../../utils/format-date';
import 'react-day-picker/dist/style.css';
interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  setDestination: (destination: string) => void;
  toggleGuestsInput: () => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  toggleGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePicker, setIsDatePicker] = useState(false);

  function toggleDatePicker() {
    setIsDatePicker(!isDatePicker);
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center justify-between gap-3 shadow-shape">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={toggleDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center  gap-2 flex-1"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-start text-zinc-400 w-50 flex-1">
          {formatStartAndEndDates(eventStartAndEndDates) || 'Quando?'}
        </span>
      </button>

      {isDatePicker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-lg font-semibold">Selecione a data</h2>
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
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={toggleGuestsInput} variant="secondary">
          Alterar local e data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={toggleGuestsInput} variant="primary">
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
