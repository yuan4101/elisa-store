import AboutSection from "../components/about/aboutSection";

export default function About() {
  const title = "¿Quién está detrás de Elisa&CO Hairclips?";
  const content = [
    "Elisa&CO nació entre manualidades de toda la vida, la incapacidad de quedarme quieta y las ganas constantes de crear cosas lindas.",
    "Soy bióloga por elección y creativa de corazón, con ese impulso constante de transformar lo cotidiano en algo especial. Así nació esta marca, como un espacio donde lo natural, lo único y ese toque diferente se encuentran.",
    "Además de este sueño, también tengo otro emprendimiento, estudio, hago cursos para aprender cosas nuevas, juego en el PC, leo y comparto mis días con mi esposo y nuestros perritos, que siempre están cerquita cuando diseño, empaco o simplemente dejo volar la imaginación.",
    "Aquí, cada pieza está pensada para acompañarte según tu mood —para que tu estilo hable por ti— con un detalle que sume color, personalidad y un toque auténtico que te haga sentir especial, sin necesidad de esfuerzo.",
    "Si llegaste hasta aquí: gracias por estar, por leerme y por ser parte de esta historia que recién comienza.",
  ];
  return (
    <div>
      <AboutSection
        title={title}
        content={content}
      />
    </div>
  )
}