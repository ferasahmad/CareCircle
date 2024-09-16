const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (differenceInSeconds < 60) return `${differenceInSeconds} secs ago`;
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) return `${differenceInMinutes} mins ago`;
  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) return `${differenceInHours} hours ago`;
  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 7) return `${differenceInDays} days ago`;

  return date.toLocaleDateString();
};

export default formatDate;
