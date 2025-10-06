import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

interface SectionTitleProps {
    text: string, 
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    
}

export const SectionTitle = ({text, Icon}: SectionTitleProps) => {
    return (
        <h2 className="flex align-middle items-center gap-2 relative text-2xl font-semibold mb-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-blue-500">
           {Icon &&  <Icon />} {text}
        </h2>
    )
}