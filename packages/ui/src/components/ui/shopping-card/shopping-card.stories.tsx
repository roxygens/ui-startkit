import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShoppingCard } from '.'

const meta: Meta<typeof ShoppingCard> = {
  title: 'Components/ShoppingCard',
  component: ShoppingCard,
  tags: ['autodocs'],
  argTypes: {
    quality: {
      description: 'O valor  entre 0 e 1 com 3 casas decimais de precisão',
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.001,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ShoppingCard>

export const Default: Story = {
  args: {
    price: 6639,
    referencePrice: 3054.87,
    discount: 15,
    category: 'Luvas Desportivas',
    quality: 0.324,
    name: 'Vice',
    additionalInfo: 'Testado no Terreno luvas (Extraordinário) ★',
    hasNameBadge: true,
    tradeStatus: 'Possível trocar',
    images: [
      {
        url: '/images/card/luvas-1.png',
        alt: 'Imagem 1',
      },
      {
        url: '/images/card/luvas-2.png',
        alt: 'Imagem 2',
      },
    ],
    options: [
      {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L12 4M12 4H6.66667M12 4V9.33333"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Inspecionar no jogo',
        onClick() {},
      },
      {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.98598 0C3.78531 0 0.340648 3.24 0.0146484 7.358L4.30265 9.13C4.67846 8.874 5.12259 8.73695 5.57731 8.73667C5.61909 8.73711 5.66087 8.73844 5.70265 8.74067L7.60998 5.97933V5.94C7.61104 5.14043 7.92914 4.37392 8.49452 3.80854C9.0599 3.24315 9.82641 2.92506 10.626 2.924C12.2886 2.924 13.642 4.278 13.642 5.942C13.642 7.606 12.2886 8.95867 10.626 8.95867H10.556L7.83865 10.8993L7.84131 11.0053C7.84184 11.3025 7.78377 11.5968 7.67043 11.8714C7.55709 12.1461 7.3907 12.3957 7.18079 12.606C6.97088 12.8163 6.72156 12.9831 6.4471 13.0969C6.17265 13.2107 5.87844 13.2693 5.58131 13.2693C5.05857 13.2678 4.55232 13.0862 4.14784 12.755C3.74335 12.4239 3.46535 11.9635 3.36065 11.4513L0.290648 10.18C1.24132 13.538 4.32398 16 7.98598 16C12.404 16 15.9853 12.418 15.9853 8C15.9853 3.582 12.4033 0 7.98598 0ZM5.02665 12.14L4.04465 11.7333C4.21932 12.0953 4.52065 12.3993 4.92065 12.5667C5.2309 12.6952 5.57226 12.729 5.90171 12.6639C6.23115 12.5987 6.53393 12.4374 6.77186 12.2004C7.00979 11.9634 7.17222 11.6613 7.23868 11.3321C7.30514 11.0029 7.27266 10.6614 7.14531 10.3507C6.97716 9.94227 6.65649 9.61547 6.25135 9.4396C5.84621 9.26373 5.3885 9.25263 4.97531 9.40867L5.99065 9.82867C6.29715 9.95641 6.54035 10.2007 6.66675 10.5077C6.79315 10.8148 6.79239 11.1595 6.66465 11.466C6.5369 11.7725 6.29263 12.0157 5.98557 12.1421C5.67851 12.2685 5.33315 12.2677 5.02665 12.14ZM12.6366 5.938C12.6358 5.40519 12.4237 4.89445 12.047 4.51769C11.6702 4.14093 11.1595 3.92888 10.6266 3.928C10.2291 3.928 9.84049 4.04588 9.50995 4.26675C9.17941 4.48761 8.92178 4.80153 8.76965 5.16881C8.61752 5.53609 8.57771 5.94023 8.65527 6.33013C8.73283 6.72003 8.92426 7.07818 9.20536 7.35928C9.48647 7.64039 9.84461 7.83182 10.2345 7.90938C10.6244 7.98694 11.0286 7.94713 11.3958 7.795C11.7631 7.64287 12.077 7.38524 12.2979 7.0547C12.5188 6.72415 12.6366 6.33554 12.6366 5.938ZM9.12131 5.93467C9.12131 5.5341 9.28044 5.14994 9.56368 4.8667C9.84692 4.58346 10.2311 4.42433 10.6316 4.42433C11.0322 4.42433 11.4164 4.58346 11.6996 4.8667C11.9829 5.14994 12.142 5.5341 12.142 5.93467C12.1416 6.33515 11.9823 6.71912 11.6991 7.00224C11.4158 7.28537 11.0318 7.44449 10.6313 7.44467C10.433 7.44475 10.2366 7.40576 10.0534 7.3299C9.87012 7.25405 9.70362 7.14283 9.56339 7.00259C9.42315 6.86236 9.31193 6.69586 9.23608 6.51262C9.16022 6.32938 9.12123 6.13299 9.12131 5.93467Z"
              fill="white"
            />
          </svg>
        ),
        title: 'Ver no Steam',
        onClick() {},
      },
      {
        icon: (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Pesquisar',
        onClick() {},
      },
      {
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_16208_50540)">
              <path
                d="M7.99996 2.16602V13.8327M2.16663 7.99935H13.8333"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_16208_50540">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ),
        title: 'Seguir',
        onClick() {},
      },
    ],
  },
}
