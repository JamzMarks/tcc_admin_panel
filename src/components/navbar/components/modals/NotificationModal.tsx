import { Bell } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export const NotificationModal = () => {
  const t = useTranslations('Modal.Notifications')
  return (
    <div className="bg-white rounded-lg z-50 w-80 p-4 shadow-xl border border-gray-200 dark:bg-background-dark dark:border dark:border-zinc-800">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-lg font-semibold text-gray-800">{t('title')}</h3>
        <Bell className="w-5 h-5 text-gray-500" />
      </div>

      <ul className="space-y-2 text-sm max-h-80 overflow-y-auto pr-1">
        <NotificationItem className="hover:bg-gray-50" />
        <NotificationItem className="hover:bg-gray-50" />
      </ul>
    </div>
  )
}

interface NotificationItemProps {
  className?: string  
}

export const NotificationItem = ({ className = '' }: NotificationItemProps) => {
  return (
    <li>
      <div
        className={`flex items-center p-3 rounded-md bg-white shadow-sm border border-gray-200 font-inter text-gray-800 ${className}`}
      >
        <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden mr-3">
          <Image
            src="https://picsum.photos/200/300"
            alt="avatar"
            fill
            sizes="40px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-sm leading-tight text-gray-900">Título da Notificação</p>
          <p className="text-xs text-gray-600 leading-snug">Descrição mais detalhada da notificação para o usuário.</p>
        </div>
      </div>
    </li>
  )
}
