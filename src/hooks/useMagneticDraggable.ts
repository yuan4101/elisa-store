import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Position {
  x: number;
  y: number;
}

interface CornerPosition {
  corner: Corner;
  position: Position;
}

export function useMagneticDraggable(
  onPositionChange: (corner: Corner) => void,
  initialCorner: Corner,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position | null>(null);
  const [corner, setCorner] = useState<Corner>(initialCorner);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const posInitialized = useRef(false);
  const dragging = useRef(false);
  const hasMoved = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const targetPos = useRef<Position | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const MARGIN = 24;
  const DAMPING_FACTOR = 0.1;

  const getCornerPositions = useCallback((): Record<Corner, Position> => {
    if (!ref.current) return {} as Record<Corner, Position>;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elWidth = ref.current.offsetWidth;
    const elHeight = ref.current.offsetHeight;

    return {
      "top-left": { x: MARGIN, y: MARGIN },
      "top-right": { x: windowWidth - elWidth - MARGIN, y: MARGIN },
      "bottom-left": { x: MARGIN, y: windowHeight - elHeight - MARGIN },
      "bottom-right": {
        x: windowWidth - elWidth - MARGIN,
        y: windowHeight - elHeight - MARGIN,
      },
    };
  }, []);

  const getClosestCorner = useCallback(
    (currentPos: Position): CornerPosition => {
      const corners = getCornerPositions();
      let closest: CornerPosition = {
        corner: "bottom-right",
        position: corners["bottom-right"],
      };
      let minDistance = Infinity;

      Object.entries(corners).forEach(([cornerName, cornerPos]) => {
        const distance = Math.sqrt(
          Math.pow(currentPos.x - cornerPos.x, 2) +
            Math.pow(currentPos.y - cornerPos.y, 2),
        );

        if (distance < minDistance) {
          minDistance = distance;
          closest = {
            corner: cornerName as Corner,
            position: cornerPos,
          };
        }
      });

      return closest;
    },
    [getCornerPositions],
  );

  useEffect(() => {
    setCorner(initialCorner);
    posInitialized.current = false;
  }, [initialCorner]);

  useLayoutEffect(() => {
    if (posInitialized.current) return;

    const corners = getCornerPositions();
    if (corners[corner]) {
      setPos(corners[corner]);
      setIsReady(true);
      posInitialized.current = true;
    }
  }, [corner, getCornerPositions]);

  useEffect(() => {
    const handleResize = () => {
      const corners = getCornerPositions();
      if (corners[corner]) {
        setPos(corners[corner]);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [corner, getCornerPositions]);

  useEffect(() => {
    if (!isDragging) return;

    const animate = () => {
      setPos((prev) => {
        if (!prev || !targetPos.current) return prev;
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;

        return {
          x: prev.x + dx * DAMPING_FACTOR,
          y: prev.y + dy * DAMPING_FACTOR,
        };
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isDragging]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      setIsDragging(true);
      hasMoved.current = false;
      offset.current = {
        x: e.clientX - el.getBoundingClientRect().left,
        y: e.clientY - el.getBoundingClientRect().top,
      };
      el.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !pos) return;
      hasMoved.current = true;
      targetPos.current = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      };
    };

    const onMouseUp = () => {
      dragging.current = false;
      setIsDragging(false);
      el.style.cursor = "grab";

      if (hasMoved.current && targetPos.current) {
        const closest = getClosestCorner(targetPos.current);
        setPos(closest.position);
        setCorner(closest.corner);
        onPositionChange(closest.corner);
      }
      targetPos.current = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      dragging.current = true;
      setIsDragging(true);
      hasMoved.current = false;
      offset.current = {
        x: touch.clientX - el.getBoundingClientRect().left,
        y: touch.clientY - el.getBoundingClientRect().top,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current || !pos) return;
      hasMoved.current = true;
      const touch = e.touches[0];
      targetPos.current = {
        x: touch.clientX - offset.current.x,
        y: touch.clientY - offset.current.y,
      };
    };

    const onTouchEnd = () => {
      dragging.current = false;
      setIsDragging(false);

      if (hasMoved.current && targetPos.current) {
        const closest = getClosestCorner(targetPos.current);
        setPos(closest.position);
        setCorner(closest.corner);
        onPositionChange(closest.corner);
      }
      targetPos.current = null;
    };

    el.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [pos, getClosestCorner, onPositionChange]);

  return { ref, pos, corner, hasMoved, isDragging, isReady };
}
