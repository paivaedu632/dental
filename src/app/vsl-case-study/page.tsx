import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: 'Como Salvei Minha Família do Calor Infernal de São Paulo',
  description: 'Nossa, veio... aqui tá um forno! Descubra como uma família conseguiu sobreviver ao calor extremo de São Paulo.',
  keywords: 'calor São Paulo, ar condicionado, família, verão, temperatura alta, solução',
}

export default function VSLCaseStudyPage() {
  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      {/* Clean Centered Container */}
      <div className="w-full max-w-[600px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-4" style={{
            fontFamily: 'Inter, "Inter Placeholder", sans-serif',
            fontSize: 'clamp(28px, 5vw, 40px)',
            fontWeight: '700',
            lineHeight: '1.2',
            letterSpacing: '-0.025em'
          }}>
            Como Salvei Minha Família do Calor Infernal de São Paulo (Gastando só R$0,50/dia)
          </h1>

          {/* Date/Location */}
          <p className="text-sm font-medium text-gray-500">
            4 DE JANEIRO - SÃO PAULO, SP
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full mb-8">
          <div className="aspect-video rounded-lg overflow-hidden">
            <Image
              src="https://metsul.com/wp-content/uploads/2023/11/Calor-em-Sao-Paulo-12112023.jpg"
              alt="Calor intenso em São Paulo - termômetro marcando 42°C"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Subtitle */}
          <div className="mb-6">
            <p className="text-gray-900" style={{
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              fontWeight: '700',
              lineHeight: '1.3',
              letterSpacing: '-0.015em'
            }}>
              "Nossa, veio... aqui tá um forno!"
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-4">
            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>O termômetro marcava 42°C.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Eram 2h da tarde e o sol estava ESCULACHANDO.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              Conseguia sentir <strong>grudando no sofá</strong> de tão quente que tava.
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Crianças correndo pela sala. Televisor ligado. Todo mundo irritado.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              E minha mulher <strong>enchendo o saco</strong> pra comprar um ar condicionado porque o ventilador não tava dando conta.
            </p>

            {/* Family Discomfort Image */}
            <div className="my-6 text-center">
              <img
                src="/images/air_cooler/family heat 2.png"
                alt="Family sweating, looking miserable in extreme heat"
                className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              />
            </div>

            <p className="text-gray-700 italic" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              "Ah, Marcelo, vamos comprar logo esse ar condicionado!"
            </p>

            <p className="text-gray-700 italic" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              "Esqueceu da prestação do carro? A gente tá sem dinheiro, amor."
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Mais cada dia que passava só piorava.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Na hora de dormir, nem se fala.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              Família toda espremida no quarto com o ventilador no talo, e mesmo assim <strong>todo mundo suando igual porco</strong>.
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Se você não gasta com luz, gasta com água.</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              <strong>Éta água pra apagar esse solzão!</strong>
            </p>

            <p className="text-gray-700" style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '500'
            }}>
              Banho de hora em hora. Conta de água nas alturas.
            </p>

            {/* High Water Bill Image */}
            <div className="my-6 text-center">
              <img
                src="/images/air_cooler/conta de agua R$600.jpg"
                alt="High water bill showing R$600"
                className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              />
            </div>

            {/* New Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                O DESESPERO DE PAI DE FAMÍLIA
              </h2>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Foi aí que eu comecei a vasculhar na internet...</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Procurando uma solução <strong>BARATA</strong> pra manter pelo menos o quarto gelado sem gastar com ar condicionado.
              </p>

              {/* Split Air Conditioning Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/ar condicionado split.png"
                  alt="Split air conditioning unit"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Ar condicionado Split:</strong> R$2.800 + instalação R$400 = R$3.200
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Conta de luz por mês:</strong> +R$180 (no mínimo)
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Total no primeiro ano:</strong> R$5.360
              </p>

              <p className="text-gray-700 italic" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Onde que eu vou arrumar essa grana, bicho?"
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Prestação do carro, escola das crianças, supermercado...</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Não sobra nada no final do mês.</strong>
              </p>
            </div>

            {/* Discovery Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                A DESCOBERTA QUE MUDOU TUDO
              </h2>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Depois de 3 horas fuçando na internet, achei um vídeo no YouTube:</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Como fazer ar condicionado caseiro gastando R$50"
              </p>

              {/* YouTube DIY AC Tutorial Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/youtube ac1.png"
                  alt="YouTube tutorial on how to make homemade air conditioning for R$50"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Deve ser mais uma gambiarra", pensei.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Mas estava desesperado.</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Era sobre um tal de <strong>"climatizador evaporativo"</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Basicamente:</strong> Você coloca água gelada, o aparelho "sopra" o ar através da água, e sai uma brisa <strong>GELADINHA</strong>.
              </p>

              {/* Cool Breeze Demonstration Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/videoframe_3186.png"
                  alt="Air cooler producing cool breeze demonstration"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Gasta só R$0,50 de luz por dia", dizia o cara do vídeo.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Será que funciona mesmo?"
              </p>
            </div>

            {/* Test Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                O TESTE DESESPERADO
              </h2>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Comprei o climatizador mais barato que achei:</strong> R$149 no Mercado Livre.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                "Se não funcionar, pelo menos tentei", pensei.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Chegou em 2 dias.</strong>
              </p>

              {/* Air Cooler Unboxing Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/ac unboxing.jpg"
                  alt="Air cooler unboxing"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Primeira noite de teste:</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Coloquei no nosso quarto, enchi o reservatório com água gelada, liguei na tomada.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>EM 5 MINUTOS</strong> o quarto estava <strong>OUTRO</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Ar fresquinho, umidificado, <strong>GOSTOSO</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>As crianças dormiram a noite inteira sem reclamar.</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Minha esposa:</strong> "Marcelo, que aparelho é esse? Que delícia!"
              </p>

              {/* Family Sleeping Peacefully Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/family sleeping peacefully.png"
                  alt="Family sleeping peacefully with air cooler"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>
            </div>

            {/* Transformation Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                A TRANSFORMAÇÃO FAMILIAR
              </h2>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>15 dias depois:</strong>
              </p>

              <div className="space-y-2">
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Crianças dormindo tranquilo</strong> (sem mais birra na hora de dormir)
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Conta de luz normal</strong> (R$0,50/dia = R$15/mês)
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Família menos estressada</strong> (calor deixa todo mundo irritado)
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ Noites de sono completas (sem acordar suando)
                </p>
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>30 dias depois:</strong>
              </p>

              <div className="space-y-2">
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Compramos mais dois</strong> (um pra sala, outro pro quarto das crianças)
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Economizamos R$165/mês</strong> comparado com ar condicionado
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Casa sempre fresquinha sem quebrar o orçamento</strong>
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ <strong>Vizinhos perguntando</strong> como conseguimos ficar gelados
                </p>

                {/* Happy Family Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/happy family 5.png"
                    alt="Happy family enjoying cool air from air cooler"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                POR QUE FUNCIONA MELHOR QUE AR CONDICIONADO?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Climatizador Column */}
                <div className="space-y-4">
                  <h3 className="text-gray-900" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    ❄️ <strong>Climatizador Evaporativo:</strong>
                  </h3>

                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Custo:</strong> R$89-189
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Instalação:</strong> Plugar na tomada
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Consumo:</strong> R$15/mês
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Manutenção:</strong> Trocar a água
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Umidifica o ar</strong> (melhor pra respirar)
                    </p>
                  </div>
                </div>

                {/* Air Conditioner Column */}
                <div className="space-y-4">
                  <h3 className="text-gray-900" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    🔥 <strong>Ar Condicionado Split:</strong>
                  </h3>

                  <div className="space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Custo:</strong> R$2.800-5.000
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Instalação:</strong> R$400-800
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Consumo:</strong> R$180-300/mês
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Manutenção:</strong> R$200 a cada 6 meses
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Resseca o ar</strong> (ruim pra pele e garganta)
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-900" style={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700'
                }}>
                  <strong>Diferença em 1 ano: R$4.800+ economizados</strong>
                </p>

                {/* Annual Savings Product Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/product 1.jpg"
                    alt="Air cooler product showing annual savings"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Neighbors Section */}
            <div className="mt-8 space-y-4">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                OS VIZINHOS FICARAM LOUCOS
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    👨‍👩‍👧‍👦 <strong>Seu João (vizinho da esquina):</strong>
                  </p>
                  <p className="text-gray-700 italic" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    "Marcelo, que parada é essa? Tua casa tá sempre fresquinha e a conta de luz continua baixa!"
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    👩‍👧‍👦 <strong>Dona Maria (vizinha de cima):</strong>
                  </p>
                  <p className="text-gray-700 italic" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    "Meu marido não acredita que gastamos só R$89. Onde você comprou?"
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    👨‍👩‍👧‍👦 <strong>Família Silva (do prédio ao lado):</strong>
                  </p>
                  <p className="text-gray-700 italic" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    "Compramos 3 iguais. Melhor investimento que já fizemos!"
                  </p>
                </div>

                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  <strong>Todo mundo no bairro começou a comprar.</strong>
                </p>

                {/* Neighborhood Popularity Product Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/product 2.png"
                    alt="Air cooler product popular in neighborhood"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Math Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                A MATEMÁTICA QUE VAI TE CHOCAR
              </h2>

              <p className="text-gray-900" style={{
                fontSize: '20px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '600'
              }}>
                💰 <strong>CUSTO DO CALOR POR ANO:</strong>
              </p>

              {/* Annual Heat Costs Image */}
              <div className="my-6 text-center">
                <img
                  src="/images/air_cooler/conta de agua R$600.jpg"
                  alt="High water bill showing annual heat costs"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <div className="space-y-6">
                {/* Option 1 */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    <strong>Opção 1 - Não fazer nada:</strong>
                  </h3>
                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Conta de água alta:</strong> +R$600/ano
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Família estressada:</strong> Sem preço
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Noites mal dormidas:</strong> Sem preço
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Produtividade baixa:</strong> Sem preço
                    </p>
                  </div>
                </div>

                {/* Option 2 */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    <strong>Opção 2 - Ar condicionado:</strong>
                  </h3>

                  {/* Air Conditioning Option Image */}
                  <div className="my-6 text-center">
                    <img
                      src="/images/air_cooler/{456DD7C6-7AD6-4F22-920D-8FA2FC46DDCB}.png"
                      alt="Split air conditioning unit option"
                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Equipamento:</strong> R$3.200
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Conta de luz:</strong> +R$2.160/ano
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Instalação/manutenção:</strong> R$800/ano
                    </p>
                    <p className="text-gray-900" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '700'
                    }}>
                      <strong>Total: R$6.160/ano</strong>
                    </p>
                  </div>
                </div>

                {/* Option 3 */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    <strong>Opção 3 - Climatizador:</strong>
                  </h3>

                  {/* Climatizer Option Image */}
                  <div className="my-6 text-center">
                    <img
                      src="/images/air_cooler/product 5.png"
                      alt="Air cooler climatizer option"
                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Equipamento:</strong> R$189
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Conta de luz:</strong> +R$180/ano
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Manutenção:</strong> R$0
                    </p>
                    <p className="text-gray-900" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '700'
                    }}>
                      <strong>Total: R$369/ano</strong>
                    </p>
                  </div>
                </div>

                {/* Final Calculation */}
                <div className="text-center bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-900" style={{
                    fontSize: '24px',
                    lineHeight: '32px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '700'
                  }}>
                    <strong>Economia anual: R$5.791</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Product Types Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                TIPOS DE CLIMATIZADOR
              </h2>

              <div className="space-y-6">
                {/* Basic */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    🥉 <strong>BÁSICO - R$89</strong> (Fraquinho)
                  </h3>

                  {/* Basic Product Option Image */}
                  <div className="my-6 text-center">
                    <img
                      src="/images/air_cooler/ventilador 1.png"
                      alt="Basic air cooler product option R$89"
                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      1 velocidade
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Reservatório 3L
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Cômodos até 15m²
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Perfeito para quartos</strong>
                    </p>
                  </div>
                </div>

                {/* Intermediate */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    🥈 <strong>INTERMEDIÁRIO - R$149</strong> (Vale A Pena!)
                  </h3>

                  {/* Intermediate Product Option Image */}
                  <div className="my-6 text-center">
                    <img
                      src="/images/air_cooler/product 4.jpg"
                      alt="Intermediate air cooler product option R$149"
                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      3 velocidades
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Reservatório 5L
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Cômodos até 25m²
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Controle remoto</strong>
                    </p>
                  </div>
                </div>

                {/* Premium */}
                <div className="space-y-3">
                  <h3 className="text-gray-900" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '600'
                  }}>
                    🥇 <strong>TOP - R$489</strong> (Muito Salgado!)
                  </h3>

                  {/* Top Product Option Image */}
                  <div className="my-6 text-center">
                    <img
                      src="/images/air_cooler/ventilador 3.1.png"
                      alt="Top air cooler product option R$189"
                      className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="space-y-1 ml-4">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      3 velocidades + timer
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Reservatório 15L
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      Cômodos até 40m²
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Controle remoto + LED</strong>
                    </p>
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Função umidificador</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                DEPOIMENTOS REAIS
              </h2>

              <div className="space-y-6">
                {/* Carlos */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Carlos, Pedreiro"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Carlos, Pedreiro (Guarulhos):</strong>
                    </p>
                    <div className="flex items-center space-x-1">
                      <span style={{ fontSize: '16px' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-gray-700 italic" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      "Trabalho o dia todo no sol. Chegar em casa e ligar esse aparelho é um ALÍVIO. Minha esposa disse que virei outro homem."
                    </p>

                    {/* Carlos Testimonial Image */}
                    <div className="my-6 text-center">
                      <img
                        src="/images/air_cooler/aHDGktQirPAWcu9.jpg"
                        alt="Customer testimonial - Carlos, construction worker"
                        className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Fernanda */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Fernanda, Professora"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Fernanda, Professora (Santo André):</strong>
                    </p>
                    <div className="flex items-center space-x-1">
                      <span style={{ fontSize: '16px' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-gray-700 italic" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      "Com 3 filhos pequenos, o calor era um inferno. Agora eles dormem que nem anjo. Salvou minha sanidade mental."
                    </p>

                    {/* Second Testimonial Image */}
                    <div className="my-6 text-center">
                      <img
                        src="/images/air_cooler/5tKw6TpiQGiLQ0g.jpg"
                        alt="Customer testimonial - second review"
                        className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Roberto */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/71.jpg"
                    alt="Roberto, Motorista de Uber"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Roberto, Motorista de Uber (São Paulo):</strong>
                    </p>
                    <div className="flex items-center space-x-1">
                      <span style={{ fontSize: '16px' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-gray-700 italic" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      "Economizo R$200/mês na conta de luz. Dá pra fazer mais umas corridas com a grana que sobra."
                    </p>

                    {/* Third Testimonial Image */}
                    <div className="my-6 text-center">
                      <img
                        src="/images/air_cooler/product 3.jpg"
                        alt="Customer testimonial - third review"
                        className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Jéssica */}
                <div className="flex items-start space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Jéssica, Dona de Casa"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <p className="text-gray-700" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      <strong>Jéssica, Dona de Casa (Osasco):</strong>
                    </p>
                    <div className="flex items-center space-x-1">
                      <span style={{ fontSize: '16px' }}>⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-gray-700 italic" style={{
                      fontSize: '18px',
                      lineHeight: '28px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '500'
                    }}>
                      "Meu marido não acreditava. 'R$89 pra concorrer com ar condicionado?' Hoje ele fala pra todo mundo."
                    </p>

                    {/* Fourth Testimonial Image */}
                    <div className="my-6 text-center">
                      <img
                        src="/images/air_cooler/xLpGiokHTqRSV2J.jpg"
                        alt="Customer testimonial - fourth review"
                        className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Where to Buy Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-gray-900" style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                ONDE COMPRAR (E NÃO SER ENGANADO)
              </h2>

              <div className="space-y-4">
                <h3 className="text-black" style={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '600'
                }}>
                  <strong>CUIDADO COM IMITAÇÕES BARATAS:</strong>
                </h3>

                <div className="space-y-2 ml-4">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ <strong>Lojas físicas:</strong> R$300-500 (mesmo produto)
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ <strong>Sites suspeitos:</strong> Qualidade duvidosa
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ <strong>Mercado livre genérico:</strong> Sem garantia
                  </p>

                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    Não vai cair nessa cilada.
                  </p>
                </div>

                <h3 className="text-black" style={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '600'
                }}>
                 <strong>COMPRE DIRETO DO FORNECEDOR:</strong>
                </h3>

                <div className="space-y-2 ml-4">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ <strong>Garantia de 1 ano</strong>
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ <strong>Frete grátis pra São Paulo</strong>
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ <strong>Entrega em 2-3 dias</strong>
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ <strong>Suporte técnico no whatsapp </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Special Offer Section Header */}
            <div className="mt-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  OFERTA ESPECIAL AMIGOS DE MARCELO
                </h2>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  Proteja sua família do calor com climatizador ArGelado:
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Pricing Cards - Full Width Section */}
      <div id="pricing-cards" className="w-full bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 1x ArPerfeito Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">
              <div className="text-center">
                <img
                  src="/images/air_cooler/product bundle 1.png"
                  alt="1x ArGelado Bundle"
                  className="w-32 h-32 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">1x ArGelado</h3>
                <div className="space-y-1">
                  <div className="text-gray-500 line-through text-sm">R$ 199,00</div>
                  <div className="text-3xl font-bold text-black">R$ 149,00</div>
                  <div className="text-sm text-gray-600">3x de R$ 49,67 SEM JUROS</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 flex items-center">
                  <Check className="w-4 h-4 text-black inline-block mr-2" />
                  Ideal para uso pessoal
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                COMPRAR AGORA
              </button>
              <div className="text-center text-sm text-red-600">Últimas unidades!</div>
            </div>

            {/* 2x ArPerfeito Card - Most Popular */}
            <div className="bg-white rounded-lg border-2 border-black shadow-lg p-6 space-y-4 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-bold">
                  MAIS VENDIDO
                </span>
              </div>
              <div className="text-center">
                <img
                  src="/images/air_cooler/product bundle 2.png"
                  alt="2x ArGelado Bundle"
                  className="w-32 h-32 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">2x ArGelado</h3>
                <div className="space-y-1">
                  <div className="text-gray-500 line-through text-sm">R$ 338,00</div>
                  <div className="text-3xl font-bold text-black">R$ 268,00</div>
                  <div className="text-sm text-gray-600">(R$ 134,00/unidade)</div>
                  <div className="text-sm text-gray-600">6x de R$ 44,67 SEM JUROS</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Economize R$70,00</div>
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Frete grátis</div>
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Perfeito para você e seu parceiro(a)</div>
              </div>

              <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                COMPRAR AGORA
              </button>
              <div className="text-center text-sm text-red-600">Oferta por tempo limitado!</div>
            </div>

            {/* 3x ArPerfeito Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4">

              <div className="text-center">
                <img
                  src="/images/air_cooler/product bundle 3.png"
                  alt="3x ArGelado Bundle"
                  className="w-32 h-32 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">3x ArGelado</h3>
                <div className="space-y-1">
                  <div className="text-gray-500 line-through text-sm">R$ 497,00</div>
                  <div className="text-3xl font-bold text-black">R$ 337,00</div>
                  <div className="text-sm text-gray-600">(R$ 112,00/unidade)</div>
                  <div className="text-sm text-gray-600">12x de R$ 28,08 SEM JUROS</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Economize R$90,00</div>
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Frete grátis</div>
                <div className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-black inline-block mr-2" />Quarto casal + sala + quarto das crianças</div>
              </div>

              <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                COMPRAR AGORA
              </button>
              <div className="text-center text-sm text-red-600">Apenas 5 pacotes restantes!</div>
            </div>
          </div>
        </div>

      {/* Additional Content Section - Centered Container */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-[600px]">
          {/* Guarantee Section */}
          <div className="mt-8 space-y-6">
            <h2 className="text-gray-900" style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}>
              GARANTIA FAMÍLIA FELIZ
            </h2>

            {/* Happy Family Guarantee Image */}
            <div className="my-6 text-center">
              <img
                src="/images/air_cooler/happy family.png"
                alt="Happy family with air cooler guarantee"
                className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              />
            </div>

            <div className="space-y-6">

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Use seu ArGelado por 30 dias.</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Se sua família não ficar 100% satisfeita...</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Se o calor continuar incomodando...</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Se não economizar na conta de luz...</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Devolvemos seu dinheiro + pagamos o frete.</strong>
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>Sem perguntas. Sem enrolação.</strong>
              </p>
            </div>
          </div>

          {/* Urgency/Scarcity Section */}
          <div className="mt-8 space-y-6">
            <h2 className="text-gray-900" style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}>
              Meu fornecedor só tem 47 disponíveis
            </h2>

            {/* Limited Stock Availability Image */}
            <div className="my-6 text-center">
              <img
                src="/images/air_cooler/black-friday-loja-extra-4199615538.jpg"
                alt="Limited stock availability - only 47 units remaining"
                className="w-full max-w-md mx-auto rounded-lg shadow-sm"
              />
            </div>

            <div className="space-y-6">

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Janeiro e fevereiro é o calor do cão, e tão vendendo muito...
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Só essa semana foram <strong>153</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Próximo estoque só chega daqui <strong>2 meses</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                E o <strong>preço pode aumentar</strong>.
              </p>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                Não perde a chance de garantir o seu ArGelado agora.
              </p>

              {/* Urgency CTA Button */}
              <div className="mt-4">
                <a
                  href="#pricing-cards"
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors block text-center"
                >
                  SIM, QUERO MEU ARGELADO AGORA!
                </a>
              </div>
            </div>
          </div>

          {/* Two Realities Comparison Section */}
          <div className="mt-8 space-y-6">
            <h2 className="text-gray-900" style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontFamily: 'Inter, "Inter Placeholder", sans-serif',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}>
              AS DUAS REALIDADES
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  <strong>REALIDADE 1 (Fazer nada):</strong>
                </p>

                {/* Family Heat Reality Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/family heat 1.png"
                    alt="Family suffering from heat - reality without air cooler"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ Família continua sofrendo com calor
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ Conta de luz/água alta
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ Noites mal dormidas
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ Estresse e irritação constantes
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ❌ Verão de 2025 será pior ainda
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  <strong>REALIDADE 2 (Climatizador):</strong>
                </p>

                {/* Family Sleeping Peacefully with Climatizer Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/family sleeping peacefully.png"
                    alt="Family sleeping peacefully with air cooler - reality with climatizer"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ Casa sempre fresquinha
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ Economia na conta de luz
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ Família feliz e descansada
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ Noites tranquilas de sono
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    ✅ Vizinhos com inveja
                  </p>
                </div>
              </div>

              <p className="text-gray-700" style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '500'
              }}>
                <strong>A diferença? R$149.</strong>
              </p>

              <div className="mt-6 text-center">
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  <strong>👇 ÚLTIMAS 47 UNIDADES 👇</strong>
                </p>
              </div>

              <div className="mt-4">
                <a
                  href="#pricing-cards"
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors block text-center"
                >
                  QUERO MINHA CASA FRESQUINHA - 47 RESTANTES
                </a>
              </div>

              <div className="mt-4 space-y-2">
                {/* Free Shipping Delivery Image */}
                <div className="my-6 text-center">
                  <img
                    src="/images/air_cooler/correio.png"
                    alt="Free shipping delivery service"
                    className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                  />
                </div>

                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ Frete grátis pra Grande São Paulo
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ Entrega em 2-3 dias úteis
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ 30 dias de garantia total
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ Parcelamento em 6x sem juros
                </p>
                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  ✅ Bônus no valor de R$233
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-red-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  <strong>P.S. - O VERÃO NÃO ESPERA</strong>
                </p>

                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  Cada dia que você espera é mais um dia de família sofrendo.
                </p>

                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  R$149 é o que você gasta num almoço em família no shopping.
                </p>

                <p className="text-gray-700" style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '500'
                }}>
                  A diferença? O climatizador vai refrescar sua casa por ANOS.
                </p>

                <div className="mt-4 text-center">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong>👇 CLIQUE AGORA ANTES QUE ACABE 👇</strong>
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href="#pricing-cards"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors block text-center"
                  >
                    SIM, EU QUERO ACABAR COM O CALOR DA MINHA CASA
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 space-y-8">
            <div className="text-center">
              <h2 className="text-gray-900" style={{
                fontSize: '32px',
                lineHeight: '40px',
                fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                fontWeight: '700',
                letterSpacing: '-0.025em'
              }}>
                PERGUNTAS FREQUENTES
              </h2>
            </div>

            <div className="space-y-8">
              {/* FUNCIONAMENTO Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  FUNCIONAMENTO
                </h3>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="funcionamento-1" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Como funciona exatamente o climatizador?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      O climatizador puxa o ar quente do ambiente, passa através de um filtro umedecido com água gelada, e sopra ar fresco e umidificado. É como uma brisa natural de lago, só que dentro de casa.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="funcionamento-2" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Precisa de instalação? É complicado?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Zero complicação! É só tirar da caixa, encher o reservatório com água, plugar na tomada e ligar. Pronto! Qualquer criança consegue operar.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="funcionamento-3" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Faz barulho igual ventilador?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Muito mais silencioso! O ruído é mínimo, tipo um sussurro. Você consegue dormir tranquilo sem incomodar.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* EFICIÊNCIA Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  EFICIÊNCIA
                </h3>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="eficiencia-1" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Funciona mesmo em apartamento pequeno?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Perfeito para apartamentos! O modelo básico (R$149) resfria até 25m², ideal para quarto de casal ou sala pequena. Para casas maiores, recomendamos 2-3 unidades.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eficiencia-2" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      E se o dia estiver muito quente (40°C+)?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Funciona melhor ainda! Quanto mais quente o ar externo, maior a diferença de temperatura que o climatizador consegue criar. Pode baixar até 15°C da temperatura ambiente.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eficiencia-3" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Funciona em ambiente fechado?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Sim, mas o ideal é deixar uma fresta na janela para circulação. Não precisa ser igual ar condicionado (100% fechado). Uma pequena ventilação ajuda na eficiência.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eficiencia-4" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Quanto tempo demora pra resfriar o ambiente?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Entre 5-10 minutos você já sente a diferença. Em 15 minutos o ambiente fica completamente fresco e confortável.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* CUSTOS E ECONOMIA Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  CUSTOS E ECONOMIA
                </h3>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="custos-1" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Gasta muita energia elétrica?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Quase nada! Consome cerca de 65W (menos que uma lâmpada LED potente). Na conta de luz fica uns R$15-20/mês rodando 8 horas por dia.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="custos-2" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Precisa trocar a água todo dia?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Não! Você pode deixar a mesma água por 3-5 dias. Só completar quando baixar. Para máxima eficiência, troque 2x por semana.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="custos-3" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Tem custo de manutenção?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Praticamente zero. Só lavar o filtro 1x por mês com água corrente. Não tem gás, não tem peças caras, não precisa de técnico.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* MANUTENÇÃO E DURABILIDADE Section */}
              <div className="space-y-4">
                <h3 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  MANUTENÇÃO E DURABILIDADE
                </h3>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="manutencao-1" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Quanto tempo dura?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Com uso normal, dura 3-5 anos fácil. É bem simples, tem poucas peças que podem quebrar. Muito mais durável que ventilador comum.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manutencao-2" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      E se quebrar? Tem assistência?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      1 ano de garantia total + suporte técnico brasileiro por WhatsApp. Se quebrar no período, trocamos ou consertamos sem custo.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="manutencao-3" className="border border-gray-200 rounded-lg px-4">
                    <AccordionTrigger className="text-left" style={{
                      fontSize: '18px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '600'
                    }}>
                      Como limpar?
                    </AccordionTrigger>
                    <AccordionContent style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontWeight: '400'
                    }}>
                      Super fácil! 1x por mês: tirar o filtro, lavar na torneira, secar e recolocar. O reservatório é só enxaguar. Limpeza completa em 5 minutos.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Final CTA */}
              <div className="mt-12 text-center space-y-6">
                <h3 className="text-gray-900" style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                  fontWeight: '700',
                  letterSpacing: '-0.025em'
                }}>
                  Ainda tem dúvidas?
                </h3>

                <div className="space-y-2">
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong>WhatsApp:</strong> (11) 9999-9999
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong>Horário:</strong> Segunda a sexta, 9h às 18h
                  </p>
                  <p className="text-gray-700" style={{
                    fontSize: '18px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '500'
                  }}>
                    <strong>Resposta:</strong> Até 2 horas
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-gray-900 mb-4" style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                    fontWeight: '700'
                  }}>
                   👇  ÚLTIMAS UNIDADES - NÃO PERCA! 👇 
                  </p>

                  <a
                    href="#pricing-cards"
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors block text-center"
                  >
                    QUERO MEU CLIMATIZADOR AGORA - 47 RESTANTES
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}