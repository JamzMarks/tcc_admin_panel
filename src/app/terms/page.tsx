"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
// import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { Nav } from "../components/Nav";
import Footer from "../components/footer";

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const [version, setVersion] = useState<string>("");
  const t = useTranslations("TermsPage");
  useEffect(() => {
    // carregar estado salvo (se houver)
    const saved = localStorage.getItem("terms_accepted_v1");
    setAccepted(saved === "true");

    // exemplo: versão gerada pela data de build (ou fetch de API)
    // setVersion(format(new Date(), "yyyy.MM.dd"));
  }, []);

  function handleAccept() {
    localStorage.setItem("terms_accepted_v1", "true");
    setAccepted(true);
  }

  function handleReject() {
    localStorage.setItem("terms_accepted_v1", "false");
    setAccepted(false);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="text-2xl md:text-3xl font-semibold">
                {t("title")}
              </CardTitle>
              {/* <p className="text-sm text-muted-foreground mt-1">Versão {version} • Última atualização: {format(new Date(), "PPP")}</p> */}
            </CardHeader>

            <CardContent className="p-0 md:p-6">
              <div className="md:grid md:grid-cols-3 gap-6">
                <aside className="hidden md:block">
                  <div className="sticky top-6 space-y-4">
                    <div className="rounded-xl border p-4">
                      <h4 className="text-sm font-medium">Resumo rápido</h4>
                      <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                        <li>Uso responsável do serviço</li>
                        <li>Política de privacidade aplicável</li>
                        <li>Direitos e deveres do usuário</li>
                      </ul>
                    </div>

                    <div className="rounded-xl border p-4">
                      <h4 className="text-sm font-medium">Ações</h4>
                      <div className="mt-3 flex flex-col gap-2">
                        <Button onClick={handlePrint} variant="outline">
                          Imprimir / Salvar PDF
                        </Button>
                        <Button
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                          variant="ghost"
                        >
                          Ir para topo
                        </Button>
                      </div>
                    </div>
                  </div>
                </aside>

                <section className="col-span-2">
                  <ScrollArea className="h-[60vh] md:h-[70vh] p-6 border-l md:border-l-0 md:border-none">
                    <article className="prose prose-neutral dark:prose-invert max-w-none">
                      <h2>1. Aceitação dos Termos</h2>
                      <p>
                        Ao utilizar este serviço, você concorda com estes Termos
                        de Uso. Se você não concordar, por favor não utilize o
                        serviço.
                      </p>

                      <h2>2. Uso do Serviço</h2>
                      <p>
                        O serviço é fornecido "no estado em que se encontra".
                        Você concorda em usar o serviço conforme a legislação
                        aplicável e não violar direitos de terceiros.
                      </p>

                      <h2>3. Conteúdo do Usuário</h2>
                      <p>
                        Você é responsável pelo conteúdo que enviar ou publicar.
                        Reservamo-nos o direito de remover conteúdo que viole
                        estes termos.
                      </p>

                      <h2>4. Privacidade</h2>
                      <p>
                        Nossa Política de Privacidade explica como tratamos seus
                        dados. Recomendamos que você a leia.
                      </p>

                      <h2>5. Alterações</h2>
                      <p>
                        Podemos alterar estes termos periodicamente. Quando
                        houver mudanças significativas, notificaremos os
                        usuários conforme aplicável.
                      </p>

                      <h2>6. Lei Aplicável</h2>
                      <p>
                        Estes termos serão regidos pelas leis aplicáveis ao
                        local do prestador do serviço, salvo disposição em
                        contrário.
                      </p>

                      <h2>7. Contato</h2>
                      <p>
                        Se tiver dúvidas, contacte-nos pelo e-mail:
                        suporte@example.com
                      </p>
                    </article>
                  </ScrollArea>

                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="accept"
                        checked={accepted}
                        onCheckedChange={(v) => setAccepted(Boolean(v))}
                      />
                      <label htmlFor="accept" className="text-sm">
                        Li e aceito os Termos de Uso
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleReject} variant="ghost">
                        Recusar
                      </Button>
                      <Button onClick={handleAccept} disabled={accepted}>
                        {accepted ? "Aceito" : "Aceitar"}
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    Ao aceitar, você concorda com os termos acima. Pode revogar
                    sua aceitação a qualquer momento nas configurações da sua
                    conta.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer/>
    </>
  );
}
