import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {

  return (
    <main className="h-full p-2 lg:p-5 mt-10 flex flex-col items-center">
      <div className="flex text-4xl mb-6 items-center justify-center font-semibold text-green-600 select-none ">
        <i className="pi pi-image mr-2 text-4xl"></i>
        <h1>Image Search</h1>
      </div>
      <SearchBar />
    </main>
  );
}