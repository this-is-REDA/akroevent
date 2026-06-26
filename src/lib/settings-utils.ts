export function phoneToTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits}` : "tel:";
}

export function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "https://wa.me/";
}

export function whatsappContactHref(phone: string, message?: string): string {
  const href = whatsappHref(phone);
  if (!message || href === "https://wa.me/") return href;
  return `${href}?text=${encodeURIComponent(message)}`;
}
