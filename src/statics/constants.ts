import { Slide, ToastOptions } from "react-toastify";

export const initialNodes = [
  {
    id: "MCDYi",
    type: "messageNode",
    position: {
      x: 38,
      y: 40,
    },
    data: {
      message: "message",
      id: "MCDYi",
    } as any,
    width: 200,
    height: 60,
    selected: false,
    dragging: false,
  },
];

export const initialEdges: any = [];

export const toastOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

export const elkOptions = {
  "elk.algorithm": "mrtree",
  "elk.layered.spacing.nodeNodeBetweenLayers": "150",
  "elk.spacing.nodeNode": "90",
  "elk.direction": "RIGHT",
};