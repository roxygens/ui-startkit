import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag as TagIcon, RefreshCcw, ShoppingCart, MoveUpRight, Search, Plus } from 'lucide-react'
import { Steam } from '@/utils/icons'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/tag'
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
  } as Record<string, unknown>,
}

export default meta

type Story = StoryObj<typeof Card>

export const Playground: Story = {
  args: {
    variant: 'Default',
    disabled: false,
    className: '',
  } as Record<string, unknown>,
  render: (args: { variant?: CardVariant; disabled?: boolean; className?: string }) => {
    const variant = args.variant || 'Default'

    if (variant === 'Mini') {
      return (
        <CardMini onClick={() => {}} disabled={args.disabled} className={args?.className}>
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
      )
    }

    if (variant === 'List') {
      return (
        <CardList onClick={() => {}} disabled={args.disabled} className={args?.className}>
          <CardList.Content>
            <CardList.Images
              images={[
                { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
              ]}
            />

            <CardList.Box>
              <Tag>Luvas Desportivas</Tag>

              <p className="text-base text-white">Vice</p>

              <div className="flex items-center gap-2">
                <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
                <p className="info-text">Possível de trocar</p>
              </div>
            </CardList.Box>

            <CardList.Box>
              <p className="text-medium text-[#707179]">
                Testado no Terreno luvas
                <br />
                (Extraordinário) ★
              </p>

              <ScoreBar value={0.324} />
            </CardList.Box>

            <CardList.Box>
              <div className="flex flex-row items-start gap-[.5rem]">
                <p className="text-2xl text-white">R$ {formatCurrency(6663.9)}</p>
                <Badge value={15} />
              </div>

              <p className="text-xs text-[#707179] mb-[.5rem]">
                Preço de referência {formatCurrency(3054.87)} R$
              </p>
            </CardList.Box>

            <CardList.Button options={options}>
              <div className="flex items-center gap-2">
                <ShoppingCart width={16} height={16} />
                <p>ADICIONAR</p>
              </div>
            </CardList.Button>
          </CardList.Content>
        </CardList>
      )
    }

    return (
      <Card onClick={() => {}} disabled={args.disabled} className={args?.className}>
        <Card.Content>
          <div className="flex items-center gap-2">
            <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
            <p className="info-text">Possível de trocar</p>
          </div>

          <Card.Images
            images={[
              { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
              { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
            ]}
          />

          <div className="flex flex-row items-start gap-[.5rem]">
            <p className="text-2xl text-white">R$ {formatCurrency(6663.9)}</p>
            <Badge value={15} />
          </div>

          <p className="text-xs text-[#707179] mb-[.5rem]">
            Preço de referência {formatCurrency(3054.87)} R$
          </p>

          <Tag size="lg">Luvas Desportivas</Tag>

          <div className="flex flex-row items-center justify-between text-white">
            <p className="text-base">Vice</p>
            <TagIcon width={16} height={16} />
          </div>

          <p className="text-medium text-[#707179]">
            Testado no Terreno luvas
            <br />
            (Extraordinário) ★
          </p>

          <ScoreBar value={0.324} />
        </Card.Content>

        <Card.FooterButton onClick={() => console.log('Adicionar ao carrinho')} options={options}>
          <div className="flex items-center gap-2">
            <ShoppingCart width={16} height={16} />
            <p>ADICIONAR</p>
          </div>
        </Card.FooterButton>
      </Card>
    )
  },
}
