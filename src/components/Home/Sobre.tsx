import { Accordion, AccordionTab } from 'primereact/accordion'
import Button from '../Button'

export default function Sobre() {
  return (
    <section id="sobre" className='px-14 py-12'>
      <div>
        <p className='text-sm font-normal text-zinc-500 uppercase pb-3'>Conectando pessoas para vencer a fome</p>
        <h1 className='text-6xl text-zinc-800'>Unindo forças <span className='text-blue-300'>contra a fome</span></h1>
      </div>
      <div className='mt-8 grid grid-cols-2 gap-10' id='sobre-container'>
        <div>
          <Accordion>
            <AccordionTab header="Entre em contato conosco">
              <p className="text-base font-normal text-zinc-500">
                Quer saber mais sobre o HubFomeZero ou tem alguma dúvida? Estamos à disposição para ouvir você.
                Entre em contato e faça parte dessa rede de solidariedade que transforma vidas.
              </p>
              <ul className='mt-3'>
                <li className='flex items-center gap-1'>
                  <p className='text-lg font-normal text-zinc-500'>• E-mail de contato: contato@hubfomezero.org</p>
                </li>
                <li>
                  <p className='text-lg font-normal text-zinc-500'>• Telefone de contato: +55 0800 555 777</p>
                </li>
              </ul>
            </AccordionTab>
            <AccordionTab header="Por que Doar ?">
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Doar alimentos vai muito além de saciar a fome: é um ato de solidariedade, empatia e transformação. Cada contribuição ajuda famílias em situação de vulnerabilidade a ter uma vida mais digna, com acesso a refeições essenciais e mais qualidade de vida.</p>
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Ao doar, você se torna parte de uma corrente de esperança, impactando diretamente a vida de quem mais precisa. Pequenos gestos se transformam em grandes mudanças, fortalecendo a comunidade e a união entre as pessoas.</p>
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Com o HubFomeZero, doar é simples, seguro e rápido. Sua ação faz diferença e ajuda a construir um mundo mais justo e solidário.</p>
            </AccordionTab>
            <AccordionTab header="Quanto devo doar ?">
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Não existe valor ou quantidade mínima para fazer a diferença. Cada doação, por menor que seja, contribui para alimentar esperança e transformar vidas. O importante é doar com o coração, conforme sua possibilidade.</p>
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>No HubFomeZero, você pode escolher a forma e o tamanho da sua contribuição, sabendo que toda ajuda conta. Lembre-se: juntos, mesmo pequenas ações se tornam grandes mudanças para famílias em situação de vulnerabilidade.</p>
            </AccordionTab>
            <AccordionTab header="Como fazer minha doação ?">
              <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Para fazer sua doação, faça o login na plataforma, selecione a família que deseja ajudar e conclua o pagamento de forma segura. Assim que o pagamento for confirmado, você receberá um e-mail com informações sobre o andamento da doação. Doar nunca foi tão simples, rápido e transparente!</p>
            </AccordionTab>
          </Accordion>
        </div>
        <div>
          <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>O HubFomeZero é uma plataforma moderna criada para conectar pessoas dispostas a ajudar com famílias em situação de vulnerabilidade. Nosso propósito é simples: tornar a doação de alimentos mais prática, transparente e acessível para todos.</p>
          <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Acreditamos que cada gesto de solidariedade pode transformar vidas. Por isso, criamos um espaço digital que aproxima doadores e famílias, garantindo que a ajuda chegue de forma rápida e eficiente a quem mais precisa.</p>
          <p className='text-base font-normal text-zinc-700 leading-[1.5rem] mb-3.5'>Mais do que uma plataforma, o HubFomeZero é um movimento de esperança, união e cuidado. Juntos, podemos combater a fome e construir um futuro mais justo e solidário.</p>
        </div>
      </div>
    </section>
  )
}
