import { X, User, AtSign } from "lucide-react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  createTrip: () => void;
  toggleConfirmTripModal: () => void;
}

export function ConfirmTripModal({
  createTrip,
  toggleConfirmTripModal,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <X onClick={toggleConfirmTripModal} className="size-5" />
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

        <form onSubmit={createTrip} className="space-y-3">
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

          <Button variant="primary" size="full" >
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
