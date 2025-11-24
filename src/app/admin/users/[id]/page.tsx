'use client'

import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { UsersClient } from "@/services/users.service";
import { UserDto } from "@/types/user/user.type";
import { User as UserIcon, Mail, Calendar, Shield, Pencil, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Roles } from "@/types/user/roles.type";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { UserInfo } from "./components/Info";
import { UserLogs } from "@/components/ui/user/logs";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDto | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserDto>>({});

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await UsersClient.GetUsersById(id as string);
        setUser(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchUser();
  }, [id]);

  const startEditing = () => {
    setEditData({ ...user });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({});
  };

  const saveUser = async () => {
    try {
      if (!id) return;
      await UsersClient.UpdateUser(id as string, editData);
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  const handleChange = (field: keyof UserDto, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
    
    <SectionWithHeader title="User Details" Icon={UserIcon}>
      {!user && <p>Carregando...</p>}

      {user && (
        <div className="p-4">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback>
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <CardTitle className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {!isEditing && (
              <Button variant="outline" size="sm" onClick={startEditing}>
                <Pencil size={16} className="mr-2" />
                Editar
              </Button>
            )}
          </div>

          <Separator className="my-4" />

          {/* VIEW MODE */}
          {!isEditing && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-muted-foreground" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-muted-foreground" />
                <span>
                  Criado em:{" "}
                  <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Shield size={18} className="text-muted-foreground" />
                <span>
                  Perfil:{" "}
                  <Badge variant={user.role === Roles.ADMIN ? "destructive" : "outline"}>
                    {user.role}
                  </Badge>
                </span>
              </div>
            </div>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label>Nome</Label>
                <Input
                  value={editData.firstName || ""}
                  onChange={e => handleChange("firstName", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Sobrenome</Label>
                <Input
                  value={editData.lastName || ""}
                  onChange={e => handleChange("lastName", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Role</Label>
                <Select
                  value={editData.role || ""}
                  onValueChange={(v) => handleChange("role", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Roles.USER}>USER</SelectItem>
                    <SelectItem value={Roles.ADMIN}>ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={saveUser} className="flex items-center gap-2">
                  <Save size={16} />
                  Salvar
                </Button>

                <Button
                  variant="outline"
                  onClick={cancelEditing}
                  className="flex items-center gap-2"
                >
                  <X size={16} />
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      
    </SectionWithHeader>
    <UserLogs />
    </div>
  );
};

export default UserPage;
