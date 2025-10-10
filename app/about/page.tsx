import AboutSection from "../../Features/about/components/AboutSection";

export default function About() {
  const content = [
    "Elisa&CO nació de la mezcla entre creatividad, amor por la naturaleza y las ganas constantes de crear cosas lindas.",
    "Detrás de la marca estoy yo, Natalia, bióloga por elección y creativa de corazón, con ese impulso de transformar lo cotidiano en algo especial." +
    " Y también está Juan, el todero oficial que siempre está ahí para dar una mano en todo lo que se necesita.",
    "Juntos gestionamos, diseñamos, empacamos, creamos, enviamos y entregamos cada pedido con amor. Así hacemos de este sueño un espacio donde la ciencia," +
    " la moda y la autenticidad se encuentran, para que cada pieza acompañe tu mood y le sume color, personalidad y un toque auténtico a tu estilo," +
    " sin necesidad de esfuerzo."
  ];
  return (
    <div>
      <AboutSection
        content={content}
      />
    </div>
  )
}