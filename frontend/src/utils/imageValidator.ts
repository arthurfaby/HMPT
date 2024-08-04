import ky from "ky";

export default async function  ImageValidator(imageSrc: string) : Promise<boolean> {
    return new Promise((resolve, reject) => {
    const image = new Image();
        image.onload = () => {
            resolve(true);
        };
        image.onerror = () => {
            resolve(false)
        };
        image.src = imageSrc;
    })
}