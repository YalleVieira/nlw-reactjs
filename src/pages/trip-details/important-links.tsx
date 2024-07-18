import { Link2, Plus } from 'lucide-react';
import { Button } from '../../components/button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

interface ImportantLinkProps {
  toggleCreateNewLinkModal: () => void;
}

interface ImportantLink {
  id: string;
  url: string;
  title: string;
}

export function ImportantLinks({
  toggleCreateNewLinkModal,
}: ImportantLinkProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => {
        setLoading(true);
        setImportantLinks(response.data.importantLinks || []);
      })
      .catch((error) => {
        console.error('Error fetching importantLinks:', error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log('teste', importantLinks);
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      {loading ? (
        <span>Carregando...</span>
      ) : (
        <div className="space-y-5">
          {importantLinks.length > 0 ? (
            importantLinks.map((link) => {
              return (
                <div
                  className="flex items-center justify-between"
                  key={link.id}
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {link.title}
                    </span>
                    <a
                      href={link.url}
                      className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                    >
                      {link.url}
                    </a>
                  </div>
                  <Link2 className="size-5 text-zinc-400 shrink-0" />
                </div>
              );
            })
          ) : (
            <p className="text-zinc-500 text-sm">
              Cadastre o primeiro link no botão abaixo.
            </p>
          )}
        </div>
      )}
      <Button
        onClick={toggleCreateNewLinkModal}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5 " />
        Cadastrar novo link
      </Button>
    </div>
  );
}
