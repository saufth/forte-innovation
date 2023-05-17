// Components
import Button from '@/components/input/core/Button'
import Hero from '@/components/data-display/Hero'
import PageLayout from '@/components/layout/PageLayout'
// React
import { useRef, FormEvent, useState } from 'react'
// Services
import emailjs from '@emailjs/browser'
// Config
import { PAGE_ROUTES } from '@/modules/navigation/config'
import { THEMES } from '@/modules/theme/config'

/**
* The contact section of application
* @returns The Contact section component
*/
export default function ContactPage () {
  // The modal state
  const [modalMessageState, setModalMessageState] = useState<string>('')
  // The send button state
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState<boolean>(false)
  // The form reference
  const formRef = useRef<HTMLFormElement>(null)
  // The modal reference
  const dialogRef = useRef<HTMLDialogElement>(null)

  /** Open the modal */
  const openModal = () => { dialogRef.current?.showModal() }
  /** Close the modal */
  const closeModal = () => {
    dialogRef.current?.close()
    setIsSendButtonDisabled(false)
  }

  /**
   * Used for send emails from contact form
   * @param event The form event used for prevent default
   */
  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const node = formRef.current

    if (node) {
      setIsSendButtonDisabled(true)
      emailjs.sendForm(
        String(process.env.NEXT_PUBLIC_EMAIL_SERVICE_KEY),
        String(process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_KEY),
        formRef.current,
        String(process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)
      ).then(() => {
        setModalMessageState('Hemos recibido tu mensaje')
        openModal()
      }, () => {
        setModalMessageState('Lo sentimos, hubo un problema al intentar enviar el mensaje')
        openModal()
      })
    }
  }

  return (
    <PageLayout page={PAGE_ROUTES.contact}>
      <section>
        <Hero
          heading='Pongamosnos en contacto'
          tagline='¿Tomamos un café?'
          image={PAGE_ROUTES.contact}
        />
        <div className='max-w-4xl px-5% my-24 mx-auto space-y-12'>
          <form
            className='space-y-8'
            onSubmit={sendEmail}
            ref={formRef}
          >
            <div>
              <input
                className='w-full px-4 py-3 border-b border-b-stone-300 resize-none'
                type='text'
                name='contact_name'
                id='contact_name'
                placeholder='Tu nombre'
                required
              />
            </div>
            <div>
              <input
                className='w-full px-4 py-3 border-b border-b-stone-300 resize-none'
                type='email'
                name='contact_email'
                id='contact_email'
                placeholder='Tu Email'
                required
              />
            </div>
            <div>
              <textarea
                className='w-full px-4 py-3 border-b border-b-stone-300 resize-none'
                name='contact_description'
                id='contact_description'
                rows={1}
                placeholder='Cuentanos sobre tu proyecto'
                defaultValue=''
                required
              />
            </div>
            <div className='pt-6 flex justify-center'>
              <Button type='submit' theme={THEMES.secondary} disabled={isSendButtonDisabled}>
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </section>
      <dialog className='p-5 m-auto space-y-3' ref={dialogRef}>
        <div className='pb-5 text-lg text-stone-500 border-b border-b-stone-300'>
          {modalMessageState}
        </div>
        <button
          className='font-primary-bold text-primary float-right'
          onClick={closeModal}
        >
          Cerrar
        </button>
      </dialog>
    </PageLayout>
  )
}
