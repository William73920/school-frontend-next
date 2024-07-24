"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FidgetSpinner } from "react-loader-spinner";

export default function Home() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch("http://localhost:5000/api/schools");
      const data = await response.json();
      setSchools(data);
      setLoading(false);
    };

    fetchSchools();
  }, []);

  return (
    <main>
      <h1 className={styles.title}>Schools List</h1>

      <button
        className={styles.button}
        onClick={() => router.push("/addschools")}
      >
        {" "}
        Add School
      </button>
      <div className={styles.grid}>
        {loading ? (
          <p>
            <FidgetSpinner
              visible={true}
              height="80"
              width="80"
              ariaLabel="fidget-spinner-loading"
              wrapperStyle={{}}
              wrapperClass="fidget-spinner-wrapper"
            />
          </p>
        ) : schools.message === "No schools created yet" ? (
          <p>No schools found</p>
        ) : (
          schools?.data?.map((school) => (
            <div key={school.id} className={styles.card}>
              <Image
                src={`http://localhost:5000/${school.image}`}
                alt="School image"
                width={200}
                height={200}
              />
              <h2 className={styles.name}>{school.name}</h2>
              <p className={styles.city}>{school.city}</p>
              <p className={styles.address}>{school.address}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
