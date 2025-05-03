import Image from "next/image";

export default function About() {
  return (
    <div className="py-2 lg:py-2">
      <div className="flex flex-col md:flex-row md:items-center gap-10">
        <div>
        <h2 className="text-2xl pb-6">
          ¿Quién está detrás de Elisa&CO Hairclips?
        </h2>
        <div className="justify-left text-lg space-y-4">
          <p>
            Elisa&CO nació entre manualidades de toda la vida, la incapacidad de quedarme quieta y las ganas constantes de crear cosas lindas.
          </p>
          <p>
            Soy bióloga por elección y creativa de corazón, con ese impulso constante de transformar lo cotidiano en algo especial. Así nació esta marca, como un espacio donde lo natural, lo único y ese toque diferente se encuentran.
          </p>
          <p>
            Además de este sueño, también tengo otro emprendimiento, estudio, hago cursos para aprender cosas nuevas, juego en el PC, leo y comparto mis días con mi esposo y nuestros perritos, que siempre están cerquita cuando diseño, empaco o simplemente dejo volar la imaginación.
          </p>
          <p>
            Aquí, cada pieza está pensada para acompañarte según tu mood —para que tu estilo hable por ti— con un detalle que sume color, personalidad y un toque auténtico que te haga sentir especial, sin necesidad de esfuerzo.
          </p>
          <p>
            Si llegaste hasta aquí: gracias por estar, por leerme y por ser parte de esta historia que recién comienza.
          </p>
        </div>
        </div>
        <div className="relative aspect-square md:h-[400px] h-[300px]">
        <Image
          src={'/about.webp'}
          alt="About us"
          //width={500}
          //height={500}
          fill
          className="object-contain"
          //className="object-cover rounded-t-2xl shadow-sm"
        />
        </div>
      </div>
    </div>
  );
}