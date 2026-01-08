import http from 'k6/http';
import { check, group } from 'k6';
export const options = {
  stages: [
    { duration: '30s', target: 10 },    // Ramp-up: 0 → 10 usuários em 30s
    { duration: '1m', target: 50 },     // Aumento: 10 → 50 usuários em 1m
    { duration: '30s', target: 100 },   // Pico: 50 → 100 usuários
    { duration: '30s', target: 0 },     // Ramp-down: volta a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% das requisições devem ser < 2s
    http_req_failed: ['rate<0.1'],      // Taxa de erro deve ser < 10%
  },
};
export default function () {
  
  group('Login Flow', function () {
    
    // Fazer login
    const loginRes = http.post('https://seu-app.com/api/login', {
      email: 'user@test.com',
      password: 'senha123',
    });
    
    check(loginRes, {
      'status é 200': (r) => r.status === 200,
      'latência < 1s': (r) => r.timings.duration < 1000,
    });
  });
  group('Checkout Flow', function () {
    
    // Processar pagamento
    const checkoutRes = http.post('https://seu-app.com/api/checkout', {
      valor: 99.99,
      metodo: 'cartao',
    });
    
    check(checkoutRes, {
      'status é 200': (r) => r.status === 200,
      'latência < 2s': (r) => r.timings.duration < 2000,
    });
  });
}
// Resultado:
// ✓ 150 requisições completadas
// ✓ 95% das requisições < 2s
// ✗ 10% das requisições falharam no pico de 100 usuários
// → Seu sistema aguenta até 85 usuários simultâneos