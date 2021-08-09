export const overlayDefaultAnimation = `
animation: fadeOut 0.3s;

&.element-in {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`

export const sidePanelDefaultAnimation = `
animation: slideOut 0.3s;

.element-in.right & {
  animation: slideRightIn 0.3s;
}
.element-in.left & {
  animation: slideLeftIn 0.3s;
}

@keyframes slideRightIn {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeftIn {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
`
