import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Tag as TagIcon,
  RefreshCcw,
  ShoppingCart,
  Trash,
  MoveUpRight,
  Search,
  Plus,
} from 'lucide-react'
import { Steam } from '@/utils/icons'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/tag'
import { ScoreBar } from '@/components/ui/score-bar'
import { formatCurrency } from '@/utils'
import { Card, CardMini } from '.'

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

type CardVariant = 'Default' | 'Remove' | 'Mini' | 'List'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['Default', 'Remove', 'Mini', 'List'],
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

    if (variant === 'Remove') {
      return (
        <Card onClick={() => {}} disabled={args.disabled} className={args?.className}>
          <Card.Header>
            <div className="flex items-center gap-2 mb-[36px]">
              <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
              <p className="info-text">Possível de trocar</p>
            </div>

            <Card.HeaderImages
              images={[
                { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
              ]}
            />

            <div className="flex flex-row items-start gap-[8px] mb-[8px]">
              <p className="text-2xl text-white">R$ {formatCurrency(6663.9)}</p>
              <Badge value={15} />
            </div>

            <p className="text-xs text-[#707179]">
              Preço de referência {formatCurrency(3054.87)} R$
            </p>
          </Card.Header>

          <Card.Content>
            <Tag>Luvas Desportivas</Tag>

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

          <Card.FooterButton
            onClick={() => console.log('Remover do carrinho')}
            options={options}
            className="bg-destructive text-white"
          >
            <div className="flex items-center gap-2 text-white">
              <Trash width={16} height={16} />
              <p>REMOVER</p>
            </div>
          </Card.FooterButton>
        </Card>
      )
    }

    if (variant === 'Mini') {
      return (
        <CardMini onClick={() => {}} disabled={args.disabled} className={args?.className}>
          <CardMini.Header>
            <CardMini.Images
              images={[
                { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
                { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
              ]}
            />
          </CardMini.Header>

          <CardMini.Content>
            <p className="text-xs text-white">Vice</p>
            <div className="flex items-baseline gap-[4px]">
              <p className="text-body text-[var(--muted-foreground)]">De</p>

              <p className="text-white font-bold text-lg">R$ {formatCurrency(3254.05)}</p>
            </div>
          </CardMini.Content>

          <Card.FooterButton onClick={() => console.log('Adicionar ao carrinho')}>
            Ver 23 Ofertas
          </Card.FooterButton>
        </CardMini>
      )
    }

    return (
      <Card onClick={() => {}} disabled={args.disabled} className={args?.className}>
        <Card.Header>
          <div className="flex items-center gap-2 mb-[36px]">
            <RefreshCcw width={16} height={16} className="text-[var(--primary)]" />
            <p className="info-text">Possível de trocar</p>
          </div>

          <Card.HeaderImages
            images={[
              { url: '/images/card/luvas-1.png', alt: 'Imagem 1' },
              { url: '/images/card/luvas-2.png', alt: 'Imagem 2' },
            ]}
          />

          <div className="flex flex-row items-start gap-[8px] mb-[8px]">
            <p className="text-2xl text-white">R$ {formatCurrency(6663.9)}</p>
            <Badge value={15} />
          </div>

          <p className="text-xs text-[#707179]">Preço de referência {formatCurrency(3054.87)} R$</p>
        </Card.Header>

        <Card.Content>
          <Tag>Luvas Desportivas</Tag>

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
