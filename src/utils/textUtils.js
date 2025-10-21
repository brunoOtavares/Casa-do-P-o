/**
 * Normaliza texto removendo acentos e convertendo para minúsculas
 * Exemplo: "Pão de Sal" -> "pao de sal"
 */
export const normalizeText = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .normalize('NFD') // Decompõe caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas diacríticas (acentos)
    .trim();
};

/**
 * Compara dois textos ignorando acentos e maiúsculas
 */
export const textIncludes = (text, searchTerm) => {
  return normalizeText(text).includes(normalizeText(searchTerm));
};
