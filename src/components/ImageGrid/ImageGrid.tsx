import styles from './ImageGrid.module.css';
import { useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Image } from 'primereact/image';

interface ImageObject {
  id: string;
  link: string;
  title: string;
}

const ImageGrid = ({ images } : {images : any}) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string] : boolean }>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prevState) => ({
        ...prevState,
        [id]: true,
    }));
};

  return (
    <>
      <div className={styles.grid}>
        {images.map((image: ImageObject, index: number) => (
          <div
            key={image.id}
            className={styles.card}
          >
            {!loadedImages[image.id] && (
              <Skeleton width="100%" height="20em" borderRadius="16px"></Skeleton>
            )}
            <Image
              id={image.id}
              src={image.link}
              alt={image.title || 'Imgur Image'}
              imageStyle={{objectFit: "cover", width: "100%", height: "100%"}}
              preview
              className={`w-full object-cover image ${loadedImages[image.id] ? 'h-full w-full' : 'h-0 w-0 opacity-0'}`}
              onLoad={() => handleImageLoad(image.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;