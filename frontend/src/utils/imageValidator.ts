import ky from "ky";

export default async function  ImageValidator(imageSrc: string) : Promise<boolean> {
    // const response = await ky.get(imageSrc)
    // console.log(response)
    //  const image = new Image();
    //     image.onload = () => {
    //         console.log("good")
    
    //         return true;
    //     };
    //     image.onerror = () => {
    //         console.log("error")
    //         return false
    //     };
    //     image.src = imageSrc;
    // }
    return new Promise((resolve, reject) => {
    const image = new Image();
        image.onload = () => {
            console.log(imageSrc)
            resolve(true);
        };
        image.onerror = () => {
            resolve(false)
        };
        image.src = imageSrc;
    })
}