import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";

interface InviteGuestsModalProps {
  handleGuestsInputModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvites: (email: string) => void;
}

export function InviteGuestsModal({
  addNewEmailToInvite,
  emailsToInvite,
  handleGuestsInputModal,
  removeEmailFromInvites,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <X onClick={handleGuestsInputModal} className="size-5" />
          </div>
          <p className="text-sm text-zinc-400 ">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 bg-zinc-800 rounded-md flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button onClick={() => removeEmailFromInvites(email)}>
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={addNewEmailToInvite}
          className="p-2.5 bg-zinc-950 border-x-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="p-2 flex items-center gap-2 flex-1">
            <AtSign className="size-5 text-zinc-400" />

            <input
              type="text"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none "
            />
          </div>

          <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Convidar
            <Plus className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
