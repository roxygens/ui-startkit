import type { Meta, StoryObj } from '@storybook/react-vite'
import { RefreshCcw, ShoppingCart, MoveUpRight, Search, Plus } from 'lucide-react'
import { Steam } from '@/utils/icons'
import { ScoreBar } from '@/components/ui/score-bar'
import { formatCurrency } from '@/utils'
import { Card, CardMini, CardList } from '.'

const options = [
  {
    icon: <MoveUpRight width={16} height={16} />,
    title: 'Inspecionar no jogo',
    onClick: () => console.log('Clicked - Inspecionar no jogo'),
  },
  {
    icon: <Steam width={16} height={16} />,
    title: 'Ver no Steam',
    onClick: () => console.log('Clicked - Ver no Steam'),
  },
  {
    icon: <Search width={16} height={16} />,
    title: 'Pesquisar',
    onClick: () => console.log('Clicked - Pesquisar'),
  },
  {
    icon: <Plus width={16} height={16} />,
    title: 'Seguir',
    onClick: () => console.log('Clicked - Seguir'),
  },
]

type CardVariant = 'Default' | 'Mini' | 'List'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['Default', 'Mini', 'List'],
      description: 'Seleciona a variante do Card',
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'onClick' },
    amount: {
      control: 'number',
      default: 6,
      description: 'Selecione a quantidade de itens que serão exibidos na tela',
    },
  } as Record<string, unknown>,
}

export default meta

type Story = StoryObj<typeof Card>

export const Playground: Story = {
  args: {
    variant: 'Default',
    disabled: false,
    className: '',
    amount: 6,
  } as Record<string, unknown>,
  render: (args: {
    variant?: CardVariant
    disabled?: boolean
    className?: string
    amount?: number
  }) => {
    const variant = args.variant || 'Default'

    if (variant === 'Mini') {
      return (
        <div className="flex flex-wrap gap-y-2 justify-center items-center">
          {Array.from({ length: args?.amount || 6 }).map((_, index) => (
            <CardMini
              key={index}
              onClick={() => {}}
              disabled={args.disabled}
              className={args?.className}
            >
              <CardMini.Content>
                <Card.Images
                  images={[
                    { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                    { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
                  ]}
                />

                <p className="text-xs text-white">Vice</p>

                <div className="flex items-baseline gap-[.25rem] text-center">
                  <p className="text-body text-[var(--muted-foreground)]">De</p>

                  <p className="text-white font-bold text-lg">R$ {formatCurrency(3254.05)}</p>
                </div>
              </CardMini.Content>

              <Card.FooterButton
                className="border-none"
                onClick={() => console.log('Adicionar ao carrinho')}
              >
                <div className="flex items-center gap-2">23 Ofertas</div>
              </Card.FooterButton>
            </CardMini>
          ))}
        </div>
      )
    }

    if (variant === 'List') {
      return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {Array.from({ length: args?.amount || 6 }).map((_, index) => (
            <CardList
              key={index}
              onClick={() => {}}
              disabled={args.disabled}
              className={args?.className}
            >
              <CardList.Content>
                <CardList.Images
                  images={[
                    { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                    { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
                  ]}
                />

                <CardList.Box>
                  <p className="text-yellow-400 text-xs [word-spacing:0.15rem] uppercase">
                    Luvas desportivas
                  </p>

                  <p className="text-white text-base font-medium leading-[150%]">Vice</p>

                  <div className="flex items-center gap-2">
                    <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
                    <p className="info-text">Possível de trocar</p>
                  </div>
                </CardList.Box>

                <CardList.Box>
                  <p className="text-neutral-400 text-xs font-normal leading-[150%]">
                    Testado no Terreno luvas
                    <br />
                    (Extraordinário) ★
                  </p>

                  <ScoreBar value={0.324} />
                </CardList.Box>

                <CardList.Box>
                  <div className="flex flex-row items-center gap-[0.5rem]">
                    <p className="text-xl font-bold text-white">6639,90 R$</p>
                    <p className="info-text">-15%</p>
                  </div>

                  <div className="flex flex-col gap-[0.25rem]">
                    <div className="flex gap-[0.5rem] ">
                      <p className="text-xs font-normal text-neutral-400 leading-[150%]">
                        1201,55 USD
                      </p>

                      <p className="text-xs font-normal text-neutral-400 leading-[150%]">
                        1020,73 EUR
                      </p>
                    </div>

                    <p className="text-sm font-medium text-neutral-400 leading-[150%]">
                      Steam 3054,87 BRL
                    </p>
                  </div>
                </CardList.Box>

                <CardList.Button options={options}>
                  <div className="flex items-center gap-2">
                    <ShoppingCart width={16} height={16} />
                    <p>ADICIONAR</p>
                  </div>
                </CardList.Button>
              </CardList.Content>
            </CardList>
          ))}
        </div>
      )
    }

    return (
      <div className="relative flex flex-wrap justify-center gap-4 items-center">
        {Array.from({ length: args?.amount || 6 }).map((_, index) => (
          <Card key={index} onClick={() => {}} disabled={args.disabled} className={args?.className}>
            <Card.Content>
              <div className="flex items-center gap-2 justify-center mb-[1rem]">
                <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
                <p className="info-text">Possível de trocar</p>
              </div>

              <Card.Images
                images={[
                  { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                  { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
                ]}
              />

              <div className="flex flex-row items-center gap-[0.5rem]">
                <p className="text-xl font-bold text-white">6639,90 R$</p>
                <p className="info-text">-15%</p>
              </div>

              <div className="flex flex-col gap-[0.25rem]">
                <div className="flex gap-[0.5rem] ">
                  <p className="text-xs font-normal text-neutral-400 leading-[150%]">1201,55 USD</p>

                  <p className="text-xs font-normal text-neutral-400 leading-[150%]">1020,73 EUR</p>
                </div>

                <p className="text-sm font-medium text-neutral-400 leading-[150%]">
                  Steam 3054,87 BRL
                </p>
              </div>

              <p className="text-yellow-400 text-xs [word-spacing:0.15rem] uppercase">
                Luvas desportivas
              </p>

              <p className="text-white text-base font-medium leading-[150%]">Vice</p>

              <p className="text-neutral-400 text-sm font-normal leading-[150%]">
                Testado no Terreno luvas
                <br />
                (Extraordinário) ★
              </p>

              <ScoreBar value={0.324} />
            </Card.Content>

            <Card.FooterButton
              onClick={() => console.log('Adicionar ao carrinho')}
              options={options}
              className="shadow-xl"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart width={16} height={16} />
                <p>ADICIONAR</p>
              </div>
            </Card.FooterButton>
          </Card>
        ))}
      </div>
    )
  },
}
