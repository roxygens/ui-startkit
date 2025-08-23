import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'
import { Tag } from '@/components/ui/tag'
import { ScoreBar } from '../score-bar'
import { formatCurrency } from '@/utils'
import { Card } from '.'

const DefaultCard = (
  <>
    <Card.Header>
      <div className="flex items-center gap-2 mb-[8px]">
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.69562 13.6783C7.29505 14.3879 9.20002 14.3494 10.8313 13.4075C13.5417 11.8427 14.4703 8.37704 12.9055 5.66672L12.7388 5.37804M3.09022 11.3335C1.52541 8.62314 2.45404 5.15746 5.16437 3.59265C6.79569 2.65081 8.70066 2.61227 10.3001 3.32185M1.66016 11.3892L3.48152 11.8773L3.96956 10.0559M12.0263 6.94393L12.5143 5.12256L14.3357 5.6106"
            stroke="var(--primary)"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-[var(--primary)] font-inter font-medium text-xs leading-[15px]">
          Possivel de troca
        </p>
      </div>

      <Card.HeaderImages
        images={[
          {
            url: '/images/card/luvas-1.png',
            alt: 'Imagem 1',
          },
          {
            url: '/images/card/luvas-2.png',
            alt: 'Imagem 2',
          },
        ]}
      />

      <div className="flex flex-row items-start gap-[8px] mb-[4px]">
        <p className="font-inter font-bold text-2xl leading-8 text-white">
          R$ {formatCurrency(6663.9)}
        </p>

        <Badge value={15} />
      </div>

      <p className="font-inter font-medium text-xs leading-[18px] text-[#707179] mb-[16px]">
        Preço de referência {formatCurrency(3054.87)} R$
      </p>
    </Card.Header>

    <Card.Content>
      <Tag className="w-fit">Luvas Desportivas</Tag>

      <div className="flex flex-row items-center gap-1">
        <p className="font-inter font-normal text-base leading-6 text-white">Vice</p>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_16181_64072)">
            <path
              d="M5.33203 5.3335H5.3387M1.33203 3.46683L1.33203 6.44984C1.33203 6.77596 1.33203 6.93902 1.36887 7.09247C1.40153 7.22852 1.45541 7.35858 1.52851 7.47787C1.61097 7.61243 1.72627 7.72773 1.95687 7.95833L7.06929 13.0708C7.86132 13.8628 8.25734 14.2588 8.714 14.4072C9.11568 14.5377 9.54838 14.5377 9.95006 14.4072C10.4067 14.2588 10.8027 13.8628 11.5948 13.0708L13.0693 11.5962C13.8613 10.8042 14.2573 10.4082 14.4057 9.95153C14.5362 9.54984 14.5362 9.11715 14.4057 8.71546C14.2573 8.2588 13.8613 7.86279 13.0693 7.07075L7.95687 1.95833C7.72627 1.72773 7.61097 1.61243 7.47641 1.52998C7.35711 1.45687 7.22705 1.403 7.09101 1.37034C6.93756 1.3335 6.7745 1.3335 6.44837 1.3335L3.46536 1.3335C2.71863 1.3335 2.34526 1.3335 2.06004 1.47882C1.80916 1.60665 1.60519 1.81063 1.47736 2.06151C1.33203 2.34672 1.33203 2.72009 1.33203 3.46683ZM5.66537 5.3335C5.66537 5.51759 5.51613 5.66683 5.33203 5.66683C5.14794 5.66683 4.9987 5.51759 4.9987 5.3335C4.9987 5.1494 5.14794 5.00016 5.33203 5.00016C5.51613 5.00016 5.66537 5.1494 5.66537 5.3335Z"
              stroke="white"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_16181_64072">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <p className="w-[218px] font-inter font-medium text-sm leading-5 text-[#707179]">
        Testado no Terreno luvas (Extraordinário) ★
      </p>

      <ScoreBar value={0.324} />
    </Card.Content>

    <Card.FooterButton
      onClickAddCart={() => console.log('Adicionar ao carrinho')}
      options={[
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
          onClick: () => {
            console.log('Clicked - Inspecionar no jogo')
          },
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
          onClick: () => {
            console.log('Clicked - Ver no Steam')
          },
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
          onClick: () => {
            console.log('Clicked - Pesquisar')
          },
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
          onClick: () => {
            console.log('Clicked - Seguir')
          },
        },
      ]}
    >
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_16604_27624)">
            <path
              d="M1.33203 1.3335H2.20281C2.36682 1.3335 2.44883 1.3335 2.51482 1.36366C2.57298 1.39023 2.62226 1.43298 2.6568 1.48679C2.69599 1.54786 2.70759 1.62904 2.73078 1.7914L3.04632 4.00016M3.04632 4.00016L3.74758 9.15443C3.83657 9.80851 3.88106 10.1356 4.03743 10.3817C4.17522 10.5986 4.37275 10.7711 4.60627 10.8784C4.87127 11.0002 5.20133 11.0002 5.86144 11.0002H11.5667C12.1951 11.0002 12.5092 11.0002 12.766 10.8871C12.9924 10.7874 13.1866 10.6267 13.3269 10.423C13.486 10.1919 13.5448 9.88327 13.6623 9.266L14.5448 4.63329C14.5862 4.41603 14.6068 4.30741 14.5769 4.2225C14.5506 4.14801 14.4986 4.08529 14.4304 4.04551C14.3526 4.00016 14.242 4.00016 14.0209 4.00016H3.04632ZM6.66536 14.0002C6.66536 14.3684 6.36689 14.6668 5.9987 14.6668C5.63051 14.6668 5.33203 14.3684 5.33203 14.0002C5.33203 13.632 5.63051 13.3335 5.9987 13.3335C6.36689 13.3335 6.66536 13.632 6.66536 14.0002ZM11.9987 14.0002C11.9987 14.3684 11.7002 14.6668 11.332 14.6668C10.9638 14.6668 10.6654 14.3684 10.6654 14.0002C10.6654 13.632 10.9638 13.3335 11.332 13.3335C11.7002 13.3335 11.9987 13.632 11.9987 14.0002Z"
              stroke="#1F1F1F"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_16604_27624">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p>ADICIONAR</p>
      </div>
    </Card.FooterButton>
  </>
)

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: DefaultCard,
    onClick() {
      console.log('Clicked - Card')
    },
  },
}
