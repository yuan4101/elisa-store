"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropUploadProps {
  sku: string;
}

export interface ImageCropUploadRef {
  uploadImages: () => Promise<void>;
  hasImages: () => boolean;
  isCropValid: () => boolean;
  isCropSaved: () => boolean;
}

export const ImageCropUpload = forwardRef<
  ImageCropUploadRef,
  ImageCropUploadProps
>(({ sku }, ref) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [minCropSize, setMinCropSize] = useState({ width: 100, height: 100 });
  const [isCropSaved, setIsCropSaved] = useState(false);
  const [savedCroppedBlob, setSavedCroppedBlob] = useState<Blob | null>(null); // NUEVO: Guardar el blob
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setOriginalFile(file);
      setCrop(undefined);
      setIsCropSaved(false);
      setSavedCroppedBlob(null); // Limpiar blob guardado
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;

    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;

    const minNaturalSize = 600;
    const minRenderedWidth = Math.ceil(minNaturalSize / scaleX);
    const minRenderedHeight = Math.ceil(minNaturalSize / scaleY);

    setMinCropSize({
      width: minRenderedWidth,
      height: minRenderedHeight,
    });

    const initialCropSize = minRenderedWidth;

    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "px",
          width: initialCropSize,
          height: initialCropSize,
        },
        1,
        width,
        height
      ),
      width,
      height
    );

    setCrop(initialCrop);
    setCompletedCrop(initialCrop as PixelCrop);
  };

  const generateCroppedImage = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas is empty"));
          }
        },
        "image/jpeg",
        0.95
      );
    });
  }, [completedCrop]);

  const convertImageToWebP = async (
    file: File,
    quality: number = 0.7
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas"));
          return;
        }

        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Error al convertir a WebP"));
            }
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Error al cargar la imagen"));
      };

      img.src = url;
    });
  };

  const convertBlobToWebP = async (
    blob: Blob,
    quality: number = 0.7
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas"));
          return;
        }

        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (newBlob) => {
            URL.revokeObjectURL(url);
            if (newBlob) {
              resolve(newBlob);
            } else {
              reject(new Error("Error al convertir a WebP"));
            }
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Error al cargar el blob"));
      };

      img.src = url;
    });
  };

  const createThumbnail = async (
    blob: Blob,
    size: number = 200,
    quality: number = 0.7
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, size, size);

        canvas.toBlob(
          (thumbnailBlob) => {
            URL.revokeObjectURL(url);
            if (thumbnailBlob) {
              resolve(thumbnailBlob);
            } else {
              reject(new Error("Error al crear el thumbnail"));
            }
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Error al cargar el blob para thumbnail"));
      };

      img.src = url;
    });
  };

  const handleSaveCrop = async () => {
    if (!isValidCrop) {
      alert("El recorte debe ser mínimo 600x600 píxeles");
      return;
    }

    // Generar y guardar el blob del recorte AHORA
    console.log("💾 Guardando recorte...");
    const croppedBlob = await generateCroppedImage();
    if (!croppedBlob) {
      alert("Error al generar el recorte");
      return;
    }

    setSavedCroppedBlob(croppedBlob);
    setIsCropSaved(true);
    console.log("✅ Recorte guardado en memoria");
  };

  const uploadImages = async () => {
    console.log("📤 uploadImages - INICIO");
    console.log("📤 originalFile:", originalFile);
    console.log("📤 savedCroppedBlob:", savedCroppedBlob);
    console.log("📤 sku:", sku);

    if (!originalFile || !savedCroppedBlob || !sku) {
      console.error("❌ Faltan datos básicos");
      throw new Error("Por favor selecciona y recorta una imagen primero");
    }

    console.log("📤 Convirtiendo imágenes a WebP...");
    const originalWebP = await convertImageToWebP(originalFile, 0.7);
    console.log("✅ Original convertido a WebP");

    const croppedWebP = await convertBlobToWebP(savedCroppedBlob, 0.7);
    console.log("✅ Recorte convertido a WebP");

    const thumbnailWebP = await createThumbnail(croppedWebP, 200, 0.7);
    console.log("✅ Thumbnail creado");

    const formData = new FormData();
    formData.append("sku", sku);
    formData.append("original", originalWebP, `${sku}-original.webp`);
    formData.append("cropped", croppedWebP, `${sku}-cropped.webp`);
    formData.append("thumbnail", thumbnailWebP, `${sku}-thumbnail.webp`);

    console.log("📤 Enviando imágenes al servidor...");
    const response = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("📤 Respuesta del servidor:", result);

    if (!response.ok) {
      console.error("❌ Error del servidor:", result.error);
      throw new Error(result.error || "Error al subir imágenes");
    }

    console.log("✅ uploadImages - FIN EXITOSO");
  };

  // Exponer funciones al componente padre mediante ref
  useImperativeHandle(ref, () => ({
    uploadImages,
    hasImages: () => !!originalFile,
    isCropValid: () => isValidCrop,
    isCropSaved: () => isCropSaved,
  }));

  const isValidCrop = (() => {
    if (!completedCrop || !imgRef.current) return false;
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const realWidth = completedCrop.width * scaleX;
    const realHeight = completedCrop.height * scaleY;
    return realWidth >= 600 && realHeight >= 600;
  })();

  const getRealCropDimensions = () => {
    if (!completedCrop || !imgRef.current) return "0x0";
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const realWidth = Math.round(completedCrop.width * scaleX);
    const realHeight = Math.round(completedCrop.height * scaleY);
    return `${realWidth}x${realHeight}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Seleccionar imagen
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-badge-light)] file:text-white hover:file:bg-[var(--color-badge)] cursor-pointer"
        />
      </div>

      {imgSrc && (
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <ReactCrop
              crop={crop}
              onChange={(c) => {
                setCrop(c);
                if (isCropSaved) {
                  setIsCropSaved(false);
                  setSavedCroppedBlob(null);
                }
              }}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minWidth={minCropSize.width}
              minHeight={minCropSize.height}
              ruleOfThirds={true}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Imagen a recortar"
                onLoad={onImageLoad}
                className="max-w-full max-h-[400px] mx-auto"
                style={{ display: "block" }}
              />
            </ReactCrop>
          </div>

          <div className="text-sm">
            <p className={!isValidCrop ? "text-red-500" : "text-green-600"}>
              Tamaño del recorte: {getRealCropDimensions()} píxeles
              {!isValidCrop && " (mínimo 600x600)"}
            </p>
            <p className="text-gray-600 mt-1">
              Las imágenes se subirán al guardar el producto
            </p>
          </div>

          <button
            onClick={handleSaveCrop}
            disabled={!isValidCrop || isCropSaved}
            className={`px-4 py-2 rounded-lg text-white ${
              isValidCrop && !isCropSaved
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isCropSaved ? "Recorte Guardado ✓" : "Guardar Recorte"}
          </button>

          <canvas ref={previewCanvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
});

ImageCropUpload.displayName = "ImageCropUpload";
