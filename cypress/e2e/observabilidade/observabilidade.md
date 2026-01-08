🔍 Observabilidade em QA: O Superpower que Falta no seu Time

Seu teste passou. Tudo verde. Você foi embora feliz.

48 horas depois: um usuário relata que o checkout está lento.

Você corre para o código. Roda o teste de novo. Verde. Passa de novo. Como pode estar lento se o teste diz que está rápido?

Bem-vindo ao problema que 90% dos times de QA enfrentam: seu teste não está testando o que realmente importa.

Aqui está a verdade que ninguém te fala em curso online:

Um teste que passa não significa que seu sistema está saudável.

Seu código pode ser bonito, seus testes podem ser completos, mas em produção aquele endpoint está gerando erros silenciosos, a latência está subindo, o banco de dados está entupido.

É como pilotar um avião sem instrumentos. Você consegue decolar, mas não sabe nem se está voando reto.

Observabilidade é sobre ter os instrumentos certos.

## O Problema Que Você Já Vive (Mas Não Chama Assim)

Pense no último bug que chegou em produção.

O teste passou. Mas em produção:

- A API demorava 5 segundos em vez de 500ms
- Um erro de timeout era capturado mas não loggado
- A latência do banco crescia conforme mais usuários chegavam
- Uma memória vazava lentamente

Nenhum teste pegaria isso. Porque testes são conhecimento de teste (black box testing). Observabilidade é conhecimento de sistema (white box).

Teste: “Cliquei em Login e apareceu o Dashboard”

Observabilidade: “Cliquei em Login. A requisição levou 250ms. Database levou 150ms. Cache foi atingido 95% das vezes. Memória cresceu 2MB. Nenhum erro foi loggado. A operação foi bem-sucedida.”

Qual deles é mais útil?

## O que Observabilidade Realmente Significa
Observabilidade não é monitoramento. Deixa eu ser claro:

- Monitoramento: Você sabe que algo quebrou (“Memory está 90%”)
- Observabilidade: Você consegue entender POR QUE quebrou (“Memory está alta porque a função X tem um loop infinito”)

Observabilidade tem 3 pilares:

1️⃣ Logs (Rastreabilidade)
Você consegue ver exatamente o que aconteceu, passo a passo.

![Login com Observabilidade](login.spec.js)

Resultado dos logs:

{"timestamp":"2026-01-04T08:30:15.123Z","event":"test_started","test_name":"login","user_id":"test-user-123"}
{"timestamp":"2026-01-04T08:30:15.456Z","event":"page_loaded","url":"https://seu-app.com/login","duration_ms":333}
{"timestamp":"2026-01-04T08:30:16.789Z","event":"login_completed","duration_seconds":"1.234","status":"success"}
{"timestamp":"2026-01-04T08:30:16.890Z","event":"test_passed","test_name":"login","total_duration_seconds":"1.767"}

Agora você tem um registro exato do que aconteceu. Você consegue responder: “Qual foi a latência do login hoje?” ou “Quantas vezes o login falhou essa semana?”

2️⃣ Métricas (Padrões e Tendências)
Não é um evento isolado. É um padrão ao longo do tempo.

![Configuração para as métricas](./metrics.js)

Resultado:

[MÉTRICA] POST /api/pagamento - 234ms
[MÉTRICA] POST /api/pagamento - 198ms
[MÉTRICA] POST /api/pagamento - 267ms
=== RELATÓRIO DE MÉTRICAS ===
Total de Requisições: 3
Latência Média: 233.000ms
Distribuição: {"/api/pagamento_success": 3}
Status Testes: {"pagamento_passed": 1}

Agora você consegue responder: “A latência média do checkout é 233ms” ou “A taxa de sucesso é 100%”. Você vê tendências, não eventos isolados.

3️⃣ Traces (Fluxo Completo)
Você consegue seguir uma requisição do início ao fim, vendo cada passo do caminho.

![Configuração do Tracing](./tracing.js)

Resultado do Trace:

```json
{
  "traceId": "trace-1704360615123",
  "spans": [
    {"name": "page_load", "duration_ms": 245},
    {"name": "load_cart", "duration_ms": 89},
    {"name": "fill_address", "duration_ms": 412},
    {"name": "validate_address", "duration_ms": 234},
    {"name": "fill_payment", "duration_ms": 156},
    {"name": "process_payment", "duration_ms": 567},
    {"name": "confirmation", "duration_ms": 78}
  ]
}
```

page_load: 245ms
load_cart: 89ms
fill_address: 412ms
validate_address: 234ms
fill_payment: 156ms
process_payment: 567ms  ← LENTÍSSIMO! Aqui está o problema
confirmation: 78ms
//⏱️  TEMPO TOTAL: 1781ms
Agora você viu exatamente onde o sistema está lento. Não é “checkout é lento”. É “o processamento de pagamento demora 567ms quando deveria demorar 200ms”.

## Por Que Observabilidade Muda Tudo em QA

Antes (sem observabilidade):
- ❌ Teste passou
- ❌ Código foi para produção
- ❌ Usuários reclamam que está lento
- ❌ Investigação: "O quê? O teste diz que tá rápido!"
- ❌ Horas de debugging
- ❌ Causa raiz nunca descoberta

Depois (com observabilidade):
- ✅ Teste passou
- ✅ Observabilidade diz: "Latência média 245ms, 98% de sucesso"
- ✅ Código foi para produção
- ✅ Sistema em produção: "Latência média 245ms, 99% de sucesso"
- ✅ Problema detectado em segundos
= ✅ Trace identifica exatamente qual span está lento

## Implementando Observabilidade em Cypress: Passo a Passo

### Passo 1: Adicionar Logs Estruturados

Comece aqui...

// cypress/support/e2e.js
Cypress.on('test:before:run', (test) => {
  console.log(`[TEST START] ${test.title}`);
});
Cypress.on('test:after:run', (test) => {
  console.log(`[TEST END] ${test.title} - ${test.state}`);
});

### Passo 2: Interceptar Requisições

![Com Observabilidade](./observable.spec.js)

### Passo 3: Enviar para Serviço de Observabilidade

![Configuração para o serviço de Observabilidade](./observability.js)

## A Mentalidade de Observabilidade
Observabilidade em QA não é “adicionar mais um tool”. É um shift de mentalidade:

De: “O teste passou, missão cumprida”  Para: “O teste passou E o sistema está saudável”

De: “Testamos a funcionalidade”  Para: “Testamos a funcionalidade, a performance E o comportamento em produção”

De: “Bug apareceu em produção, alguém debugga”  Para: “Observabilidade detectou anomalia, solucionamos antes do impacto”

## Checklist: Observabilidade Básica em Cypress
- ☑️ Todos os testes loggam eventos estruturados (JSON)?
- ☑️ Você coleta latência de toda requisição HTTP?
- ☑️ Você rastreia o fluxo completo (início ao fim)?
- ☑️ Logs vão para um lugar centralizado (Datadog, ELK, etc)?
- ☑️ Você consegue responder “qual foi a latência média do checkout semana passada?”?

Se respondeu NÃO em 2+ → Comece pelo passo 1.

## O Segredo que Ninguém Fala
Observabilidade em QA é low-hanging fruit.

90% dos times não fazem. Isso significa que quando VOCÊ faz, você viira herói instantaneamente. Porque você consegue:

- Detectar bugs que ninguém via
- Identificar gargalos antes que exploda
- Resolver problemas em minutos ao invés de horas
- Ter dados para provar que o sistema está bom (ou não)

Comece agora. Adicione logs em um teste. Só isso.

Próxima semana você adiciona métricas. Próxima mês você tem observabilidade full.

## Conclusão
Porque observabilidade é o futuro de QA, e você vai ser a pessoa que ensina sua comunidade como implementar.
