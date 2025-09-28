import type { AvatarProps } from '@nuxt/ui'

// статус пользователя в рассылке
export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

// статус продажи
export type SaleStatus = 'paid' | 'failed' | 'refunded'

// пользователь
export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps // аватар
  status: UserStatus // статус подписки
  location: string // местоположение
}

// письмо
export interface Mail {
  id: number
  unread?: boolean // непрочитанное
  from: User // отправитель
  subject: string // тема письма
  body: string // тело письма
  date: string // дата
}

// участник команды
export interface Member {
  name: string
  username: string
  role: 'member' | 'owner' // роль
  avatar: AvatarProps
}

// статистика
export interface Stat {
  title: string // название
  icon: string // иконка
  value: number | string // значение
  variation: number // изменение в %
  formatter?: (value: number) => string // форматтер значения
}

// продажа
export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

// уведомление
export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

// период для графиков
export type Period = 'daily' | 'weekly' | 'monthly'

// диапазон дат
export interface Range {
  start: Date
  end: Date
}
