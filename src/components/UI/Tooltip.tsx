export function ToolTip(message: string, id: string) {
  return `
    <div id='${id}'
      class="custom-toast fixed top-6  right-6 px-6 py-4 bg-black text-white text-sm rounded shadow-md toast-fade"
    >
      ${message}
    </div>
  `;
}
