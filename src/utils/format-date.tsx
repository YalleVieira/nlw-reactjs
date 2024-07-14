import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';

export function formatStartAndEndDates(
  eventStartAndEndDates: DateRange | undefined
): string | null {
  if (
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
  ) {
    return format(eventStartAndEndDates.from, "d'")
      .concat(' a ')
      .concat(
        format(eventStartAndEndDates.to, "d' de 'LLLL", { locale: ptBR })
      );
  } else {
    return null;
  }
}
