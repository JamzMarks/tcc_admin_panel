import { LucideIcon } from "lucide-react"

interface SimpleSectionProps {
    children: React.ReactNode,
    className?: string,
}

export const SimpleSection = ({children, className}: SimpleSectionProps) => {
    return(
        <section className={`bg-background p-4 rounded-2xl shadow border border-gray-200 space-y-4 ${className ? className : ""} 
        dark:bg-neutral-950 dark:border-0`}>
            {children}
        </section>
    )
}


interface SectionWithHeaderProps extends SimpleSectionProps{
    title: string,
    Icon?: LucideIcon,
}
export const SectionWithHeader = ({children, className, title, Icon}: SectionWithHeaderProps) => {
    return(
        <section className={`bg-background  rounded-2xl shadow border border-gray-200 space-y-4 ${className ? className : ""} 
        dark:bg-foreground-dark dark:border-0`}>
            <div className="px-4 pt-4 flex items-center space-x-2">
                 {Icon && (
                    <div className="items-center flex justify-center w-5 h-5">
                        <Icon className="text-primary"/>
                    </div>
                )} 
                <h2 className="font-semibold">{title}</h2>
            </div>
            <hr className="border-gray-200 dark:border-neutral-800 rounded-t-2xl mb-0" />
            <div className="p-4">
                {children}
            </div>
        </section>
    )
}