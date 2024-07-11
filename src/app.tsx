import { MapPin, Calendar, ArrowRight } from "lucide-react";

export function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-full px-6 text-center space-y-10 ">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" />
          <p className="text-zinc-300 text-lg ">
            Convide seus amigos e planeje sua proxima viagem!
          </p>
        </div>
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3 shadow-shape">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Quando?"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
            />
          </div>
          <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Continuar
            <ArrowRight className="size-5" />
          </button>
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
        .
      </div>
    </div>
  );
}
