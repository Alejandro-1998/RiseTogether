import Hero from "./home/hero";
import TopProyectos from "./home/top_proyectos";
import HistoriasExito from "./home/historias_exito";
import RelevantesComunidad from "./home/relevantes_comunidad";
import FormularioFeedback from "./home/formulario_feedback";

export default function Home() {
  return (
    <main className="space-y-20 pb-24">
      <Hero />
      <TopProyectos />
      <HistoriasExito />
      <RelevantesComunidad />
      <FormularioFeedback />
    </main>
  );
}

