"use client";

import { useState, useEffect } from "react";
import Product, { SeasonType, GripType } from "../types/product";
import { errorMessage } from "../../utils/errorMessage";
import { useNotification } from "@/Features/notification/hooks/useNotification";
import Image from "next/image";
import { Button, IconButton } from "@mui/material";
import TextareaAutosize from "react-textarea-autosize";
import EditIcon from "@mui/icons-material/Edit";
import { NotificationType } from "../types/notification";

const SearchBox = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-gray-300 py-2 px-4 shadow-sm focus:border-[var(--color-navbar-bg)] focus:outline-none focus:ring-1 focus:ring-[var(--color-navbar-bg)]"
        placeholder="Buscar por nombre..."
      />
    </div>
  );
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { showNotification } = useNotification();

  // Estados para edición
  const [editedSeason, setEditedSeason] = useState<SeasonType>(
    SeasonType.NoEspecificado
  );
  const [editedVisible, setEditedVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedId, setEditedId] = useState("");
  const [editedGrip, setEditedGrip] = useState<GripType>(
    GripType.NoEspecificado
  );
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedStock, setEditedStock] = useState(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filteredProducts = localProducts.filter((product) => {
    if (!searchQuery) return true;
    const normalizedName = normalizeString(product.name || "");
    const normalizedSearch = normalizeString(searchQuery);
    return normalizedName.includes(normalizedSearch);
  });

  const formatPriceCOP = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (isEditing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditing]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setEditedId("");
    setEditedName("");
    setEditedGrip(GripType.NoEspecificado);
    setEditedPrice(0);
    setEditedStock(0);
    setEditedDescription("");
    setEditedSeason(SeasonType.NoEspecificado);
    setEditedVisible(false);
    setIsAddModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedId(product.id);
    setEditedGrip(product.grip);
    setEditedPrice(product.price);
    setEditedStock(product.stock);
    setEditedDescription(product.description);
    setEditedSeason(product.season);
    setEditedVisible(product.visible);
    setIsEditing(true);
  };

  const handleSave = async () => {
    const isNew = editingProduct === null;

    if (editedId.includes(" ")) {
      showNotification({
        message: "El ID no puede contener espacios",
        type: NotificationType.Error,
      });
      return;
    }

    const isIdUnique = !localProducts.some(
      (product) =>
        product.id === editedId && (isNew || product.id !== editingProduct?.id)
    );

    if (!isIdUnique) {
      showNotification({
        message: "El ID ya está en uso por otro producto",
        type: NotificationType.Error,
      });
      return;
    }

    try {
      const payload: Product = {
        id: editedId,
        name: editedName,
        grip: editedGrip,
        price: editedPrice,
        description: editedDescription,
        stock: editedStock,
        imagePath: `/${editedId}.webp`,
        season: editedSeason,
        visible: editedVisible,
      };

      const response = await fetch("/api/products", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isNew
            ? payload
            : {
                ...payload,
                oldId: editingProduct.id,
              }
        ),
      });

      if (!response.ok) throw new Error(errorMessage(response.status));

      if (isNew) {
        setLocalProducts((prev) => [...prev, payload]);
        showNotification({
          message: "Producto agregado con éxito",
          type: NotificationType.Success,
        });
      } else {
        setLocalProducts((products) =>
          products.map((product) =>
            product.id === editingProduct.id
              ? { ...product, ...payload }
              : product
          )
        );
        showNotification({
          message: "Producto actualizado con éxito",
          type: NotificationType.Success,
        });
      }

      setEditingProduct(null);
      setIsEditing(false);
      setIsAddModalOpen(false);
    } catch (error) {
      showNotification({
        message: errorMessage(error),
        type: NotificationType.Error,
      });
    }
  };

  const handleDelete = async (product: Product) => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas eliminar permanentemente el producto "${product.name}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: product.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }

      setLocalProducts((prev) => prev.filter((p) => p.id !== product.id));
      setEditingProduct(null);
      setIsEditing(false);

      showNotification({
        message: `Producto "${product.name}" eliminado correctamente`,
        type: NotificationType.Success,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      showNotification({
        message: errorMessage(error || "Error al eliminar el producto"),
        type: NotificationType.Error,
        duration: 5000,
      });
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsEditing(false);
    setIsAddModalOpen(false);
  };

  // Obtener productos al autenticar
  useEffect(() => {
    //setIsAuthenticated(true); // DELETE *********************************************************************************************
    if (!isAuthenticated) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error(errorMessage(response.status));
        }

        const data: Product[] = await response.json();
        const alphabeticOrder = data.sort(
          (actual: Product, siguiente: Product) => {
            return actual.name.localeCompare(siguiente.name);
          }
        );
        const orderedData = alphabeticOrder.sort(
          (actual: Product, siguiente: Product) => {
            if (actual.visible === false && siguiente.visible === true) {
              return 1;
            } else if (actual.visible === true && siguiente.visible === false) {
              return -1;
            } else {
              return 0;
            }
          }
        );

        setLocalProducts(orderedData);
      } catch (eventError) {
        setError(
          errorMessage(
            `Error al cargar los productos (${errorMessage(eventError)})`
          )
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]);

  // Verificación básica de contraseña
  const handleLogin = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    if (password === "camila29") {
      setIsAuthenticated(true);
      showNotification({
        message: "Inicio de sesion con exito",
        type: NotificationType.Success,
      });
    } else {
      showNotification({
        message: "Contraseña incorrecta",
        type: NotificationType.Error,
      });
    }
  };

  // Actualizar stock (ahora con persistencia en API)
  const updateStock = async (id: string, newStock: number) => {
    if (isNaN(newStock)) return;

    try {
      const response = await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldId: id,
          stock: newStock,
        }),
      });

      if (!response.ok)
        throw new Error(
          errorMessage(
            `Error al actualizar (${response.status}: ${response.statusText})`
          )
        );

      setLocalProducts((productos) =>
        productos.map((producto) =>
          producto.id === id ? { ...producto, stock: newStock } : producto
        )
      );

      showNotification({
        message: `Stock actualizado para ${
          localProducts.find((producto) => producto.id === id)?.name
        }`,
        type: NotificationType.Success,
        duration: 3000,
      });
    } catch (eventError) {
      showNotification({
        message: errorMessage(eventError),
        type: NotificationType.Error,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-25 pb-40 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-[var(--color-card-bg)] p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl mb-4 text-center">Acceso Administrador</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[var(--color-badge-light)] text-white p-2 rounded hover:bg-[var(--color-badge)] transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="pt-40 pb-60 text-xl flex items-center justify-center">
        <p>Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-bold pb-2">Administrar Stock</h1>
          <div className="pb-3">
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="flex justify-right gap-4">
            <button
              onClick={handleAddProduct}
              className="bg-[var(--color-badge-light)] text-white px-4 py-2 rounded hover:bg-[var(--color-badge)] transition"
            >
              Agregar producto
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-[var(--color-button-pink-light)] text-white px-4 py-2 rounded hover:bg-[var(--color-button-pink)] transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="relative">
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl mb-4 flex-shrink-0">
                    Creando producto
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">
                      ID{" "}
                      <span className="text-gray-500">
                        (Letras, numeros y guiones &quot;-&quot; permitidos)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={editedId}
                      onChange={(e) => {
                        let newValue = e.target.value.replace(/\s+/g, "-");
                        newValue = newValue.replace(/[^a-zA-Z0-9-]/g, "");
                        setEditedId(newValue);
                      }}
                      className="w-full p-2 border rounded-md mt-1"
                      pattern="[a-zA-Z0-9-]+"
                      title="Solo se permiten letras, números y guiones"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Agarre{" "}
                      <span className="text-gray-500">
                        (Agarre &quot;Sin definir&quot; deshabilita la vista)
                      </span>
                    </label>
                    <select
                      value={editedGrip}
                      onChange={(e) =>
                        setEditedGrip(e.target.value as GripType)
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value={GripType.NoEspecificado}>
                        Sin definir
                      </option>
                      <option value={GripType.Micro}>Micro</option>
                      <option value={GripType.Bajo}>Bajo</option>
                      <option value={GripType.Medio}>Medio</option>
                      <option value={GripType.MedioAlto}>Medio a alto</option>
                      <option value={GripType.Alto}>Alto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Precio{" "}
                      <span className="text-gray-500">
                        ({formatPriceCOP(editedPrice)})
                      </span>
                    </label>
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                          setEditedPrice(value === "" ? 0 : Number(value));
                        }
                      }}
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium"> Stock </label>
                    <input
                      type="text"
                      value={editedStock}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]*$/.test(value)) {
                          setEditedStock(value === "" ? 0 : Number(value));
                        }
                      }}
                      className="w-full p-2 border rounded-md mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Descripción
                    </label>
                    <TextareaAutosize
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      minRows={2}
                      className="w-full p-2 border rounded-md mt-1 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Temporada
                    </label>
                    <select
                      value={editedSeason}
                      onChange={(e) =>
                        setEditedSeason(e.target.value as SeasonType)
                      }
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value={SeasonType.NoEspecificado}>
                        Sin defini
                      </option>
                      <option value={SeasonType.AmorAmistad}>
                        Amor y Amistad
                      </option>
                      <option value={SeasonType.Halloween}>Halloween</option>
                      <option value={SeasonType.Navidad}>Navidad</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="visible-new"
                      checked={editedVisible}
                      onChange={(e) => setEditedVisible(e.target.checked)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="visible-new"
                      className="text-sm font-medium"
                    >
                      Producto visible en la tienda
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-white border rounded-lg bg-[var(--color-button-pink-light)] hover:bg-[var(--color-button-pink)]"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[var(--color-badge-light)] text-white rounded-lg hover:bg-[var(--color-badge)]"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`rounded-lg shadow-md ${
                product.visible === false
                  ? "bg-[var(--color-card-bg-unavailable)]"
                  : "bg-[var(--color-card-bg)]"
              }`}
            >
              <div className="relative">
                {editingProduct?.id === product.id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl mb-4 flex-shrink-0">
                          Editando producto:{" "}
                          <span className="font-light">{product.id}</span>
                        </h3>
                        <div className="relative w-1/6 rounded-xl aspect-square ">
                          <Image
                            src={
                              product.imagePath
                                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/sm${product.imagePath}`
                                : "/icons/file.svg"
                            }
                            unoptimized
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/icons/file.svg";
                              (e.target as HTMLImageElement).classList.add(
                                "p-4",
                                "opacity-70"
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium">
                            Nombre
                          </label>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Agarre{" "}
                            <span className="text-gray-500">
                              (Agarre &quot;Sin definir&quot; deshabilita la
                              vista)
                            </span>
                          </label>
                          <select
                            value={editedGrip}
                            onChange={(e) =>
                              setEditedGrip(e.target.value as GripType)
                            }
                            className="w-full p-2 border rounded-md mt-1"
                          >
                            <option value={GripType.NoEspecificado}>
                              Sin definir
                            </option>
                            <option value={GripType.Micro}>Micro</option>
                            <option value={GripType.Bajo}>Bajo</option>
                            <option value={GripType.Medio}>Medio</option>
                            <option value={GripType.MedioAlto}>
                              Medio a alto
                            </option>
                            <option value={GripType.Alto}>Alto</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Precio{" "}
                            <span className="text-gray-500">
                              ({formatPriceCOP(editedPrice)})
                            </span>
                          </label>
                          <input
                            type="text"
                            value={editedPrice}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (
                                value === "" ||
                                /^[0-9]*\.?[0-9]*$/.test(value)
                              ) {
                                setEditedPrice(
                                  value === "" ? 0 : Number(value)
                                );
                              }
                            }}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            {" "}
                            Stock{" "}
                          </label>
                          <input
                            type="text"
                            value={editedStock}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === "" || /^[0-9]*$/.test(value)) {
                                setEditedStock(
                                  value === "" ? 0 : Number(value)
                                );
                              }
                            }}
                            className="w-full p-2 border rounded-md mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Descripción
                          </label>
                          <TextareaAutosize
                            value={editedDescription}
                            onChange={(e) =>
                              setEditedDescription(e.target.value)
                            }
                            minRows={2}
                            className="w-full p-2 border rounded-md mt-1 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Temporada
                          </label>
                          <select
                            value={editedSeason}
                            onChange={(e) =>
                              setEditedSeason(e.target.value as SeasonType)
                            }
                            className="w-full p-2 border rounded-md mt-1"
                          >
                            <option value={SeasonType.NoEspecificado}>
                              Sin definir
                            </option>
                            <option value={SeasonType.AmorAmistad}>
                              Amor y Amistad
                            </option>
                            <option value={SeasonType.Halloween}>
                              Halloween
                            </option>
                            <option value={SeasonType.Navidad}>Navidad</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="visible-edit"
                            checked={editedVisible}
                            onChange={(e) => setEditedVisible(e.target.checked)}
                            className="mr-2"
                          />
                          <label
                            htmlFor="visible-edit"
                            className="text-sm font-medium"
                          >
                            Producto visible en la tienda
                          </label>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-white border rounded-lg bg-[var(--color-button-pink-light)] hover:bg-[var(--color-button-pink)]"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Borrar
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[var(--color-badge-light)] text-white rounded-lg hover:bg-[var(--color-badge)]"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 z-40 rounded-lg">
                  <IconButton
                    onClick={() => handleEdit(product)}
                    className="shadow-sm hover:shadow-lg transition"
                    sx={{
                      backgroundColor: "var(--color-badge-light)",
                      color: "white",
                      borderRadius: 2,
                      "&:hover": { backgroundColor: "var(--color-badge)" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
              <div className="flex justify-between items-center pb-5 p-6">
                <div>
                  <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                  <p className="mb-3 pr-4">
                    Precio:{" "}
                    <span className="font-semibold pl-2">
                      {formatPriceCOP(product.price)}
                    </span>
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <label>Stock:</label>
                    <div
                      className="flex items-center gap-3"
                      style={{ marginLeft: "auto" }}
                    >
                      <Button
                        size="small"
                        onClick={() =>
                          updateStock(product.id, product.stock - 1)
                        }
                        disabled={product.stock == 0}
                        className="shadow-md hover:shadow-xl"
                        sx={{
                          color: "var(--color-badge)",
                          fontSize: "1.5rem",
                          minWidth: "30px",
                          width: "30px",
                          height: "30px",
                          padding: "0",
                          margin: "0",
                          backgroundColor: "var(--color-card-bg)",
                          borderRadius: "8px",
                          "& .MuiButton-label": {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: "1",
                          },
                        }}
                      >
                        -
                      </Button>
                      <span className="font-bold text-lg text-[var(--color-text)]">
                        {product.stock}
                      </span>
                      <Button
                        size="small"
                        onClick={() =>
                          updateStock(product.id, product.stock + 1)
                        }
                        className="shadow-md hover:shadow-xl"
                        sx={{
                          color: "var(--color-badge)",
                          fontSize: "1.5rem",
                          minWidth: "30px",
                          width: "30px",
                          height: "30px",
                          padding: "0",
                          margin: "0",
                          backgroundColor: "var(--color-card-bg)",
                          borderRadius: "8px",
                          "& .MuiButton-label": {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: "1",
                          },
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  className={`relative w-2/5 aspect-square ${
                    product.visible === false
                      ? "bg-[var(--color-card-bg-unavailable)]"
                      : "bg-[var(--color-card-bg)]"
                  } p-2`}
                >
                  <Image
                    src={
                      product.imagePath
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/Productos/sm${product.imagePath}`
                        : "/icons/file.svg"
                    }
                    unoptimized
                    alt={product.name}
                    fill
                    priority={index < 2}
                    loading={index > 1 ? "lazy" : "eager"}
                    className="object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/icons/file.svg";
                      (e.target as HTMLImageElement).classList.add(
                        "p-4",
                        "opacity-70"
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
