import { UserLogs } from "@/components/ui/user/logs"

export const UserInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
        <UserLogs/>
        <p>
            UserInfo Component
        </p>

    </div>
  )
}