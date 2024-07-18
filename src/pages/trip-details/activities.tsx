import { CircleCheck, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '../../components/button';

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface ActivitiesProps {
  toggleCreateActivityModal: () => void;
}

export function Activities({ toggleCreateActivityModal }: ActivitiesProps) {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get(`trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-zinc-100 text-3xl font-semibold">Atividades</h2>
        <Button variant="primary" onClick={toggleCreateActivityModal}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>
      <div className="space-y-8">
        {activities.length > 0 ? (
          activities.map((category) => (
            <div key={category.date} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {format(new Date(category.date), 'd')}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(new Date(category.date), 'EEEE', { locale: ptBR })}
                </span>
              </div>
              {category.activities.length > 0 ? (
                <div>
                  {category.activities.map((activity) => (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(new Date(activity.occurs_at), 'HH:mm')}h
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-sm">
            Ops! Parece que ainda não temos atividades cadastradas.
          </p>
        )}
      </div>
    </div>
  );
}
