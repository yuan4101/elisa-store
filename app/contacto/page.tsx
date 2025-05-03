import Image from "next/image";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function contacto() {
    return (
        <div className="px-6">
            <p className="text-lg lg:py-6 py-2">
                Instagram, TikTok o WhatsApp... donde estés, ahí también está Elisa&CO. Descubre nuestros hairclips, antójate o chatea conmigo y te ayudo a elegir el tuyo. ¡Tu próximo favorito podría estar a un clic!
            </p>
            <div className="flex items-center space-x-6">
                <a href={'https://www.instagram.com/elisahairclips?igsh=aWthcHdkazdkaGRn'} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon sx={{fontSize: 60, color: 'black'}}></InstagramIcon>
                </a>
                <a href={'https://api.whatsapp.com/send?phone=573016980292&text=Hola%20🧡%20Estoy%20buscando%20ese%20hairclip%20que%20combine%20perfecto%20conmigo%2C%20¿me%20ayudas%20a%20encontrar%20el%20que%20vaya%20con%20mi%20estilo%3F%20🌸'} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon sx={{fontSize: 60, color: 'black'}}></WhatsAppIcon>
                </a>
                <a href={'https://www.tiktok.com/@elisahairclips'} target="_blank" rel="noopener noreferrer">
                    <div className="w-[50px] h-[50px] relative">
                        <Image
                            src="/icons/tiktokicon.webp"
                            alt="Tik tok"
                            fill
                            className="object-contain"
                        />
                    </div>
                </a>
            </div>
        </div>
    )
}