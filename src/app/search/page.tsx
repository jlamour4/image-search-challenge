'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import ImageGrid from '@/components/ImageGrid/ImageGrid';
import { fetchImages } from '@/utils/imgurApi';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

export type ImageObject = {
  id: string;
  link: string;
  title: string;
  type: string;
}

export default function Search() {
  const searchParams = useSearchParams();
  const [searchTermWithNoResults, setSearchTermWithNoResults] = useState<string>("");
  const router = useRouter();
  const [images, setImages] = useState<ImageObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchTermWithNoResults("");
    const queryParam = searchParams?.get('q');
    if (queryParam) {
      setLoading(true);
      fetchImages(queryParam)
        .then((results) => {
          let imageArray: any[] = []
          results.forEach((item: { is_album: boolean; images: any; }) => item.is_album ? imageArray.push(...item.images) : imageArray.push(item));
          imageArray = imageArray.filter((item) => item.type.includes("image"));
          if (imageArray.length === 0) setSearchTermWithNoResults(queryParam);
          setImages(imageArray)
    })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className='h-full flex flex-col'>

      <div className="flex my-5 items-center">
        <Link href={'/'} className='text-3xl text-green-600 mx-5 font-semibold whitespace-nowrap'>
          <i className="pi pi-image mr-2 text-3xl"></i>
          Image Search
        </Link>
        <SearchBar />
      </div>

      <div className='h-full overflow-y-auto'>
        {
          loading ? (
            <div className='flex'>
              <ProgressSpinner style={{width: '60px', height: '60px', paddingTop: "10em"}} strokeWidth="4" animationDuration=".5s" />
            </div>
          ): (
            <>
              {
                !searchTermWithNoResults ? (
                  <ImageGrid images={images} />
                ) : (
                  <div className='w-full ml-5 mt-5'>
                    <h2 className='text-xl'>No Results Found for <span className='font-bold'>{searchTermWithNoResults}</span></h2>
                    <h3 className='underline'>Search Help</h3>
                    <li>Check your search for typos</li>
                    <li>Use more generic search terms</li>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  );
}