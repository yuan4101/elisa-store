'use client';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Drawer, IconButton, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { useMemo } from 'react';

export default function ShoppingCart() {
  const {
    cartItems,
    cartCount,
    isCartOpen,
    toggleCart,
    //removeFromCart,
    updateQuantity
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Crear el mensaje de WhatsApp personalizado
  const whatsappMessage = useMemo(() => {
    const productDetails = cartItems
      .map(
        (item) =>
          `*${item.name}* (Cantidad: ${item.quantity}) - $${(item.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    return `Hola 🧡 Ya encontré los hairclips que van perfecto conmigo. Aquí están los detalles de mi carrito, ¿me confirmas mi pedido? 🌸\n\n${productDetails}\n\nTotal: $${total.toLocaleString()}`;
  }, [cartItems, total]);

  // Enlace de WhatsApp con el mensaje personalizado
  const whatsappLink = `https://wa.me/573016980292?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="flex items-center">
      <IconButton onClick={toggleCart} sx={{ '&:hover': { backgroundColor: 'var(--color-select)' } }}>
        <Badge badgeContent={cartCount} sx={{
          '& .MuiBadge-badge': {
          backgroundColor: 'var(--color-badge)', // tu color hex personalizado
          color: 'white',             // color del texto dentro del badge
          }
        }}>
          <ShoppingCartIcon sx={{ color: 'white' }}/>
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={toggleCart}
        sx={{
          width: '300px',
          '& .MuiDrawer-paper': {
            width: '300px',
            padding: '0px',
          },
        }}
      >
        <Typography paddingTop='15px' paddingLeft='10px' color='var(--color-navbar-bg)' variant="h6" gutterBottom>
          Carrito de compras
        </Typography>
        
        {cartItems.length === 0 ? (
          <div className='flex justify-center py-4'>
          <Typography fontSize='20px 'color='var(--color-text)'>Tu carrito está vacío</Typography>
          </div>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem 
                  key={item.id}
                  divider
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Asegura espacio entre elementos
                    paddingRight: '0 !important', // Elimina padding derecho del ListItem
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}  // Añade un ancho fijo
                    height={64} // Añade una altura fija
                    className="object-cover mr-3 rounded-md"
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price.toLocaleString()} x ${item.quantity}`}
                    sx={{
                      '& .MuiListItemText-primary': {  // Clase específica para el texto primary
                        color: 'var(--color-text)', // Naranja personalizado
                        fontWeight: 'bold',
                      },
                      '& .MuiListItemText-secondary': { // Opcional: estilo para secondary
                        color: 'var(--color-text)',
                      }
                    }}
                  />
                  <div className="flex items-center pr-5" style={{ marginLeft: 'auto' }}>
                    <Button 
                      size="small" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='shadow-md'
                      sx={{
                        color: 'var(--color-badge)',
                        fontSize: '1.5rem',
                        minWidth: '30px',       // Tamaño fijo
                        width: '30px',          // Ancho exacto
                        height: '30px',         // Alto exacto
                        padding: '0',           // Elimina padding interno
                        margin: '0',            // Elimina margen externo
                        backgroundColor: 'var(--color-card-bg)',
                        borderRadius: '8px',    // Bordes ligeramente redondeados (0 para perfecto cuadrado)
                        '& .MuiButton-label': { // Objetivo al contenido interno
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: '1'       // Elimina espacio vertical extra
                        },
                      }}
                    >
                      -
                    </Button>
                    <span className="font-bold text-lg text-[var(--color-text)] mx-3">{item.quantity}</span>
                    <Button 
                      size="small" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='shadow-md'
                      sx={{
                        color: 'var(--color-badge)',
                        fontSize: '1.5rem',
                        minWidth: '30px',       // Tamaño fijo
                        width: '30px',          // Ancho exacto
                        height: '30px',         // Alto exacto
                        padding: '0',           // Elimina padding interno
                        margin: '0',            // Elimina margen externo
                        backgroundColor: 'var(--color-card-bg)',
                        borderRadius: '8px',    // Bordes ligeramente redondeados (0 para perfecto cuadrado)
                        '& .MuiButton-label': { // Objetivo al contenido interno
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          lineHeight: '1'       // Elimina espacio vertical extra
                        },
                      }}
                    >
                      +
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
            
            <Typography paddingBottom='3px' paddingTop='5px' paddingLeft='10px' fontWeight='bold' color='var(--color-text)' variant="h6" className="mt-4">
              Total: ${total.toLocaleString()}
            </Typography>
            
            <div className='flex justify-center pl-4 pr-6'>
            <Button
              component="a"
              href={whatsappLink} // Enlace de WhatsApp
              variant="contained"
              sx={{backgroundColor: 'var(--color-badge)'}}
              fullWidth
              className="mt-4 shadow-md"
              disabled={cartItems.length === 0} // Deshabilitar si el carrito está vacío
            >
              Ordenar
            </Button>
            </div>
          </>
        )}
        
        <div className='flex justify-center pl-4 pr-6 py-3'>
        <Button 
          onClick={toggleCart} 
          className="mt-4 shadow-md"
          fullWidth
          sx={{color: 'var(--color-badge)', background: 'var(--color-card-bg)'}}
        >
          Cerrar
        </Button>
        </div>
      </Drawer>
    </div>
  );
}
