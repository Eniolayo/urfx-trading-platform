export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const convertDataStructure = (data: any) => {
  // Convert an object to an array of {timeStamp, value} objects
  function convertObjectToArray(obj: { key: string; value: number }) {
    return Object.entries(obj)
      .map(([key, value]) => ({
        timeStamp: key,
        value: Number(value),
      }))
      .sort((a, b) => {
        if (a.timeStamp < b.timeStamp) return -1;
        if (a.timeStamp > b.timeStamp) return 1;
        return 0;
      });
  }

  return {
    groupedByDay: convertObjectToArray(data.groupedByDay),
    groupedByMonth: convertObjectToArray(data.groupedByMonth),
    groupedByYear: convertObjectToArray(data.groupedByYear),
  };
};

export const formatDateToCustomString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone?.replace(/\D/g, "");

  // Handle different phone number formats
  if (cleaned?.length === 10) {
    // Format as (xxx) xxx-xxxx for 10-digit numbers
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned?.length === 11 && cleaned.startsWith("1")) {
    // Format as +1 (xxx) xxx-xxxx for 11-digit numbers starting with 1
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(
      4,
      7
    )}-${cleaned.slice(7)}`;
  } else if (cleaned?.length > 11) {
    // Format as +<country code> <remaining digits> for longer numbers
    const countryCode = cleaned.slice(0, cleaned?.length - 10);
    const mainNumber = cleaned.slice(cleaned?.length - 10);
    return `+${countryCode} (${mainNumber.slice(0, 3)}) ${mainNumber.slice(
      3,
      6
    )}-${mainNumber.slice(6)}`;
  }

  // Return the original phone if it doesn't match any expected format
  return phone;
}

export function applyOpacityToFractionPart(value: number, opacity: number) {
  const [int, frac] = value
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split(".");

  return (
    <>
      {int}
      {"."}
      <span style={{ opacity: `${opacity}` }}>{frac}</span>
    </>
  );
}

export function formatNumberToK(input: number): string {
  if (input < 1000) {
    return input.toString();
  }
  const formatted = (input / 1000).toFixed(input % 1000 === 0 ? 0 : 1);
  return `${formatted}K`;
}

export const adminEmails = [
  "noahmerriby@gmail.com",
  "ekansdev@gmail.com",
  "cleverman0988@gmail.com",
]; // List of admin emails
