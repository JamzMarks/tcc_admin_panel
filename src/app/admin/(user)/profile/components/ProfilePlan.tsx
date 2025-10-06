import { SimpleSection } from "@/components/ui/sections/SimpleSection";


export const ProfilePlan = ({
  plan,
  userType,
}: {
  plan: string;
  userType: "User" | "Company";
}) => {
  return (
    <SimpleSection>
      <h3 className="text-lg font-semibold">Plano Atual</h3>
      <p>{plan}</p>
      <h4 className="text-lg font-semibold mt-4">Tipo de Usuário</h4>
      <p>{userType}</p>
    </SimpleSection>
  );
};