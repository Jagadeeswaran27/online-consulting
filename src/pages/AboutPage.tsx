import { useEffect, useState } from "react";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await response.json();
      console.log(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>AboutPage Loaded!=</div>;
}
