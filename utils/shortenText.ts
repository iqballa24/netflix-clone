interface Params {
  maxLen: number;
  text: string;
}

export default function shortenText({ maxLen, text = '' }: Params) {
  if (text.length > maxLen)
    return text.substring(0, text.lastIndexOf('', maxLen)) + '...';

  return text;
}
