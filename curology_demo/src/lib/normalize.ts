export const name = (value: string) => value && value.charAt(0).toUpperCase() + value.slice(1);

export const phoneNumber = (value: string) => {
  if (value.length < 10) {
    return value;
  }
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }

  return value;
}

export const creditCardNumber = (value: string) => {
  if (value.length < 16) {
    return value;
  }

  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{4})(\d{4})(\d{4})$/);
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4];
  }

  return value;
}

export const expirationDate = (value: string) => {
  if (value.length < 4) {
    return value;
  }

  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4})$/);
  if (match) {
    return match[1] + '/' + match[2];
  }

  return value;
}
