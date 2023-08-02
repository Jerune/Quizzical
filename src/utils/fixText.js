export default function fixText(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&uacute;/g, "ú")
    .replace(/&atilde;/g, "ã")
    .replace(/&oacute;/g, "ó")
    .replace(/&Eacute;/g, "É")
    .replace(/&eacute;/g, "é")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&rsquo;/g, "'")
    .replace(/&ouml;/g, "ö");
}
