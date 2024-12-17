import React, { useState } from "react";
import { FaList, FaTh } from "react-icons/fa"; // Replace lucide-react with react-icons
import projects from "./data"; // Import your projects data here

export default function Work() {
  const [viewMode, setViewMode] = useState("list");
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.services.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">© Code by Dennis</div>
          <nav className="flex gap-8">
            <a href="#" className="font-medium">
              Work
            </a>
            <a href="#" className="text-muted-foreground">
              About
            </a>
            <a href="#" className="text-muted-foreground">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-16 text-6xl font-medium leading-tight tracking-tight">
          Creating next level
          <br />
          digital products
        </h1>

        <div className="mb-12 flex items-center justify-between">
          <div className="flex gap-4">
            {["All", "Design", "Development"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full px-6 py-2 text-sm transition-colors ${
                  filter === item
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {item}
                {item !== "All" && (
                  <span className="ml-1 text-xs">
                    {item === "Design" ? "7" : "11"}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-full p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <FaList className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-full p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <FaTh className="h-5 w-5" />
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="divide-y">
            <div className="grid grid-cols-4 py-4 text-sm text-muted-foreground">
              <div>CLIENT</div>
              <div>LOCATION</div>
              <div>SERVICES</div>
              <div>YEAR</div>
            </div>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="grid grid-cols-4 py-8 hover:bg-muted/50"
              >
                <div className="text-xl">{project.name}</div>
                <div>{project.location}</div>
                <div>{project.services}</div>
                <div>{project.year}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="space-y-4">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h2 className="text-xl">{project.name}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
