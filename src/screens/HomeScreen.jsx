import { Link } from "react-router";
import { ArrowRight, Blocks, Gamepad2, Users, Pickaxe } from "lucide-react";
import players from "../assets/data/players.json";
import modList from "../assets/data/mods.json";

const modCount = Array.isArray(modList.mods) ? modList.mods.length : 0;

export default function HomeScreen() {
  return (
    <main className="min-h-[calc(100vh-68px)] bg-gray-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <section className="relative isolate overflow-hidden rounded-3xl border border-lime-300/15 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 px-6 py-12 shadow-2xl sm:px-10 sm:py-16 lg:px-14">
          <div className="absolute -right-16 -top-20 -z-10 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-10 -z-10 hidden h-40 w-40 rotate-12 rounded-3xl border border-lime-300/10 bg-lime-300/[0.03] lg:block" />

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
              <Pickaxe className="h-4 w-4" />
              Minecraft • comunidade
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Bem-vindo ao <span className="text-lime-300">CashMine</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
              Seu ponto de encontro para conhecer o servidor, encontrar os jogadores
              e descobrir os mods que fazem parte da experiência.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ModPack"
                className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-lime-200"
              >
                Explorar mods <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/player"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver jogadores <Users className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section aria-label="Informações do servidor" className="mt-6 grid gap-4 sm:grid-cols-3">
          <InfoCard icon={Gamepad2} label="Servidor" value="CashMine" detail="Comunidade Minecraft" />
          <InfoCard icon={Users} label="Jogadores cadastrados" value={players.length} detail="Conheça quem faz parte" />
          <InfoCard icon={Blocks} label="Mods no catálogo" value={modCount} detail="Veja os mods e relações" />
        </section>

        <section className="mt-12 grid gap-8 rounded-3xl border border-white/10 bg-gray-900/70 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Comece por aqui</p>
            <h2 className="mt-2 text-2xl font-bold">Tudo do servidor em um só lugar</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Consulte o catálogo de mods para conferir versões e addons relacionados,
              ou visite a página de jogadores para conhecer a comunidade.
            </p>
          </div>
          <Link
            to="/ModPack"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-lime-300/30 px-4 py-3 text-sm font-semibold text-lime-200 transition hover:bg-lime-300/10"
          >
            Abrir catálogo <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-gray-900 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-gray-400">{label}</span>
        <Icon className="h-5 w-5 text-lime-300" />
      </div>
      <p className="mt-4 text-3xl font-extrabold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </article>
  );
}
