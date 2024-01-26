export const formatUtcDate = (utcDateString: string): string => {
    const date = new Date(utcDateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    // Format the date according to your requirements
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC', // Ensure the time is displayed in UTC
    });
  
    return formattedDate;
  };
  
  // Example usage
  const utcDateString = "2023-12-10T12:00:00.000Z";
  const formattedDate = formatUtcDate(utcDateString);
  console.log(formattedDate);
  