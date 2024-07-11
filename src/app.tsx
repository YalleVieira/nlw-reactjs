import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
  User,
} from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsInputModal, setIsGuestsInputModal] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["anamaria@gmail.com"]);
  const [isConfirmTripModal, setIsconfirmModal] = useState(false);

  function handleGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  }

  function handleGuestsInputModal() {
    setIsGuestsInputModal(!isGuestsInputModal);
  }

  function handleConfirmTripModal() {
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
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="size-5 text-zinc-400" />
              <input
                disabled={isGuestsInputOpen}
                type="text"
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>

            {isGuestsInputOpen ? (
              <button
                onClick={handleGuestsInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
              >
                Alterar local e data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={handleGuestsInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
              <button
                type="button"
                onClick={handleGuestsInputModal}
                className="flex items-center gap-2 flex-1 text-left"
              >
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100">
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </span>
                ) : (
                  <span className="text-zinc-400 text-lg flex-1">
                    Quem estará na viagem?
                  </span>
                )}
              </button>

              <button
                onClick={handleConfirmTripModal}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            temos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
        </p>
      </div>

      {isGuestsInputModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <X onClick={handleGuestsInputModal} className="size-5" />
              </div>
              <p className="text-sm text-zinc-400 ">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
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
      )}

      {isConfirmTripModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Confirmar criação de viagem
                </h2>
                <X onClick={handleConfirmTripModal} className="size-5" />
              </div>
              <p className="text-sm text-zinc-400 ">
                Para concluir a criação da viagem para{" "}
                <span className="font-semibold text-zinc-100">
                  Florianópolis, Brasil
                </span>{" "}
                nas datas{" "}
                <span className="font-semibold text-zinc-100">
                  16 a 27 de Agosto
                </span>
              </p>
            </div>

            <div className="w-full h-px bg-zinc-800"></div>

            <form onSubmit={addNewEmailToInvite} className="space-y-3">
              <div className="h-14 px-4 rounded-lg flex items-center gap-2 flex-1  bg-zinc-950 border-x-zinc-800">
                <User className="size-5 text-zinc-400" />

                <input
                  type="text"
                  name="email"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none "
                />
              </div>

              <div className="h-14 px-4 rounded-lg flex items-center gap-2 flex-1  bg-zinc-950 border-x-zinc-800">
                <AtSign className="size-5 text-zinc-400" />

                <input
                  type="text"
                  name="email"
                  placeholder="Seu e-mail pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none "
                />
              </div>

              <button className="bg-lime-300 px-5 py-2 w-full h-11 justify-center text-lime-950 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
