import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const ourOtherProjects = [
    {
      id: 1,
      title: "Math Practice",
      description: "Improve your calculation speed.",
      link: "https://hichoudhary22.github.io/math_practice/",
      icon: "/mathPractice.png",
    },
    {
      id: 2,
      title: "Diary App",
      description: "Have a dear diary moment...",
      link: "https://diary-app-4ipf.onrender.com/",
      icon: "/diaryApp.png",
    },
  ];
  return (
    <section className="my-5">
      <hr />
      <div className="m-auto max-w-[75vw] p-2 text-center">
        <p className="font-semibold underline">Disclaimer</p>
        <p className="font-thin">
          We are using MongoDB&apos;s sample_mflix database and TMDB&apos;s free
          API service to show the movies and their respective details. We do not
          own any of the content displayed here. If you find anything
          inappropriate plesase let us know. We&apos;ll be happy to address your
          issues.
        </p>
      </div>
      <div className="m-auto sm:w-[50vw]">
        <p className="text-center font-semibold">Our other projects</p>
        <div className="justify-center sm:flex">
          {ourOtherProjects.map((project) => (
            <div
              className="m-2 min-w-[300px] rounded-md border p-2"
              key={project.id}
            >
              <Link href={project.link} className="flex gap-2">
                <Image
                  src={project.icon}
                  alt="icon"
                  height={40}
                  width={120}
                  style={{
                    height: "50px",
                    width: "130px",
                    borderRadius: "6px",
                  }}
                />
                <p>{project.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
