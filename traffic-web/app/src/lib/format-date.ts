export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  };
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...options,
  };
  return new Intl.DateTimeFormat("en-US", mergedOptions).format(
    new Date(dateString)
  );
}
