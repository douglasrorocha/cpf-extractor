// Extrai todos os CPFs no formato XXX.XXX.XXX-XX de um texto
export function extractCpfs(text) {
  const regex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
  const found = text.match(regex) || [];
  return [...new Set(found)]; // remove duplicatas
}

// Valida matematicamente o CPF (algoritmo dos dígitos verificadores)
export function validateCpf(cpf) {
  const nums = cpf.replace(/\D/g, "");

  // Rejeita sequências iguais (111.111.111-11, etc.)
  if (nums.length !== 11 || /^(\d)\1+$/.test(nums)) return false;

  const calcDigit = (limit) => {
    const sum = nums
      .slice(0, limit)
      .split("")
      .reduce((acc, n, i) => acc + parseInt(n) * (limit + 1 - i), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return (
    calcDigit(9) === parseInt(nums[9]) && calcDigit(10) === parseInt(nums[10])
  );
}

// Filtra apenas CPFs matematicamente válidos
export function filterValidCpfs(cpfList) {
  return cpfList.filter(validateCpf);
}
