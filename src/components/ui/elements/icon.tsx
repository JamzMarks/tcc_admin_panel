import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";


interface SimpleIconProps {
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const SimpleIcon = ({Icon}: SimpleIconProps) => {
    return (
        <div className="p-2 bg-gray-200 rounded-xl ">
            <Icon className="text-neutral-600"/>
        </div>
    )
 }