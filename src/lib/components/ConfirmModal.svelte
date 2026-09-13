<script lang="ts">
  let {
    open = $bindable(false),
    type,
    title,
    message,
    onConfirm
  }: {
    open: boolean
    type: 'DELETE' | 'CONFIRM'
    title: string
    message: string
    onConfirm: () => void
  } = $props()

  let dialogEl: HTMLDialogElement

  const buttonAction = $derived(type === 'DELETE' ? 'Delete' : 'Ok')
  const buttonStyle = $derived(
    `px-3 py-1.5 text-sm rounded text-white cursor-pointer ${
      type === 'DELETE' ? 'bg-red-500' : 'bg-blue-500'
    }`
  )
  
  $effect(() => {
    if (open) dialogEl?.showModal()
    else dialogEl?.close()
  })

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === dialogEl) {
      open = false
    }
  }

  const confirm = () => {
    onConfirm()
    open = false
  }

  const cancel = () => open = false
</script>

<dialog
  bind:this={dialogEl}
  onclose={() => (open = false)}
  onclick={handleBackdropClick}
  class="rounded-lg p-0 backdrop:bg-black/40 mx-auto my-auto"
>
  <div class="p-5 w-72">
    <h2 class="font-semibold mb-2 text-center">{title}</h2>
    <p class="text-sm text-gray-600 mb-4 text-center">{message}</p>
    <div class="flex justify-center gap-2">
      <button onclick={cancel} class="px-3 py-1.5 text-sm rounded border cursor-pointer">Cancel</button>
      <button onclick={confirm} class={buttonStyle}>{buttonAction}</button>
    </div>
  </div>
</dialog>